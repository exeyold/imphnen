import { env } from "@packages/env";
import { trpcRouter } from "@packages/trpc";
import { createTRPCContext } from "@packages/utils/trpc";
import type { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export async function forwardToRPC(request: Request) {
  return await fetchRequestHandler({
    endpoint: "/",
    router: trpcRouter,
    req: request,
    createContext: createTRPCContext,
    onError: ({ error }) => {
      logTRPCError(error);
    },
  });
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
    `RPC Server is running on (${detectRuntime()}): http://localhost:${env.RPC_PORT}`
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
