import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Public routes only: home, about, work index, one page per case study,
 * contact. No API routes, no query variants, no downloads.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
