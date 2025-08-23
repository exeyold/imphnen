"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATIONS } from "~/constants/navigations";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full z-20 bg-background/70 border-t md:hidden">
      <div className="max-w-7xl mx-auto flex justify-around h-14 items-center px-4">
        {NAVIGATIONS.map((nav) => (
          <MobileBottomNavItem
            key={nav.link}
            link={nav.link}
            icon={nav.icon}
            activeIcon={nav.activeIcon}
            active={pathname === nav.link}
          />
        ))}
      </div>
    </div>
  );
}

function MobileBottomNavItem({
  link,
  icon,
  activeIcon,
  active,
}: {
  link: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link href={link} className="flex items-center justify-center">
      {active ? activeIcon : icon}
    </Link>
  );
}
