import { auth } from "@packages/auth";
import { Scalar } from "@scalar/hono-api-reference";
import { proxy } from "hono/proxy";
import { Hono } from "hono/tiny";
import {
  getDefaultResponse,
  getNotFoundResponse,
  getOpenAPISchema,
} from "./helper";

export const app = new Hono({ strict: true })

  .get("/", (c) => {
    return c.json(getDefaultResponse());
  })

  .get("/docs/json", async (c) => {
    const schema = await getOpenAPISchema();
    return c.json(schema);
  })

  .get("/docs", Scalar({ url: "/docs/json" }))

  .on(["GET", "POST"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })

  .on(["GET", "POST"], "/:rest{.*}", async (c) => {
    const route = c.req.param("rest");
    const target = new URL(`/api/auth/${route}`, c.req.url);
    return proxy(target, c.req);
  })

  .notFound((c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;
    return c.json(getNotFoundResponse({ method, path }), 404);
  });
