import type { Context, Next } from "hono";
import { vi } from "vitest";

// Mock globals if needed
// biome-ignore lint/suspicious/noExplicitAny: mock
global.fetch = vi.fn() as any;

// Set dummy env vars for tests to prevent crashes if missing in CI
process.env.SUPABASE_URL = process.env.SUPABASE_URL || "https://mock.supabase.co";
process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "mock-key";
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock";
process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

// Mock Supabase Auth Middleware to bypass auth checks in tests
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
