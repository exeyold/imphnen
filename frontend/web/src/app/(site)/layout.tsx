import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { getSessionQueryOptions } from "~/features/auth/hooks/use-get-session";
import { fetchSession } from "~/features/auth/http/fetch-session";
import { getQueryClient } from "~/lib/query";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawHeaders = await headers();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getSessionQueryOptions.queryKey,
    queryFn: () => fetchSession(rawHeaders),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
