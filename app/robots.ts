import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Public portfolio: indexable. Block internal routes only
 * (/api/*). Never block CSS, JS, or public images/assets.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
