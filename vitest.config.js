import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/vitest.setup.js",
    coverage: {
        provider: "v8", // usa el motor de cobertura integrado
        reporter: ["text", "html"], // genera salida en consola y carpeta html
      },
  },
});