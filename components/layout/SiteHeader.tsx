"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the menu for keyboard/screen-reader users.
    panelRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5"
          aria-label="Rupsha Das — home"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-paper"
          >
            R
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[1.05rem] font-bold tracking-tight">
              Rupsha Das
            </span>
            <span className="stamp block !text-[0.6rem]">Studio · Est. curiosity</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-full px-4 py-2.5 text-[0.92rem] font-medium text-inksoft transition-colors hover:bg-wash hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="tag hidden !text-inksoft lg:inline-flex">
            <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-moss" />
            {PROFILE.availability}
          </span>
          <ThemeToggle />
          <Link href="/contact" className="btn btn-solid hidden !min-h-11 !py-2 !text-sm md:inline-flex">
            Say hello
          </Link>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          data-menu-panel
          className="border-t border-line bg-paper px-5 pb-8 pt-2 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[3.5rem] items-center gap-4 py-3 font-display text-2xl font-semibold tracking-tight"
                  >
                    <span className="index-num text-sm font-medium text-clay">
                      0{i + 1}
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-solid mt-5 w-full justify-center"
          >
            Say hello
          </Link>
          <p className="t-small mt-4 text-inksoft">{PROFILE.email}</p>
        </div>
      ) : null}

      {/* No-JS fallback: plain link row (revealed by noscript styles) */}
      <nav aria-label="Primary (no script)" className="no-js-nav wrap hidden gap-4 overflow-x-auto pb-3">
        {NAV_LINKS.map((l) => (
          <Link key={l.href + l.label} href={l.href} className="t-small font-medium underline underline-offset-4">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
