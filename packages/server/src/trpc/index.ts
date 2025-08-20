import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superJSON from "superjson";
import {
  deleteCookie,
  parseCookies,
  setCookie,
  type SerializeOptions,
} from "../cookies";

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

const t = initTRPC.context<ReturnType<typeof createTRPCContext>>().create({
  transformer: superJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;
