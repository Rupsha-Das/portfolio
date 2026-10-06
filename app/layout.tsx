import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono2",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rupsha Das",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Rupsha Das", url: SITE_URL }],
  creator: "Rupsha Das",
  publisher: "Rupsha Das",
  alternates: { canonical: "/" },
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
  openGraph: {
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
    url: "/",
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rupsha Das — Full-Stack Developer. Reliable software people enjoy using.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14110c" },
    { media: "(prefers-color-scheme: light)", color: "#faf6ed" },
  ],
  width: "device-width",
  initialScale: 1,
};

const THEME_INIT = `(function(){try{var s=localStorage.getItem("studio-theme");var t=s||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}document.documentElement.classList.remove("no-js");})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="grain flex min-h-dvh flex-col bg-paper font-body text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
        <noscript>
          <style>{`.reveal{opacity:1 !important;translate:none !important;}[data-menu-panel]{display:none !important;}.no-js-nav{display:flex !important;}`}</style>
          <p className="wrap t-small py-4 text-inksoft">
            JavaScript is off — everything readable still works. The contact form needs JavaScript;
            email me directly instead.
          </p>
        </noscript>
      </body>
    </html>
  );
}
