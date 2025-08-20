import { SiteLayout } from "~/layouts/site";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
