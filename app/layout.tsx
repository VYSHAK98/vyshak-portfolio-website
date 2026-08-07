import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vyshakharikumar.dev"),
  title: "Vyshak Harikumar — Frontend Engineer, AI Interfaces",
  description:
    "Enterprise frontend architecture in React, Next.js and TypeScript — voice AI, real-time transcript streaming, and platforms that carry real revenue for real businesses.",
  authors: [{ name: "Vyshak Harikumar" }],
  openGraph: {
    title: "Vyshak Harikumar — Frontend Engineer, AI Interfaces",
    description:
      "Enterprise frontend architecture in React, Next.js and TypeScript — voice AI, real-time transcript streaming, and platforms that carry real revenue for real businesses.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this rule targets the legacy
            Pages Router _document.js; root layout <head> is the correct App Router place for
            third-party font providers (Fontshare/Geist Mono) that next/font doesn't cover. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
