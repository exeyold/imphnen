import { env } from "@packages/env";
import { cors } from "hono/cors";
import { Hono } from "hono/tiny";
import { forwardToRPC, getNotFoundResponse } from "./helper";

export const app = new Hono({ strict: true })
  .use(cors({ origin: [env.NEXT_PUBLIC_WEB_URL], credentials: true }))

  .get("/", (c) => {
    return c.redirect(env.NEXT_PUBLIC_WEB_URL);
  })

  .all("/*", async (c) => {
    return await forwardToRPC(c.req.raw);
  })

  .notFound((c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;

    return c.json(getNotFoundResponse({ method, path }), 404);
  });
