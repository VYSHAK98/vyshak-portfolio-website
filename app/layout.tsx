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
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* app/icon.svg covers the tab favicon via Next's file convention; apple-icon only
            accepts raster files there, so the touch icon is wired explicitly here instead. */}
        <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cdefs%3E%3ClinearGradient id='v' x1='50' y1='48' x2='132' y2='140' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFFFFF'/%3E%3Cstop offset='1' stop-color='%234F8CFF'/%3E%3C/linearGradient%3E%3CradialGradient id='g' cx='.5' cy='.18' r='.75'%3E%3Cstop stop-color='%234F8CFF' stop-opacity='.32'/%3E%3Cstop offset='1' stop-color='%234F8CFF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='180' height='180' fill='%23070707'/%3E%3Crect width='180' height='180' fill='url(%23g)'/%3E%3Cg fill='none' stroke='url(%23v)' stroke-width='15' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M34 54 62 126 90 54'/%3E%3Cpath d='M115 54v72M146 54v72M115 90h31'/%3E%3C/g%3E%3C/svg%3E" />
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
