/**
 * Single source of truth for the production site identity.
 *
 * Priority:
 * 1. `NEXT_PUBLIC_SITE_URL` environment variable (set in Vercel/hosting).
 * 2. Fallback to the configured production domain.
 *
 * Use this everywhere (metadataBase, canonical, og:url, sitemap,
 * robots, JSON-LD) so the domain only ever needs changing in one place.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://rupshadas.dev";

export const SITE_NAME = "Rupsha Das";
export const SITE_TITLE = "Rupsha Das — Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Rupsha Das is a Full-Stack Developer building modern web applications and digital products with React, Next.js, Node.js and AI.";
export const SITE_OG_DESCRIPTION =
  "Full-Stack Developer building modern web applications and digital products with React, Next.js, Node.js and AI.";
export const SITE_LOCALE = "en_US";
