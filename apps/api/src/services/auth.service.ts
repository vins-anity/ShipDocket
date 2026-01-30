import { createClient } from "@supabase/supabase-js";
import { env } from "../env";
import { decryptToken, encryptToken } from "../lib/token-encryption";
import * as workspacesService from "./workspaces.service";
import type { UpdateWorkspaceInput } from "./workspaces.service";

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

// OAuth endpoints
const OAUTH_CONFIG = {
    slack: {
        authorizeUrl: "https://slack.com/oauth/v2/authorize",
        tokenUrl: "https://slack.com/api/oauth.v2.access",
        scopes: ["chat:write", "users:read", "users:read.email", "app_mentions:read"],
    },
    github: {
        authorizeUrl: "https://github.com/login/oauth/authorize",
        tokenUrl: "https://github.com/login/oauth/access_token",
        // CRITICAL SECURITY FIX: Removed 'repo' and 'write:repo_hook' to ensure Zero-Knowledge
        // for code contents. Webhooks should be configured via GitHub App installation.
        // Added 'actions:read' & 'repo:status' for CI/CD detection without reading code.
        scopes: ["read:user", "user:email", "actions:read", "repo:status"],
    },
    jira: {
        authorizeUrl: "https://auth.atlassian.com/authorize",
        tokenUrl: "https://auth.atlassian.com/oauth/token",
        scopes: ["read:jira-work", "write:jira-work", "read:jira-user"],
    },
};

export type OAuthProvider = keyof typeof OAUTH_CONFIG;

/**
 * Generate OAuth authorization URL
 */
export function getAuthorizationUrl(
    provider: OAuthProvider,
    state: string,
    redirectUri: string,
): string {
    const config = OAUTH_CONFIG[provider];
    const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];

    if (!clientId) {
        throw new Error(`${provider.toUpperCase()}_CLIENT_ID not configured`);
    }

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        state,
        scope: config.scopes.join(" "),
        response_type: "code",
    });

    return `${config.authorizeUrl}?${params}`;
}

/**
 * Exchange OAuth code for access token
 */
export async function exchangeCodeForToken(
    provider: OAuthProvider,
    code: string,
    redirectUri: string,
): Promise<{ accessToken: string; refreshToken?: string; expiresIn?: number; cloudId?: string }> {
    const config = OAUTH_CONFIG[provider];
    const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];
    const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`];

    if (!clientId || !clientSecret) {
        throw new Error(`OAuth credentials not configured for ${provider}`);
    }

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
    });

    const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
        body: body.toString(),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OAuth token exchange failed: ${error}`);
    }

    const data = await response.json();

    let cloudId: string | undefined;
    if (provider === "jira") {
        const resourcesResponse = await fetch(
            "https://api.atlassian.com/oauth/token/accessible-resources",
            {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                    Accept: "application/json",
                },
            },
        );

        if (resourcesResponse.ok) {
            const resources = await resourcesResponse.json();
            // Use the first accessible resource (cloud site)
            if (resources.length > 0) {
                // We need the SITE (hostname) to match webhooks, not the cloudId
                // Example url: "https://shipdocket.atlassian.net"
                const siteUrl = resources[0].url;
                try {
                    cloudId = new URL(siteUrl).hostname;
                } catch (e) {
                    console.warn("Failed to parse Jira URL", siteUrl);
                    cloudId = resources[0].id; // Fallback
                }
            }
        }
    }

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        cloudId,
    };
}

/**
 * Store encrypted OAuth token for workspace
 */
export async function storeOAuthToken(
    workspaceId: string,
    provider: OAuthProvider,
    accessToken: string,
    refreshToken?: string,
    expiresIn?: number,
    siteId?: string,
): Promise<void> {
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000) : undefined;

    const updates: UpdateWorkspaceInput = {};

    switch (provider) {
        case "slack":
            updates.slackAccessToken = accessToken;
            if (refreshToken) updates.slackRefreshToken = refreshToken;
            if (expiresAt) updates.slackTokenExpiresAt = expiresAt;
            break;
        case "github":
            // For GitHub Apps, we store installation token differently
            updates.githubInstallationId = accessToken;
            break;
        case "jira":
            updates.jiraAccessToken = accessToken;
            if (refreshToken) updates.jiraRefreshToken = refreshToken;
            if (expiresAt) updates.jiraTokenExpiresAt = expiresAt;
            if (siteId) {
                updates.jiraSite = siteId;
            }
            break;
    }

    await workspacesService.updateWorkspace(workspaceId, updates);
}

/**
 * Retrieve and decrypt OAuth token for workspace
 */
export async function getOAuthToken(
    workspaceId: string,
    provider: OAuthProvider,
): Promise<string | null> {
    const workspace = await workspacesService.getWorkspaceById(workspaceId);

    if (!workspace) {
        throw new Error("Workspace not found");
    }

    let encryptedToken: string | null = null;

    switch (provider) {
        case "slack":
            encryptedToken = workspace.slackAccessToken;
            break;
        case "github":
            encryptedToken = workspace.githubInstallationId;
            break;
        case "jira":
            encryptedToken = workspace.jiraAccessToken;
            break;
    }

    if (!encryptedToken) {
        return null;
    }

    return await decryptToken(encryptedToken);
}

/**
 * Refresh OAuth token if it's expired or about to expire (within 5 mins)
 */
export async function refreshIfNeeded(
    workspaceId: string,
    provider: OAuthProvider,
): Promise<string | null> {
    if (provider === "github") {
        return getOAuthToken(workspaceId, "github");
    }

    const workspace = await workspacesService.getWorkspaceById(workspaceId);
    if (!workspace) return null;

    let encryptedToken: string | null = null;
    let encryptedRefreshToken: string | null = null;
    let expiresAt: Date | null = null;

    if (provider === "slack") {
        encryptedToken = workspace.slackAccessToken;
        encryptedRefreshToken = workspace.slackRefreshToken;
        expiresAt = workspace.slackTokenExpiresAt;
    } else if (provider === "jira") {
        encryptedToken = workspace.jiraAccessToken;
        encryptedRefreshToken = workspace.jiraRefreshToken;
        expiresAt = workspace.jiraTokenExpiresAt;
    }

    if (!encryptedToken) return null;

    // Check if token is expired or expires in the next 5 minutes
    const isExpired =
        expiresAt && expiresAt.getTime() - Date.now() < 5 * 60 * 1000;

    if (!isExpired) {
        return await decryptToken(encryptedToken);
    }

    if (!encryptedRefreshToken) {
        console.warn(`Token expired for ${provider} but no refresh token available`);
        return await decryptToken(encryptedToken);
    }

    // Attempt to refresh
    try {
        const refreshToken = await decryptToken(encryptedRefreshToken);
        const config = OAUTH_CONFIG[provider];
        const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`];
        const clientSecret = process.env[`${provider.toUpperCase()}_CLIENT_SECRET`];

        const body = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId || "",
            client_secret: clientSecret || "",
        });

        const response = await fetch(config.tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
            body: body.toString(),
        });

        if (!response.ok) {
            throw new Error(`Refresh failed: ${await response.text()}`);
        }

        const data = await response.json();

        // Store new tokens
        await storeOAuthToken(
            workspaceId,
            provider,
            data.access_token,
            data.refresh_token,
            data.expires_in,
            provider === "jira" ? workspace.jiraSite || undefined : undefined
        );

        return data.access_token;
    } catch (e) {
        console.error(`Failed to refresh ${provider} token:`, e);
        return await decryptToken(encryptedToken); // Fallback to old token
    }
}

/**
 * Create Supabase client for user authentication
 */
export function createSupabaseClient(authToken?: string) {
    return createClient(SUPABASE_URL || "", SUPABASE_ANON_KEY || "", {
        global: {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        },
    });
}

/**
 * Verify Supabase JWT and get user
 */
export async function verifySupabaseToken(token: string) {
    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        throw new Error(`Invalid token: ${error?.message || "User not found"}`);
    }

    return data.user;
}
