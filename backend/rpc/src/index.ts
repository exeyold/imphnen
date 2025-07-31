import { Hono } from "hono/tiny";
import {
  forwardToRPC,
  getDefaultResponse,
  getNotFoundResponse,
} from "./helper";

export const app = new Hono({ strict: true })

  .get("/", (c) => {
    return c.json(getDefaultResponse());
  })

  .all("/*", async (c) => {
    return await forwardToRPC(c.req.raw);
  })

  .notFound((c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;

    return c.json(getNotFoundResponse({ method, path }), 404);
  });
