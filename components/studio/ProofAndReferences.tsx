import { ArrowUpRight, Quote } from "lucide-react";
import { PROOF, SOCIAL_PROOF_NOTE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProofAndReferences() {
  return (
    <section aria-label="Proof and references" className="wrap py-16 md:py-24">
      <SectionHeading
        index="05"
        eyebrow="Proof, then promises"
        title={
          <>
            Numbers I can <span className="scribble">stand behind</span>.
          </>
        }
      />
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {PROOF.map((p, i) => (
          <Reveal key={p.label} delay={Math.min(i * 60, 240)}>
            <div className="card h-full p-5">
              <dd className="font-display text-4xl font-black tracking-tight md:text-[2.6rem]">
                {p.value}
              </dd>
              <dt className="t-small mt-1 font-semibold leading-snug">{p.label}</dt>
              <dd className="t-small mt-0.5 text-faint">{p.note}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={120}>
        <aside
          aria-label="References"
          className="card mt-6 grid gap-5 p-6 md:grid-cols-12 md:p-8"
        >
          <div className="md:col-span-2">
            <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-moss text-[var(--moss-ink)]">
              <Quote size={22} />
            </span>
          </div>
          <div className="md:col-span-7">
            <h3 className="t-h2 font-display font-semibold">{SOCIAL_PROOF_NOTE.heading}</h3>
            <p className="t-small mt-3 max-w-xl text-inksoft">{SOCIAL_PROOF_NOTE.body}</p>
          </div>
          <div className="flex items-start md:col-span-3 md:justify-end">
            <a
              href={SOCIAL_PROOF_NOTE.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-moss"
            >
              {SOCIAL_PROOF_NOTE.cta.label} <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
