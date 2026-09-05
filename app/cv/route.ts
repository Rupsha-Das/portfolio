import { redirect } from "next/navigation";
import { getActiveResume } from "@/lib/resume";

/**
 * Version-stable CV short link. Always resolves the ACTIVE resume,
 * so publishing a new CV never requires frontend changes.
 */
export async function GET() {
  redirect(getActiveResume().fileUrl);
}
