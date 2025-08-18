"use client";

import { useGetSession } from "~/features/auth/hooks/use-get-session";

export default function Page() {
  const { data: session } = useGetSession();

  return (
    <div className="flex justify-center items-center h-screen">
      <code>{JSON.stringify(session)}</code>
    </div>
  );
}
