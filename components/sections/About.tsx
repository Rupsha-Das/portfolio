"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/primitives";
import { BIO_PIECES } from "@/lib/data";
import Portrait from "./Portrait";

const FACTS = [
  { k: "DEGREE", v: "B.Tech — Computer Science & Engineering, 2022–2026" },
  { k: "SCHOOL", v: "University of Kalyani · DGPA 7.36" },
  { k: "STACK", v: "Full-Stack · AI/ML · Embedded Systems" },
  { k: "EXTRA", v: "Product · Content · Community · PR & Outreach" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="about" aria-label="About me" className="relative px-5 py-24 md:px-12 md:py-32 scroll-mt-24">
      <SectionHeading
        index="02"
        eyebrow="about — the human"
        title={
          <>
            WEIRD IDEAS,
            <br />
            <span className="text-stroke">SHIPPED WITH CARE.</span>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Portrait />
        </div>
        <div className="lg:col-span-8">
          {/* bio in digestible editorial pieces */}
          <div className="max-w-3xl space-y-5">
            <p className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-[1.08]">
              {BIO_PIECES[0].split("thoughtful, high-impact")[0]}
              <span className="text-lime">thoughtful, high-impact</span> digital experiences.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <p className="border-l-2 border-violet pl-4 text-ink/80 leading-relaxed">{BIO_PIECES[1]}</p>
              <p className="border-l-2 border-coral pl-4 text-ink/80 leading-relaxed">{BIO_PIECES[2]}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <motion.div style={{ y: drift }} className="md:col-span-4 rounded-2xl border border-lime/30 bg-surface p-6 -rotate-1">
              <p className="font-mono text-[11px] tracking-[0.3em] text-lime mb-4">CURRENTLY</p>
              <ul className="font-display text-2xl font-bold leading-tight space-y-1">
                <li>Building<span className="text-lime">.</span></li>
                <li>Learning<span className="text-violet">.</span></li>
                <li>Shipping<span className="text-coral">.</span></li>
                <li>Exploring<span className="text-cyan">.</span></li>
              </ul>
              <p className="mt-4 text-sm text-muted">Fresh out of B.Tech, dangerous with free time.</p>
            </motion.div>

            <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1 : -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 160, damping: 20 }}
                  data-cursor="FACT"
                  className="rounded-2xl border border-white/10 bg-surface2/60 p-6 hover:border-violet/60 transition-colors"
                >
                  <p className="font-mono text-[11px] tracking-[0.3em] text-muted">{f.k}</p>
                  <p className="mt-3 font-display text-xl font-semibold leading-snug">{f.v}</p>
                </motion.div>
              ))}
              <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="sm:col-span-2 border-l-2 border-coral pl-5 text-muted italic leading-relaxed"
              >
                “Code gets you a demo. Product thinking + communication gets you users. I want both —
                plus hardware that occasionally humbles you.”
              </motion.blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
