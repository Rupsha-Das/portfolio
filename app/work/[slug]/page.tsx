import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProject } from "@/lib/content";
import { CaseBody } from "@/components/studio/CaseBody";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Case study not found" };
  const description = `${p.strapline} ${p.outcome}`.slice(0, 160);
  return {
    title: `${p.title} — case study`,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} · Rupsha Das`,
      description,
      url: `/work/${p.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: `${p.title} · Rupsha Das`, description },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${p.title} — case study`,
    description: p.outcome,
    author: { "@type": "Person", name: "Rupsha Das", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/work/${p.slug}`,
  };

  return (
    <article className="wrap py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <nav aria-label="Breadcrumb">
          <Link
            href="/work"
            className="t-small inline-flex min-h-11 items-center gap-2 font-semibold text-inksoft hover:text-clay"
          >
            <ArrowLeft size={16} aria-hidden /> All work
          </Link>
        </nav>
        <p className="stamp mt-4">
          Case study {p.index} / {String(PROJECTS.length).padStart(2, "0")} · {p.facts.map((f) => f.value).join(" · ")}
        </p>
        <h1 className="t-h1 mt-4 max-w-4xl font-display font-semibold text-balance">{p.title}</h1>
        <p className="t-lede mt-3 max-w-2xl font-display italic text-inksoft">“{p.strapline}”</p>
      </Reveal>

      <Reveal delay={100}>
        <dl className="mt-8 grid gap-4 border-y-2 border-ink/70 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="stamp">My role</dt>
            <dd className="t-small mt-1.5 font-medium">{p.role}</dd>
          </div>
          <div>
            <dt className="stamp">Stack</dt>
            <dd className="t-small mt-1.5 font-medium">{p.stack.join(" · ")}</dd>
          </div>
          <div>
            <dt className="stamp">Problem</dt>
            <dd className="t-small mt-1.5 text-inksoft">{p.problem}</dd>
          </div>
          <div>
            <dt className="stamp">Links</dt>
            <dd className="t-small mt-1.5 flex flex-wrap gap-x-4 gap-y-2 font-semibold">
              {p.links.demo ? (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-clay underline-offset-4 hover:underline">
                  Live product <ArrowUpRight size={15} aria-hidden />
                </a>
              ) : (
                <span className="text-faint">Private build — details on request</span>
              )}
            </dd>
          </div>
        </dl>
      </Reveal>

      <div className="mt-10">
        <CaseBody p={p} />
      </div>

      <nav aria-label="More case studies" className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link href={`/work/${prev.slug}`} className="card group block p-5 transition-colors hover:border-ink">
          <span className="t-small flex items-center gap-2 text-inksoft">
            <ArrowLeft size={15} aria-hidden /> Previous
          </span>
          <span className="mt-2 block font-display text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
            {prev.title}
          </span>
        </Link>
        <Link href={`/work/${next.slug}`} className="card group block p-5 text-right transition-colors hover:border-ink">
          <span className="t-small flex items-center justify-end gap-2 text-inksoft">
            Next <ArrowRight size={15} aria-hidden />
          </span>
          <span className="mt-2 block font-display text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
