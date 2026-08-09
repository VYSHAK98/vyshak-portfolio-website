import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

/**
 * Schema.org ProfilePage structured data (Person as mainEntity), injected
 * as application/ld+json in the root layout. All values come from
 * lib/site.ts except the items below that are specific to this schema —
 * update those directly here if they change (job title, alma mater,
 * current employer), or replace SOCIAL_LINKS.twitter in lib/site.ts once
 * you have a real handle (it currently feeds the `sameAs` placeholder).
 *
 * Wrapped in ProfilePage rather than emitting a bare Person: Google's
 * structured-data parser auto-infers a ProfilePage around a lone Person
 * on a personal site and then flags it invalid for missing `mainEntity`
 * (seen as "1 invalid item detected" / "Missing field mainEntity" in
 * Search Console's URL Inspection tool) since that link was never made
 * explicit. Supplying the wrapper ourselves satisfies Google's Profile
 * page requirements: https://developers.google.com/search/docs/appearance/structured-data/profile-page
 *
 * dateCreated is this repo's first commit (the site's actual launch);
 * dateModified should be bumped by hand when the page's real content
 * meaningfully changes (not tied to unrelated commits/build times).
 */
export default function JsonLd() {
  const person = {
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

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-06-13",
    dateModified: "2026-08-10",
    mainEntity: person,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
    />
  );
}
