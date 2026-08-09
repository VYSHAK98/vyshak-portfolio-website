/**
 * Single source of truth for every URL, name, and social link used across
 * the site's SEO surface (metadata, robots.ts, sitemap.ts, manifest.ts,
 * JSON-LD, the OG image). Nothing else in the SEO layer should hardcode
 * a domain or hand-typed copy of these values — import from here.
 *
 * The Vercel URL below is the permanent site URL — no custom domain is
 * planned. If that ever changes, set NEXT_PUBLIC_SITE_URL in Vercel's
 * project settings (Production environment) and redeploy; nothing in
 * the codebase needs to change.
 */

const FALLBACK_URL = "https://vyshak-harikumar.vercel.app";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/+$/, "");

export const SITE_NAME = "Vyshak Harikumar";

export const SITE_TITLE = "Vyshak Harikumar — Frontend Engineer, AI Interfaces";

export const SITE_DESCRIPTION =
  "Enterprise frontend architecture in React, Next.js and TypeScript — voice AI, real-time transcript streaming, and platforms that carry real revenue for real businesses.";

export const SITE_KEYWORDS = [
  "Vyshak Harikumar",
  "Frontend Engineer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "AI Interfaces",
  "Voice AI",
  "Frontend Architecture",
  "Bengaluru Frontend Engineer",
  "Portfolio",
];

export const AUTHOR = {
  name: "Vyshak Harikumar",
  email: "vyshakharikumar98@gmail.com",
} as const;

/**
 * Real links, except `twitter` — replace that placeholder with your
 * actual X/Twitter handle URL when you have one (or delete the two
 * lines flagged below and the Twitter mention in the JSON-LD sameAs
 * list in app/layout.tsx).
 */
export const SOCIAL_LINKS = {
  github: "https://github.com/VYSHAK98",
  linkedin: "https://www.linkedin.com/in/vyshak-harikumar98/",
  twitter: "https://x.com/your-handle-here", // placeholder — replace or remove
  email: `mailto:${AUTHOR.email}`,
  resume: "/Vyshak_Harikumar_Frontend_Resume.pdf",
} as const;

/** Twitter/X @handle for the `twitter:site` meta tag. Placeholder — same caveat as above. */
export const TWITTER_HANDLE = "@your-handle-here";

export const LOCALE = "en_US";

/**
 * Google Search Console ownership verification (the <meta
 * name="google-site-verification"> tag). Not a secret — Google
 * verification codes are meant to be publicly visible in page source —
 * so it's safe to bake in directly here rather than requiring a
 * Vercel dashboard env var. Overridable via
 * NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION if you ever regenerate it
 * (e.g. re-verifying under a different Search Console account).
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "x2ZGebMfaQ3wz7WN02TaO_52cPeoybuovtUIkGur6qo";
