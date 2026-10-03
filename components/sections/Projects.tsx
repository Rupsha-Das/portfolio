"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, Code2, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { PROJECTS } from "@/lib/data";

function AnimeVisual({ accent }: { accent: string }) {
  const bars = [0.9, 0.5, 1.1, 0.7, 1.3, 0.6, 1.0];
  const vibes = ["DREAMY", "NIGHT", "ROMANTIC", "ENERGETIC"];
  const activeVibe = "DREAMY";
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[#0a0e16] md:min-h-[380px]" aria-hidden>
      {/* atmospheric animated background — same dark/glass language as Veda */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <motion.div
        animate={{ x: [-20, 20, -20], y: [-10, 12, -10] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute -left-16 top-8 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "rgba(125,238,255,0.14)" }}
      />
      <motion.div
        animate={{ x: [18, -18, 18], y: [12, -12, 12] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute -right-14 bottom-6 h-60 w-60 rounded-full blur-3xl"
        style={{ background: "rgba(139,92,255,0.16)" }}
      />
      {[
        { l: "12%", t: "18%", d: 5, s: 3 },
        { l: "78%", t: "14%", d: 6, s: 2 },
        { l: "65%", t: "70%", d: 7, s: 3 },
        { l: "28%", t: "78%", d: 5.5, s: 2 },
        { l: "48%", t: "38%", d: 6.5, s: 2 },
      ].map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [-8, 8, -8], opacity: [0.25, 0.6, 0.25] }}
          transition={{ repeat: Infinity, duration: p.d, ease: "easeInOut", delay: i * 0.4 }}
          className="absolute rounded-full bg-white"
          style={{ left: p.l, top: p.t, width: p.s, height: p.s }}
        />
      ))}

      <div className="absolute inset-0 p-6 md:p-8">
        {/* top status row — mirrors Veda's Q + timer row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center justify-between"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-widest text-white/70">
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            NOW PLAYING
          </span>
          <span className="rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-black" style={{ background: accent }}>
            ♪ 01:24 / 3:57
          </span>
        </motion.div>

        {/* main player card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base"
              style={{ background: `linear-gradient(135deg, ${accent}, #8B5CFF)`, color: "#06090f" }}
            >
              ♪
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">Midnight Drive — Anime OST</p>
              <p className="mt-0.5 font-mono text-[10px] tracking-widest text-white/50">ANIME SONG · STEREO</p>
            </div>
            {/* live equalizer */}
            <div className="flex h-6 items-end gap-1" aria-hidden>
              {bars.map((dur, i) => (
                <motion.span
                  key={i}
                  animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
                  transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay: i * 0.12 }}
                  className="w-1 rounded-full"
                  style={{ background: accent }}
                />
              ))}
            </div>
          </div>
          {/* progress */}
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: "20%" }}
              animate={{ width: ["20%", "42%", "20%"] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{ background: accent }}
            />
          </div>
          {/* controls */}
          <div className="mt-3 flex items-center justify-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70">
              <SkipBack size={13} />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-black" style={{ background: accent }}>
              <Play size={15} className="ml-0.5" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70">
              <SkipForward size={13} />
            </span>
            <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[9px] tracking-widest text-white/50 sm:inline-flex">
              <Pause size={10} /> MUSIC CONTINUES ↻
            </span>
          </div>
        </motion.div>

        {/* vibe / theme switcher */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Vibe — visual theme keeps playing</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {vibes.map((v) => {
              const active = v === activeVibe;
              return (
                <span
                  key={v}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-widest"
                  style={
                    active
                      ? { borderColor: accent, background: "rgba(255,255,255,0.06)", color: "#fff" }
                      : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.55)" }
                  }
                >
                  {active ? (
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: accent }}
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  )}
                  ○ {v}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-black" style={{ background: accent }}>
        MUSIC · LIVE
      </span>
    </div>
  );
}

function ProjectVisual({ accent, id }: { accent: string; id: string }) {
  if (id === "sophistai")
    return (
      <div className="relative h-full min-h-[280px] md:min-h-[380px] overflow-hidden bg-[#0c0e14]" aria-hidden>
        <div className="absolute inset-0 blueprint-grid" />
        <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full p-6">
          <circle cx="200" cy="120" r="34" fill="none" stroke={accent} strokeWidth="2" />
          <text x="200" y="126" textAnchor="middle" fill={accent} fontSize="11" fontFamily="monospace">SYLLABUS</text>
          {[["90,70", "150,100"], ["310,70", "250,100"], ["80,190", "150,145"], ["320,190", "250,145"], ["200,230", "200,160"]].map(([a, b], i) => {
            const [x1, y1] = a.split(",").map(Number);
            const [x2, y2] = b.split(",").map(Number);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.45" strokeDasharray="4 4" />;
          })}
          {[["UNIT 1", 90, 70], ["UNIT 2", 310, 70], ["MAP", 80, 190], ["QUIZ", 320, 190], ["+500 users", 200, 230]].map(([t, x, y]) => (
            <g key={t as string}>
              <rect x={(x as number) - 44} y={(y as number) - 14} width="88" height="28" rx="14" fill="#11131A" stroke="rgba(255,255,255,0.2)" />
              <text x={x as number} y={(y as number) + 4} textAnchor="middle" fill="#F5F3EE" fontSize="10" fontFamily="monospace">{t}</text>
            </g>
          ))}
        </svg>
        <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-black" style={{ background: accent }}>AI · LIVE</span>
      </div>
    );
  if (id === "veda-assessment")
    return (
      <div className="relative h-full min-h-[280px] md:min-h-[380px] overflow-hidden bg-[#0c0e16]" aria-hidden>
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="absolute inset-0 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-widest text-white/70">Q 04 / 20</span>
            <span className="rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-black" style={{ background: accent }}>● 12:30</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[35%] rounded-full" style={{ background: accent }} />
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
            <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
            <div className="mt-2 h-2.5 w-1/2 rounded-full bg-white/10" />
          </div>
          <div className="mt-3 space-y-2">
            {["Option A — Selected", "Option B", "Option C"].map((opt, i) => (
              <div
                key={opt}
                className="flex items-center justify-between rounded-xl border px-4 py-2.5 font-mono text-[11px]"
                style={i === 0
                  ? { borderColor: accent, background: "rgba(255,255,255,0.06)", color: "#fff" }
                  : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.55)" }}
              >
                <span>{opt}</span>
                <span className="h-2 w-2 rounded-full" style={{ background: i === 0 ? accent : "rgba(255,255,255,0.2)" }} />
              </div>
            ))}
          </div>
        </div>
        <span className="absolute left-4 top-4 hidden">assessment</span>
        <span className="absolute bottom-4 left-4 rounded-full bg-violet px-3 py-1 font-mono text-[10px] tracking-widest text-white" style={{ background: "rgba(139,92,255,0.9)" }}>ASSESSMENT · LIVE</span>
      </div>
    );
  if (id === "anime-project") return <AnimeVisual accent={accent} />;
  return (
    <div className="relative h-full min-h-[280px] md:min-h-[380px] overflow-hidden bg-[#0d0b14]" aria-hidden>
      <div className="absolute inset-0 p-6 font-mono text-[11px] leading-loose text-ink/70">
        <p><span className="text-violet">λ</span> tables.withFilters().paginate()</p>
        <div className="mt-3 space-y-2">
          {[90, 70, 82, 60].map((w, i) => (
            <div key={i} className="h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center px-3" style={{ width: `${w}%` }}>
              <span className="h-1.5 rounded-full" style={{ width: "40%", background: i === 0 ? accent : "rgba(255,255,255,0.15)" }} />
            </div>
          ))}
        </div>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-violet px-3 py-1 font-mono text-[10px] tracking-widest text-white">PROD PATTERNS</span>
    </div>
  );
}

function Card({ p, i, onOpen }: { p: (typeof PROJECTS)[number]; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sry, [0, 1], [5, -5]);
  const rotateY = useTransform(srx, [0, 1], [-6, 6]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const tilt = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rx.set((e.clientX - r.left) / r.width);
    ry.set((e.clientY - r.top) / r.height);
  };

  const flip = i % 2 === 1;
  const hasLive = Boolean(p.links.demo);
  const hasGithub = Boolean(p.links.github);
  const hasCaseStudy = hasLive;
  // Anime uses real screenshot preview — card click goes straight to live site per request
  const isAnimeLive = p.id === "anime-project" && hasLive;

  return (
    <motion.article
      ref={ref}
      onMouseMove={tilt}
      onMouseLeave={() => { rx.set(0.5); ry.set(0.5); }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid gap-0 overflow-hidden rounded-3xl border border-white/10 bg-surface lg:grid-cols-2 ${flip ? "" : ""}`}
      style={{ perspective: 1200 }}
    >
      {isAnimeLive ? (
        <motion.a
          href={p.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW →"
          data-cursor-variant="lens"
          aria-label={`Open ${p.title} live project (opens in new tab)`}
          style={{ rotateX, rotateY, y: parY, transformStyle: "preserve-3d" }}
          className={`relative block text-left ${flip ? "lg:order-2" : ""}`}
        >
          <ProjectVisual accent={p.accent} id={p.id} />
          <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-black transition-transform hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </motion.a>
      ) : hasCaseStudy ? (
        <motion.button
          onClick={onOpen}
          data-cursor="VIEW →"
          data-cursor-variant="lens"
          aria-label={`Open ${p.title} details`}
          style={{ rotateX, rotateY, y: parY, transformStyle: "preserve-3d" }}
          className={`relative block text-left ${flip ? "lg:order-2" : ""}`}
        >
          <ProjectVisual accent={p.accent} id={p.id} />
          <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-black transition-transform hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </motion.button>
      ) : hasGithub ? (
        <motion.a
          href={p.links.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="GITHUB →"
          aria-label={`${p.title} on GitHub (opens in new tab)`}
          style={{ rotateX, rotateY, y: parY, transformStyle: "preserve-3d" }}
          className={`relative block text-left ${flip ? "lg:order-2" : ""}`}
        >
          <ProjectVisual accent={p.accent} id={p.id} />
          <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-black transition-transform hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </motion.a>
      ) : hasLive ? (
        <motion.a
          href={p.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="LIVE →"
          aria-label={`Open ${p.title} live site (opens in new tab)`}
          style={{ rotateX, rotateY, y: parY, transformStyle: "preserve-3d" }}
          className={`relative block text-left ${flip ? "lg:order-2" : ""}`}
        >
          <ProjectVisual accent={p.accent} id={p.id} />
          <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-black transition-transform hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </motion.a>
      ) : (
        <motion.div
          style={{ rotateX, rotateY, y: parY, transformStyle: "preserve-3d" }}
          className={`relative block text-left ${flip ? "lg:order-2" : ""}`}
        >
          <ProjectVisual accent={p.accent} id={p.id} />
        </motion.div>
      )}
      <div className={`flex flex-col justify-center p-6 md:p-10 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-mono text-xs tracking-[0.3em]" style={{ color: p.accent }}>PROJECT {p.index}</p>
        <h3 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tighter">{p.title}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mt-1">{p.subtitle}</p>
        <p className="mt-4 text-lg text-ink/85 italic">“{p.hook}”</p>
        <div className="mt-5 flex flex-wrap gap-4">
          {p.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold" style={{ color: p.accent }}>{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-ink/70">{t}</span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {hasLive && (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LIVE →"
              aria-label={`View ${p.title} live (opens in new tab)`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black"
              style={{ background: p.accent }}
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {hasCaseStudy && (
            <button
              onClick={onOpen}
              data-cursor="OPEN →"
              className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-white/60"
            >
              Case study
            </button>
          )}
          {hasGithub && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CODE"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-white/60"
            >
              <Code2 size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId);

  return (
    <section id="work" aria-label="Projects" className="relative px-5 py-24 md:px-12 md:py-32 scroll-mt-24">
      <SectionHeading
        index="04"
        eyebrow="the main showcase"
        title={
          <>
            WORK THAT <span className="text-lime">SURVIVED</span>
            <br /> <span className="text-stroke">REAL USERS.</span>
          </>
        }
      />
      <div className="space-y-8 md:space-y-12">
        {PROJECTS.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-end sm:items-center justify-center bg-black/70 p-3 md:p-8 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} details`}
          >
            <motion.div
              layoutId={`project-${open.id}`}
              initial={{ y: 80, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 60, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-surface p-6 md:p-10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs tracking-[0.3em]" style={{ color: open.accent }}>PROJECT {open.index} — CASE STUDY</p>
                  <h3 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">{open.title}</h3>
                  <p className="text-muted">{open.subtitle}</p>
                </div>
                <button
                  onClick={() => setOpenId(null)}
                  aria-label="Close project details"
                  data-cursor="CLOSE"
                  className="rounded-full border border-white/20 p-2.5 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              <ProjectVisual accent={open.accent} id={open.id} />
              <p className="mt-6 leading-relaxed text-ink/85">{open.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {open.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px]">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {open.links.demo && (
                  <a href={open.links.demo} target="_blank" rel="noopener noreferrer" data-cursor="VISIT →" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black" style={{ background: open.accent }}>View live project <ArrowUpRight size={14} /></a>
                )}
                {open.links.github && (
                  <a href={open.links.github} target="_blank" rel="noopener noreferrer" data-cursor="CODE" className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest">GitHub</a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
