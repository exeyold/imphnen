import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSession } from "~/features/auth/http/fetch-session";

export const getSessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => await fetchSession(),
});

export function useGetSession() {
  return useQuery(getSessionQueryOptions);
}
