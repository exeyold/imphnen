import { createRemoteJWKSet, jwtVerify } from "jose";
import { iamFetcher } from "../iam";

const JWKS = createRemoteJWKSet(new URL(`${process.env.IAM_URL}/jwks`));

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
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.IAM_URL,
      audience: process.env.IAM_URL,
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
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
  const { data, error } = await iamFetcher.GET("/token", {
    headers: {
      Cookie: `_imphnen_token_=${token}`,
    },
  });

  if (error) throw error;

  return data.token;
}
