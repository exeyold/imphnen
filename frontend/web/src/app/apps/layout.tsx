"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuLoader } from "react-icons/lu";
import { useGetSession } from "~/features/auth/hooks/use-get-session";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isLoading: isSessionLoading } = useGetSession();

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.replace("/signin");
    }
  }, [isSessionLoading, session, router]);

  if (isSessionLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LuLoader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return children;
}
