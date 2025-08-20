import { serve } from "@hono/node-server";
import { env } from "@packages/env";
import { app } from "..";
import { startLog } from "../helper";

serve({ port: env.IAM_PORT, fetch: app.fetch });

startLog();
