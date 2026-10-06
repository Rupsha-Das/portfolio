"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_QUIP_EVENT, type ThemeQuipDetail } from "@/components/studio/portrait-config";

/**
 * ThemeToggle — changes the theme only and stays visually clean.
 * Character dialogue lives exclusively in the portrait bubble:
 * this component dispatches a lightweight theme signal and renders
 * no message UI of its own.
 */
export function ThemeToggle() {
  useEffect(() => {
    // Keep the toggle icon in sync if theme changes elsewhere.
    const sync = () => {
      const t = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      document.querySelectorAll("[data-theme-toggle]").forEach((el) => {
        el.setAttribute("aria-pressed", String(t === "dark"));
        el.setAttribute(
          "aria-label",
          t === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
        const sun = el.querySelector("[data-icon-sun]");
        const moon = el.querySelector("[data-icon-moon]");
        if (sun && moon) {
          (sun as HTMLElement).hidden = t !== "dark";
          (moon as HTMLElement).hidden = t === "dark";
        }
      });
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("studio-theme", next);
    } catch {
      /* private mode — theme just won't persist */
    }

    // Notify the portrait so it can speak once, in its own bubble.
    window.dispatchEvent(
      new CustomEvent<ThemeQuipDetail>(THEME_QUIP_EVENT, { detail: { theme: next } })
    );
  };

  return (
    <button
      type="button"
      data-theme-toggle
      aria-pressed="false"
      aria-label="Switch to dark mode"
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-ink hover:bg-wash"
    >
      <span data-icon-sun hidden className="theme-icon">
        <Sun size={18} aria-hidden />
      </span>
      <span data-icon-moon className="theme-icon">
        <Moon size={18} aria-hidden />
      </span>
    </button>
  );
}
