"use client";

import { useEffect, useState } from "react";
import { getActiveResume } from "@/lib/resume";

export type ActiveResume = { title: string; fileUrl: string; version: string; uploadedAt: string };

const FALLBACK: ActiveResume = {
  title: getActiveResume().title,
  fileUrl: getActiveResume().fileUrl,
  version: getActiveResume().version,
  uploadedAt: getActiveResume().uploadedAt,
};

/** Resolves the active CV via the API (auto-picks new versions); falls back to the bundled record. */
export function useActiveResume() {
  const [resume, setResume] = useState<ActiveResume>(FALLBACK);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/resume", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.fileUrl) setResume(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return resume;
}
