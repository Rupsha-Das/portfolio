"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dices, Grid3x3, Mail, Music, Palette, Sparkles, StickyNote } from "lucide-react";
import { PERSONAL_NOTE, PROJECTS } from "@/lib/content";
import { SudokuGame } from "@/components/studio/SudokuGame";
import { DESK_REPLAY_EVENT } from "@/components/studio/DeskScene";

const PALETTES = ["", "berry", "lagoon"] as const;
const PALETTE_KEY = "studio-palette-v1";

function readSavedPalette(): (typeof PALETTES)[number] {
  try {
    const saved = localStorage.getItem(PALETTE_KEY);
    if (saved === "berry" || saved === "lagoon") return saved;
  } catch {
    /* ignore */
  }
  return "";
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * BoredMenu — one small collapsed prompt ("Bored? Try something.") that
 * fans out to the studio's optional discoveries. Collapsed by default,
 * opens only on tap, closes on Escape/outside-click, never a dashboard.
 */
export function BoredMenu() {
  const [open, setOpen] = useState(false);
  const [sudokuOpen, setSudokuOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [palette, setPalette] = useState<(typeof PALETTES)[number]>(() =>
    typeof window === "undefined" ? "" : readSavedPalette()
  );

  // Apply the accent palette to the document (DOM sync only, no setState).
  useEffect(() => {
    if (palette) document.documentElement.dataset.palette = palette;
    else delete document.documentElement.dataset.palette;
  }, [palette]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    // Move focus into the menu so keyboard users land on the actions.
    window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, closeMenu ]);

  const shuffleColors = useCallback(() => {
    setPalette((prev) => {
      const next = PALETTES[(PALETTES.indexOf(prev) + 1) % PALETTES.length];
      try {
        localStorage.setItem(PALETTE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const openRandomProject = useCallback(() => {
    const pick = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    if (pick) router.push(`/work/${pick.slug}`);
  }, [router]);

  const resetColors = useCallback(() => {
    setPalette("");
    try {
      localStorage.setItem(PALETTE_KEY, "");
    } catch {
      /* ignore */
    }
  }, []);

  const act = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  return (
    <div ref={wrapRef} className="bored-wrap">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-ghost"
      >
        <Sparkles size={17} aria-hidden /> Bored? Try something.
      </button>
      {open ? (
        <div ref={menuRef} role="menu" aria-label="Things to do" className="bored-panel">
          <div className="flex items-center justify-between gap-2 px-2 pb-1">
            <span className="stamp">Pick one</span>
            <button
              type="button"
              onClick={() => closeMenu(true)}
              aria-label="Close menu"
              className="flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold text-inksoft transition-colors hover:text-ink"
            >
              Close ×
            </button>
          </div>          <button type="button" role="menuitem" className="bored-item" onClick={act(() => setSudokuOpen(true))}>
            <Grid3x3 size={18} aria-hidden className="shrink-0 text-clay" /> Play Sudoku
          </button>
          <button type="button" role="menuitem" className="bored-item" onClick={act(() => scrollToId("song"))}>
            <Music size={18} aria-hidden className="shrink-0 text-clay" /> Favorite song
          </button>
          <button type="button" role="menuitem" className="bored-item" onClick={act(() => scrollToId("artwork"))}>
            <Palette size={18} aria-hidden className="shrink-0 text-clay" /> Browse my artwork
          </button>
          <button
            type="button"
            role="menuitem"
            className="bored-item"
            onClick={act(openRandomProject)}
          >
            <Dices size={18} aria-hidden className="shrink-0 text-clay" /> View a random project
          </button>
          <button type="button" role="menuitem" className="bored-item" onClick={act(shuffleColors)}>
            <Sparkles size={18} aria-hidden className="shrink-0 text-clay" />
            Shuffle colors{palette ? ` (${palette})` : ""}
          </button>
          {palette ? (
            <button type="button" role="menuitem" className="bored-item" onClick={act(resetColors)}>
              <Palette size={18} aria-hidden className="shrink-0 text-clay" /> Reset to default colors
            </button>
          ) : null}
          <button
            type="button"
            role="menuitem"
            className="bored-item"
            onClick={act(() => {
              scrollToId("desk");
              window.setTimeout(() => window.dispatchEvent(new Event(DESK_REPLAY_EVENT)), 600);
            })}
          >
            <StickyNote size={18} aria-hidden className="shrink-0 text-clay" /> Watch the desk fall
          </button>
          <button type="button" role="menuitem" aria-expanded={noteOpen} className="bored-item" onClick={() => setNoteOpen((v) => !v)}>
            <Mail size={18} aria-hidden className="shrink-0 text-clay" /> Read a short note
          </button>
          {noteOpen ? (
            <p className="t-small mx-1 mb-1 rounded-xl bg-paper2/70 p-3 text-inksoft">
              <strong className="block font-display text-ink">{PERSONAL_NOTE.title}</strong>
              {PERSONAL_NOTE.body}
            </p>
          ) : null}
        </div>
      ) : null}
      {sudokuOpen ? <SudokuGame open onClose={() => setSudokuOpen(false)} /> : null}
    </div>
  );
}
