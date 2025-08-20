import { env } from "@packages/env";
import { app } from "..";
import { startLog } from "../helper";

Bun.serve({ port: env.RPC_PORT, fetch: app.fetch });

startLog();
