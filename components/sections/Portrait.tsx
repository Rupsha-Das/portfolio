"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Editorial monogram card (legacy, currently unmounted).
 * Previously rendered the real photograph at `/profile.jpg`; the photo
 * was intentionally removed and this now renders only the monogram
 * placeholder. The live site uses `LivingPortrait` + `ArtGallery` instead.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sry, [0, 1], [6, -6]);
  const rotateY = useTransform(srx, [0, 1], [-8, 8]);
  const glareX = useTransform(srx, [0, 1], ["20%", "80%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rx.set((e.clientX - r.left) / r.width);
    ry.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    rx.set(0.5);
    ry.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      data-cursor="MONOGRAM"
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative aspect-[4/5]">
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet/40 via-surface to-void p-8 text-center">
          <p className="font-display text-7xl font-bold tracking-tighter text-lime">R.</p>
          <p className="font-mono text-[11px] tracking-[0.25em] text-muted">
            THE BUILDER, UNFILTERED
          </p>
        </div>
        {/* grain sweep + glare on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            x: glareX,
            background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 font-mono text-[10px] tracking-[0.25em] text-muted">
        <span>FIG.02 — THE BUILDER</span>
        <span className="text-lime">● UNFILTERED</span>
      </div>
    </motion.div>
  );
}
