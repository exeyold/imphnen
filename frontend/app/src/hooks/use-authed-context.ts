import { useOutletContext } from "react-router";
import type { loader } from "~/pages/(authed)/layout";

export function useAuthedContext() {
  return useOutletContext<Awaited<ReturnType<typeof loader>>>();
}
