"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "li" | "span";
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Subtle enter-viewport reveal. Content is fully visible without JS
 * (CSS `.no-js` / `prefers-reduced-motion` fallbacks); with JS we add
 * `.is-in` once via a single shared IntersectionObserver per element.
 */
export function Reveal({ children, as = "div", delay = 0, className = "", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as unknown as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
