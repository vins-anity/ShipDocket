/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts",
        include: ["src/**/*.test.{ts,tsx}"],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
