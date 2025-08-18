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
import { getBasicOpenAPISchema } from "./helper";
import {
  injectUserSearchPluginOpenAPISpec,
  usernameExtendedSearch,
} from "./plugins/username-extend-search";

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_IAM_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  plugins: [
    admin(),

    username(),
    usernameExtendedSearch(),

    haveIBeenPwned(),

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

    openAPI({
      disableDefaultReference: true,
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

export async function getOpenAPISchema() {
  const schema = await getBasicOpenAPISchema();

  injectUserSearchPluginOpenAPISpec(schema);

  return schema;
}
