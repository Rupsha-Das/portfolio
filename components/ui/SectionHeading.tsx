import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="index-num font-display text-sm font-semibold text-clay">{index}</span>
          <span className="stamp">{eyebrow}</span>
          <span aria-hidden className="h-px flex-1 self-center bg-line" />
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="t-h1 mt-4 max-w-3xl font-display font-semibold text-balance">{title}</h2>
      </Reveal>
      {lede ? (
        <Reveal delay={140}>
          <p className="t-lede mt-4 max-w-2xl text-inksoft">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
