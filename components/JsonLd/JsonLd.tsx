import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

/**
 * Schema.org Person structured data, injected as application/ld+json in
 * the root layout. All values come from lib/site.ts except the two
 * items below that are specific to this schema — update those directly
 * here if they change (job title, alma mater, current employer), or
 * replace SOCIAL_LINKS.twitter in lib/site.ts once you have a real
 * handle (it currently feeds the `sameAs` placeholder).
 */
export default function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Frontend Engineer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: AUTHOR.email,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "AI Interfaces",
      "Voice AI",
      "Frontend Architecture",
      "Micro-Frontends",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Verveo Solutions",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "APJ Abdul Kalam Technological University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
