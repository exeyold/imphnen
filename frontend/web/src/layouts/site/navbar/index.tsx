import { MobileBottomNav } from "./bottom-nav";
import { DesktopHeader, MobileHeader } from "./header";

export function Navbar() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      <MobileBottomNav />
    </>
  );
}
