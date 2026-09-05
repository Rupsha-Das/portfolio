"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { SectionHeading, RevealText } from "@/components/ui/primitives";

export default function Creator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20%" });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 320;
    let w = canvas.width;
    const h = canvas.height;
    const bars = Array.from({ length: 48 }, (_, i) => ({ h: Math.random(), s: 0.02 + Math.random() * 0.05, o: i }));
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const bw = w / bars.length;
      bars.forEach((b, i) => {
        b.h = 0.15 + Math.abs(Math.sin(t / 900 + i * 0.45)) * 0.75;
        const bh = b.h * h * 0.9;
        ctx.fillStyle = i % 9 === 0 ? "#D7FF3F" : i % 9 === 4 ? "#FF5C8A" : "rgba(139,92,255,0.55)";
        ctx.fillRect(i * bw + bw * 0.2, h - bh, bw * 0.6, bh);
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onResize = () => { canvas.width = canvas.offsetWidth * 2; w = canvas.width; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [inView]);

  return (
    <section aria-label="Creator and social media" className="relative px-5 py-24 md:px-12 md:py-32">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-surface to-void p-6 md:p-14 overflow-hidden relative">
        <div className="absolute -top-24 right-0 font-display font-bold text-[18vw] md:text-[10rem] leading-none text-white/[0.04] select-none pointer-events-none" aria-hidden>
          VIRAL
        </div>
        <SectionHeading
          index="07"
          eyebrow="yes, i exist on the internet"
          title={
            <>
              <RevealText text="CODE ISN'T THE" as="span" className="block" />
              <span className="block">ONLY THING <span className="text-coral">I SHIP.</span></span>
            </>
          }
        />
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="font-display font-bold tracking-tighter leading-none text-7xl md:text-8xl">
              MILLIONS
              <br />
              <span className="text-stroke">OF VIEWS</span>
            </p>
            <p className="mt-6 text-xl md:text-2xl leading-snug text-ink/90">
              “I build software, but I also know how to{" "}
              <span className="bg-lime text-black px-2 -rotate-1 inline-block font-bold">make people stop scrolling.</span>”
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] tracking-widest">
              {["CONTENT", "PERSONAL BRANDING", "PR", "OUTREACH", "COMMUNITY"].map((t) => (
                <span key={t} data-cursor={t} className="rounded-full border border-white/15 px-3 py-1.5 text-ink/70 hover:border-coral hover:text-coral transition-colors">{t}</span>
              ))}
            </div>
          </div>
          <div ref={wrapRef} className="rounded-2xl border border-white/10 bg-void/70 p-4">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted mb-2">LIVE // REACH MONITOR (totally scientific*)</p>
            <canvas ref={canvasRef} className="h-[160px] w-full" aria-hidden />
            <p className="mt-2 font-mono text-[10px] text-muted">* definitely real. the internet loves a builder with a personality.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
