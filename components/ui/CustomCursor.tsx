"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<"dot" | "badge" | "lens">("dot");
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const id = requestAnimationFrame(() => setActive(true));
    document.documentElement.classList.add("custom-cursor-active");

    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
        if (t) {
          setLabel(t.dataset.cursor || null);
          setVariant(t.dataset.cursorVariant === "lens" ? "lens" : "badge");
        } else {
          const interactive = (e.target as HTMLElement)?.closest?.("a,button,[role=button]");
          setLabel(null);
          setVariant(interactive ? "badge" : "dot");
        }
      });
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!active) return null;

  const isBadge = label || variant !== "dot";

  return (
    <motion.div
      aria-hidden
      className="custom-cursor-el pointer-events-none fixed left-0 top-0 z-[99]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full font-mono font-bold"
        animate={{
          width: label ? 92 : isBadge ? 52 : 14,
          height: label ? 92 : isBadge ? 52 : 14,
          backgroundColor: label ? "#D7FF3F" : isBadge ? "rgba(215,255,63,0.16)" : "#D7FF3F",
          scale: down ? 0.82 : 1,
          rotate: label ? 8 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          border: isBadge && !label ? "1.5px solid #D7FF3F" : "none",
          backdropFilter: isBadge ? "blur(2px)" : "none",
          color: "#08090D",
        }}
      >
        {!label && !isBadge && <span className="block h-full w-full rounded-full bg-lime" />}
        {!label && isBadge && variant === "lens" && (
          <span className="block h-2 w-2 rounded-full bg-lime" />
        )}
        {label && (
          <span className="px-2 text-center text-[10px] leading-tight tracking-wide">{label}</span>
        )}
        {/* rotating ring for badge */}
        {isBadge && !label && (
          <motion.span
            className="absolute inset-[-6px] rounded-full border border-dashed border-lime/50"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
