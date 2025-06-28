/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {};

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
    host: process.env.HOST || "localhost",
  },

  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx",
    ],
    exclude: [
      "node_modules",
      "e2e",
      "tests/e2e",
      "**/playwright.config.*",
      "**/e2e/**",
    ],
  },
});
