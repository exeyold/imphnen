import { env } from "@packages/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  haveIBeenPwned,
  jwt,
  openAPI,
  username,
} from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  baseURL: env.IAM_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  plugins: [
    admin(),
    username(),
    haveIBeenPwned(),
    openAPI({
      disableDefaultReference: true,
    }),
    jwt({
      jwt: {
        expirationTime: "5m",
        definePayload: ({ user }) => {
          return {
            id: user.id,
            email: user.email,
          };
        },
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },

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
