"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useActiveResume } from "@/components/ui/UseActiveResume";
import { META_CHIPS, PROFILE } from "@/lib/data";

function Chip({ chip, i, sx, sy }: { chip: string; i: number; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring> }) {
  const x = useTransform(sx, (v: number) => v * (14 + i * 7));
  const y = useTransform(sy, (v: number) => v * (10 + i * 5));
  return (
    <motion.span
      initial={{ opacity: 0, y: 14, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 1.5 }}
      transition={{ delay: 1.5 + i * 0.1, type: "spring", stiffness: 200, damping: 18 }}
      style={{ x, y }}
      className={`rounded-full border px-3 py-1.5 font-mono text-[10px] md:text-[11px] tracking-[0.2em] ${
        i === 0
          ? "border-lime/60 text-lime"
          : i === 4
            ? "border-coral/60 text-coral"
            : "border-white/20 text-ink/70"
      } bg-void/60 backdrop-blur-sm`}
    >
      {chip}
    </motion.span>
  );
}

function CharReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ delay: delay + i * 0.035, type: "spring", stiffness: 200, damping: 24 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const resume = useActiveResume();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgX = useTransform(sx, (v: number) => v * 60);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouse}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-12 md:pb-14 blueprint-grid"
    >
      {/* faint giant backdrop wordmark, scroll-reactive */}
      <motion.div style={{ y: bgY, opacity: fade }} aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.span
          style={{ x: bgX }}
          className="font-display font-bold leading-none tracking-tighter text-transparent text-stroke opacity-[0.16] select-none text-[22vw]"
        >
          RUPSHA
        </motion.span>
      </motion.div>

      {/* orbiting dot intro element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="absolute left-5 md:left-12 top-24 flex items-center gap-3"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
        </span>
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-ink/80"
        >
          RUPSHA DAS / 2026
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute right-5 md:right-12 top-24 hidden sm:block font-mono text-[11px] tracking-[0.25em] text-muted"
      >
        KOLKATA → HYDERABAD → INTERNET
      </motion.p>

      {/* animated line draws itself */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[132px] md:top-[136px] h-px origin-left bg-gradient-to-r from-lime via-violet to-transparent"
        aria-hidden
      />

      <div className="relative z-10">
        {/* multidimensional identity chips */}
        <div className="mb-6 flex flex-wrap gap-2 md:gap-3" aria-label="Areas of work">
          {META_CHIPS.map((chip, i) => (
            <Chip key={chip} chip={chip} i={i} sx={sx} sy={sy} />
          ))}
        </div>

        <h1 className="font-display font-bold leading-[0.88] tracking-tighter">
          <span className="block text-[13.5vw] md:text-[9.5vw]">
            <CharReveal text="RUPSHA DAS" delay={0.7} />
          </span>
        </h1>

        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 1.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 inline-block -rotate-1 bg-violet px-4 py-2 md:px-6 md:py-3"
        >
          <p className="font-display text-lg md:text-3xl font-bold tracking-tight text-white">
            FULL-STACK DEVELOPER
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-display text-xl md:text-3xl font-medium leading-snug"
        >
          “{PROFILE.tagline}”
        </motion.p>

        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base md:text-lg leading-relaxed text-ink/75 md:col-span-6"
          >
            {PROFILE.supporting}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end"
          >
            <MagneticButton
              href="#work"
              cursor="EXPLORE ↓"
              className="bg-lime text-black hover:text-black border border-lime"
            >
              Explore my work <ArrowDown size={16} />
            </MagneticButton>
            <MagneticButton
              href={resume.fileUrl}
              target="_blank"
              cursor="OPEN CV →"
              className="border border-white/25 text-ink hover:border-coral"
            >
              View CV <ArrowUpRight size={16} />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="mt-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-muted"
        >
          <span>SCROLL FOR THE CHAOS ↓</span>
          <span className="hidden sm:inline">60FPS · NO TEMPLATES · EST. CURIOSITY</span>
          <span className="text-lime">● OPEN TO WORK</span>
        </motion.div>
      </div>
    </section>
  );
}
