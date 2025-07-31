import { env } from "@packages/env";
import { createRemoteJWKSet, jwtVerify } from "jose";

/**
 * Validates a JWT using a remote JWKS endpoint.
 *
 * This function retrieves the JSON Web Key Set (JWKS) from the IAM service
 * and verifies the signature, issuer, and audience of the token.
 *
 * @param {string} token - The JWT to validate.
 * @returns {Promise<Record<string, unknown>>} - A promise that resolves to the decoded token payload if valid.
 * @throws {Error} - Throws an error if the token is invalid or verification fails.
 */
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

/**
 * Retrieves a new JWT from the token endpoint.
 *
 * Sends a request to the local token service, passing the given token via a cookie.
 *
 * @param {string} token - The token to include in the `_imphnen_token_` cookie for authentication.
 * @returns {Promise<string>} - A promise that resolves to a new JWT string.
 * @throws {Error} - Throws if the fetch operation or JSON parsing fails.
 */
export async function getJWT(token: string) {
  const res = await fetch("http://localhost:9000/token", {
    headers: {
      Cookie: `_imphnen_token_=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch token: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as TokenResponse;
  return json.token;
}
