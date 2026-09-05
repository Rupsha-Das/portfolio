"use client";

import { motion } from "framer-motion";
import { Trophy, Cpu, Users, Megaphone } from "lucide-react";
import { SectionHeading, Counter } from "@/components/ui/primitives";
import { ACHIEVEMENTS } from "@/lib/data";

const ICONS = [Trophy, Cpu, Users, Megaphone];

export default function Achievements() {
  return (
    <section aria-label="Achievements" className="relative px-5 py-24 md:px-12 md:py-32">
      <SectionHeading
        index="06"
        eyebrow="proof, not promises"
        title={
          <>
            THINGS THAT <span className="text-stroke">SOMEHOW</span>
            <br /> WORKED<span className="text-coral">.</span>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 140, damping: 18 }}
              data-cursor="WOW"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 hover:border-lime/50 transition-colors"
            >
              <Icon size={22} className="text-lime" aria-hidden />
              <p className="mt-4 font-display text-5xl md:text-6xl font-bold tracking-tighter">
                {a.isMillions ? (
                  <span>2M+</span>
                ) : (
                  <Counter to={a.value} suffix={a.suffix} />
                )}
              </p>
              <p className="mt-2 font-semibold leading-snug">{a.label}</p>
              <p className="font-mono text-[11px] text-muted tracking-wider mt-1">{a.note}</p>
              <span className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-lime/10 blur-2xl group-hover:bg-lime/25 transition-colors" aria-hidden />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
