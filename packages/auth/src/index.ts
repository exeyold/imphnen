import { env } from "@packages/env";
import {
  getInternalServerErrorResponse,
  getNotFoundResponse,
} from "@packages/server/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, haveIBeenPwned, jwt, username } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_WEB_URL,

  trustedOrigins: [env.NEXT_PUBLIC_WEB_URL],

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  plugins: [
    admin(),
    username(),
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
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_IAM_URL}/callback/google`,
    },
  },

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: getDomain(),
    },
    cookies: {
      session_token: {
        name: "_imphnen_token_",
      },
    },
  },
});

export async function forwardToAuth(request: Request): Promise<Response> {
  const url = new URL(request.url);
  url.pathname = `/api/auth${url.pathname}`;

  // Preserve method, headers, body, etc.
  const proxyReq = new Request(url.toString(), request);
  const response = await auth.handler(proxyReq);

  if (response.status === 404) {
    return new Response(
      JSON.stringify(
        getNotFoundResponse({
          method: request.method,
          path: request.url,
        })
      ),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (response.status >= 500) {
    return new Response(
      JSON.stringify(
        getInternalServerErrorResponse({
          method: request.method,
          path: request.url,
        })
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return response;
}

function getDomain(): string {
  const { isDevelopment, NEXT_PUBLIC_WEB_URL } = env;

  if (isDevelopment) return "localhost";

  try {
    return new URL(NEXT_PUBLIC_WEB_URL).hostname;
  } catch {
    throw new Error(`Invalid URL passed to getDomain: ${NEXT_PUBLIC_WEB_URL}`);
  }
}
