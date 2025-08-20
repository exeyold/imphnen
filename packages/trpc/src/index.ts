import { createTRPCContext } from "@packages/server/trpc";
import type { TRPCError } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcRouter } from "./root";

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

function logTRPCError(error: TRPCError, path?: string) {
  const info = path ? `[path: ${path}] ` : "";
  console.error(`❌ TRPC ERROR [${error.code}] ${info}${error.message}`);
}

export type TrpcRouter = typeof trpcRouter;
