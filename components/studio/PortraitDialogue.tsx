"use client";

import type { Dialogue } from "./portrait-config";

/**
 * PortraitDialogue — the single, dedicated dialogue renderer for the
 * interactive portrait. Rendered ONLY inside the portrait wrapper.
 * It receives the single controlled `dialogue` object (or null), so only
 * one bubble — one text layer — can ever be visible at a time.
 * A new message replaces the previous one via `key={dialogue.id}` on the
 * host: the old bubble fully unmounts, the new one mounts clean. Nothing
 * is ever appended on top, and no exit animation lingers underneath.
 *
 * The bubble is absolutely positioned relative to the local
 * `.portrait-wrapper` (never the page, header, toggle, or viewport),
 * pointer-events-none so it never blocks clicks or shifts layout.
 * The visible bubble itself is the ARIA live region — one visual
 * message, one announcement, no duplicates.
 */
export function PortraitDialogue({
  dialogue,
  expressionLabel,
}: {
  dialogue: Dialogue | null;
  expressionLabel: string;
}) {
  if (!dialogue) return null;
  return (
    <span key={dialogue.id} className="portrait-dialogue" data-portrait-dialogue>
      <span role="status" aria-live="polite" className="portrait-dialogue-bubble">
        {dialogue.text}
        <span className="sr-only"> — {expressionLabel}</span>
      </span>
    </span>
  );
}
