import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono/tiny";
import {
  forwardToAuth,
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

  .all("/*", (c) => forwardToAuth(c.req.raw))

  .notFound((c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;

    return c.json(getNotFoundResponse({ method, path }), 404);
  });
