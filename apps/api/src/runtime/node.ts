import { serve } from "@hono/node-server";
import { Hono } from "hono/tiny";
import {
  getAPIConfigs,
  getDefaultResponse,
  getNotFoundResponse,
  startLog,
  TRPCAdapter,
} from "../helper";

export const app = new Hono({ strict: true })

  .get("/", (c) => {
    return c.json(getDefaultResponse());
  })

  .get("/procedure", (c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;
    return c.json(getNotFoundResponse({ method, path }), 404);
  })

  .all("/procedure/*", async (c) => {
    return await TRPCAdapter(c.req.raw);
  })

  .notFound((c) => {
    const method = c.req.raw?.method ?? c.req.method;
    const path = c.req.url;

    return c.json({ error: "Endpoint not found", method, path }, 404);
  });

serve({
  port: getAPIConfigs().PORT,
  fetch: app.fetch,
});

startLog();
