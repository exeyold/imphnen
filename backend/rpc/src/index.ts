import { env } from "@packages/env";
import {
  getInternalServerErrorResponse,
  getNotFoundResponse,
} from "@packages/server/utils";
import { forwardToRPC } from "@packages/trpc";
import { cors } from "hono/cors";
import { Hono } from "hono/tiny";

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
  })

  .onError((_, c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;

    return c.json(getInternalServerErrorResponse({ method, path }), 500);
  });
