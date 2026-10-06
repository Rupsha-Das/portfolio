import { SKILL_GROUPS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsGrid() {
  return (
    <section aria-label="Skills" className="border-y border-line bg-paper2/50">
      <div className="wrap py-16 md:py-24">
        <SectionHeading
          index="04"
          eyebrow="Capabilities"
          title={
            <>
              Organized by what I can <em className="font-display italic">do</em>, not a tag cloud.
            </>
          }
          lede="Seven capabilities, honestly scoped. Footnotes mark where I'm still leveling up — I'd rather tell you than have you discover it."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal as="li" key={g.id} delay={Math.min(i * 60, 240)} className="h-full">
              <div className="card flex h-full flex-col p-6">
                <p className="index-num font-display text-sm font-semibold text-clay">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{g.title}</h3>
                <p className="t-small mt-1.5 text-inksoft">{g.blurb}</p>
                <ul aria-label={`${g.title} skills`} className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>
                {g.footnote ? (
                  <p className="t-small mt-4 border-t border-dashed border-line pt-3 italic text-inksoft">
                    {g.footnote}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
