export type ResumeRecord = {
  id: string;
  title: string;
  fileUrl: string;
  version: string;
  isActive: boolean;
  uploadedAt: string;
};

/**
 * Resume registry.
 * To publish a new CV later: upload the PDF to `public/cv/`,
 * add a record here (or back it with a DB/object storage later)
 * and flip `isActive`. The frontend always resolves the active
 * record via `/api/resume` — no frontend code changes needed.
 */
export const RESUMES: ResumeRecord[] = [
  {
    id: "rupsha-das-cv-v1",
    title: "Rupsha Das — CV",
    fileUrl: "/cv/Rupsha-Das-CV.pdf",
    version: "v1",
    isActive: true,
    uploadedAt: "2026-09-05",
  },
];

export function getActiveResume(): ResumeRecord {
  const active = RESUMES.find((r) => r.isActive);
  if (!active) throw new Error("No active resume configured");
  return active;
}
