import { cleanEnv, num, str } from "envalid";

import "dotenv/config";

export const env = cleanEnv(process.env, {
  AUTH_DB_URL: str(),
  AUTH_SECRET: str(),
  AUTH_API_KEY: str(),

  TURNSTILE_SECRET_KEY: str(),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  NEXT_PUBLIC_IAM_URL: str(),
  NEXT_PUBLIC_RPC_URL: str(),
  NEXT_PUBLIC_WEB_URL: str(),

  IAM_PORT: num(),
  RPC_PORT: num(),
  WEB_PORT: num(),
});
