import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modular AI",
  description: "Personality-driven conversational AI foundation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#08080f", color: "#e2e8f0" }}>
        {children}
      </body>
    </html>
  );
}
