"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Character-level kinetic reveal */
export function RevealText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p" | "div";
}) {
  const words = text.split(" ");
  let ci = 0;
  const MTag = motion[Tag] as typeof motion.span;
  return (
    <MTag className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          {w.split("").map((ch, i) => {
            const d = delay + (ci++) * 0.022;
            return (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block will-change-transform"
                initial={{ y: "115%", rotate: 6 }}
                whileInView={{ y: "0%", rotate: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 210, damping: 26, delay: d }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MTag>
  );
}

/* Section heading with index + rule */
export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-xs text-lime tracking-widest">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 origin-left bg-white/15"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{eyebrow}</span>
      </div>
      <div className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">{title}</div>
    </div>
  );
}

/* Animated counter */
export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setVal(to));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const dur = 1400;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* Scroll-velocity skewed marquee */
export function VelocityMarquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const skew = useTransform(sx, [-2000, 2000], [-6, 6]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      mx.set(mx.get() + (y - last) * 2.2);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mx]);

  const row = [...items, ...items, ...items];
  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x: sx, skewX: skew }} className="marquee-track inline-flex items-center gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className="font-display text-2xl md:text-4xl font-bold tracking-tight text-ink/90">{t}</span>
            <span className="h-2 w-2 rounded-full" style={{ background: i % 3 === 0 ? "#D7FF3F" : i % 3 === 1 ? "#8B5CFF" : "#FF5C8A" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* Magnetic inline link */
export function AnimatedLink({ href, children, cursor }: { href: string; children: React.ReactNode; cursor?: string }) {
  return (
    <a href={href} data-cursor={cursor} className="group relative inline-flex items-center gap-1 font-medium">
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-lime transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </a>
  );
}
