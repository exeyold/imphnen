"use client";

import { Icon } from "@iconify/react";
import { cn } from "@packages/client/tailwind";
import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/avatar";
import { buttonVariants } from "@packages/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATIONS } from "~/constants/navigations";
import { useGetSession } from "~/features/auth/hooks/use-get-session";
import { LogoSimple } from "~/layouts/logo";
import { ThemeSlider } from "~/layouts/theme-slider";
import { UserDropdown } from "./user-dropdown";

export function DesktopHeader() {
  const { data, isLoading } = useGetSession();

  return (
    <header className="sticky top-0 z-50 hidden w-full md:block bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <LogoLink />
          <DesktopNav />
        </div>

        <div className="flex items-center gap-2.5">
          {isLoading ? (
            <div className="size-11 rounded-full border bg-muted animate-pulse" />
          ) : !data ? (
            <>
              <ThemeSlider />

              <Link
                href="/signin"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Signin
              </Link>

              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get Started
              </Link>
            </>
          ) : data.image ? (
            <UserDropdown />
          ) : (
            <Icon
              icon="solar:user-circle-bold"
              className="size-7 text-gray-500 dark:text-gray-400"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileHeader() {
  const { data, isLoading } = useGetSession();

  return (
    <header className="sticky top-0 w-full z-50 bg-background/70 md:hidden border-b">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {isLoading ? (
          <div className="size-8 rounded-full border bg-muted animate-pulse" />
        ) : !data ? (
          <Link href="/signin">
            <Icon
              icon="solar:user-circle-bold"
              className="size-7 text-gray-500 dark:text-gray-400"
            />
          </Link>
        ) : data.image ? (
          <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700">
            <AvatarImage src={data?.image ?? ""} alt={data?.name} />
            <AvatarFallback>
              {data?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Icon
            icon="solar:user-circle-bold"
            className="size-7 text-gray-500 dark:text-gray-400"
          />
        )}

        <LogoLink />

        <Icon
          icon="solar:menu-dots-circle-bold"
          className="size-7 text-gray-500 dark:text-gray-400"
        />
      </div>
    </header>
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
