import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/content";
import { ContactForm } from "@/components/studio/ContactForm";
import { ResumeButton } from "@/components/studio/ResumeButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rupsha Das — email, socials, resume, and a contact form that actually gets answered.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Rupsha Das",
    description: "Say hello — I reply fast.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <Reveal>
        <p className="stamp">Contact · no forms into the void</p>
        <h1 className="t-h1 mt-4 max-w-3xl font-display font-semibold text-balance">
          Say hello — <span className="scribble">I reply fast</span>.
        </h1>
        <p className="t-lede mt-4 max-w-2xl text-inksoft">
          {PROFILE.availability}. Roles, freelance, collaborations, or just a good argument
          about API design — all welcome.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ContactForm />
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          <Reveal delay={80}>
            <aside aria-label="Direct channels" className="card p-6 md:p-7">
              <p className="stamp">Prefer the direct route?</p>
              <div className="mt-4 grid gap-3">
                <a
                  href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Hello from your portfolio")}`}
                  className="btn btn-ghost w-full justify-start break-all"
                >
                  <Mail size={17} aria-hidden className="shrink-0 text-clay" />
                  <span className="text-sm">{PROFILE.email}</span>
                </a>
                <a href={PROFILE.phoneHref} className="btn btn-ghost w-full justify-start">
                  <Phone size={17} aria-hidden className="shrink-0 text-moss" />
                  {PROFILE.phone}
                </a>
                <ResumeButton />
              </div>
            </aside>
          </Reveal>
          <Reveal delay={140}>
            <aside aria-label="Social profiles" className="card p-6 md:p-7">
              <p className="stamp">Find me elsewhere</p>
              <ul className="mt-3 divide-y divide-line">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[3.5rem] items-center justify-between gap-3 py-2"
                    >
                      <span>
                        <span className="block font-display text-lg font-semibold group-hover:underline group-hover:underline-offset-4">
                          {s.platform}
                        </span>
                        <span className="t-small block text-faint">
                          {s.handle} · {s.blurb}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden
                        className="shrink-0 text-faint transition-transform group-hover:rotate-45 group-hover:text-clay"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
