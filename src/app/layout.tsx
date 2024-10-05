import React from "react";
import type { Metadata, Viewport } from "next";
import "@/styles/global.css";

import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/components/core/theme-provider/ThemeProvider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "A simple inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
