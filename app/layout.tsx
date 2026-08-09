import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd/JsonLd";
import {
  AUTHOR,
  BING_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  LOCALE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";

/**
 * Every value here is sourced from lib/site.ts — change the domain,
 * name, description, or social links there, not here.
 *
 * `icons` is deliberately NOT set on this object: app/icon.svg and
 * app/apple-icon.tsx (Next's file-based icon conventions) already
 * generate those <link> tags automatically. Setting `icons` here too
 * would emit duplicate tags for the same icons.
 *
 * `openGraph.images` / `twitter.images` are deliberately NOT set
 * either: app/opengraph-image.tsx (file convention) generates the
 * og:image/twitter:image tags automatically and is picked up by both
 * Open Graph consumers and Twitter's fallback-to-og:image behavior.
 * Setting them here too would duplicate that tag.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  applicationName: SITE_NAME,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    other: { "msvalidate.01": BING_SITE_VERIFICATION },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
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
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
