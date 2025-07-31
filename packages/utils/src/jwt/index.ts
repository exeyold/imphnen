import { createRemoteJWKSet, jwtVerify } from "jose";

const AUTH_URL = String(process.env.AUTH_URL);

const JWKS = createRemoteJWKSet(new URL(`${AUTH_URL}/api/auth/jwks`));

export async function validateToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: AUTH_URL,
      audience: AUTH_URL,
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
}

interface TokenResponse {
  token: string;
}

export async function getJWT(token: string) {
  const res = await fetch("http://localhost:9000/token", {
    headers: {
      Cookie: `_imphnen_token_=${token}`,
    },
  });
  const json = (await res.json()) as TokenResponse;
  return json.token;
}
