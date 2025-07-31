import { env } from "@packages/env";
import { trpcRouter } from "@packages/trpc";
import { createTRPCContext } from "@packages/utils/trpc";
import type { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import packageJSON from "../package.json";

export async function RPCAdapter(request: Request) {
  return await fetchRequestHandler({
    endpoint: "/procedure",
    router: trpcRouter,
    req: request,
    createContext: createTRPCContext,
    onError: ({ error }) => {
      logTRPCError(error);
    },
  });
}

export function getAPIConfigs() {
  return {
    API_NAME: "IMPHNEN API",
    API_VERSION: packageJSON.version,
    PORT: env.RPC_PORT,
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

export function startLog() {
  console.log(
    `RPC Server is running on (${detectRuntime()}): http://localhost:${getAPIConfigs().PORT}`
  );
}

function logTRPCError(error: TRPCError, path?: string) {
  const info = path ? `[path: ${path}] ` : "";
  console.error(`❌ TRPC ERROR [${error.code}] ${info}${error.message}`);
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
