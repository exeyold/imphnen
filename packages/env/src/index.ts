import { cleanEnv, str } from "envalid";

import "dotenv/config";

export const env = cleanEnv(process.env, {
  AUTH_DB_URL: str(),
  AUTH_SECRET: str(),
  TURNSTILE_SECRET_KEY: str(),

  IAM_URL: str(),
  RPC_URL: str(),
});
