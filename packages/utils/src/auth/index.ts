import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
import { admin, haveIBeenPwned, jwt } from "better-auth/plugins";

export const authClient = createAuthClient({
  basePath: "/",
  baseURL: process.env.NEXT_PUBLIC_IAM_URL,
  plugins: [admin(), usernameClient(), haveIBeenPwned(), jwt()],
});
