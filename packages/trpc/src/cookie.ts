import cookie, { type ParseOptions, type SerializeOptions } from "cookie";

/**
 * Parse all cookies from the incoming Request headers into an object.
 * @param req - The Fetch Request object
 * @param options - Optional parsing options
 * @returns Record<string, string> of cookie names and values
 */
export function parseCookies(req: Request, options: ParseOptions = {}) {
  const header = req.headers.get("cookie");
  return header ? cookie.parse(header, options) : {};
}

/**
 * Get a single cookie value by name from the Request.
 * @param req - The Fetch Request object
 * @param name - Name of the cookie to retrieve
 * @returns The cookie value, or undefined if not present
 */
export function getCookie(
  req: Request,
  name: string,
  options: ParseOptions = {}
) {
  const all = parseCookies(req, options);
  return all[name];
}

/**
 * Set a cookie on the outgoing response headers.
 * @param resHeaders - The response Headers collection
 * @param name - Name of the cookie
 * @param value - Value of the cookie
 * @param options - Serialization options (e.g., maxAge, path, httpOnly)
 */
export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options: SerializeOptions = {}
) {
  const serialized = cookie.serialize(name, value, options);
  resHeaders.append("Set-Cookie", serialized);
}

/**
 * Delete a cookie by setting it with Max-Age=0 and an optional path.
 * @param resHeaders - The response Headers collection
 * @param name - Name of the cookie to remove
 * @param options - Additional options (e.g., path) to match when deleting
 */
export function deleteCookie(
  resHeaders: Headers,
  name: string,
  options: SerializeOptions = {}
) {
  // To delete, set Max-Age=0
  setCookie(resHeaders, name, "", { maxAge: 0, ...options });
}
