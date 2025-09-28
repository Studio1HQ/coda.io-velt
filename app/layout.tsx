import type React from "react";
import type { Metadata } from "next"
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coda Workspace",
  description: "A collaborative workspace for teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
