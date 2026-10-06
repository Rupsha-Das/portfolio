"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  cloneBoard,
  findConflicts,
  generatePuzzle,
  isComplete,
  resetBoard,
  type Board,
  type Difficulty,
} from "@/lib/sudoku";

const SAVE_KEY = "studio-sudoku-save-v1";
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

type SaveState = {
  initial: Board;
  solution: Board;
  values: Board;
  difficulty: Difficulty;
};

function loadSave(): SaveState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveState;
    if (!parsed || !Array.isArray(parsed.initial) || parsed.initial.length !== 9) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * SudokuGame — a self-contained modal game. Portfolio stays visible
 * behind it; nothing leaves the browser (progress in localStorage only).
 * Bottom-sheet on narrow phones, centered dialog on larger screens.
 */
export function SudokuGame({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Boot once per mount (the menu mounts this only while open): restore a
  // saved game or deal a fresh one. No setState-in-effect needed.
  const [boot] = useState(() => {
    const saved = loadSave();
    if (saved) {
      return {
        difficulty: saved.difficulty,
        initial: saved.initial,
        solution: saved.solution,
        values: saved.values,
        won: isComplete(saved.values),
      };
    }
    const game = generatePuzzle("easy");
    return {
      difficulty: "easy" as Difficulty,
      initial: game.puzzle,
      solution: game.solution,
      values: cloneBoard(game.puzzle),
      won: false,
    };
  });
  const [difficulty, setDifficulty] = useState<Difficulty>(boot.difficulty);
  const [initial, setInitial] = useState<Board>(boot.initial);
  const [solution, setSolution] = useState<Board>(boot.solution);
  const [values, setValues] = useState<Board>(boot.values);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [won, setWon] = useState(boot.won);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const noticeTimer = useRef(0);

  const startNew = useCallback((next: Difficulty) => {
    const game = generatePuzzle(next);
    setDifficulty(next);
    setInitial(game.puzzle);
    setSolution(game.solution);
    setValues(cloneBoard(game.puzzle));
    setSelected(null);
    setWon(false);
    setNotice(null);
  }, []);

  // Mount = open: lock body scroll, focus the dialog. No state set here.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, []);

  // Persist progress locally (useful) — never sent anywhere.
  useEffect(() => {
    if (!open || !initial || !solution || !values) return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ initial, solution, values, difficulty }));
    } catch {
      /* private mode — game still works, just won't persist */
    }
  }, [open, initial, solution, values, difficulty]);

  // Escape closes; unmount cleanup clears the notice timer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(noticeTimer.current);
    };
  }, [open, onClose]);

  const flash = useCallback((text: string) => {
    setNotice(text);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2200);
  }, []);

  const conflicts = useMemo(() => (values ? findConflicts(values) : new Set<string>()), [values]);

  const enterDigit = useCallback(
    (n: number) => {
      if (!values || !initial || won) return;
      const cell = selected;
      if (!cell) {
        flash("Pick a cell first.");
        return;
      }
      const [r, c] = cell;
      if (initial[r][c] !== 0) {
        flash("That cell is a given — it stays.");
        return;
      }
      const next = cloneBoard(values);
      if (n === 0) {
        next[r][c] = 0;
        setValues(next);
        return;
      }
      next[r][c] = n;
      setValues(next);
      const bad = findConflicts(next);
      if (bad.has(`${r}-${c}`)) {
        flash("Hmm — that clashes with its row, column, or box.");
      } else if (isComplete(next)) {
        setWon(true);
        try {
          localStorage.removeItem(SAVE_KEY);
        } catch {
          /* ignore */
        }
      }
    },
    [values, initial, selected, won, flash]
  );

  // Physical keyboard: digits, Backspace/Delete clears, arrows move.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key >= "1" && e.key <= "9") enterDigit(Number(e.key));
      else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") enterDigit(0);
      else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        setSelected((prev) => {
          const [r, c] = prev ?? [4, 4];
          if (e.key === "ArrowUp") return [Math.max(0, r - 1), c];
          if (e.key === "ArrowDown") return [Math.min(8, r + 1), c];
          if (e.key === "ArrowLeft") return [r, Math.max(0, c - 1)];
          return [r, Math.min(8, c + 1)];
        });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, enterDigit]);

  if (!open || !values || !initial) return null;

  const givensCount = initial.flat().filter((n) => n !== 0).length;
  const filledCount = values.flat().filter((n) => n !== 0).length;

  const restart = () => {
    setValues(resetBoard(initial));
    setSelected(null);
    setWon(false);
    flash("Back to the givens.");
  };

  const clearMine = () => {
    const next = cloneBoard(values);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (initial[r][c] === 0) next[r][c] = 0;
      }
    }
    setValues(next);
    setWon(false);
    flash("Your entries are cleared.");
  };

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="sudoku-overlay"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="sudoku-panel"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="stamp !text-clay">Bored? play a quick sudoku</p>
            <h2 id={titleId} className="mt-1 font-display text-2xl font-bold tracking-tight">
              Tiny numbers, honest logic.
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close Sudoku"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-xl leading-none transition-colors hover:border-ink"
          >
            ×
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={difficulty === d}
              onClick={() => startNew(d)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                difficulty === d
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-inksoft hover:border-ink hover:text-ink"
              }`}
            >
              {d}
            </button>
          ))}
          <span className="t-small ml-auto text-faint" aria-live="off">
            {filledCount}/81 filled · {givensCount} givens
          </span>
        </div>

        <div
          role="grid"
          aria-label={`Sudoku grid, ${difficulty} difficulty`}
          className="sudoku-grid"
        >
          {values.map((row, r) =>
            row.map((n, c) => {
              const given = initial[r][c] !== 0;
              const isSel = selected?.[0] === r && selected?.[1] === c;
              const peer =
                !!selected &&
                !isSel &&
                (selected[0] === r || selected[1] === c || (Math.floor(selected[0] / 3) === Math.floor(r / 3) && Math.floor(selected[1] / 3) === Math.floor(c / 3)));
              const bad = conflicts.has(`${r}-${c}`);
              const thickTop = r % 3 === 0;
              const thickLeft = c % 3 === 0;
              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  role="gridcell"
                  aria-selected={isSel}
                  aria-label={`Row ${r + 1} column ${c + 1}${n ? `, ${n}` : ", empty"}${given ? ", given" : ""}${bad ? ", conflicts" : ""}`}
                  onClick={() => setSelected([r, c])}
                  className={`sudoku-cell${given ? " is-given" : ""}${isSel ? " is-selected" : ""}${peer ? " is-peer" : ""}${bad ? " is-bad" : ""}${thickTop ? " box-top" : ""}${thickLeft ? " box-left" : ""}`}
                >
                  {n !== 0 ? n : ""}
                </button>
              );
            })
          )}
        </div>

        <div aria-live="polite" className="t-small mt-3 min-h-6 text-center">
          {won ? (
            <strong className="text-moss">Solved — clean logic, nicely done.</strong>
          ) : notice ? (
            <span className="text-clay">{notice}</span>
          ) : (
            <span className="text-faint">Tap a cell, then a number. Givens stay put.</span>
          )}
        </div>

        <div className="mt-2 grid grid-cols-5 gap-2" role="group" aria-label="Number input">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => enterDigit(n)}
              aria-label={`Enter ${n}`}
              className="flex min-h-11 items-center justify-center rounded-xl border border-line font-display text-lg font-bold transition-colors hover:border-ink hover:bg-wash"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => enterDigit(0)}
            aria-label="Erase cell"
            className="col-span-1 flex min-h-11 items-center justify-center rounded-xl border border-dashed border-line text-sm font-semibold text-inksoft transition-colors hover:border-ink hover:text-ink"
          >
            Erase
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => startNew(difficulty)} className="btn btn-solid !min-h-11 !px-5 !py-2 !text-sm">
            New game
          </button>
          <button type="button" onClick={restart} className="btn btn-ghost !min-h-11 !px-5 !py-2 !text-sm">
            Restart
          </button>
          <button type="button" onClick={clearMine} className="btn btn-ghost !min-h-11 !px-5 !py-2 !text-sm">
            Clear mine
          </button>
        </div>
      </div>
    </div>
  );
}
