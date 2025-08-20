import type { auth } from "@packages/auth";
import { createAuthClient } from "better-auth/client";
import {
  customSessionClient,
  usernameClient,
} from "better-auth/client/plugins";
import { admin, haveIBeenPwned, jwt } from "better-auth/plugins";

export const authClient = createAuthClient({
  basePath: "/",
  baseURL: process.env.NEXT_PUBLIC_IAM_URL,
  plugins: [
    admin(),
    usernameClient(),
    haveIBeenPwned(),
    jwt(),
    customSessionClient<typeof auth>(),
  ],
});
