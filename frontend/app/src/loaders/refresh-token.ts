import { iamFetcher } from "@packages/utils/iam";

export async function refreshToken(request: Request) {
  const { data } = await iamFetcher.GET("/token", {
    headers: request.headers,
  });

  return String(data?.token);
}
