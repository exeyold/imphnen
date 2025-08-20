import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.NEXT_PUBLIC_IAM_URL}/jwks`)
);

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
      issuer: process.env.NEXT_PUBLIC_IAM_URL,
      audience: process.env.NEXT_PUBLIC_IAM_URL,
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
}
