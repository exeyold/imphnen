import { serve } from "@hono/node-server";
import { Hono } from "hono/tiny";
import {
  CONSTANT,
  getDefaultResponse,
  getNotFoundResponse,
  startLog,
  TRPCAdapter,
} from "../configs";

export const app = new Hono({ strict: true });

app.get("/", (c) => {
  return c.json(getDefaultResponse());
});

app.get("/procedure", (c) => {
  const method = c.req.raw?.method ?? c.req.method;
  const path = c.req.url;
  return c.json(getNotFoundResponse({ method, path }), 404);
});

app.all("/procedure/*", async (c) => {
  return await TRPCAdapter(c.req.raw);
});

app.notFound((c) => {
  const method = c.req.raw?.method ?? c.req.method;
  const path = c.req.url;

  return c.json({ error: "Endpoint not found", method, path }, 404);
});

serve({
  port: CONSTANT.PORT,
  fetch: app.fetch,
});

startLog();
