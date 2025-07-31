import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  haveIBeenPwned,
  jwt,
  openAPI,
  username,
} from "better-auth/plugins";
import "dotenv/config";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  plugins: [
    admin(),
    username(),
    jwt(),
    haveIBeenPwned(),
    openAPI({
      disableDefaultReference: true,
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.AUTH_URL!,
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    cookies: {
      session_token: {
        name: "_imphnen_token_",
      },
    },
  },
});
