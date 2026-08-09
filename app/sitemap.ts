import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Single-page portfolio today, so this is one entry. Add future static
 * routes as additional objects in this array — e.g. a dedicated
 * /projects page:
 *
 *   { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
