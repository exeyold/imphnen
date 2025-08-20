import { ReactNode } from "react";
import { Navbar } from "./navbar";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
