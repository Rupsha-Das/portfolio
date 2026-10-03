import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The portfolio is effectively a single public page (plus the
 * version-stable /cv redirect, which is a file download and is
 * intentionally excluded). No invented URLs, no API routes,
 * no query-parameter variants.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
