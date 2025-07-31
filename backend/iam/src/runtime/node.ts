import { serve } from "@hono/node-server";
import { app } from "..";
import { getAPIConfigs, startLog } from "../helper";

serve({
  port: getAPIConfigs().PORT,
  fetch: app.fetch,
});

startLog();
