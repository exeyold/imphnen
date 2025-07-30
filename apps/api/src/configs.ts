import { createTRPCContext, trpcRouter } from "@packages/trpc";
import type { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import packageJSON from "../package.json";

export const CONSTANT = {
  API_NAME: "IMPHNEN API",
  API_VERSION: packageJSON.version,
  PORT: 9000,
};

export async function TRPCAdapter(request: Request) {
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

export function getDefaultResponse() {
  return {
    name: CONSTANT.API_NAME,
    version: CONSTANT.API_VERSION,
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
    `Server is running on (${detectRuntime()}): http://localhost:${CONSTANT.PORT}`
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
