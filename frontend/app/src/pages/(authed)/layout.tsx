import {
  href,
  Outlet,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { getSession } from "~/loaders/get-session";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const data = await getSession(request);
    if (!data) throw redirect(href("/signin"));
    return { data };
  } catch {
    throw redirect(href("/signin"));
  }
}

export function shouldRevalidate() {
  return false;
}

export default function AuthedLayout() {
  const { data } = useLoaderData<typeof loader>();

  return <Outlet context={{ data }} />;
}
