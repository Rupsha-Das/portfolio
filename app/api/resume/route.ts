import { NextResponse } from "next/server";
import { getActiveResume } from "@/lib/resume";

export async function GET() {
  try {
    const resume = getActiveResume();
    // Only public fields — never internal storage details.
    return NextResponse.json({
      title: resume.title,
      fileUrl: resume.fileUrl,
      version: resume.version,
      uploadedAt: resume.uploadedAt,
    });
  } catch {
    return NextResponse.json({ error: "Resume unavailable" }, { status: 503 });
  }
}
