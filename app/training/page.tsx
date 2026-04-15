import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";

export const metadata: Metadata = {
  title: "AI-Geletterdheid Training voor Teams in Nederland | Certificaat | AIGA",
  description: "Online AI-geletterdheid training voor teams in Nederland. Voldoe aan de EU AI Act. AI Literacy Practitioner certificaat. Selfpaced, 2-3 uur, per seat beschikbaar.",
  alternates: { canonical: "https://aigeletterdheid.academy/training" },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI-Geletterdheid voor Teams",
  description: "Online AI-geletterdheid training voor teams. Voldoe aan de EU AI Act met een audit-proof AI Literacy Practitioner certificaat.",
  provider: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
  instructor: { "@type": "Person", name: "Ferry Hoes" },
  educationalLevel: "Beginner tot Intermediate",
  teaches: ["AI-geletterdheid", "EU AI Act compliance", "Verantwoord AI-gebruik", "AI-risicobeheer"],
  courseMode: "online",
  duration: "PT2H30M",
  inLanguage: "nl",
  offers: {
    "@type": "Offer",
    price: "249",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT2H30M" },
  award: "AI Literacy Practitioner certificaat",
};

export default function TrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <TrainingClient />
    </>
  );
}
