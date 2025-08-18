import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

  const data = await queryClient.fetchQuery({
    queryKey: getSessionQueryOptions.queryKey,
    queryFn: () => fetchSession(rawHeaders),
  });

  if (!data) {
    redirect("/signin");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
