"use client";

import { cn } from "@packages/client/tailwind";
import { Button } from "@packages/ui/button";
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
  const { data } = useGetSession();

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

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 w-full z-50 bg-background/70 border-b hidden md:block">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
          <LogoLink />
          <DesktopNav />
          <DesktopButtons />
        </div>
      </header>

      {/* Mobile Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-background/70 border-b md:hidden">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <LogoLink />
          <div ref={mobileMenuRef} className="flex items-center gap-2 relative">
            {data ? (
              <button onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>
                <Image
                  src={data.image || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-2xl"
                  unoptimized
                />
              </button>
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
              </>
            )}

            {/* Mobile Profile Popup */}
            {mobileProfileOpen && data && (
              <div className="absolute top-14 right-0 w-48 bg-background/20 border shadow-lg rounded-xl py-2 px-2 z-50">
                <button
                  onClick={() => {
                    router.push(`/u/${data.username}`);
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
                  onClick={() => setMobileProfileOpen(false)}
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
      <footer className="fixed bottom-0 w-full z-50 bg-background/70 border-t-2 md:hidden">
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
      </footer>
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
          <Button variant="outline" onClick={() => router.push("/signin")}>
            Signin
          </Button>
          <Button onClick={() => router.push("/signup")}>Signup</Button>
        </>
      )}

      {/* Desktop Popup */}
      {open && session && (
        <div className="absolute top-14 right-0 w-64 bg-background/20 border shadow-lg rounded-xl py-3 px-2 z-50">
          <button
            onClick={() => {
              router.push(`u/${session.username}`);
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
            onClick={() => setOpen(false)}
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
