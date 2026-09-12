import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { basename, resolve } from "path";
import dts from "vite-plugin-dts";

// Derived from the directory rather than hand-listed: the manual list silently
// drifted and omitted status, call and system, so those had no deep-import path.
const moduleEntries = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, "src/modules"))
    .filter((file) => file.endsWith(".ts"))
    .map((file) => [
      `modules/${basename(file, ".ts")}`,
      resolve(import.meta.dirname, "src/modules", file),
    ])
);

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      outDirs: "dist",
      copyDtsFiles: false,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, "src/index.ts"),
        client: resolve(import.meta.dirname, "src/client.ts"),
        "wuzapi-client": resolve(import.meta.dirname, "src/wuzapi-client.ts"),
        ...moduleEntries,
        "types/index": resolve(import.meta.dirname, "src/types/index.ts"),
      },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["axios"],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        exports: "named",
      },
    },
    sourcemap: true,
    minify: false,
  },
});
