import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";

/**
 * Reusable case-study renderer: every /work/[slug] page shares this
 * storytelling skeleton — context → reasoning → implementation →
 * tradeoffs → results → next steps.
 */
export function CaseBody({ p }: { p: Project }) {
  return (
    <div className="grid gap-10">
      {p.body.map((s, i) => (
        <section key={s.heading} aria-label={s.heading} className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="index-num font-display text-sm font-semibold text-clay">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="t-h2 mt-2 font-display font-semibold text-balance">{s.heading}</h2>
          </div>
          <div className="md:col-span-8">
            {s.paragraphs.map((para) => (
              <p key={para.slice(0, 32)} className="t-small mt-3 max-w-2xl text-inksoft first:mt-0 [&:first-child]:text-base [&:first-child]:text-ink">
                {para}
              </p>
            ))}
            {s.bullets ? (
              <ul className="mt-4 grid gap-2.5 rounded-2xl border border-line bg-paper2/50 p-5">
                {s.bullets.map((b) => (
                  <li key={b} className="t-small flex gap-2.5 text-ink">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section aria-label="Results" className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="index-num font-display text-sm font-semibold text-clay">
            {String(p.body.length + 1).padStart(2, "0")}
          </p>
          <h2 className="t-h2 mt-2 font-display font-semibold">Results</h2>
        </div>
        <div className="md:col-span-8">
          <dl className="grid gap-3 sm:grid-cols-3">
            {p.facts.map((f) => (
              <div key={f.label} className="card p-4">
                <dd className="font-display text-2xl font-bold tracking-tight">{f.value}</dd>
                <dt className="t-small mt-0.5 text-inksoft">{f.label}</dt>
              </div>
            ))}
          </dl>
          <p className="t-small mt-4 max-w-2xl text-inksoft">
            <span className="font-semibold text-ink">Bottom line — </span>
            {p.outcome}
          </p>
          {p.links.demo ? (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-5"
            >
              Visit the live product <ArrowUpRight size={17} aria-hidden />
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
