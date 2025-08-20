"use client";

import { cn } from "@packages/client/tailwind";
import { Button } from "@packages/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
import { FaDashcube, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { LuMenu, LuX } from "react-icons/lu";
import { NAVIGATIONS } from "~/constants/navigations";
import { useGetSession } from "~/features/auth/hooks/use-get-session";
import { LogoSimple } from "../logo";
import { ThemeSlider } from "../theme-slider";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 w-full z-50 bg-background/70 border-b">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
        <LogoLink />

        <DesktopNav pathname={pathname} />
        <DesktopButtons router={router} />

        <MobileToggle
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              pathname={pathname}
              setMobileMenuOpen={setMobileMenuOpen}
              router={router}
            />
          )}
        </AnimatePresence>
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

function DesktopNav({ pathname }: { pathname: string }) {
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

function DesktopButtons({ router }: { router: ReturnType<typeof useRouter> }) {
  const { data, isLoading } = useGetSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      {data ? (
        <>
          <ThemeSlider />
          <button className="cursor-pointer" onClick={() => setOpen(!open)}>
            <Image
              src={data.image || "/default-avatar.png"}
              alt="Profile picture"
              width={44}
              height={44}
              unoptimized
              className="rounded-2xl ring-2 ring-transparent group-hover:ring-primary transition-all duration-200 shadow-sm"
            />
          </button>
        </>
      ) : (
        <>
          <Button variant="outline" onClick={() => router.push("/signin")}>
            Signin
          </Button>
          <Button onClick={() => router.push("/signup")}>Signup</Button>
          <ThemeSlider />
        </>
      )}

      {/* Popup menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-64 bg-background/20 border shadow-lg rounded-xl py-3 px-2 z-50"
          >
            <button
              onClick={() => {
                router.push(`u/${data?.username}`);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
            >
              <FaUserCircle /> Portfolio
            </button>

            <button
              onClick={() => {
                router.push("/apps/home");
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
            >
              <FaDashcube /> Apps
            </button>

            <button
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 w-full hover:bg-primary rounded-xl text-foreground hover:text-background text-base"
            >
              <FaSignOutAlt /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileToggle({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setMobileMenuOpen((prev) => !prev)}
      className="flex md:hidden relative z-50 p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
    >
      {mobileMenuOpen ? (
        <LuX className="size-6" />
      ) : (
        <LuMenu className="size-6" />
      )}
    </button>
  );
}

function MobileMenu({
  pathname,
  setMobileMenuOpen,
  router,
}: {
  pathname: string;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-background flex flex-col px-4"
    >
      <div className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="relative overflow-hidden rounded"
          onClick={() => setMobileMenuOpen(false)}
        >
          <LogoSimple className="w-24" />
        </Link>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Tutup menu"
        >
          <LuX className="size-6" />
        </button>
      </div>

      <motion.nav
        className="flex-1 flex flex-col items-center justify-center gap-6 py-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {NAVIGATIONS.map(({ link, title }) => (
          <Link
            key={link}
            href={link}
            className={cn(
              "text-2xl font-medium py-2 px-6 rounded-lg transition-colors",
              pathname === link
                ? "text-primary bg-primary/10"
                : "text-foreground hover:bg-muted"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            {title}
          </Link>
        ))}
      </motion.nav>

      <motion.div
        className="space-y-4 pb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={() => {
            setMobileMenuOpen(false);
            router.push("/signin");
          }}
          className="w-full py-4 text-base"
        >
          Signin
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setMobileMenuOpen(false);
            router.push("/signup");
          }}
          className="w-full py-4 text-base shadow-lg shadow-primary/20"
        >
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  );
}
