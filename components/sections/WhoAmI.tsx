"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, RevealText, VelocityMarquee } from "@/components/ui/primitives";
import { DIMENSIONS } from "@/lib/data";

function Visual({ kind, color }: { kind: string; color: string }) {
  if (kind === "code")
    return (
      <div className="font-mono text-[11px] leading-relaxed" aria-hidden>
        <p><span className="text-violet">const</span> <span className="text-ink">rupsha</span> <span className="text-muted">=</span> <span style={{ color }}>await build</span><span className="text-muted">(</span><span className="text-cyan">“weird idea”</span><span className="text-muted">)</span></p>
        <p className="text-muted">{"// ships to production, survives users"}</p>
        <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
          <span style={{ color }}>▊</span>
        </motion.p>
      </div>
    );
  if (kind === "ai")
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full" aria-hidden>
        {[20, 60, 100, 140, 180].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={20 + (i % 3) * 20} r="4" fill={color} opacity="0.9">
              <animate attributeName="r" values="3;6;3" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            {i < 4 && <line x1={x} y1={40} x2={x + 40} y2={40} stroke={color} strokeOpacity="0.35" strokeDasharray="4 4" />}
          </g>
        ))}
      </svg>
    );
  if (kind === "hardware")
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full" aria-hidden>
        <motion.path
          d="M10 60 H70 L90 40 H130 L150 55 H190"
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        {[70, 130, 190].map((x) => (
          <circle key={x} cx={x} cy={x === 190 ? 55 : x === 70 ? 60 : 40} r="4" fill="none" stroke={color} strokeWidth="2" />
        ))}
      </svg>
    );
  if (kind === "community")
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full" aria-hidden>
        {[[100, 40], [50, 20], [150, 20], [60, 62], [140, 62]].map(([x, y], i) => (
          <g key={i}>
            {i > 0 && <line x1={100} y1={40} x2={x} y2={y} stroke={color} strokeOpacity="0.4" />}
            <circle cx={x} cy={y} r={i === 0 ? 7 : 4} fill={i === 0 ? color : "none"} stroke={color} strokeWidth="2" />
          </g>
        ))}
      </svg>
    );
  return (
    <div className="flex items-end gap-1.5 h-20" aria-hidden>
      {[35, 60, 45, 80, 55, 70, 40, 65].map((h, i) => (
        <motion.span
          key={i}
          className="w-4 rounded-sm"
          style={{ background: i === 3 ? color : "rgba(245,243,238,0.25)" }}
          animate={{ height: [`${h}%`, `${h * 0.5}%`, `${h}%`] }}
          transition={{ repeat: Infinity, duration: 1.6 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function WhoAmI() {
  const [active, setActive] = useState(0);
  const current = DIMENSIONS[active];

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
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="max-w-md text-muted leading-relaxed mb-8">
            I&apos;m a full-stack developer who likes turning weird ideas into things people can
            actually use. But the work doesn&apos;t stop at code — hover the ingredients:
          </p>
          <div className="flex flex-col">
            {DIMENSIONS.map((d, i) => (
              <button
                key={d.word}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="FEEL →"
                className="group flex items-center gap-4 border-t border-white/10 py-3 md:py-4 text-left"
                aria-pressed={active === i}
              >
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <motion.span
                  animate={{
                    x: active === i ? 12 : 0,
                    color: active === i ? d.color : "#F5F3EE",
                    scale: active === i ? 1.06 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="font-display text-3xl md:text-5xl font-bold tracking-tight origin-left"
                >
                  {d.word}
                </motion.span>
                <span
                  className="ml-auto hidden sm:block font-mono text-xs transition-opacity"
                  style={{ color: d.color, opacity: active === i ? 1 : 0 }}
                >
                  {active === i ? "● LIVE" : ""}
                </span>
              </button>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
        <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-surface p-6 md:p-10 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden />
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30 transition-colors duration-500" style={{ background: current.color }} aria-hidden />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.3em] mb-6" style={{ color: current.color }}>
              SIGNAL // {current.word}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.word}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                <Visual kind={current.visual} color={current.color} />
                <p className="mt-6 text-lg md:text-2xl font-display font-medium leading-snug">{current.blurb}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-1.5" aria-hidden>
              {DIMENSIONS.map((d, i) => (
                <span
                  key={d.word}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{ background: i === active ? d.color : "rgba(255,255,255,0.12)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <VelocityMarquee
        className="mt-16 border-y border-white/10 py-4"
        items={["BUILDER", "CREATOR", "PROBLEM SOLVER", "SHIPPER", "EDGE TINKERER", "INTERNET NATIVE"]}
      />
    </section>
  );
}
