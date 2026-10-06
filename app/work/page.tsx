import type { Metadata } from "next";
import { PROJECTS } from "@/lib/content";
import { ProjectCard } from "@/components/studio/ProjectCards";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Case studies by Rupsha Das — telemetry analytics, AI syllabus navigation, edge-AI autonomy, and calm assessment software. Decisions, tradeoffs, results.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected work · Rupsha Das",
    description: "Four projects, told properly — context, decisions, tradeoffs, results.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <Reveal>
        <p className="stamp">Index of work · {String(PROJECTS.length).padStart(2, "0")} case studies</p>
        <h1 className="t-h1 mt-4 max-w-3xl font-display font-semibold text-balance">
          Selected work, <em className="italic">fully explained</em>.
        </h1>
        <p className="t-lede mt-4 max-w-2xl text-inksoft">
          No thumbnail graveyard. Each project gets its reasoning on the record — why it exists,
          what I chose, what broke, and what I&apos;d change.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i * 60, 180)}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
