import { serve } from "@hono/node-server";
import { env } from "@packages/env";
import { startLog } from "@packages/server/utils";
import { app } from "..";

serve({ port: env.IAM_PORT, fetch: app.fetch });

startLog();
