import { env } from "@packages/env";
import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import type { OpenAPISchema } from "../types";

const cache = new Map<string, { data: any; expires: number }>();
const TTL = 10 * 1000; // 10 seconds in ms

export const usernameExtendedSearch = (): BetterAuthPlugin => {
  return {
    id: "username",

    endpoints: {
      getUserByUsername: createAuthEndpoint(
        "/check/:username",
        { method: "GET" },
        async (ctx) => {
          const apiKey = ctx.headers?.get("x-api-key");

          if (!apiKey) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
              status: 401,
            });
          }

          if (apiKey !== env.AUTH_API_KEY) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), {
              status: 401,
            });
          }

          const { username } = ctx.params;
          const now = Date.now();

          // Check cache
          const cached = cache.get(username);
          if (cached && cached.expires > now) {
            return ctx.json(cached.data);
          }

          // Query database
          const [user] = await db
            .select({
              username: users.username,
              name: users.name,
            })
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

          if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
              status: 404,
            });
          }

          // Store in cache
          cache.set(username, { data: user, expires: now + TTL });

          return ctx.json(user);
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};

export function injectUserSearchPluginOpenAPISpec(schema: OpenAPISchema) {
  // Ensure the /check/{username} GET endpoint exists
  schema.paths["/check/{username}"] = schema.paths["/check/{username}"] || {};
  schema.paths["/check/{username}"].get =
    schema.paths["/check/{username}"].get || {};

  // Merge or add the 200 response
  schema.paths["/check/{username}"].get.responses = {
    ...(schema.paths["/check/{username}"].get.responses || {}),
    200: {
      description: "User found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string" },
              name: { type: "string" },
            },
            required: ["username", "name"],
          },
        },
      },
    },
  };

  // Ensure the username path parameter exists and is required
  schema.paths["/check/{username}"].get.parameters = [
    {
      name: "username",
      in: "path",
      required: true, // explicitly required
      schema: { type: "string" },
    },
    {
      name: "x-api-key",
      in: "header",
      required: true, // header is required
      schema: { type: "string" },
      description: "API key for authentication",
    },
  ];

  // Add description and tag if missing
  schema.paths["/check/{username}"].get.description =
    schema.paths["/check/{username}"].get.description ||
    "Fetch a user by their username, cached for 10s";
  schema.paths["/check/{username}"].get.tags = schema.paths["/check/{username}"]
    .get.tags || ["Username"];
}
