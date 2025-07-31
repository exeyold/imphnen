import { env } from "@packages/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migration",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.AUTH_DB_URL,
  },
});
