import { iamFetcher } from "@packages/utils/iam";

export async function getSession(request: Request) {
  const cookie = request.headers.get("cookie") || "";

  const headers = { cookie };

  const { data } = await iamFetcher.GET("/get-session", { headers });

  return data;
}
