"use client";

import { ArrowUpRight } from "lucide-react";
import { useActiveResume } from "@/components/ui/UseActiveResume";

export function ResumeButton() {
  const resume = useActiveResume();
  return (
    <a
      href={resume.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-moss w-full justify-start"
    >
      <ArrowUpRight size={17} aria-hidden className="shrink-0" />
      Resume ({resume.version} · {resume.uploadedAt})
    </a>
  );
}
