"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

type Fields = { name: string; email: string; subject: string; phone: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: Fields = { name: "", email: "", subject: "", phone: "", message: "" };

function validate(f: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (f.name.trim().length < 2) e.name = "Please tell me your name (2+ characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email doesn't look right — mind checking it?";
  if (f.subject.trim().length < 3) e.subject = "A short subject helps me reply faster (3+ characters).";
  if (f.message.trim().length < 10)
    e.message = "Tell me a little more — 10+ characters so I can actually help.";
  if (f.phone && f.phone.length > 30) e.phone = "That phone number looks too long.";
  return e;
}

export function ContactForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  // Bot-timing signal, stamped on mount (never rendered).
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      // Clear the field's error as the user fixes it.
      setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const v = validate(form);
    setErrors(v);
    setFormError("");
    if (Object.keys(v).length > 0) {
      setStatus("idle");
      // Move focus to the first invalid field for keyboard/SR users.
      requestAnimationFrame(() => {
        const first = Object.keys(v)[0] as keyof Fields;
        document.getElementById(`contact-${first}`)?.focus();
      });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: "",
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        errors?: FieldErrors;
      } | null;
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setForm(EMPTY);
      startedAt.current = Date.now();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="card flex flex-col items-center gap-3 px-6 py-12 text-center"
      >
        <CheckCircle2 size={44} className="text-moss" aria-hidden />
        <h3 className="t-h2 font-display font-semibold">Message received — thank you.</h3>
        <p className="t-small max-w-md text-inksoft">
          Your note is in my inbox. I usually reply within a day or two; if it&apos;s urgent,
          email me directly and say so.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="t-small mt-2 min-h-11 font-semibold text-clay underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (
    id: keyof Fields,
    label: string,
    required: boolean,
    input: React.ReactNode,
    hint?: string
  ) => (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-1.5 block text-sm font-semibold">
        {label} {required ? <span aria-hidden className="text-clay">*</span> : <span className="font-normal text-faint">(optional)</span>}
      </label>
      {input}
      {hint && !errors[id] ? (
        <p id={`contact-${id}-hint`} className="t-small mt-1 text-faint">
          {hint}
        </p>
      ) : null}
      {errors[id] ? (
        <p id={`contact-${id}-error`} role="alert" className="field-err">
          {errors[id]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-5 p-6 md:p-8" aria-label="Contact form">
      <div>
        <p className="stamp">Drop a line</p>
        <h3 className="t-h2 mt-2 font-display font-semibold">Say hello — I reply fast.</h3>
      </div>

      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        {/* honeypot */}
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          "name",
          "Name",
          true,
            <input
              id="contact-name"
              className="field"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : "contact-name-hint"}
            aria-required
            placeholder="Ada Lovelace"
          />,
          "What should I call you?"
        )}
        {field(
          "email",
          "Email",
          true,
          <input
            id="contact-email"
            type="email"
            className="field"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : "contact-email-hint"}
            aria-required
            placeholder="you@somewhere.com"
          />,
          "I'll only ever reply — never a newsletter."
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          "subject",
          "Subject",
          true,
          <input
            id="contact-subject"
            className="field"
            value={form.subject}
            onChange={set("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            aria-required
            placeholder="Let's build something"
          />
        )}
        {field(
          "phone",
          "Phone",
          false,
          <input
            id="contact-phone"
            type="tel"
            className="field"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            placeholder="+91 …"
          />
        )}
      </div>
      {field(
        "message",
        "Message",
        true,
        <textarea
          id="contact-message"
          rows={5}
          className="field resize-y"
          value={form.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          aria-required
          placeholder="The idea, the timeline, the chaos level…"
        />,
        "A few sentences beat a few words."
      )}

      {status === "error" && formError ? (
        <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-clay/50 bg-clay/10 px-4 py-3 text-sm text-ink">
          <AlertCircle size={18} aria-hidden className="mt-0.5 shrink-0 text-clay" />
          {formError}
        </p>
      ) : null}

      <div>
        <button type="submit" disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
          {status === "sending" ? (
            <>
              <Loader2 size={17} aria-hidden className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={17} aria-hidden />
            </>
          )}
        </button>
        <p aria-live="polite" className="sr-only">
          {status === "sending" ? "Sending your message…" : ""}
        </p>
      </div>
    </form>
  );
}
