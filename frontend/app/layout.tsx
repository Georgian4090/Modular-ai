import type { Metadata } from "next";
import { Inter } from "next/font/google";

import PersonaIndicator from "@/components/PersonaIndicator";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modular AI",
  description:
    "An AI assistant inspired by the public communication style of S. Jaishankar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.className} flex h-full min-h-screen flex-col bg-gray-950 text-gray-100`}
      >
        <PersonaIndicator />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
