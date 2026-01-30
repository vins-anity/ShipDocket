import { env } from "../env";
import { getOAuthToken } from "./auth.service";
import * as workspacesService from "./workspaces.service";

export class JiraService {
    private baseUrl: string;
    private email: string;
    private apiToken: string;

    constructor() {
        this.baseUrl = env.JIRA_HOST || "";
        this.email = env.JIRA_EMAIL || "";
        this.apiToken = env.JIRA_API_TOKEN || "";
    }

    /**
     * Transition a Jira issue to a new status
     */
    async syncTaskStatus(workspaceId: string, taskId: string, status: string) {
        // Try OAuth first
        const oauthToken = await getOAuthToken(workspaceId, "jira");
        const workspace = await workspacesService.getWorkspaceById(workspaceId);
        const cloudId = workspace?.jiraSite;

        if (oauthToken && cloudId) {
            try {
                await this.performTransitionOAuth(cloudId, oauthToken, taskId, status);
                return;
            } catch (error) {
                console.warn("[Jira] OAuth sync failed, falling back to Basic Auth:", error);
            }
        }

        // Fallback to Basic Auth
        if (!this.baseUrl || !this.email || !this.apiToken) {
            console.warn("[Jira] Credentials missing (OAuth & Basic), skipping status sync");
            return;
        }

        await this.performTransitionBasic(taskId, status);
    }

    // ... (Existing Basic Auth Logic moved to private method)
    private async performTransitionBasic(taskId: string, status: string) {
        try {
            // 1. Get available transitions
            const transitionsResponse = await fetch(
                `https://${this.baseUrl}/rest/api/3/issue/${taskId}/transitions`,
                {
                    method: "GET",
                    headers: this.getHeaders(),
                },
            );

            if (!transitionsResponse.ok) {
                throw new Error(`Failed to get transitions: ${transitionsResponse.statusText}`);
            }

            const transitionsData = await transitionsResponse.json();
            const transition = transitionsData.transitions.find(
                (t: { name: string; id: string }) => t.name.toLowerCase() === status.toLowerCase(),
            );

            if (!transition) {
                console.warn(`[Jira] Transition to "${status}" not found for ${taskId}`);
                return;
            }

            // 2. Perform transition
            const updateResponse = await fetch(
                `https://${this.baseUrl}/rest/api/3/issue/${taskId}/transitions`,
                {
                    method: "POST",
                    headers: this.getHeaders(),
                    body: JSON.stringify({
                        transition: { id: transition.id },
                    }),
                },
            );

            if (!updateResponse.ok) {
                throw new Error(`Failed to update status: ${updateResponse.statusText}`);
            }

            console.log(`[Jira] Synced status for ${taskId} to "${status}" (Basic Auth)`);
        } catch (error) {
            console.error(`[Jira] Failed to sync status for ${taskId}:`, error);
        }
    }

    private async performTransitionOAuth(
        cloudId: string,
        accessToken: string,
        taskId: string,
        status: string,
    ) {
        // 1. Get available transitions (OAuth)
        const transitionsResponse = await fetch(
            `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${taskId}/transitions`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                },
            },
        );

        if (!transitionsResponse.ok) {
            throw new Error(`Failed to get transitions: ${transitionsResponse.statusText}`);
        }

        const transitionsData = await transitionsResponse.json();
        const transition = transitionsData.transitions.find(
            (t: { name: string; id: string }) => t.name.toLowerCase() === status.toLowerCase(),
        );

        if (!transition) {
            console.warn(`[Jira] Transition to "${status}" not found for ${taskId}`);
            return;
        }

        // 2. Perform transition (OAuth)
        const updateResponse = await fetch(
            `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${taskId}/transitions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transition: { id: transition.id },
                }),
            },
        );

        if (!updateResponse.ok) {
            throw new Error(`Failed to update status: ${updateResponse.statusText}`);
        }

        console.log(`[Jira] Synced status for ${taskId} to "${status}" (OAuth)`);
    }

    private getHeaders() {
        const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString("base64");
        return {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    /**
     * Make an authenticated request to Jira Cloud API
     */
    async callJiraAPI<T>(cloudId: string, accessToken: string, endpoint: string): Promise<T> {
        return this.fetchWithRetry(`https://api.atlassian.com/ex/jira/${cloudId}${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });
    }

    /**
     * Fetch with exponential backoff retry logic
     */
    private async fetchWithRetry<T>(url: string, options: RequestInit, retries = 3): Promise<T> {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);

                if (response.ok) {
                    return response.json();
                }

                // Handle Rate Limiting (429) and Server Errors (5xx)
                if (response.status === 429 || response.status >= 500) {
                    const delay = 2 ** i * 1000; // 1s, 2s, 4s
                    console.warn(
                        `[JiraService] Request failed (${response.status}). Retrying in ${delay}ms...`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }

                throw new Error(`Jira API error [${response.status}]: ${response.statusText}`);
            } catch (error) {
                if (i === retries - 1) throw error;
                const delay = 2 ** i * 1000;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw new Error("Max retries exceeded");
    }
}

export const jiraService = new JiraService();
