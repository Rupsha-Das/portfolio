"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * ArtGallery — original artwork only. Every piece below is a hand-coded
 * inline SVG (watercolor-style gradients, anime-inspired landscapes,
 * everyday objects, abstract studies). No photos, no screenshots, no
 * third-party art. Inline SVG means instant loading and zero layout
 * shift; the lightbox adds prev/next, swipe, Escape, and captions.
 */

function MonsoonWindow() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Monsoon Window — anime-inspired rainy landscape">
      <defs>
        <linearGradient id="mw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d6b8e" />
          <stop offset="0.62" stopColor="#8fb8d8" />
          <stop offset="1" stopColor="#f1e9d6" />
        </linearGradient>
        <radialGradient id="mw-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#faf6ed" />
          <stop offset="1" stopColor="#faf6ed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill="url(#mw-sky)" />
      <circle cx="138" cy="72" r="44" fill="url(#mw-sun)" opacity="0.8" />
      <circle cx="138" cy="72" r="20" fill="#faf6ed" opacity="0.9" />
      <ellipse cx="70" cy="180" rx="90" ry="60" fill="#2f4a3a" opacity="0.85" />
      <ellipse cx="160" cy="200" rx="100" ry="62" fill="#1d1912" opacity="0.9" />
      {Array.from({ length: 26 }, (_, i) => (
        <line
          key={i}
          x1={(i * 37) % 200}
          y1={(i * 53) % 250}
          x2={(i * 37) % 200 - 7}
          y2={((i * 53) % 250) + 16}
          stroke="#faf6ed"
          strokeWidth="1.4"
          opacity="0.45"
          strokeLinecap="round"
        />
      ))}
      <rect x="14" y="14" width="172" height="222" fill="none" stroke="#faf6ed" strokeWidth="3" opacity="0.7" rx="6" />
    </svg>
  );
}

function ChaiOClock() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Chai O'Clock — everyday object study of a teacup">
      <defs>
        <radialGradient id="cc-bg" cx="0.5" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#f1e9d6" />
          <stop offset="1" stopColor="#d9a441" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill="url(#cc-bg)" />
      <ellipse cx="100" cy="196" rx="62" ry="12" fill="#1d1912" opacity="0.12" />
      <ellipse cx="100" cy="188" rx="58" ry="13" fill="#fffdf7" stroke="#1d1912" strokeWidth="3" />
      <path d="M58 128 h84 v10 c0 34 -18 52 -42 52 c-24 0 -42 -18 -42 -52 z" fill="#b6461c" stroke="#1d1912" strokeWidth="3" />
      <path d="M142 138 c16 2 20 14 12 26 c-6 9 -16 10 -22 8" fill="none" stroke="#1d1912" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="100" cy="128" rx="42" ry="9" fill="#5e3418" stroke="#1d1912" strokeWidth="3" />
      <path d="M84 108 c-6 -12 6 -16 0 -28 M100 110 c-6 -12 6 -16 0 -28 M116 108 c-6 -12 6 -16 0 -28" fill="none" stroke="#1d1912" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      <circle cx="52" cy="52" r="10" fill="#e8703a" opacity="0.7" />
      <circle cx="160" cy="44" r="6" fill="#3d6b8e" opacity="0.7" />
    </svg>
  );
}

function PaletteStudy() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Palette Study No. 4 — watercolor color blobs">
      <rect width="200" height="250" fill="#fffdf7" />
      <ellipse cx="70" cy="80" rx="46" ry="38" fill="#b6461c" opacity="0.62" />
      <ellipse cx="128" cy="66" rx="38" ry="30" fill="#d9a441" opacity="0.6" />
      <ellipse cx="104" cy="130" rx="52" ry="40" fill="#3d6b8e" opacity="0.55" />
      <ellipse cx="62" cy="160" rx="30" ry="26" fill="#2f4a3a" opacity="0.55" />
      <ellipse cx="142" cy="158" rx="34" ry="30" fill="#a2535c" opacity="0.55" />
      <ellipse cx="100" cy="208" rx="44" ry="18" fill="#1d1912" opacity="0.7" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={34 + i * 16} cy={226} r={4} fill={["#b6461c", "#d9a441", "#3d6b8e"][i % 3]} opacity="0.8" />
      ))}
    </svg>
  );
}

function PaperCrane() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Paper Crane — geometric origami bird">
      <defs>
        <linearGradient id="pc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14110c" />
          <stop offset="1" stopColor="#3d6b8e" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#pc-bg)" />
      <circle cx="100" cy="118" r="62" fill="#faf6ed" opacity="0.08" />
      <polygon points="100,60 128,132 100,118 72,132" fill="#e8703a" stroke="#faf6ed" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="100,118 128,132 112,176" fill="#d9a441" stroke="#faf6ed" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="100,118 72,132 88,176" fill="#b6461c" stroke="#faf6ed" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="88,176 112,176 100,196" fill="#faf6ed" opacity="0.9" />
      <polygon points="128,132 168,108 140,142" fill="#8fb8d8" stroke="#faf6ed" strokeWidth="2.5" strokeLinejoin="round" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={(i * 53) % 200} cy={(i * 29) % 250} r="1.8" fill="#faf6ed" opacity="0.8" />
      ))}
    </svg>
  );
}

function NightBus() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Night Bus — abstract city study">
      <rect width="200" height="250" fill="#1e1a14" />
      <rect x="30" y="70" width="140" height="100" rx="14" fill="#2f4a3a" stroke="#e3b45c" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={42 + i * 32} y={86} width={22} height={30} rx={4} fill="#e3b45c" opacity={i === 2 ? 0.45 : 0.95} />
      ))}
      <circle cx="62" cy="182" r="14" fill="#14110c" stroke="#faf6ed" strokeWidth="3" />
      <circle cx="138" cy="182" r="14" fill="#14110c" stroke="#faf6ed" strokeWidth="3" />
      <line x1="0" y1="204" x2="200" y2="204" stroke="#e8703a" strokeWidth="3" strokeDasharray="14 10" />
      <circle cx="164" cy="36" r="12" fill="#faf6ed" opacity="0.9" />
    </svg>
  );
}

function SelfRendered() {
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label="Self, Rendered — abstract geometric portrait study">
      <defs>
        <linearGradient id="sr-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e9d6" />
          <stop offset="1" stopColor="#e8b45c" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#sr-bg)" />
      <circle cx="100" cy="112" r="58" fill="#2A1C11" />
      <ellipse cx="100" cy="128" rx="40" ry="48" fill="#F3CFAC" />
      <circle cx="86" cy="124" r="6" fill="#241307" />
      <circle cx="114" cy="124" r="6" fill="#241307" />
      <circle cx="88" cy="122" r="1.8" fill="#fffdf7" />
      <circle cx="116" cy="122" r="1.8" fill="#fffdf7" />
      <path d="M78 108 q10 -8 20 -2 M102 106 q10 -6 20 2" fill="none" stroke="#2A1C11" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="80" cy="142" rx="8" ry="5" fill="#D97B6C" opacity="0.8" />
      <ellipse cx="120" cy="142" rx="8" ry="5" fill="#D97B6C" opacity="0.8" />
      <path d="M88 154 q12 10 24 0" fill="none" stroke="#7C3A42" strokeWidth="3.4" strokeLinecap="round" />
      <rect x="70" y="196" width="60" height="54" rx="14" fill="#B6461C" />
    </svg>
  );
}

export type Artwork = {
  id: string;
  title: string;
  caption: string;
  medium: string;
  category: string;
  Art: () => React.JSX.Element;
};

export const ARTWORKS: Artwork[] = [
  { id: "monsoon-window", title: "Monsoon Window", caption: "Rain over the hills, watched from inside.", medium: "Digital watercolor", category: "Landscape", Art: MonsoonWindow },
  { id: "chai-oclock", title: "Chai O'Clock", caption: "The official drink of debugging sessions.", medium: "Digital sketch", category: "Everyday objects", Art: ChaiOClock },
  { id: "palette-study-4", title: "Palette Study No. 4", caption: "Testing which colors can share a page.", medium: "Color study", category: "Abstract", Art: PaletteStudy },
  { id: "paper-crane", title: "Paper Crane", caption: "Folded for luck before every big deploy.", medium: "Vector illustration", category: "Character sketch", Art: PaperCrane },
  { id: "night-bus", title: "Night Bus", caption: "Last bus home after a hackathon.", medium: "Digital illustration", category: "City study", Art: NightBus },
  { id: "self-rendered", title: "Self, Rendered", caption: "Me, if I were twelve polygons.", medium: "Geometric portrait", category: "Portrait", Art: SelfRendered },
];

function ArtworkCard({ work, onOpen }: { work: Artwork; onOpen: () => void }) {
  const { Art } = work;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${work.title} in lightbox`}
      aria-haspopup="dialog"
      className="art-tile"
    >
      <Art />
      <span className="block px-4 pb-4 pt-3 text-left">
        <span className="block font-display text-base font-bold leading-tight">{work.title}</span>
        <span className="stamp mt-1 block">{work.category} · {work.medium}</span>
      </span>
    </button>
  );
}

/**
 * compact → 3 tiles + link (sidebar / about-preview replacement for the
 * removed real photo). full → all pieces + lightbox (own section).
 */
export function ArtGallery({ compact = false }: { compact?: boolean }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shown = compact ? ARTWORKS.slice(0, 3) : ARTWORKS;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setLightbox((v) => (v === null ? v : (v + dir + ARTWORKS.length) % ARTWORKS.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const Active = lightbox !== null ? ARTWORKS[lightbox] : null;

  const grid = (
    <div className="art-grid">
      {shown.map((work, i) => (
        <Reveal key={work.id} delay={Math.min(i * 60, 240)}>
          <ArtworkCard work={work} onOpen={() => setLightbox(compact ? ARTWORKS.indexOf(work) : i)} />
        </Reveal>
      ))}
    </div>
  );

  const box = lightbox !== null && Active && (
    <div role="presentation" onClick={close} className="art-lightbox">
      <figure
        role="dialog"
        aria-modal="true"
        aria-label={`${Active.title} — artwork viewer`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          if (dx > 48) step(-1);
          else if (dx < -48) step(1);
          touchX.current = null;
        }}
        className="art-lightbox-fig"
      >
        <Active.Art />
        <figcaption className="mt-3 flex items-start justify-between gap-3">
          <span>
            <span className="block font-display text-lg font-bold leading-tight">{Active.title}</span>
            <span className="t-small mt-1 block text-inksoft">{Active.caption}</span>
            <span className="stamp mt-1.5 block">
              {Active.category} · {Active.medium} · {lightbox + 1} of {ARTWORKS.length}
            </span>
          </span>
        </figcaption>
        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous artwork" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg transition-colors hover:border-ink">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next artwork" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg transition-colors hover:border-ink">
            →
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="btn btn-solid ml-auto !min-h-11 !px-5 !py-2 !text-sm"
          >
            Close
          </button>
        </div>
      </figure>
    </div>
  );

  if (compact) {
    return (
      <div>
        {grid}
        <p className="t-small mt-4 text-inksoft">
          Original doodles & studies —{" "}
          <Link href="/#artwork" className="font-semibold text-clay underline underline-offset-4 hover:underline">
            browse the full gallery
          </Link>
          .
        </p>
        {box}
      </div>
    );
  }

  return (
    <section aria-label="Artwork gallery" id="artwork" className="wrap scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        index="06"
        eyebrow="Sketchbook"
        title={
          <>
            Doodles, studies & <em className="font-display italic">tiny worlds</em>.
          </>
        }
        lede="Original bits I drew or generated for fun — watercolor moods, anime-inspired scenes, everyday objects. Everything here is mine to share."
      />
      {grid}
      {box}
    </section>
  );
}
