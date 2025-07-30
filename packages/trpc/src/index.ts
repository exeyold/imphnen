import type { SerializeOptions } from "@packages/utils/cookies";
import { deleteCookie, parseCookies, setCookie } from "@packages/utils/cookies";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { publicProcedure, router } from "./trpc";

export const trpcRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export function createTRPCContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const cookies = parseCookies(req);

  const cookie = {
    getAll: () => cookies,
    get: (name: string) => cookies[name],
    set: (name: string, value: string, options: SerializeOptions = {}) =>
      setCookie(resHeaders, name, value, options),
    delete: (name: string, options: SerializeOptions = {}) =>
      deleteCookie(resHeaders, name, options),
  };

  return { req, resHeaders, cookie };
}

export type TrpcRouter = typeof trpcRouter;
export type TRPCContext = ReturnType<typeof createTRPCContext>;
