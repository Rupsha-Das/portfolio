"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, FileText, Download, Copy, Check, Phone, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useActiveResume } from "@/components/ui/UseActiveResume";
import { SectionHeading, RevealText } from "@/components/ui/primitives";
import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import ContactForm from "./ContactForm";

export function Resume() {
  const resume = useActiveResume();
  return (
    <section aria-label="Resume" className="px-5 py-16 md:px-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-lime/30 bg-lime text-black p-8 md:p-14">
        <motion.span
          aria-hidden
          className="absolute -right-6 -top-8 font-display font-bold text-[26vw] md:text-[12rem] leading-none opacity-10 select-none"
          animate={{ rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          CV↗
        </motion.span>
        <p className="font-mono text-xs tracking-[0.3em]">08 // THE FORMAL VERSION</p>
        <h2 className="mt-3 font-display text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
          WANT THE<br />FORMAL VERSION?
        </h2>
        <p className="mt-4 max-w-md font-medium text-black/70">
          One page. No chaos. All the proof — plus the wins. <span className="font-mono text-xs">({resume.version} · {resume.uploadedAt})</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN CV →"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold uppercase tracking-widest text-lime hover:bg-void transition-colors"
          >
            <FileText size={16} /> View CV
          </a>
          <a
            href={resume.fileUrl}
            download="Rupsha-Das-CV.pdf"
            data-cursor="SAVE ↓"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-lime transition-colors"
          >
            <Download size={16} /> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <button
      onClick={copy}
      data-cursor={copied ? "COPIED!" : "COPY →"}
      className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-void/60 px-5 py-3 font-mono text-sm hover:border-lime/60 transition-colors"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <Mail size={15} className="text-lime" />
      <span className="break-all">{PROFILE.email}</span>
      {copied ? <Check size={15} className="text-lime shrink-0" /> : <Copy size={15} className="text-muted group-hover:text-lime shrink-0" />}
    </button>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="contact" aria-label="Contact" className="relative px-5 pt-24 pb-10 md:px-12 md:pt-32 scroll-mt-24 overflow-hidden">
      <SectionHeading index="09" eyebrow="last call" title={<RevealText text="GOT AN IDEA?" as="span" />} />
      <h2 className="font-display font-bold tracking-tighter leading-[0.9]">
        <motion.span style={{ x: x1 }} className="block text-[13vw] md:text-[8.5vw]">
          LET&apos;S BUILD
        </motion.span>
        <motion.span style={{ x: x2 }} className="block text-[13vw] md:text-[8.5vw] text-stroke">
          SOMETHING
        </motion.span>
        <motion.span className="block text-[13vw] md:text-[8.5vw]">
          GREAT<span className="text-lime">.</span>
        </motion.span>
      </h2>

      {/* direct channels */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <CopyEmail />
        <a
          href={PROFILE.phoneHref}
          data-cursor="CALL →"
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-void/60 px-5 py-3 font-mono text-sm hover:border-violet/70 transition-colors"
          aria-label={`Call ${PROFILE.phone}`}
        >
          <Phone size={15} className="text-violet" />
          {PROFILE.phone}
        </a>
      </div>

      {/* socials — large interactive typography */}
      <div className="mt-8 grid gap-3">
        {SOCIAL_LINKS.map((s, i) => (
          <motion.a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={s.cursor}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-5 md:px-8 py-5 md:py-6 hover:border-lime/60 hover:bg-surface2 transition-colors"
            aria-label={`${s.platform} — ${s.handle} (opens in new tab)`}
          >
            <span className="flex items-baseline gap-4 min-w-0">
              <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
              <span className="font-display text-2xl md:text-4xl font-bold tracking-tight group-hover:text-lime transition-colors">{s.label}</span>
              <span className="hidden sm:inline font-mono text-xs text-muted truncate">{s.handle}</span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all group-hover:rotate-45 group-hover:bg-lime group-hover:text-black group-hover:border-lime">
              <ArrowUpRight size={18} />
            </span>
          </motion.a>
        ))}
      </div>

      {/* form */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center rounded-3xl border border-violet/30 bg-surface p-6 md:p-8">
          <p className="font-mono text-[11px] tracking-[0.3em] text-violet">PREFER EMAIL?</p>
          <p className="mt-3 font-display text-2xl font-bold leading-tight">
            Skip the form.<br />Hit my inbox directly.
          </p>
          <div className="mt-6">
            <MagneticButton href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Let's build something great")}`} cursor="SAY HI →" className="bg-violet text-white border border-violet">
              {PROFILE.email} <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
          <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted tracking-wider">
            PHONE (NO SPAM, I BITE):<br />
            <a href={PROFILE.phoneHref} data-cursor="CALL →" className="text-ink hover:text-lime">{PROFILE.phone}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
