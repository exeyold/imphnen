import { TanstackQueryProvider } from "@packages/client/query";
import type { Metadata } from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "IMPHNEN",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
