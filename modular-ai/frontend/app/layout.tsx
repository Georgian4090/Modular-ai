import "@/app/globals.css";

import type { Metadata } from "next";

import { PersonaIndicator } from "@/components/PersonaIndicator";

export const metadata: Metadata = {
  title: "Modular AI",
  description: "Personality-driven conversational AI foundation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100">
        <PersonaIndicator />
        <div className="pt-10">{children}</div>
      </body>
    </html>
  );
}
