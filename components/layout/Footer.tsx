"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const JOKES = [
  "Built with caffeine, curiosity & questionable amounts of CSS.",
  "No cubes were floated in the making of this site.",
  "404: generic portfolio not found.",
  "Yes, the cursor is judging your scroll speed.",
  "sudo hire rupsha — permission granted.",
];

export default function Footer() {
  const [joke, setJoke] = useState(0);
  return (
    <footer className="border-t border-white/10 px-5 md:px-12 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="font-display font-bold tracking-tight">
          RUPSHA DAS © 2026
        </p>
        <p className="font-mono text-[11px] tracking-[0.25em] text-muted">
          FULL-STACK DEVELOPER / BUILDER / CREATOR
        </p>
        <button
          onClick={() => setJoke((joke + 1) % JOKES.length)}
          data-cursor="LOL"
          className="font-mono text-xs text-muted hover:text-lime transition-colors text-left"
          aria-label="Cycle footer joke"
        >
          <motion.span key={joke} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            “{JOKES[joke]}” <span className="text-lime">(click me)</span>
          </motion.span>
        </button>
      </div>
    </footer>
  );
}
