
import { Hono } from "hono";
import { workspacesService } from "../../services";
import { supabaseAuth } from "../../middleware/supabase-auth";

type Variables = {
    userId: string;
    user: any;
};

const app = new Hono<{ Variables: Variables }>();

// Apply Supabase Auth middleware to all routes
app.use("*", supabaseAuth);

/**
 * GET /
 * List all workspaces the user is a member of.
 */
app.get("/", async (c) => {
    const userId = c.get("userId") as string;
    const workspaces = await workspacesService.getWorkspacesForUser(userId);
    return c.json(workspaces);
});

/**
 * POST /
 * Create a new workspace.
 */
app.post("/", async (c) => {
    const userId = c.get("userId") as string;
    const body = await c.req.json<{ name: string; defaultPolicyTier?: any }>();

    if (!body.name) {
        return c.json({ error: "Workspace name is required" }, 400);
    }

    try {
        const workspace = await workspacesService.createWorkspace({
            name: body.name,
            userId: userId,
            defaultPolicyTier: body.defaultPolicyTier,
        });
        return c.json(workspace, 201);
    } catch (err) {
        console.error("Failed to create workspace:", err);
        return c.json({ error: "Failed to create workspace" }, 500);
    }
});

/**
 * GET /current
 * Legacy/Convenience endpoint for the Dashboard.
 * Returns metadata (not tokens) for the active workspace.
 * Falls back to the first available workspace if no ID provided.
 */
app.get("/current", async (c) => {
    const userId = c.get("userId") as string;
    const workspaceId = c.req.query("workspaceId");

    const allWorkspaces = await workspacesService.getWorkspacesForUser(userId);

    let workspace;

    if (workspaceId) {
        workspace = allWorkspaces.find((w) => w.id === workspaceId);
    } else {
        // Default to the first one found
        workspace = allWorkspaces[0];
    }

    if (!workspace) {
        return c.json({ error: "No workspace found" }, 404);
    }

    // Return sanitized status
    return c.json({
        id: workspace.id,
        name: workspace.name,
        hasSlack: !!(workspace.slackTeamId || workspace.slackAccessToken),
        hasGithub: !!(workspace.githubOrg || workspace.githubInstallationId),
        hasJira: !!(workspace.jiraSite || workspace.jiraAccessToken),
        defaultPolicyTier: workspace.defaultPolicyTier,
    });
});

export default app;
