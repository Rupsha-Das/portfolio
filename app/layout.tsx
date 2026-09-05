import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/layout/Navigation";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rupsha Das — Full-Stack Developer & Builder",
  description:
    "Rupsha Das is a full-stack developer and builder working across web, AI/ML, embedded systems, and creative technology.",
  keywords: ["Rupsha Das", "Full-Stack Developer", "Next.js", "React", "AI", "Embedded Systems", "Portfolio"],
  authors: [{ name: "Rupsha Das" }],
  creator: "Rupsha Das",
  metadataBase: new URL("https://rupshadas.dev"),
  openGraph: {
    title: "Rupsha Das — Full-Stack Developer & Builder",
    description:
      "I build products, break things, ship ideas — and occasionally make the internet pay attention.",
    type: "website",
    locale: "en_US",
    siteName: "Rupsha Das",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupsha Das — Full-Stack Developer & Builder",
    description:
      "Full-stack developer working across web, AI/ML, embedded systems, and creative technology.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-void text-ink noise font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-lime focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <CustomCursor />
        <Navigation />
        <main id="main" className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
