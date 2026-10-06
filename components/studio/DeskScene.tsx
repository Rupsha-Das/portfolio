"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  Coffee,
  CodeXml,
  Headphones,
  Keyboard,
  Laptop,
  Palette,
  StickyNote,
} from "lucide-react";

export const DESK_REPLAY_EVENT = "studio:desk-replay";

const OBJECTS = [
  { Icon: Laptop, label: "Laptop", left: "2%", delay: "0ms", bg: "var(--paper-2)" },
  { Icon: Coffee, label: "Coffee cup", left: "14%", delay: "160ms", bg: "var(--card)" },
  { Icon: Headphones, label: "Headphones", left: "26%", delay: "320ms", bg: "var(--paper-2)" },
  { Icon: Palette, label: "Watercolor palette", left: "38%", delay: "480ms", bg: "var(--card)" },
  { Icon: Keyboard, label: "Keyboard", left: "50%", delay: "640ms", bg: "var(--paper-2)" },
  { Icon: StickyNote, label: "Sticky notes", left: "62%", delay: "800ms", bg: "var(--card)" },
  { Icon: Camera, label: "Camera", left: "74%", delay: "960ms", bg: "var(--paper-2)" },
  { Icon: CodeXml, label: "Code window", left: "84%", delay: "1120ms", bg: "var(--card)" },
] as const;

/**
 * DeskScene — a contained footer diorama. A fixed set of desk objects
 * drops once into a fixed-height stage (overflow hidden, no page growth).
 * Motion runs only while visible; reduced-motion users get a calm static
 * row. Landing blips are WebAudio-synthesized, OFF by default, with an
 * explicit toggle + volume.
 */
export function DeskScene() {
  const [round, setRound] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [reduced, setReduced] = useState(false);
  const [onscreen, setOnscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnscreen(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // External replay: the "Bored?" menu scrolls here and replays the drop.
  useEffect(() => {
    const replay = () => setRound((v) => v + 1);
    window.addEventListener(DESK_REPLAY_EVENT, replay);
    return () => window.removeEventListener(DESK_REPLAY_EVENT, replay);
  }, []);

  const blip = useCallback(
    (when: number) => {
      if (!soundOn) return;
      const id = window.setTimeout(() => {
        try {
          const Ctx = window.AudioContext;
          if (!Ctx) return;
          ctxRef.current ??= new Ctx();
          const ctx = ctxRef.current;
          if (ctx.state === "suspended") void ctx.resume();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = 420 + Math.random() * 260;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.25), ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.18);
        } catch {
          /* audio unavailable — scene stays silent */
        }
      }, when);
      timers.current.push(id);
    },
    [soundOn, volume]
  );

  // Schedule landing blips only while the stage is onscreen.
  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (!soundOn || reduced || !onscreen) return;
    OBJECTS.forEach((o, i) => blip(700 + i * 160));
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [round, soundOn, reduced, onscreen, blip]);

  // Full audio cleanup on unmount.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      void ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
    },
    []
  );

  return (
    <div className="mt-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <p className="stamp" id="desk-label">
          Desk diorama · {reduced ? "calm static arrangement" : "things gently fall into place"}
        </p>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRound((v) => v + 1)}
            className="min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-inksoft transition-colors hover:border-ink hover:text-ink"
          >
            {reduced ? "Tidy up" : "Drop them again"}
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute landing sounds" : "Enable landing sounds"}
            className="min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-inksoft transition-colors hover:border-ink hover:text-ink"
          >
            Sound: {soundOn ? "on" : "off"}
          </button>
          {soundOn ? (
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Landing sound volume"
              className="w-24 max-w-full"
            />
          ) : null}
        </div>
      </div>
      <div ref={stageRef} role="img" aria-labelledby="desk-label" className="desk-stage">
        {OBJECTS.map(({ Icon, label, left, delay, bg }) =>
          reduced ? (
            <span key={`${round}-${label}`} className="desk-item" style={{ left, background: bg, animation: "none" }} title={label}>
              <Icon size={20} aria-hidden />
              <span className="sr-only">{label}</span>
            </span>
          ) : (
            <span
              key={`${round}-${label}`}
              className="desk-item"
              style={{ left, background: bg, animationDelay: delay }}
              title={label}
            >
              <Icon size={20} aria-hidden />
              <span className="sr-only">{label}</span>
            </span>
          )
        )}
        <span aria-hidden className="absolute inset-x-6 bottom-4 border-t-2 border-dashed border-line" />
      </div>
    </div>
  );
}
