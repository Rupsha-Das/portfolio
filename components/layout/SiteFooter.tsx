"use client";

import { useState } from "react";
import Link from "next/link";
import { PROFILE, SOCIAL_LINKS } from "@/lib/content";

const CLOSERS = [
  "Set in Fraunces & Inter, on warm paper.",
  "No templates were harmed in the making of this site.",
  "Built with restraint, caffeine, and one scribble at a time.",
  "Thanks for scrolling all the way down here.",
];

export function SiteFooter() {
  const [n, setN] = useState(0);

  return (
    <footer className="mt-20 border-t border-line bg-paper2/60">
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold tracking-tight">
              Rupsha Das<span className="text-clay">.</span>
            </p>
            <p className="t-small mt-3 max-w-sm text-inksoft">
              A thoughtful engineer&apos;s personal studio — reliable software, honest
              writing, and the occasional hand-drawn circle.{" "}
              <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-clay">
                Say hello
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={() => setN((v) => (v + 1) % CLOSERS.length)}
              aria-label="Show another closing note"
              className="t-small mt-5 min-h-11 rounded-full border border-line px-4 py-2 text-inksoft transition-colors hover:border-ink hover:text-ink"
            >
              {CLOSERS[n]} <span className="text-clay">(again?)</span>
            </button>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="stamp mb-4">Index</p>
            <ul className="space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Selected work", href: "/work" },
                { label: "Experience", href: "/#experience" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center py-1.5 font-medium text-inksoft hover:text-ink hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="stamp mb-4">Elsewhere</p>
            <ul className="space-y-1">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 py-1.5 font-medium text-inksoft hover:text-ink hover:underline hover:underline-offset-4"
                  >
                    {s.platform}
                    <span className="t-small text-faint">· {s.handle}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex min-h-11 items-center py-1.5 font-medium text-inksoft hover:text-ink hover:underline hover:underline-offset-4"
                >
                  {PROFILE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-inksoft">© 2026 Rupsha Das · Kolkata → Hyderabad → Internet</p>
          <p className="stamp">Full-stack developer · Builder</p>
        </div>
      </div>
    </footer>
  );
}
