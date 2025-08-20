import { env } from "@packages/env";
import { startLog } from "@packages/server/utils";
import { app } from "..";

Bun.serve({ port: env.IAM_PORT, fetch: app.fetch });

startLog();
