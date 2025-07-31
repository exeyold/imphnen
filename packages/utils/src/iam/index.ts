import createClient from "openapi-fetch";
import type { paths } from "./types.gen";

export const iamFetcher = createClient<paths>({
  baseUrl: process.env.IAM_URL,
  credentials: "include",
});
