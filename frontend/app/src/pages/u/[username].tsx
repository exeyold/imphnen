import { iamFetcher } from "@packages/utils/iam";
import type { LoaderFunctionArgs, MetaArgs } from "react-router";
import { useLoaderData } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { data, error } = await iamFetcher.GET("/check/{username}", {
      params: { path: { username: String(params.username) } },
    });

    if (error) return { name: "Unknown User" };

    return { name: data.name };
  } catch {
    return { name: "Unknown User" };
  }
}

export function meta({ data }: MetaArgs<typeof loader>) {
  return [{ title: data?.name || "Loading..." }];
}

export default function DynamicUserPage() {
  const { name } = useLoaderData<typeof loader>();
  return <div>Hello, {name}!</div>;
}
