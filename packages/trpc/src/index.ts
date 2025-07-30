import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { SerializeOptions } from "cookie";
import { parseCookies, setCookie } from "./cookie";
import { publicProcedure, router } from "./trpc";

export const trpcRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});

export function createTRPCContext(opts: FetchCreateContextFnOptions) {
  const { req, resHeaders } = opts;
  const cookies = parseCookies(req);

  return {
    req,
    resHeaders,
    cookies,
    setCookie: (name: string, value: string, options: SerializeOptions = {}) =>
      setCookie(resHeaders, name, value, options),
  };
}

export type TrpcRouter = typeof trpcRouter;
export type TRPCContext = ReturnType<typeof createTRPCContext>;
