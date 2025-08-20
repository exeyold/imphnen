import * as cookie from "cookie";
import { type ParseOptions, type SerializeOptions } from "cookie";

export function parseCookies(req: Request, options: ParseOptions = {}) {
  const header = req.headers.get("cookie");
  return header ? cookie.parse(header, options) : {};
}

export function getCookie(
  req: Request,
  name: string,
  options: ParseOptions = {}
) {
  const all = parseCookies(req, options);
  return all[name];
}

export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options: SerializeOptions = {}
) {
  const serialized = cookie.serialize(name, value, options);
  resHeaders.append("Set-Cookie", serialized);
}

export function deleteCookie(
  resHeaders: Headers,
  name: string,
  options: SerializeOptions = {}
) {
  setCookie(resHeaders, name, "", { maxAge: 0, ...options });
}

export type { ParseOptions, SerializeOptions };
