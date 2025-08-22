"use client";

import { IconBarsTwo, IconCirclePerson } from "@intentui/icons";
import { cn } from "@packages/client/tailwind";
import { Button, buttonVariants } from "@packages/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAVIGATIONS } from "~/constants/navigations";
import { useGetSession } from "~/features/auth/hooks/use-get-session";
import { LogoSimple } from "~/layouts/logo";

export function Navbar() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      <MobileBottomNav />
    </>
  );
}

function DesktopHeader() {
  const { data, isLoading } = useGetSession();
  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 z-50 hidden w-full md:block bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <LogoLink />
          <DesktopNav />
        </div>

        <div className="flex items-center gap-6">
          {isLoading ? (
            <div className="size-11 rounded-full border bg-muted animate-pulse" />
          ) : !data ? (
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-6 py-2 text-base"
              )}
            >
              Sign in
            </Link>
          ) : data.image && !imageError ? (
            <Image
              src={data.image}
              alt="User avatar"
              width={44}
              height={44}
              className="size-11 rounded-full object-cover border"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full size-11 flex items-center justify-center"
              )}
            >
              <IconCirclePerson className="size-6" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileHeader() {
  const { data, isLoading } = useGetSession();
  const [imageError, setImageError] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-background/70 md:hidden border-b">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {isLoading ? (
          <div className="size-8 rounded-full border bg-muted animate-pulse" />
        ) : !data ? (
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full"
            )}
          >
            <IconCirclePerson className="size-5" />
          </Link>
        ) : data.image && !imageError ? (
          <Image
            src={data.image}
            alt="User avatar"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full"
            )}
          >
            <IconCirclePerson className="size-5" />
          </div>
        )}

        <LogoLink />

        <Button className="rounded-full" variant="outline" size="icon">
          <IconBarsTwo className="size-4" />
        </Button>
      </div>
    </header>
  );
}

function MobileBottomNav() {
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

function LogoLink() {
  return (
    <Link
      href="/"
      className="relative overflow-hidden rounded z-50"
      aria-label="Home"
    >
      <LogoSimple className="w-24 md:w-28" />
    </Link>
  );
}

function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-2.5">
      {NAVIGATIONS.map(({ link, title }) => (
        <Link
          key={link}
          href={link}
          className={cn(
            "text-lg font-medium relative group px-1 py-2",
            pathname === link ? "text-primary" : "text-foreground/90"
          )}
        >
          <span className="transition-colors hover:text-primary block">
            {title}
          </span>
          {pathname === link && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
          )}
        </Link>
      ))}
    </nav>
  );
}
