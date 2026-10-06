"use client";

import { useState } from "react";
import Image from "next/image";

/** Editorial portrait with an honest fallback — never a faceless gray box. */
export function PortraitCard() {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-[4/5]">
        {!missing ? (
          <Image
            src="/profile.jpg"
            alt="Portrait of Rupsha Das"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
            onError={() => setMissing(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-paper2 p-8 text-center">
            <p className="font-display text-7xl font-black tracking-tight text-clay">R.</p>
            <p className="stamp">The builder, unfiltered</p>
          </div>
        )}
      </div>
      <figcaption className="flex items-center justify-between border-t border-line px-5 py-3">
        <span className="stamp">Fig. 02 — the builder</span>
        <span className="stamp !text-moss">● unfiltered</span>
      </figcaption>
    </figure>
  );
}
