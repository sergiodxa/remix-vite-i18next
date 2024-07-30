import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { envOnlyMacros } from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [envOnlyMacros(), remix(), tsconfigPaths()],
  server: { port: 3000 },
});
