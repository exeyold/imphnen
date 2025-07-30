import cookie, { type SerializeOptions } from "cookie";

export function parseCookies(req: Request) {
  const header = req.headers.get("cookie");
  return header ? cookie.parse(header) : {};
}

export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options: SerializeOptions = {}
) {
  resHeaders.append("Set-Cookie", cookie.serialize(name, value, options));
}
