import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ACCENT_BAR: Record<Project["accent"], string> = {
  moss: "bg-moss",
  clay: "bg-clay",
  ochre: "bg-ochre",
  skye: "bg-skye",
};

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card group relative overflow-hidden transition-colors hover:border-ink">
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 ${ACCENT_BAR[p.accent]}`} />
      <div className="grid gap-5 p-6 pl-7 md:grid-cols-12 md:p-8 md:pl-9">
        <div className="md:col-span-8">
          <p className="flex items-center gap-3">
            <span className="index-num font-display text-sm font-semibold text-clay">{p.index}</span>
            <span className="stamp">{p.facts[0] ? `${p.facts[0].value} · ${p.facts[0].label}` : "Case study"}</span>
          </p>
          <h3 className="t-h2 mt-3 font-display font-semibold">
            <Link
              href={`/work/${p.slug}`}
              className="decoration-clay underline-offset-4 hover:underline after:absolute after:inset-0"
            >
              {p.title}
            </Link>
          </h3>
          <p className="t-small mt-1 font-medium text-inksoft">{p.strapline}</p>
          <p className="t-small mt-4 max-w-2xl text-inksoft">
            <span className="font-semibold text-ink">Problem: </span>
            {p.problem}{" "}
            <span className="font-semibold text-ink">Outcome: </span>
            {p.outcome}
          </p>
          <div className="mt-4 flex flex-wrap gap-2" aria-label={`${p.title} stack`}>
            {p.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:col-span-4 md:items-end md:text-right">
          <p className="t-small text-inksoft">
            <span className="font-semibold text-ink">My role — </span>
            {p.role}
          </p>
          <div className="relative z-10 flex flex-wrap gap-2.5">
            <span
              aria-hidden
              className="btn btn-solid !min-h-11 !px-5 !py-2 !text-sm transition-transform group-hover:gap-3"
            >
              Read case study <ArrowRight size={16} aria-hidden />
            </span>
            {p.links.demo ? (
              <a
                href={p.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title} live site (opens in new tab)`}
                className="btn btn-ghost relative z-10 !min-h-11 !px-5 !py-2 !text-sm"
              >
                Live <ArrowUpRight size={15} aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork({ limit }: { limit?: number }) {
  const list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <section aria-label="Selected work" className="wrap scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title={
          <>
            A few projects, <span className="scribble">told properly</span>.
          </>
        }
        lede="Curated, not comprehensive. Each one gets a full case study — context, decisions, tradeoffs, and what I'd do differently."
      />
      <div className="grid gap-5">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i * 70, 210)}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      {limit && PROJECTS.length > limit ? (
        <Reveal>
          <Link href="/work" className="btn btn-ghost mt-8">
            All work & case studies <ArrowRight size={17} aria-hidden />
          </Link>
        </Reveal>
      ) : null}
    </section>
  );
}
