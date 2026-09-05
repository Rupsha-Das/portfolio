"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-void/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-lime/70";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus((s) => (s === "error" ? "idle" : s)), 5000);
    }
  };

  return (
    <div className="relative rounded-3xl border border-white/10 bg-surface p-6 md:p-8 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden />
      <div className="relative">
        <p className="font-mono text-[11px] tracking-[0.3em] text-lime mb-1">DROP A LINE</p>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Say hello — I reply fast.</h3>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-lime/40 bg-lime/10 px-6 py-10 text-center"
              role="status"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
              >
                <CheckCircle2 size={44} className="text-lime" />
              </motion.span>
              <p className="font-display text-2xl font-bold">Message received.</p>
              <p className="text-muted">I&apos;ll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                data-cursor="AGAIN →"
                className="mt-2 font-mono text-xs tracking-widest text-lime underline underline-offset-4"
              >
                SEND ANOTHER
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={submit}
              className="mt-6 grid gap-4"
              noValidate={false}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted">NAME *</span>
                  <input required minLength={2} value={form.name} onChange={set("name")} placeholder="Ada Lovelace" className={inputCls} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted">EMAIL *</span>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="you@somewhere.com" className={inputCls} autoComplete="email" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted">SUBJECT *</span>
                  <input required minLength={3} value={form.subject} onChange={set("subject")} placeholder="Let's build something" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted">PHONE <span className="text-muted/60">(OPTIONAL)</span></span>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 …" className={inputCls} autoComplete="tel" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted">MESSAGE *</span>
                <textarea required minLength={10} rows={5} value={form.message} onChange={set("message")} placeholder="The idea, the timeline, the chaos level…" className={`${inputCls} resize-y`} />
              </label>

              {status === "error" && (
                <p role="alert" className="flex items-center gap-2 rounded-xl border border-coral/50 bg-coral/10 px-4 py-3 text-sm text-coral">
                  <AlertCircle size={16} /> {error}
                </p>
              )}

              <div>
                <MagneticButton cursor="SEND →" className="bg-lime text-black border border-lime">
                  <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 disabled:opacity-60" aria-label="Send message">
                    {status === "sending" ? (
                      <><Loader2 size={16} className="animate-spin" /> SENDING…</>
                    ) : (
                      <>SEND MESSAGE <Send size={16} /></>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
