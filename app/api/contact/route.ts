import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Please fill in the form." }, { status: 400 });
    }

    const { name, email, subject, message, phone, website } = body as Record<string, unknown>;

    // Honeypot — silently accept bots.
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please tell me your name." }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
    }
    if (typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json({ error: "Please add a short subject." }, { status: 400 });
    }
    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Tell me a little more (10+ characters)." }, { status: 400 });
    }
    if (phone !== undefined && phone !== "" && typeof phone !== "string") {
      return NextResponse.json({ error: "Please check the phone field." }, { status: 400 });
    }

    // No persistence / mail provider is configured in this build.
    // The submission is validated; wire a provider here later (server-side only).
    console.log(
      `[contact] ${new Date().toISOString()} from ${String(name).slice(0, 80)} <${String(email).slice(0, 120)}> — ${String(subject).slice(0, 120)}`
    );

    return NextResponse.json({ ok: true });
  } catch {
    // Never leak server errors to visitors.
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
