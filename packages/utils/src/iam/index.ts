import createClient from "openapi-fetch";
import type { paths } from "../openapi/types.gen";

export const iamFetcher = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_IAM_URL,
  credentials: "include",
});
