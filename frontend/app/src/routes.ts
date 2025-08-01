import { type RouteConfig } from "@react-router/dev/routes";
import { nextRoutes, pageRouterStyle } from "rr-next-routes/react-router";

const routes = nextRoutes({
  ...pageRouterStyle,
  print: "tree",
  layoutFileName: "layout",
});

export default routes satisfies RouteConfig;
