import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "AI Geletterdheid Training Nederland | AIGA Academy | AI Act Compliant",
  description:
    "AIGA helpt Nederlandse organisaties voldoen aan de EU AI Act. Gecertificeerde online AI-geletterdheid training voor teams. Audit-proof certificaat. Vanaf 249,- per deelnemer.",
  alternates: { canonical: "https://aigeletterdheid.academy" },
  openGraph: {
    title: "AI Geletterdheid Training Nederland | AIGA Academy",
    description:
      "AIGA helpt Nederlandse organisaties voldoen aan de EU AI Act. Gecertificeerde online AI-geletterdheid training voor teams.",
    url: "https://aigeletterdheid.academy",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630 }],
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "AIGA | AI Geletterdheid Academy",
  alternateName: "AIGA",
  url: "https://aigeletterdheid.academy",
  logo: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png",
  description: "AIGA helpt Nederlandse organisaties te voldoen aan de EU AI Act door gecertificeerde AI-geletterdheid trainingen voor teams en leidinggevenden.",
  areaServed: { "@type": "Country", name: "Nederland" },
  telephone: "+31103167827",
  email: "robbert@speakersacademy.nl",
  foundingDate: "2024",
  contactPoint: { "@type": "ContactPoint", telephone: "+31103167827", contactType: "sales", availableLanguage: "Dutch" },
  sameAs: ["https://www.linkedin.com/company/aiga-nl"],
  knowsAbout: ["AI-geletterdheid", "EU AI Act", "AI compliance", "AI training"],
};

const faqItems = [
  { q: "Is deze training juridisch voldoende om te voldoen aan de AI Act?", a: "Ja. De training is specifiek ontworpen op basis van Artikel 4 van de EU AI Act en gevalideerd door AI-rechtexperts. Het certificaat geldt als aantoonbaar bewijs bij een audit." },
  { q: "Wat als een medewerker het examen niet haalt?", a: "Deelnemers mogen het examen herhalen. We zorgen dat iedereen het certificaat behaalt voordat de toegang verloopt." },
  { q: "Kunnen we de training integreren met ons eigen LMS of HR-systeem?", a: "Voor grotere organisaties bieden we CSV-exports en op aanvraag integraties. Neem contact op voor maatwerk." },
  { q: "Hoe snel kunnen we starten?", a: "Direct na boeking krijg je toegang tot het platform. Je kunt dezelfde dag nog medewerkers uitnodigen." },
  { q: "Is er een factuur / is dit BTW-aftrekbaar?", a: "Ja, je ontvangt een factuur op bedrijfsnaam. Zakelijke trainingskosten zijn doorgaans BTW-aftrekbaar; check dit met je eigen fiscalist." },
  { q: "Wat als we een groot team hebben, zijn er volumekortingen?", a: "Ja. Vraag een offerte aan via het contactformulier voor een prijsopgave op maat. Vanaf 50 seats ontvang je de Masterclass gratis." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI-Geletterdheid Training voor Teams",
  description: "Online AI-geletterdheid training voor medewerkers. Voldoe aan de EU AI Act. AI Literacy Practitioner certificaat. Selfpaced, 2-3 uur.",
  provider: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
  url: "https://aigeletterdheid.academy/training",
  inLanguage: "nl",
  educationalLevel: "beginner",
  teaches: "EU AI Act compliance, AI-geletterdheid, verantwoord AI-gebruik",
  offers: { "@type": "Offer", price: "249", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT2H30M" },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <HomePageClient />
    </>
  );
}
