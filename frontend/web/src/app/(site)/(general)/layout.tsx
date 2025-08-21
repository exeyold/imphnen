import { SiteLayout } from "~/layouts/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
