"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KeyboardEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      buf = (buf + e.key.toLowerCase()).slice(-6);
      if (buf === "rupsha") {
        setShow(true);
        setTimeout(() => setShow(false), 3200);
        buf = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, rotate: -3 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-2xl border border-lime/50 bg-void px-6 py-4 shadow-2xl"
          role="status"
        >
          <p className="font-display font-bold text-lime">YOU TYPED MY NAME. WE&apos;RE BEST FRIENDS NOW.</p>
          <p className="font-mono text-[11px] text-muted tracking-widest">hire me and we&apos;ll never speak of this cheat code again ↗</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
