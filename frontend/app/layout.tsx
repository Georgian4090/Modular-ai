import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PersonaIndicator from "@/components/PersonaIndicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jaishankar AI",
  description: "An AI assistant inspired by the public communication style of S. Jaishankar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-full flex flex-col`}>
        <PersonaIndicator />
        <main className="flex-grow flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
