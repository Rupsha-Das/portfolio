import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 100, email: 254, subject: 150, message: 5000, phone: 30 } as const;

/* ---- tiny in-memory rate limiter (per runtime instance) ---- */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 64);
  return "unknown";
}

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= LIMIT_MAX) {
    const retryAfter = Math.ceil((arr[0] + WINDOW_MS - now) / 1000);
    hits.set(ip, arr);
    return { limited: true, retryAfter };
  }
  arr.push(now);
  hits.set(ip, arr);
  return { limited: false, retryAfter: 0 };
}

function clean(v: unknown, max: number): string {
  // Coerce, strip CR/LF (header-injection safety), trim, cap length.
  return String(v ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "phone" | "message", string>>;

async function notifyOwner(input: {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) return false; // not configured — caller logs instead
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: input.email,
        subject: `[Portfolio] ${input.subject}`,
        text: `From: ${input.name} <${input.email}>\nPhone: ${input.phone || "—"}\n\n${input.message}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const { limited, retryAfter } = rateLimited(ip);
  if (limited) {
    return NextResponse.json(
      { error: "Too many messages — please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = null;
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please fill in the form." }, { status: 400 });
  }

  // Honeypot — silently accept bots so they learn nothing.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  // Too-fast-for-human submissions (bots) — silently accept.
  if (typeof body.startedAt === "number" && Date.now() - body.startedAt < 2000) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const subject = clean(body.subject, MAX.subject);
  const phone = clean(body.phone, MAX.phone);
  // Message keeps internal newlines but no header-break sequences.
  const message = String(body.message ?? "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, MAX.message);

  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = "Please tell me your name (2+ characters).";
  if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (subject.length < 3) errors.subject = "Please add a short subject (3+ characters).";
  if (message.length < 10) errors.message = "Tell me a little more (10+ characters).";
  if (typeof body.phone !== "undefined" && body.phone !== "" && typeof body.phone !== "string") {
    errors.phone = "Please check the phone field.";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "A couple of fields need attention.", errors },
      { status: 400 }
    );
  }

  try {
    const sent = await notifyOwner({ name, email, subject, phone, message });
    if (!sent) {
      // No mail provider configured: safe server-side log only (truncated, no PII hoarding).
      console.log(
        `[contact] ${new Date().toISOString()} from ${name.slice(0, 40)} — ${subject.slice(0, 80)} (mail provider not configured)`
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    // Never leak internals to visitors.
    console.error("[contact] delivery failure (details withheld from client)");
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email me directly." },
      { status: 500 }
    );
  }
}
