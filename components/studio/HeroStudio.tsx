"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/content";
import { LivingPortrait } from "@/components/studio/LivingPortrait";
import { Reveal } from "@/components/ui/Reveal";
import { useActiveResume } from "@/components/ui/UseActiveResume";

export function HeroStudio() {
  const resume = useActiveResume();

  return (
    <section aria-label="Introduction" className="ruled border-b border-line">
      <div className="wrap flex flex-col gap-8 pb-14 pt-10 md:pt-16">
        <Reveal>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="tag">
              <MapPin size={12} aria-hidden /> {PROFILE.location}
            </span>
            <span className="tag">
              <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-moss" />
              {PROFILE.availability}
            </span>
          </p>
        </Reveal>

        {/* Identity: dominant name + small portrait signature on its right.
            The name and portrait share one wrapping flex row so they stay
            together: side-by-side when they fit, wrapping gracefully on
            narrow phones. Never clips, never scrolls sideways. */}
        <Reveal delay={70}>
          <div className="hero-identity">
            <h1 className="t-hero hero-name font-display font-black">
              <span className="hero-name-row">
                <span className="hero-name-text">
                  Rupsha Das
                  <span className="text-clay">.</span>
                </span>
                <LivingPortrait />
              </span>
              <span className="mt-2 block text-[0.42em] font-medium italic leading-tight tracking-normal text-inksoft">
                {PROFILE.role} — <span className="scribble text-ink">reliable software</span>,
                honestly built.
              </span>
            </h1>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="t-lede max-w-xl text-inksoft">{PROFILE.standpoints}</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="hero-actions">
            <Link href="/work" className="btn btn-solid">
              View selected work <ArrowDown size={17} aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact me <ArrowUpRight size={17} aria-hidden />
            </Link>
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <FileText size={17} aria-hidden /> Resume
            </a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <ul aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-small inline-flex min-h-11 items-center font-medium text-inksoft underline decoration-line underline-offset-4 hover:text-clay"
                >
                  {s.platform}
                  <span className="sr-only"> — {s.handle} (opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
