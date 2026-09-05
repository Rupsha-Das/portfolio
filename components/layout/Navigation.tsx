"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nameClick = () => {
    const n = clicks + 1;
    setClicks(n);
    if (n === 5) {
      document.body.classList.add("chaos-mode");
      setTimeout(() => {
        document.body.classList.remove("chaos-mode");
        setClicks(0);
        alert("okay okay — you found it. Rupsha mode: UNLEASHED. (there is no normal mode)");
      }, 2500);
    } else if (n > 2) {
      // subtle wiggle hint
    }
    if (n > 5) setClicks(0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 20 }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={`flex items-center gap-6 md:gap-8 rounded-full border px-5 md:px-7 py-3 backdrop-blur-xl transition-all duration-500 ${
            scrolled ? "border-white/15 bg-void/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)]" : "border-white/10 bg-void/40"
          }`}
        >
          <button
            onClick={nameClick}
            data-cursor={clicks >= 2 ? "AGAIN?" : "HI :)"}
            className="font-display font-bold tracking-tight text-sm md:text-base"
            aria-label="Rupsha Das — click 5 times for a surprise"
            title="psst… click me 5 times"
          >
            RUPSHA<span className="text-lime">.</span>
            <span className="ml-2 hidden sm:inline font-mono text-[10px] font-normal text-muted tracking-widest">©2026</span>
          </button>
          <span className="hidden md:block h-4 w-px bg-white/15" />
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor="GO →"
                className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-ink/80 hover:text-ink transition-colors"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-lime transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            data-cursor="SAY HI"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-[12px] font-bold uppercase tracking-widest text-black hover:bg-white transition-colors"
          >
            Hire me?
          </a>
          <button
            className="md:hidden font-mono text-xs tracking-widest text-lime"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[75] flex flex-col justify-center gap-2 bg-surface px-8 md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="font-display text-5xl font-bold tracking-tight hover:text-lime transition-colors"
              >
                <span className="font-mono text-xs text-violet mr-3">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
            <p className="mt-8 font-mono text-xs text-muted">dasrupsha2020@gmail.com — say hi :)</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
