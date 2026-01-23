import { and, eq } from "drizzle-orm";
import type { Context, Next } from "hono";
import { db, schema } from "../db";

/**
 * Workspace Access Control Middleware
 *
 * Ensures the authenticated user is a member of the requested workspace.
 * Requires `authMiddleware` or `supabaseAuth` to run first.
 *
 * Usage:
 * app.get("/workspaces/:workspaceId/events", requireWorkspaceAccess(), (c) => ...)
 * app.post("/workspaces/:workspaceId/settings", requireWorkspaceAccess("owner"), (c) => ...)
 */
export function requireWorkspaceAccess(requiredRole: "owner" | "member" = "member") {
    return async (c: Context, next: Next) => {
        // 1. Get User from Context (set by auth middleware)
        const userId = c.get("userId");

        if (!userId) {
            return c.json({ error: "Unauthorized - User not authenticated" }, 401);
        }

        // 2. Identify Workspace ID
        // Priority: Route Param > Query Param > Header
        const workspaceId =
            c.req.param("workspaceId") ||
            c.req.query("workspaceId") ||
            c.req.header("X-Workspace-ID");

        if (!workspaceId) {
            return c.json({ error: "Bad Request - Missing workspaceId identifier" }, 400);
        }

        try {
            // 3. Validation: UUID format check (prevent SQL errors if garbage passed)
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(workspaceId)) {
                return c.json({ error: "Bad Request - Invalid workspaceId format" }, 400);
            }

            // 4. Check Membership in Database
            const member = await db.query.workspaceMembers.findFirst({
                where: and(
                    eq(schema.workspaceMembers.workspaceId, workspaceId),
                    eq(schema.workspaceMembers.userId, userId),
                ),
            });

            if (!member) {
                return c.json(
                    { error: "Forbidden - You do not have access to this workspace" },
                    403,
                );
            }

            // 5. Check Role Requirements
            // If 'owner' is required, the user must be an 'owner'.
            // If 'member' is required, both 'owner' and 'member' are allowed.
            if (requiredRole === "owner" && member.role !== "owner") {
                return c.json({ error: "Forbidden - Workspace Owner privileges required" }, 403);
            }

            // 6. Attach context for downstream handlers
            c.set("workspaceId", workspaceId);
            c.set("workspaceRole", member.role);

            await next();
        } catch (error) {
            console.error("Workspace Guard Error:", error);
            return c.json({ error: "Internal Server Error during access check" }, 500);
        }
    };
}
