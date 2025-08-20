import { env } from "@packages/env";
import { startLog } from "@packages/server/utils";
import { app } from "..";

Bun.serve({ port: env.RPC_PORT, fetch: app.fetch });

startLog();
