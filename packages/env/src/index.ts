import { cleanEnv, num, str } from "envalid";

import "dotenv/config";

export const env = cleanEnv(process.env, {
  AUTH_DB_URL: str(),
  AUTH_SECRET: str(),
  TURNSTILE_SECRET_KEY: str(),

  IAM_URL: str({ devDefault: "http://localhost:9000" }),
  IAM_PORT: num({ default: 9000 }),

  RPC_URL: str({ devDefault: "http://localhost:9001" }),
  RPC_PORT: num({ default: 9001 }),
});
