import type { auth } from ".";

export type OpenAPISchema = Awaited<
  ReturnType<typeof auth.api.generateOpenAPISchema>
>;
