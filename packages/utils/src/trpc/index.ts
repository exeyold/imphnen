import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import type { SerializeOptions } from "../cookies";
import { deleteCookie, parseCookies, setCookie } from "../cookies";

/**
 * Creates a TRPC context with cookie management functionality.
 * This context can be used to manage HTTP cookies in tRPC procedures.
 *
 * @param {Object} params - The parameters object
 * @param {Request} params.req - The incoming request object
 * @param {Headers} params.resHeaders - The response headers object
 * @returns {Object} Context object containing request, response headers, and cookie management methods
 * @property {Function} cookie.getAll - Returns all cookies as key-value pairs
 * @property {Function} cookie.get - Gets value of a specific cookie by name
 * @property {Function} cookie.set - Sets a cookie with specified name, value and options
 * @property {Function} cookie.delete - Deletes a cookie by name with optional configuration
 */
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

/**
 * The TRPC router factory instance.
 * Used to define and organize tRPC routers.
 */
const t = initTRPC.context<ReturnType<typeof createTRPCContext>>().create({
  transformer: superjson,
});

/**
 * Router creation utility from tRPC.
 * Use this to compose and export tRPC routers.
 */
export const router = t.router;

/**
 * Public procedure definition utility.
 * Use this to define procedures accessible without authentication.
 */
export const publicProcedure = t.procedure;
