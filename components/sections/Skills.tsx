"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/primitives";
import { SKILLS, SKILL_LINKS } from "@/lib/data";

const POS: Record<string, [number, number]> = {
  JavaScript: [18, 26], TypeScript: [32, 18], React: [47, 26], "Next.js": [62, 18],
  Redux: [52, 42], "Tailwind CSS": [66, 36], "Framer Motion": [78, 28], "Radix UI": [86, 42],
  HTML: [30, 40], CSS: [20, 44], "Node.js": [80, 56], "Express.js": [90, 66],
  MongoDB: [78, 78], Python: [18, 62], "AI / ML": [32, 68], OpenAI: [44, 60],
  Gemini: [54, 68], YOLOv5: [64, 60], "Edge AI": [74, 68], "ESP32-S3": [88, 80],
  Django: [16, 78], Flask: [28, 80], Java: [10, 58], "C++": [8, 70],
  C: [12, 88], SQL: [40, 84], MySQL: [50, 90], Docker: [62, 88],
  AWS: [72, 90], Git: [82, 90], GitHub: [90, 90], Figma: [40, 52],
  FFmpeg: [60, 78], Linux: [24, 90],
};

const GROUP_COLOR: Record<string, string> = {
  web: "#D7FF3F", ml: "#8B5CFF", core: "#9A9BA3", edge: "#7DEEFF", tool: "#FF5C8A",
};

export default function Skills() {
  const [hover, setHover] = useState<string | null>(null);

  const neighbors = useMemo(() => {
    if (!hover) return new Set<string>();
    const s = new Set<string>([hover]);
    SKILL_LINKS.forEach(([a, b]) => {
      if (a === hover) s.add(b);
      if (b === hover) s.add(a);
    });
    return s;
  }, [hover]);

  return (
    <section aria-label="Skills" className="relative px-5 py-24 md:px-12 md:py-32">
      <SectionHeading
        index="05"
        eyebrow="things i build with"
        title={
          <>
            A LIVING <span className="text-violet">SKILL FIELD</span><span className="text-lime">.</span>
          </>
        }
      />
      <p className="max-w-xl text-muted mb-8">Not a tag cloud. Hover a technology — its friends light up. <span className="text-ink">React ↔ Next.js ↔ TypeScript. Python ↔ ML ↔ YOLO. ESP32 ↔ edge.</span></p>

      {/* desktop constellation */}
      <div
        className="relative hidden md:block rounded-3xl border border-white/10 bg-surface overflow-hidden"
        style={{ height: 520 }}
        onMouseLeave={() => setHover(null)}
      >
        <div className="absolute inset-0 blueprint-grid" aria-hidden />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {SKILL_LINKS.map(([a, b]) => {
            const pa = POS[a];
            const pb = POS[b];
            if (!pa || !pb) return null;
            const lit = hover && (a === hover || b === hover || (neighbors.has(a) && neighbors.has(b)));
            return (
              <line
                key={`${a}-${b}`}
                x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]}
                stroke={lit ? "#D7FF3F" : "rgba(255,255,255,0.14)"}
                strokeWidth={lit ? 0.5 : 0.25}
                strokeDasharray="1.5 1.2"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {SKILLS.map((s) => {
          const [x, y] = POS[s.name] ?? [50, 50];
          const isHover = hover === s.name;
          const isNeighbor = neighbors.has(s.name);
          const dim = hover && !isNeighbor;
          return (
            <button
              key={s.name}
              onMouseEnter={() => setHover(s.name)}
              onFocus={() => setHover(s.name)}
              data-cursor={s.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 font-mono text-xs tracking-wider backdrop-blur transition-all"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: isHover || isNeighbor ? GROUP_COLOR[s.group] : "rgba(255,255,255,0.18)",
                color: isHover || isNeighbor ? GROUP_COLOR[s.group] : "#F5F3EE",
                background: isHover ? "rgba(215,255,63,0.08)" : "rgba(8,9,13,0.75)",
                opacity: dim ? 0.3 : 1,
                transform: `translate(-50%,-50%) scale(${isHover ? 1.25 : isNeighbor ? 1.1 : 1})`,
              }}
            >
              {s.name}
            </button>
          );
        })}
        <p className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.3em] text-muted" aria-hidden>
          FIG.05 — TECH CONSTELLATION · HOVER TO TRACE
        </p>
      </div>

      {/* mobile chips */}
      <div className="flex flex-wrap gap-2 md:hidden">
        {SKILLS.map((s, i) => (
          <motion.span
            key={s.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.03, 0.5) }}
            className="rounded-full border border-white/15 bg-surface px-3.5 py-2 font-mono text-xs"
            style={{ color: GROUP_COLOR[s.group] }}
          >
            {s.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
