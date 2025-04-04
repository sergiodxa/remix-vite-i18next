import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  future: {
    unstable_middleware: false,
    unstable_optimizeDeps: false,
    unstable_splitRouteModules: false,
    unstable_viteEnvironmentApi: false,
  },
} satisfies Config;
