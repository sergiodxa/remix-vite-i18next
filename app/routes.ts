import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("api/locales", "./routes/api/locales.ts"),
] satisfies RouteConfig;
