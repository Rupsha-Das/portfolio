import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroStudio } from "@/components/studio/HeroStudio";
import { SelectedWork } from "@/components/studio/ProjectCards";
import { ExperienceList } from "@/components/studio/ExperienceList";
import { SkillsGrid } from "@/components/studio/SkillsGrid";
import { ProofAndReferences } from "@/components/studio/ProofAndReferences";
import { ContactForm } from "@/components/studio/ContactForm";
import { ArtGallery } from "@/components/studio/ArtGallery";
import { SongSpot } from "@/components/studio/SongSpot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT, PROFILE } from "@/lib/content";

export default function Home() {
  return (
    <>
      <HeroStudio />

      <div id="experience" className="scroll-mt-20">
        <ExperienceList />
      </div>

      <SelectedWork limit={3} />

      <SkillsGrid />

      <section aria-label="About preview" className="wrap py-16 md:py-24">
        <SectionHeading
          index="05"
          eyebrow="The human behind the commits"
          title={
            <>
              Weird ideas, <em className="font-display italic">shipped with care</em>.
            </>
          }
        />
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <ArtGallery compact />
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <p className="t-lede max-w-2xl text-ink">{ABOUT.intro[0]}</p>
              <p className="t-small mt-4 max-w-2xl text-inksoft">{ABOUT.intro[1]}</p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-6 rounded-2xl border-l-4 border-clay bg-paper2/60 p-5">
                <p className="t-small italic text-ink">
                  “Code gets you a demo. Product thinking plus communication gets you users.
                  I want both — plus hardware that occasionally humbles you.”
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {ABOUT.facts.slice(0, 3).map((f) => (
                  <div key={f.k} className="card p-4">
                    <p className="stamp">{f.k}</p>
                    <p className="t-small mt-1.5 font-semibold leading-snug">{f.v}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn btn-ghost mt-6">
                More about me <ArrowRight size={17} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ProofAndReferences />

      <ArtGallery />

      <SongSpot />

      <section aria-label="Contact preview" className="wrap pb-4 pt-4">
        <SectionHeading
          index="08"
          eyebrow="Last call"
          title={
            <>
              Got an idea? <span className="scribble">Let&apos;s build it</span>.
            </>
          }
          lede={`${PROFILE.availability}. The form takes a minute — or skip it and email ${PROFILE.email} directly.`}
        />
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
