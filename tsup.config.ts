import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  shims: true,
  external: ["@stacks/*"],
});
