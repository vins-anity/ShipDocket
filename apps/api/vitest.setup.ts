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

// Mock Database to prevent connection attempts in tests
vi.mock("./src/db", async (importActual) => {
    const actual = await importActual<typeof import("./src/db")>();

    // Shared state for the mock database to allow insert -> select to work
    const dbState: Record<string, any[]> = {};

    // Helper to get table name from Drizzle table object
    const getTableName = (table: any): string => {
        if (!table) return "generic";
        // Drizzle stores table name in a few possible places depending on version
        return table.name || table[Symbol.for('drizzle:Name')] || (typeof table === 'string' ? table : "generic");
    };

    // Helper to inject standard defaults if missing
    const withDefaults = (item: any) => {
        if (!item || typeof item !== "object" || Array.isArray(item)) return item;
        return {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true, // Default shared across many tables
            isDefault: false,
            ...item,
        };
    };

    /**
     * Create a chainable mock that is also a Thenable (resolves to data or [])
     */
    const createMockChain = (tableName?: string, queryData?: any, isAggregation = false) => {
        const chain: any = {
            select: vi.fn((fields) => {
                // Peek at fields to see if this is an aggregation (like { count: sql... })
                const hasAggregation = fields && typeof fields === "object" && "count" in fields;
                return createMockChain(tableName, queryData, hasAggregation);
            }),
            selectDistinct: vi.fn(() => chain),
            insert: vi.fn((table: any) => {
                return createMockChain(getTableName(table));
            }),
            update: vi.fn((table: any) => {
                return createMockChain(getTableName(table));
            }),
            delete: vi.fn((table: any) => {
                return createMockChain(getTableName(table));
            }),
            from: vi.fn((table: any) => {
                const name = getTableName(table);
                // If we have data for this table in state, use it as default queryData
                const data = dbState[name] || [];
                return createMockChain(name, data);
            }),
            values: vi.fn((vals) => {
                const results = Array.isArray(vals) ? vals.map(withDefaults) : [withDefaults(vals)];
                if (tableName && tableName !== "generic") {
                    dbState[tableName] = [...(dbState[tableName] || []), ...results];
                }
                return createMockChain(tableName, results);
            }),
            set: vi.fn((vals) => {
                // For updates, we just return the values for now
                const results = Array.isArray(vals) ? vals.map(withDefaults) : [withDefaults(vals)];
                return createMockChain(tableName, results);
            }),
            where: vi.fn((condition) => {
                // Basic filtering for where(eq(id, proofId))
                // Drizzle conditions: eq(col, val) => { left: col, right: val, operator: 'uuid' or '=' }
                if (queryData && Array.isArray(queryData)) {
                    // Try to find the value being compared
                    const targetValue = condition?.right ?? condition?.value;
                    if (targetValue !== undefined) {
                        const filtered = queryData.filter(item =>
                            item.id === targetValue ||
                            item.workspaceId === targetValue ||
                            item.taskId === targetValue
                        );
                        return createMockChain(tableName, filtered);
                    }
                    // If we can't parse the condition, return an empty chain to signal "found nothing"
                    // IF it's likely a specific lookup (where has a condition)
                    return createMockChain(tableName, []);
                }
                return chain;
            }),
            limit: vi.fn((n) => {
                if (queryData && Array.isArray(queryData)) {
                    return createMockChain(tableName, queryData.slice(0, n));
                }
                return chain;
            }),
            offset: vi.fn(() => chain),
            orderBy: vi.fn(() => chain),
            returning: vi.fn(() => chain),
            innerJoin: vi.fn(() => chain),
            leftJoin: vi.fn(() => chain),
            execute: vi.fn().mockImplementation(() => {
                if (isAggregation) return Promise.resolve([{ count: queryData ? (Array.isArray(queryData) ? queryData.length : 1) : 0 }]);

                let result = queryData
                    ? (Array.isArray(queryData) ? queryData : [queryData])
                    : [];

                return Promise.resolve(result);
            }),
            // Ensure compatibility with async/await destructuring
            then: (onFulfilled: any) => {
                if (isAggregation) return Promise.resolve([{ count: queryData ? (Array.isArray(queryData) ? queryData.length : 1) : 0 }]).then(onFulfilled);

                let result = queryData
                    ? (Array.isArray(queryData) ? queryData : [queryData])
                    : [];

                return Promise.resolve(result).then(onFulfilled);
            },
        };
        return chain;
    };

    const mockDb = createMockChain();

    // Add db.query mock for relational queries (findFirst, findMany)
    mockDb.query = new Proxy({}, {
        get: (target, table) => {
            return {
                findFirst: vi.fn().mockImplementation(async (options) => {
                    // Return a dummy object with defaults
                    return withDefaults({ id: crypto.randomUUID(), role: "owner" });
                }),
                findMany: vi.fn().mockImplementation(async (options) => {
                    return [withDefaults({ id: crypto.randomUUID() })];
                })
            };
        }
    });

    mockDb.transaction = vi.fn(async (cb) => await cb(createMockChain()));

    return {
        ...actual,
        db: mockDb,
        pgClient: {
            options: {},
            close: vi.fn(),
            end: vi.fn(),
        },
    };
});

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
