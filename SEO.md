# SEO

How this site's SEO layer is wired, and how to maintain it.

## Where things live

| File | Purpose |
|---|---|
| `lib/site.ts` | **Single source of truth.** Domain, site name, description, keywords, author, and all social links. Every other file below imports from here — nothing else hardcodes a URL or a copy of this content. |
| `app/layout.tsx` | The root `Metadata` object (title, description, OpenGraph, Twitter, robots, canonical, verification, etc.) and the `<JsonLd />` component. |
| `components/JsonLd/JsonLd.tsx` | Schema.org `Person` structured data, rendered as `application/ld+json` in `<body>`. |
| `app/robots.ts` | Generates `/robots.txt`. |
| `app/sitemap.ts` | Generates `/sitemap.xml`. |
| `app/manifest.ts` | Generates `/manifest.webmanifest` (web app manifest). |
| `app/opengraph-image.tsx` | Generates the 1200×630 OG/Twitter preview image on demand (via Next's built-in `next/og`, no extra dependency, no static file to keep in sync). |
| `app/apple-icon.tsx` | Generates the 180×180 Apple touch icon on demand, same mechanism. |
| `app/icon.svg` | The tab favicon (Next's file convention picks this up automatically — no `<link>` tag needed). |

## How to update the domain

Set the `NEXT_PUBLIC_SITE_URL` environment variable — in Vercel's project settings (Production environment) for the deployed site, or in a local `.env.local` for testing:

```
NEXT_PUBLIC_SITE_URL=https://vyshakharikumar.dev
```

`lib/site.ts` falls back to `https://vyshak-harikumar.vercel.app` if the variable isn't set. **No code changes are needed** — every metadata file, the sitemap, robots.txt, and the JSON-LD all read `SITE_URL` from `lib/site.ts`.

## How to replace the OG image

There's no static `public/og-image.png` to replace. The image is generated at request time by `app/opengraph-image.tsx` using Next's built-in `ImageResponse` (Satori) — this was used instead of a hand-made PNG because it's a genuinely-generatable, zero-dependency, built-in Next.js API, and it stays in sync automatically (change the text, it changes the image; no separate design file to regenerate and re-export).

To change the design, edit the JSX in `app/opengraph-image.tsx` directly. To preview it, visit `/opengraph-image` on a running dev/build server. The same mechanism generates `app/apple-icon.tsx` (the Apple touch icon) — Next's `apple-icon` file convention only accepts raster images, not the `.svg` used for the regular favicon, which is why that one needed its own file instead of reusing `app/icon.svg`.

If you'd rather have a real static PNG (e.g. to hand-design it), you can still drop a file at `public/og-image.png` and reference it explicitly via `metadata.openGraph.images` / `metadata.twitter.images` in `app/layout.tsx` — just delete `app/opengraph-image.tsx` first so the two don't both try to supply the same tag.

## How to update social links

Edit `lib/site.ts`:

```ts
export const SOCIAL_LINKS = {
  github: "...",
  linkedin: "...",
  twitter: "...",   // placeholder — replace with your real X/Twitter URL
  email: "mailto:...",
  resume: "/your-resume.pdf",
};

export const TWITTER_HANDLE = "@your-handle"; // placeholder
```

`SOCIAL_LINKS.twitter` and `TWITTER_HANDLE` are placeholders — there's no real X/Twitter account wired in yet. Once you have one:
1. Update both values in `lib/site.ts`.
2. `TWITTER_HANDLE` feeds the `twitter:site` / `twitter:creator` meta tags in `app/layout.tsx` automatically.
3. `SOCIAL_LINKS.twitter` feeds the `sameAs` array in the JSON-LD (`components/JsonLd/JsonLd.tsx`) automatically.

If you don't want a Twitter/X presence at all, remove the `twitter` line from `SOCIAL_LINKS`'s `sameAs` usage in `JsonLd.tsx` and the `creator`/`site` fields from the `twitter` metadata block in `layout.tsx`.

Note: on-page social links in the UI itself (the Contact section, footer, nav menu) are **not** wired to `lib/site.ts` — they were left as-is to keep this SEO pass scoped to metadata/discoverability rather than touching working UI components. If you want a single source of truth for those too, point them at `SOCIAL_LINKS` from `lib/site.ts`.

## How to submit the sitemap to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console) and add your property (use the domain, not just the Vercel URL, once the custom domain is live).
2. Verify ownership (see below).
3. In the left sidebar, go to **Sitemaps**.
4. Enter `sitemap.xml` (Search Console prepends your domain) and click **Submit**.
5. Google will fetch `https://yourdomain.com/sitemap.xml` — the entries come from `app/sitemap.ts`.

## How to verify ownership

Two options, both free:

**HTML tag method (recommended — already wired up):**
1. In Search Console, choose "URL prefix" property type, enter your domain, and pick the **HTML tag** verification method.
2. Copy the `content="..."` value Google gives you.
3. Set it as an environment variable: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<that value>`.
4. Redeploy. `app/layout.tsx` reads this automatically and only renders the verification meta tag when the variable is set — so nothing ships until you actually have a code.
5. Click Verify in Search Console.

Bing Webmaster Tools works the same way with `NEXT_PUBLIC_BING_SITE_VERIFICATION` (or you can just import your site from Google Search Console directly inside Bing Webmaster Tools, which skips a separate verification step entirely).

**DNS method (alternative, works for either):** add a TXT record at your domain registrar instead — no code change needed, but you'll need access to your domain's DNS settings (only relevant once the custom domain is live).

## How to test OpenGraph previews

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — also covers WhatsApp, which reads the same `og:` tags.
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- Paste the deployed URL into either and click "Scrape Again" / re-fetch if you've changed metadata — these tools cache previews aggressively.

## How to test Twitter cards

- [Twitter Card Validator](https://cards-dev.twitter.com/validator) (may require being logged in; X has made this tool inconsistent — if it doesn't load, the Facebook debugger above validates the same underlying `og:` tags that Twitter falls back to when `twitter:image` isn't separately set, which is the case here).

## Validation checklist

Run `npm run build` then `npm run start`, and check locally:

- `http://localhost:3000/robots.txt` — should list `Allow: /` and point to the sitemap.
- `http://localhost:3000/sitemap.xml` — should list the homepage with `lastmod`, `changefreq`, `priority`.
- `http://localhost:3000/manifest.webmanifest` — should return the JSON manifest.
- `http://localhost:3000/opengraph-image` — should return a PNG image.
- `http://localhost:3000/apple-icon` — should return a PNG image.
- View source on `/` and confirm: one `<link rel="canonical">`, one `og:title`/`og:description`/`og:image` set, one `twitter:card`, and a single `<script type="application/ld+json">` block with valid JSON (paste it into [Google's Rich Results Test](https://search.google.com/test/rich-results) to confirm it parses).

## Assumptions made

- No real X/Twitter account exists yet — `SOCIAL_LINKS.twitter` and `TWITTER_HANDLE` in `lib/site.ts` are clearly-marked placeholders.
- `metadataBase` previously pointed at `https://vyshakharikumar.dev` (the future custom domain) even though the site is currently deployed at the Vercel URL — this was a latent bug (canonical/OG URLs would have pointed at a domain that isn't live). Fixed by defaulting to the Vercel URL via `NEXT_PUBLIC_SITE_URL`, switchable in one place per the section above.
- Google/Bing site verification meta tags only render once you set the corresponding environment variable, so nothing fake ships to production in the meantime.
- The site is currently a single route (`/`), so `sitemap.ts` has one entry; a comment there shows how to add more when real sub-pages exist.
- `worksFor` (Verveo Solutions) and `alumniOf` (APJ Abdul Kalam Technological University) in the JSON-LD use your real, already-published About-section content rather than placeholders, since that data already exists on the page.
