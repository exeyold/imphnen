import { app } from "..";
import { getAPIConfigs, startLog } from "../helper";

Bun.serve({
  port: getAPIConfigs().PORT,
  fetch: app.fetch,
});

startLog();
