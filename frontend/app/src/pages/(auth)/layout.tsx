import { href, Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { getSession } from "~/loaders/get-session";

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await getSession(request);
  if (data) throw redirect(href("/home"));
}

export function shouldRevalidate() {
  return false;
}

export default function AuthLayout() {
  return <Outlet />;
}
