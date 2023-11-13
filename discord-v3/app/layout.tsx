import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

import { cn } from "@/lib/utils";
import { NextResponse } from "next/server";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dis-Code App",
  description: "Your Coding Discord",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!ClerkProvider) {
    return new NextResponse("Clerk Error", { status: 500 });
  }
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-zinc-950")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
