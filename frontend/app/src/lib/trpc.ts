import type { TrpcRouter } from "@packages/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

export function createTrpcClient(headers?: HeadersInit) {
  return createTRPCClient<TrpcRouter>({
    links: [
      httpBatchLink({
        url: process.env.RPC_URL!,
        transformer: SuperJSON,
        headers: (_opts) => {
          if (!headers) return {};
          return headers instanceof Headers
            ? Object.fromEntries(headers.entries())
            : headers;
        },
      }),
    ],
  });
}
