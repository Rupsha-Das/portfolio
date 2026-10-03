import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Schema.org structured data for the portfolio homepage.
 * Person: the portfolio owner. WebSite: the site itself.
 * sameAs URLs are taken only from SOCIAL_LINKS in lib/data.ts —
 * no invented profiles.
 */
export function JsonLd() {
  const sameAs = SOCIAL_LINKS.map((s) => s.url);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rupsha Das",
    jobTitle: "Full-Stack Developer",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "JavaScript", "Python", "AI/ML"],
    email: `mailto:${PROFILE.email}`,
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_NAME} — Full-Stack Developer`,
    url: SITE_URL,
    author: { "@type": "Person", name: "Rupsha Das", url: SITE_URL },
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
