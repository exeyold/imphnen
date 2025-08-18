import { iamFetcher } from "@packages/utils/iam";

export async function getSession(request: Request) {
  const { data } = await iamFetcher.GET("/get-session", {
    headers: request.headers,
  });

  return data;
}
