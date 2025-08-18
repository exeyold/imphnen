import { env } from "@packages/env";
import { auth } from ".";

export async function getBasicOpenAPISchema() {
  const schema = await auth.api.generateOpenAPISchema();

  // Update API info
  schema.info.title = "IMPHNEN IAM Docs";
  schema.info.description = "API Reference for IMPHNEN IAM";

  // Update servers
  schema.servers = [
    {
      url: env.NEXT_PUBLIC_IAM_URL,
    },
  ];

  // Update tags
  schema.tags = [
    {
      name: "Authentication",
      description: "Endpoints for user authentication operations.",
    },
    {
      name: "Admin",
      description: "Admin specific operations.",
    },
    {
      name: "Username",
      description: "Username related operations.",
    },
    {
      name: "Jwt",
      description: "JWT handling and verification operations.",
    },
  ];

  // Fix tags for existing methods
  for (const path of Object.values(schema.paths)) {
    for (const method of Object.values(path)) {
      if (method.tags) {
        method.tags = method.tags.map((tag: string) =>
          tag === "Default" ? "Authentication" : tag
        );
      }
    }
  }

  return schema;
}
