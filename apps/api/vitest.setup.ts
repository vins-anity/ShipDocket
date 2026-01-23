import type { Context, Next } from "hono";
import { vi } from "vitest";

// Mock globals if needed
// biome-ignore lint/suspicious/noExplicitAny: mock
global.fetch = vi.fn() as any;

// Mock Supabase Auth Middleware to bypass auth checks in tests
// and inject a test user into the context.
vi.mock("./src/middleware/supabase-auth", () => ({
    supabaseAuth: async (c: Context, next: Next) => {
        c.set("user", { id: "00000000-0000-0000-0000-000000000000", email: "test@example.com" });
        c.set("userId", "00000000-0000-0000-0000-000000000000");
        await next();
    },
    optionalAuth: async (c: Context, next: Next) => {
        c.set("user", { id: "00000000-0000-0000-0000-000000000000", email: "test@example.com" });
        c.set("userId", "00000000-0000-0000-0000-000000000000");
        await next();
    },
}));
