import { auth } from "@packages/auth";
import packageJSON from "../package.json";

export function getAPIConfigs() {
  return {
    API_NAME: "IMPHNEN API",
    API_VERSION: packageJSON.version,
    PORT: 9000,
  };
}

export function getDefaultResponse() {
  return {
    name: getAPIConfigs().API_NAME,
    version: getAPIConfigs().API_VERSION,
  };
}

export function getNotFoundResponse({
  method,
  path,
}: {
  method: string;
  path: string;
}) {
  return { error: "Endpoint not found", method, path };
}

export async function getOpenAPISchema() {
  const schema = await auth.api.generateOpenAPISchema();

  schema.info.title = "IMPHNEN IAM Docs";
  schema.info.description = "API Reference for IMPHNEN IAM";

  schema.servers = [
    {
      url: process.env.AUTH_URL!,
    },
  ];

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

export function startLog() {
  console.log(
    `IAM Server is running on (${detectRuntime()}): http://localhost:${getAPIConfigs().PORT}`
  );
}

function detectRuntime() {
  if (typeof Bun !== "undefined") {
    return "BUN RUNTIME";
  } else if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    return "NODE RUNTIME";
  } else {
    return "UNKNOWN RUNTIME";
  }
}
