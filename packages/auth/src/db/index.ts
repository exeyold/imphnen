import { env } from "@packages/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: env.AUTH_DB_URL,
});

export const db = drizzle({ client: pool, logger: !env.isProduction, schema });
