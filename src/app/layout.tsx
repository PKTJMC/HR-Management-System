import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "HR Management System",
  description: "Internal HR platform for employee data and profile management.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[--color-bg] text-[--color-fg] antialiased">
        {children}
      </body>
    </html>
  );
}
