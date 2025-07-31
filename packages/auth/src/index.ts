import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  captcha,
  haveIBeenPwned,
  jwt,
  username,
} from "better-auth/plugins";
import "dotenv/config";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  plugins: [
    admin(),
    username(),
    jwt(),
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    }),
    haveIBeenPwned(),
  ],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookies: {
      session_token: {
        name: "_imphnen_token_",
      },
    },
  },
});
