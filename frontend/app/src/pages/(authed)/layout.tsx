import {
  href,
  Outlet,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { getSession } from "~/loaders/get-session";
import { refreshToken } from "~/loaders/refresh-token";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const token = await refreshToken(request);
    const data = await getSession(request);
    if (!data) throw redirect(href("/signin"));
    return { data, token };
  } catch {
    throw redirect(href("/signin"));
  }
}

export function shouldRevalidate() {
  return false;
}

export default function AuthedLayout() {
  const { data, token } = useLoaderData<typeof loader>();
  return <Outlet context={{ data, token }} />;
}
