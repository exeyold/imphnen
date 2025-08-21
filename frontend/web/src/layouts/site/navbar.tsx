"use client";

import { authClient } from "@packages/client/auth";
import { cn } from "@packages/client/tailwind";
import { Button } from "@packages/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
import { NAVIGATIONS } from "~/constants/navigations";
import { useGetSession } from "~/features/auth/hooks/use-get-session";
import { LogoSimple } from "../logo";
import { ThemeSlider } from "../theme-slider";

export function Navbar() {
  const { data: session, isLoading } = useGetSession();
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileProfileOpen(false);
      }
    };
    if (mobileProfileOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileProfileOpen]);

  const SkeletonAvatar = () => (
    <div className="w-10 h-10 rounded-2xl bg-gray-300 animate-pulse" />
  );

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 w-full z-50 bg-background/70 border-b hidden md:block">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
          {/* Group Logo + Navigation */}
          <div className="flex items-center gap-6">
            <LogoLink />
            <DesktopNav />
          </div>

          {/* Right side buttons */}
          {isLoading ? (
            <SkeletonAvatar />
          ) : session ? (
            <DesktopButtons />
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => router.push("/signin")}>
                Signin
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
              <ThemeSlider />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-background/70 border-b md:hidden">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <LogoLink />
          <div ref={mobileMenuRef} className="flex items-center gap-2 relative">
            {isLoading ? (
              <SkeletonAvatar />
            ) : session ? (
              <>
                <ThemeSlider />
                <button
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                >
                  <Image
                    src={session.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-2xl"
                    unoptimized
                  />
                </button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={() => router.push("/signin")}>
                  Signin
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push("/signup")}
                >
                  Signup
                </Button>
                <ThemeSlider />
              </>
            )}

            {/* Mobile Profile Popup */}
            {mobileProfileOpen && session && (
              <div className="absolute top-14 right-0 w-48 bg-background/20 border shadow-lg rounded-xl py-2 px-2 z-50">
                <button
                  onClick={() => {
                    router.push(
                      session.username ? `/u/${session.username}` : "/setup"
                    );
                    setMobileProfileOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-primary hover:text-background w-full text-left"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => {
                    router.push("/apps/home");
                    setMobileProfileOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-primary hover:text-background w-full text-left"
                >
                  Apps
                </button>
                <button
                  onClick={async () =>
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: async () => {
                          router.push("/");
                          await queryClient.invalidateQueries();
                        },
                      },
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-primary hover:text-background w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 w-full z-50 bg-background/70 border-t-2 md:hidden">
        <div className="max-w-7xl mx-auto flex justify-around h-16 items-center px-4">
          {NAVIGATIONS.map((nav) => (
            <MobileBottomNavItem
              key={nav.link}
              icon={nav.icon}
              label={nav.title}
              onClick={() => router.push(nav.link)}
              active={pathname === nav.link}
            />
          ))}
        </div>
      </div>
    </>
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
            "text-base font-medium relative group px-1 py-2",
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

function DesktopButtons() {
  const { data: session, isLoading } = useGetSession();
  const queryClient = useQueryClient();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (isLoading) {
    return (
      <div className="hidden md:flex items-center gap-x-3 animate-pulse">
        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="hidden md:flex items-center gap-x-2.5 relative"
    >
      <ThemeSlider />
      {session ? (
        <button className="cursor-pointer" onClick={() => setOpen(!open)}>
          <Image
            src={session.image || "/default-avatar.png"}
            alt="Profile picture"
            width={44}
            height={44}
            className="rounded-2xl ring-2 ring-transparent group-hover:ring-primary transition-all duration-200 shadow-sm"
            unoptimized
          />
        </button>
      ) : (
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/signin")}
          >
            Signin
          </Button>
          <Button size="lg" onClick={() => router.push("/signup")}>
            Signup
          </Button>
        </>
      )}

      {/* Desktop Popup */}
      {open && session && (
        <div className="absolute top-14 right-0 w-64 bg-background/20 border shadow-lg rounded-xl py-3 px-2 z-50">
          <button
            onClick={() => {
              router.push(
                session.username ? `/u/${session.username}` : "/setup"
              );
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              router.push("/apps/home");
              setOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
          >
            Apps
          </button>
          <button
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: async () => {
                    router.push("/");
                    await queryClient.invalidateQueries();
                  },
                },
              })
            }
            className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function MobileBottomNavItem({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center text-foreground/80 text-sm",
        active && "text-primary"
      )}
    >
      {icon}
      <span className="mt-1 text-[10px]">{label}</span>
    </button>
  );
}
