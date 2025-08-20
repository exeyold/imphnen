import { authClient } from "@packages/utils/auth";

export async function fetchSession(headers?: Headers) {
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers,
    },
  });

  if (error) throw error;

  return data;
}
