import { ArrowUpRight, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceList({ defaultOpenFirst = true }: { defaultOpenFirst?: boolean }) {
  return (
    <section aria-label="Experience" className="wrap scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        index="02"
        eyebrow="Where I've worked"
        title={
          <>
            Short history, <em className="font-display italic">dense</em> lessons.
          </>
        }
        lede="Two chapters so far — production IoT and on-device AI. Summaries stay visible; open any chapter for responsibilities, measured impact, and stack."
      />
      <Reveal>
        <Accordion
          defaultOpen={defaultOpenFirst && EXPERIENCE[0] ? [EXPERIENCE[0].id] : []}
          items={EXPERIENCE.map((e) => ({
            id: e.id,
            title: (
              <>
                {e.role} <span className="text-inksoft">· {e.company}</span>
              </>
            ),
            meta: `${e.location} · ${e.dates}`,
            body: (
              <div className="grid gap-6">
                <p className="t-lede max-w-3xl text-ink">{e.summary}</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="stamp mb-3 !text-moss">What I owned</h4>
                    <ul className="t-small space-y-2.5 text-inksoft">
                      {e.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2.5">
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="stamp mb-3 !text-moss">Measured impact</h4>
                    <ul className="t-small space-y-2.5 text-inksoft">
                      {e.impact.map((r) => (
                        <li key={r} className="flex gap-2.5">
                          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" aria-label={`Technologies at ${e.company}`}>
                  {e.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {e.links.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {e.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-small inline-flex min-h-11 items-center gap-1.5 font-semibold text-clay underline-offset-4 hover:underline"
                      >
                        {l.label} <ArrowUpRight size={15} aria-hidden />
                      </a>
                    ))}
                  </div>
                ) : null}
                <p className="t-small flex items-center gap-2 text-faint">
                  <MapPin size={14} aria-hidden /> {e.location} · {e.dates}
                </p>
              </div>
            ),
          }))}
        />
      </Reveal>
    </section>
  );
}
