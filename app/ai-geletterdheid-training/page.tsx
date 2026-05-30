import type { Metadata } from "next";
import AiGeletterdheidTrainingClient, {
  type FaqItem,
} from "@/components/ai-geletterdheid-training/AiGeletterdheidTrainingClient";

export const metadata: Metadata = {
  title: "AI-geletterdheid training (Artikel 4 EU AI Act) | AIGA",
  description:
    "Maak je team AI-geletterd vóór de handhaving van 2 augustus 2026. Online training met AI Literacy Practitioner-certificaat, in lijn met Artikel 4 van de EU AI Act. €249 ex BTW per deelnemer.",
  alternates: {
    canonical: "https://aigeletterdheid.academy/ai-geletterdheid-training",
  },
  openGraph: {
    title: "AI-geletterdheid training (Artikel 4 EU AI Act) | AIGA",
    description:
      "Maak je team AI-geletterd vóór 2 augustus 2026. Online training met AI Literacy Practitioner-certificaat. €249 ex BTW per deelnemer.",
    url: "https://aigeletterdheid.academy/ai-geletterdheid-training",
    type: "website",
    locale: "nl_NL",
  },
};

// Single source of truth — used for both the visible FAQ accordion and FAQPage JSON-LD
const faqs: FaqItem[] = [
  {
    q: "Is AI-geletterdheid wettelijk verplicht?",
    a: "Ja. Artikel 4 van de EU AI Act verplicht organisaties die AI inzetten om voldoende AI-geletterdheid te waarborgen bij hun medewerkers. De verplichting geldt sinds 2 februari 2025. De Autoriteit Persoonsgegevens start met handhaven op 2 augustus 2026.",
  },
  {
    q: "Voor wie geldt Artikel 4 van de EU AI Act?",
    a: "Voor elke organisatie die AI-systemen inzet of ontwikkelt. Dit geldt zowel voor aanbieders (providers) als gebruikers (deployers) van AI. Ook als je als organisatie alleen tools als ChatGPT of Microsoft Copilot gebruikt, val je onder de verplichting.",
  },
  {
    q: "Geldt dit ook als we alleen ChatGPT of Copilot gebruiken?",
    a: "Ja. Organisaties die AI-tools inzetten worden beschouwd als deployers onder de EU AI Act. Dat betekent dat Artikel 4 van toepassing is en dat jouw medewerkers aantoonbaar AI-geletterd moeten zijn. De training van AIGA is daar specifiek op afgestemd.",
  },
  {
    q: "Wanneer start de handhaving?",
    a: "De verplichting om AI-geletterdheid te waarborgen geldt al sinds 2 februari 2025. De Autoriteit Persoonsgegevens begint met actieve handhaving op 2 augustus 2026. Organisaties die dan niet kunnen aantonen dat hun medewerkers AI-geletterd zijn, riskeren boetes tot €35 miljoen.",
  },
  {
    q: "Hoeveel kost de training?",
    a: "€249 ex BTW per deelnemer. Vanaf 50 deelnemers ontvang je de leiderschapsmasterclass gratis. Neem contact op voor een offerte op maat.",
  },
  {
    q: "Krijg ik een certificaat?",
    a: "Ja. Elke deelnemer die slaagt voor het adaptieve examen ontvangt het AI Literacy Practitioner-certificaat. Digitaal ondertekend en audit-proof, zodat je naleving van Artikel 4 kunt aantonen.",
  },
  {
    q: "Hoe lang duurt de training?",
    a: "De training is volledig online en in eigen tempo te volgen. Gemiddeld zijn deelnemers 2,5 uur bezig. Er is geen limiet op het aantal sessies of de doorlooptijd.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI-geletterdheid training",
  description:
    "Online AI-geletterdheid training in lijn met Artikel 4 van de EU AI Act. Met AI Literacy Practitioner-certificaat.",
  provider: {
    "@type": "Organization",
    name: "AIGA - AI Geletterdheid Academy",
    sameAs: "https://aigeletterdheid.academy",
  },
  offers: {
    "@type": "Offer",
    price: "249",
    priceCurrency: "EUR",
    category: "Professional Training",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT2H30M",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiGeletterdheidTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AiGeletterdheidTrainingClient faqs={faqs} />
    </>
  );
}
