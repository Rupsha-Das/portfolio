"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  cursor,
  onClick,
  href,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  cursor?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
    setHover(false);
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      onClick={onClick}
      data-cursor={cursor}
      style={{ x: sx, y: sy }}
      className={`relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-widest uppercase transition-colors ${className}`}
    >
      <motion.span
        className="absolute inset-0 origin-bottom"
        animate={{ scaleY: hover ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{ background: "rgba(255,255,255,0.14)" }}
      />
      <motion.span
        animate={{ x: hover ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="relative z-10 inline-flex items-center gap-3"
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="inline-block"
        aria-label={typeof children === "string" ? children : undefined}
      >
        {inner}
      </a>
    );
  }
  return inner;
}
