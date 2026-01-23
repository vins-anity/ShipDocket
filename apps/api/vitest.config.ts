import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        setupFiles: ["./vitest.setup.ts"],
        exclude: ["**/node_modules/**", "**/dist/**"],
        include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    },
});
