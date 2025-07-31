import { env } from "@packages/env";
import { createRemoteJWKSet, jwtVerify } from "jose";

export async function validateToken(token: string) {
  const JWKS = createRemoteJWKSet(new URL(`${env.IAM_URL}/api/auth/jwks`));

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: env.IAM_URL,
      audience: env.IAM_URL,
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
