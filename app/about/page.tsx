import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { ArtGallery } from "@/components/studio/ArtGallery";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rupsha Das — full-stack developer: engineering philosophy, collaboration style, creative interests, and what I'm exploring right now.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Rupsha Das",
    description:
      "Engineering philosophy, collaboration style, and right-now notes from Rupsha Das.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <Reveal>
        <p className="stamp">About — the human · 01/01</p>
        <h1 className="t-h1 mt-4 max-w-3xl font-display font-semibold text-balance">
          I&apos;m Rupsha. I build software the way a good editor{" "}
          <em className="italic">edits</em> — cut the noise, keep the meaning.
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <ArtGallery compact />
          </div>
        </Reveal>
        <div className="grid gap-10 lg:col-span-8">
          <Reveal>
            <section aria-label="Introduction">
              {ABOUT.intro.map((p) => (
                <p key={p.slice(0, 24)} className="t-small mt-4 max-w-2xl text-inksoft first:mt-0 first:text-lg first:text-ink first:leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Engineering philosophy">
              <h2 className="t-h2 font-display font-semibold">How I think about building</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {ABOUT.philosophy.map((f, i) => (
                  <div key={f.title} className="card p-5">
                    <p className="index-num font-display text-sm font-semibold text-clay">
                      P.{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{f.title}</h3>
                    <p className="t-small mt-2 text-inksoft">{f.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Problems I enjoy" className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="t-h2 font-display font-semibold">Problems I enjoy</h2>
                <ul className="mt-4 space-y-2.5">
                  {ABOUT.problems.map((p) => (
                    <li key={p} className="t-small flex gap-2.5 text-inksoft">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="t-h2 font-display font-semibold">How I collaborate</h2>
                <ul className="mt-4 space-y-2.5">
                  {ABOUT.collaboration.map((p) => (
                    <li key={p} className="t-small flex gap-2.5 text-inksoft">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Facts" className="card p-6 md:p-8">
              <h2 className="t-h2 font-display font-semibold">Field notes</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {ABOUT.facts.map((f) => (
                  <div key={f.k} className="border-t-2 border-dashed border-line pt-3">
                    <dt className="stamp">{f.k}</dt>
                    <dd className="t-small mt-1.5 font-semibold">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <Reveal>
            <section aria-label="Right now" className="rounded-2xl bg-ink p-6 text-paper md:p-8">
              <p className="stamp !text-ochre">Right now · {new Date().getFullYear()}</p>
              <h2 className="t-h2 mt-2 font-display font-semibold">Currently exploring</h2>
              <ul className="mt-4 space-y-2.5">
                {ABOUT.rightNow.map((r) => (
                  <li key={r} className="t-small flex gap-2.5 text-paper/85">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href="/work"
                className="btn mt-6 border border-paper/40 text-paper hover:bg-paper hover:text-ink"
              >
                See what this thinking produces <ArrowRight size={17} aria-hidden />
              </Link>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
