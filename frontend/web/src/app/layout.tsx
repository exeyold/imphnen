import { TanstackQueryProvider } from "@packages/client/query";
import { cn } from "@packages/client/tailwind";
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // ✅ import font
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "~/layouts/theme-provider";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "IMPHNEN",
    template: "IMPHNEN | %s",
  },
  description: "IMPHNEN | Ingin Menjadi Programmer Handal Namun Enggan Ngoding",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", poppins.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            height={4}
            initialPosition={0.4}
            showSpinner={false}
            speed={750}
          />
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
