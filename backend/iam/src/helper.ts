import { auth } from "@packages/auth";
import { env } from "@packages/env";
import packageJSON from "../package.json";

export function getAPIConfigs() {
  return {
    API_NAME: "IMPHNEN API",
    API_VERSION: packageJSON.version,
    PORT: env.IAM_PORT,
  };
}

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

export function getInternalServerErrorResponse({
  method,
  path,
}: {
  method: string;
  path: string;
}) {
  return {
    error: "Internal server error",
    method,
    path,
  };
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
