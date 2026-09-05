"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { EXPERIENCE } from "@/lib/data";

function Chapter({ exp, i }: { exp: (typeof EXPERIENCE)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const clip = useTransform(scrollYProgress, [0.15, 0.45], ["inset(8% 4% 8% 4% round 24px)", "inset(0% 0% 0% 0% round 24px)"]);

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-12 lg:gap-10 items-start">
      {/* sticky meta */}
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-7xl md:text-8xl font-bold tracking-tighter"
          style={{ color: exp.color }}
        >
          {exp.index}
        </motion.p>
        <h3 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">{exp.company}</h3>
        <p className="mt-1 text-lg" style={{ color: exp.color }}>{exp.role}</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-xs tracking-widest text-muted">
          <MapPin size={13} /> {exp.location.toUpperCase()} · {exp.period}
        </p>
      </div>

      {/* visual chapter card */}
      <motion.div style={{ clipPath: clip }} className="lg:col-span-8 rounded-3xl border border-white/10 bg-surface overflow-hidden">
        <motion.div style={{ y: imgY }} className="relative p-6 md:p-10">
          <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden />
          {/* decorative fragment */}
          <div className="relative mb-6 flex items-center gap-2 font-mono text-[11px] text-muted" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            <span className="h-2.5 w-2.5 rounded-full bg-violet" />
            <span className="ml-3 tracking-widest">{exp.id === "zedblox" ? "~/admin-console — prod" : "~/edge-rig — /dev/ttyUSB0"}</span>
          </div>
          {exp.id === "zedblox" ? (
            <div className="relative rounded-xl border border-white/10 bg-void/80 p-4 font-mono text-xs leading-relaxed" aria-hidden>
              <p><span className="text-violet">GET</span> <span className="text-cyan">/api/devices?page=3&filter=online</span> <span className="text-lime">200</span> <span className="text-muted">42ms</span></p>
              <p className="text-muted">{"{ analytics: live, pagination: routable, filters: synced }"}</p>
              <div className="mt-3 flex gap-2">
                {["/devices", "/analytics", "/assistant"].map((r) => (
                  <span key={r} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-ink/80">{r}</span>
                ))}
              </div>
              <motion.div
                className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ width: "5%" }}
                  whileInView={{ width: "86%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: exp.color }}
                />
              </motion.div>
            </div>
          ) : (
            <div className="relative rounded-xl border border-white/10 bg-void/80 p-4 font-mono text-xs" aria-hidden>
              <p><span className="text-cyan">$</span> edge-infer --model yolov5n-int8 --src /dev/cam0</p>
              <p className="text-muted">[frame 0420] person 0.91 · obstacle 0.77 · <span style={{ color: exp.color }}>14ms</span></p>
              <svg viewBox="0 0 300 60" className="mt-3 h-14 w-full">
                <rect x="40" y="8" width="90" height="44" fill="none" stroke={exp.color} strokeWidth="1.5" strokeDasharray="5 4" />
                <rect x="170" y="14" width="70" height="32" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeDasharray="5 4" />
                <text x="46" y="30" fill={exp.color} fontSize="10" fontFamily="monospace">obstacle .77</text>
              </svg>
            </div>
          )}
          <p className="relative mt-6 text-ink/85 leading-relaxed">{exp.summary}</p>
          <ul className="relative mt-4 space-y-2">
            {exp.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-muted">
                <span style={{ color: exp.color }}>→</span> {b}
              </li>
            ))}
          </ul>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {exp.tags.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: ti * 0.05 }}
                data-cursor={t}
                className="rounded-full border border-white/15 bg-void/60 px-3 py-1.5 font-mono text-[11px] tracking-wider hover:border-current transition-colors"
                style={{ ["--tw-text-opacity" as string]: 1 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {i === 0 && (
        <div className="lg:col-span-12 flex items-center gap-4 py-2 font-mono text-[11px] tracking-[0.3em] text-muted" aria-hidden>
          <span className="h-px flex-1 bg-white/10" />
          SCROLL → NEXT CHAPTER
          <span className="h-px flex-1 bg-white/10" />
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative px-5 py-24 md:px-12 md:py-32 scroll-mt-24">
      <SectionHeading
        index="03"
        eyebrow="where i've worked"
        title={
          <>
            A SHORT, <span className="text-violet">DENSE</span>
            <br /> JOURNEY<span className="text-lime">.</span>
          </>
        }
      />
      <div className="space-y-16 md:space-y-24">
        {EXPERIENCE.map((exp, i) => (
          <Chapter key={exp.id} exp={exp} i={i} />
        ))}
      </div>
    </section>
  );
}
