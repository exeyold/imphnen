import { iamFetcher } from "@packages/utils/iam";

export async function fetchSession(headers?: Headers) {
  const { data, error } = await iamFetcher.GET("/get-session", {
    headers,
  });

  if (error) throw error;

  return data;
}
