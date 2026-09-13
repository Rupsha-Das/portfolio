"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHeading, RevealText, VelocityMarquee } from "@/components/ui/primitives";
import { FOCUS_AREAS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- typing line ---------- */
function TypingLine({ text, color, reduced }: { text: string; color: string; reduced: boolean }) {
  const [n, setN] = useState(() => (reduced ? text.length : 0));
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, [text, reduced, text.length]);
  const shown = reduced ? text : text.slice(0, n);

  return (
    <p className="font-mono text-[12px] md:text-[13px] leading-relaxed" aria-label={text}>
      <span className="text-muted">$ </span>
      <span className="text-ink">{shown}</span>
      {!reduced && (
        <motion.span
          aria-hidden
          style={{ color }}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        >
          ▊
        </motion.span>
      )}
    </p>
  );
}

/* ---------- status pill ---------- */
function StatusPill({ label, color, reduced }: { label: string; color: string; reduced?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-ink/80 whitespace-nowrap">
      <span className="relative flex h-1.5 w-1.5">
        {!reduced && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: color }} />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
}

/* ---------- FULL-STACK visual: Admin Console → Backend/APIs → Customer Console ---------- */
function FullStackVisual({ color, reduced }: { color: string; reduced: boolean }) {
  const layers = [
    { name: "ADMIN CONSOLE", sub: "dashboards · management", live: "ADMIN LIVE" },
    { name: "BACKEND / APIs", sub: "REST · auth · data", live: "API ONLINE", core: true },
    { name: "CUSTOMER CONSOLE", sub: "customer-facing app", live: "CUSTOMER LIVE" },
  ];
  const codeLines = [
    { pre: "GET", a: " /api/v1/devices ", b: "200", c: "· 42ms" },
    { pre: "sync", a: "(admin", b: " ↔ customer", c: ") · ok" },
  ];
  return (
    <div className="flex flex-col gap-4">
      {/* three-layer workflow with flowing data */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4" aria-hidden>
        {/* subtle drifting particles */}
        {!reduced &&
          [
            { left: "12%", top: "18%", d: 5, dly: 0 },
            { left: "82%", top: "30%", d: 6, dly: 0.8 },
            { left: "70%", top: "78%", d: 5.5, dly: 1.6 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{ left: p.left, top: p.top, background: color, opacity: 0.5 }}
              animate={{ y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: p.d, ease: "easeInOut", delay: p.dly }}
            />
          ))}

        <div className="relative flex flex-col items-stretch gap-0">
          {layers.map((l, i) => (
            <div key={l.name} className="relative flex flex-col items-center">
              {/* connector between layers */}
              {i > 0 && (
                <div className="relative flex h-9 w-px items-center justify-center bg-white/10">
                  {/* glow */}
                  <span
                    className="absolute inset-y-0 w-[3px] rounded-full blur-[3px]"
                    style={{ background: `${color}55` }}
                  />
                  {!reduced && (
                    <>
                      <motion.span
                        className="absolute h-1.5 w-1.5 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                        animate={{ y: [-16, 16], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: i * 0.35 }}
                      />
                      <motion.span
                        className="absolute h-1 w-1 rounded-full bg-white/80"
                        animate={{ y: [14, -14], opacity: [0, 0.9, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: i * 0.5 }}
                      />
                    </>
                  )}
                </div>
              )}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.18, duration: 0.45, ease: [...EASE] }}
                className={`w-full rounded-lg border px-3 py-2.5 backdrop-blur-md ${
                  l.core ? "border-white/20 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"
                }`}
                style={l.core ? { boxShadow: `0 0 24px ${color}22, inset 0 0 12px ${color}11` } : undefined}
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    {!reduced && (
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                        style={{ background: color }}
                      />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-mono text-[10px] md:text-[11px] font-semibold tracking-[0.18em] ${
                        l.core ? "text-black" : "text-ink"
                      } ${l.core ? "inline-block rounded px-1.5 py-px" : ""}`}
                      style={l.core ? { background: color } : undefined}
                    >
                      {l.name}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[9px] md:text-[10px] tracking-[0.12em] text-muted">
                      {l.sub}
                    </p>
                  </div>
                  <span className="hidden sm:inline font-mono text-[8px] tracking-[0.2em] text-ink/60">
                    {l.live}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* code-typing strip */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          <span className="ml-2 font-mono text-[10px] tracking-[0.2em] text-muted">WORKFLOW — LIVE</span>
        </div>
        <div className="space-y-1.5 p-3 font-mono text-[11px] leading-relaxed">
          {codeLines.map((l, i) => (
            <motion.p
              key={i}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.22, duration: 0.45, ease: [...EASE] }}
              className="truncate"
            >
              <span style={{ color }} className="font-semibold">{l.pre}</span>
              <span className="text-ink">{l.a}</span>
              <span className="text-cyan">{l.b}</span>
              <span className="text-ink/70">{l.c}</span>
            </motion.p>
          ))}
          <div className="pt-1">
            <TypingLine text="Admin → API → Customer · live." color={color} reduced={reduced} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["ADMIN LIVE", "API ONLINE", "CUSTOMER LIVE"].map((s) => (
          <StatusPill key={s} label={s} color={color} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}

/* ---------- AI/ML visual: neural + inference ---------- */
const AI_PHASES = ["Parsing document…", "Linking concepts…", "Inference active"] as const;

function AiVisual({ color, reduced }: { color: string; reduced: boolean }) {
  const [phase, setPhase] = useState(2);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % AI_PHASES.length), 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  const layers = [
    [{ x: 28, y: 22 }, { x: 28, y: 52 }, { x: 28, y: 82 }],
    [{ x: 100, y: 12 }, { x: 100, y: 38 }, { x: 100, y: 64 }, { x: 100, y: 90 }],
    [{ x: 172, y: 30 }, { x: 172, y: 72 }],
  ];
  const edges: { x1: number; y1: number; x2: number; y2: number; i: number }[] = [];
  layers[0].forEach((a) => layers[1].forEach((b) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, i: edges.length })));
  layers[1].forEach((a) => layers[2].forEach((b) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, i: edges.length })));

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50 p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted">NEURAL FIELD</span>
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [...EASE] }}
                className="inline-block"
              >
                {AI_PHASES[phase]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <svg viewBox="0 0 200 102" className="h-36 w-full" role="img" aria-label="Animated neural network">
          {edges.map((e) => (
            <line
              key={e.i}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={color}
              strokeOpacity="0.28"
              strokeWidth="1"
              strokeDasharray={reduced ? undefined : "3 4"}
            >
              {!reduced && (
                <animate attributeName="stroke-dashoffset" from="0" to="-14" dur={`${1.2 + (e.i % 5) * 0.25}s`} repeatCount="indefinite" />
              )}
            </line>
          ))}
          {/* travelling pulses */}
          {!reduced &&
            [0, 1, 2].map((k) => (
              <circle key={k} r="2.2" fill="#fff">
                <animateMotion dur={`${2.2 + k * 0.5}s`} repeatCount="indefinite" path="M28 52 L100 38 L172 30" />
                <animate attributeName="opacity" values="0;1;0" dur={`${2.2 + k * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          {layers.flat().map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="7" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
              <circle cx={n.x} cy={n.y} r="3.2" fill={i % 4 === 0 ? "#fff" : color}>
                {!reduced && (
                  <animate attributeName="opacity" values="1;0.45;1" dur={`${1.6 + (i % 4) * 0.3}s`} repeatCount="indefinite" />
                )}
              </circle>
            </g>
          ))}
        </svg>
        <div className="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em]">
          <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-ink/80">syllabus.pdf</span>
          <span aria-hidden style={{ color }}>→</span>
          <span className="rounded-md px-2 py-1 font-semibold text-black" style={{ background: color }}>
            knowledge map
          </span>
          {!reduced && (
            <motion.span aria-hidden className="h-px flex-1 bg-white/10 overflow-hidden relative">
              <motion.span
                className="absolute inset-y-0 w-1/2"
                style={{ background: color }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </motion.span>
          )}
        </div>
        <div className="mt-2">
          <TypingLine text="Turning information into intelligence." color={color} reduced={reduced} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["MODEL READY", "INFERENCE ACTIVE", "DATA PROCESSED"].map((s) => (
          <StatusPill key={s} label={s} color={color} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}

/* ---------- main section ---------- */
export default function WhoAmI() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion() ?? false;
  const current = FOCUS_AREAS[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => (a + 1) % FOCUS_AREAS.length);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => (a - 1 + FOCUS_AREAS.length) % FOCUS_AREAS.length);
    }
  };

  return (
    <section aria-label="Who am I" className="relative px-5 py-24 md:px-12 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="how i think"
        title={
          <>
            <RevealText text="MORE THAN" as="span" className="block" />
            <span className="block text-stroke">JUST CODE.</span>
          </>
        }
      />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* LEFT: tabs + personal content */}
        <div>
          <p className="max-w-md text-muted leading-relaxed mb-6 text-[15px] md:text-base">
            I&apos;m a full-stack developer who likes turning weird ideas into things people can
            actually use. I build things, I understand the systems behind them, and I enjoy
            making complex ideas usable.
          </p>

          <div role="tablist" aria-label="Focus areas" onKeyDown={onKey} className="flex flex-col">
            {FOCUS_AREAS.map((d, i) => {
              const selected = active === i;
              return (
                <div key={d.id} className="border-t border-white/10 last:border-b">
                  <button
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${d.id}`}
                    id={`tab-${d.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-cursor="OPEN →"
                    className="group relative flex w-full items-center gap-4 py-4 md:py-5 text-left outline-none"
                  >
                    {/* lime active rail */}
                    {selected && (
                      <motion.span
                        layoutId="focus-rail"
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-lime"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        aria-hidden
                      />
                    )}
                    <span className="font-mono text-[11px] text-muted pl-4">0{i + 1}</span>
                    <motion.span
                      animate={{
                        x: selected ? 10 : 0,
                        color: selected ? d.color : "#F5F3EE",
                        scale: selected ? 1.04 : 1,
                      }}
                      whileHover={{ x: selected ? 10 : 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className="font-display text-3xl md:text-5xl font-bold tracking-tight origin-left"
                    >
                      {d.word}
                    </motion.span>
                    <span
                      className="ml-auto font-mono text-[11px] tracking-[0.2em] transition-opacity duration-300"
                      style={{ color: d.color, opacity: selected ? 1 : 0 }}
                      aria-hidden
                    >
                      {selected ? "● LIVE" : ""}
                    </span>
                  </button>

                  {/* expanded personal content under active tab */}
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        id={`panel-${d.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${d.id}`}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.38, ease: [...EASE] }}
                        className="overflow-hidden"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={d.id}
                            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
                            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
                            transition={{ duration: 0.32, ease: [...EASE] }}
                            className="pb-7 pl-4 pr-1 md:pl-6"
                          >
                            <p className="font-display text-lg md:text-xl font-semibold tracking-tight text-ink">
                              {d.word === "FULL-STACK" ? "Frontend to backend — real, usable products." : "Where software meets machine learning."}
                            </p>
                            <div className="mt-3 space-y-3 max-w-xl">
                              {d.intro.map((p, k) => (
                                <p
                                  key={k}
                                  className={`leading-relaxed text-[14px] md:text-[15px] ${k === 0 ? "text-ink/90" : "text-muted"}`}
                                >
                                  {p}
                                </p>
                              ))}
                            </div>

                            <p className="mt-6 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-muted">
                              {d.techLabel}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {d.tech.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] md:text-[11px] tracking-wide text-ink/80 hover:border-lime/50 hover:text-ink transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <p className="mt-6 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-muted">
                              SELECTED WORK
                            </p>
                            <div className="mt-2.5 space-y-2.5">
                              {d.work.map((w) => (
                                <div
                                  key={w.title}
                                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 md:p-4 hover:border-white/20 transition-colors"
                                >
                                  <p className="font-display text-[15px] md:text-base font-bold tracking-tight text-ink">
                                    {w.title}
                                    {w.org && <span className="font-medium text-cyan"> — {w.org}</span>}
                                  </p>
                                  <p className="mt-1.5 text-[13px] md:text-sm leading-relaxed text-muted">{w.desc}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: interactive animated signal panel */}
        <div className="relative min-h-[480px] lg:min-h-[560px] lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-surface p-5 md:p-8 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden />
          {!reduced && (
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `linear-gradient(to right, ${current.color}14 1px, transparent 1px)`,
                backgroundSize: "72px 72px",
              }}
              animate={{ backgroundPositionX: ["0px", "72px"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
          )}
          <div
            className="absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl opacity-30 transition-colors duration-500"
            style={{ background: current.color }}
            aria-hidden
          />
          <div className="relative flex h-full flex-col">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.3em] transition-colors duration-300" style={{ color: current.color }}>
                {current.signal}
              </p>
              <div className="flex gap-1" aria-hidden>
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-6 rounded-full transition-colors duration-300"
                    style={{ background: i === active ? current.color : "rgba(255,255,255,0.12)" }}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.38, ease: [...EASE] }}
              >
                {current.visual === "fullstack" ? (
                  <FullStackVisual color={current.color} reduced={reduced} />
                ) : (
                  <AiVisual color={current.color} reduced={reduced} />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-6" aria-hidden>
              <div className="flex items-center justify-between font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-muted">
                <span>{active === 0 ? "SYS.MONITOR v2.4" : "ML.RUNTIME v1.9"}</span>
                <span style={{ color: current.color }}>● {active === 0 ? "STABLE" : "LEARNING"}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                {FOCUS_AREAS.map((d, i) => (
                  <span
                    key={d.id}
                    className="h-1 flex-1 rounded-full transition-colors duration-300"
                    style={{ background: i === active ? d.color : "rgba(255,255,255,0.12)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <VelocityMarquee
        className="mt-16 border-y border-white/10 py-4"
        items={["BUILDER", "FULL-STACK", "AI / ML", "PROBLEM SOLVER", "SHIPPER"]}
      />
    </section>
  );
}
