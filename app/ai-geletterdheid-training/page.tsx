import type { Metadata } from "next";
import AiGeletterdheidTrainingClient, {
  type FaqItem,
} from "@/components/ai-geletterdheid-training/AiGeletterdheidTrainingClient";

export const metadata: Metadata = {
  title: "AI-geletterdheid training (Artikel 4 EU AI Act) | AIGA",
  description:
    "Ondersteuning van AI-geletterdheid, verplicht onder Artikel 4 EU AI Act. Online training met AI Literacy Practitioner-certificaat. Vanaf 2 augustus 2026 kunnen toezichthouders handhaven. €249 ex BTW per deelnemer.",
  alternates: {
    canonical: "https://aigeletterdheid.academy/ai-geletterdheid-training",
  },
  openGraph: {
    title: "AI-geletterdheid training (Artikel 4 EU AI Act) | AIGA",
    description:
      "Online training in AI-geletterdheid, in lijn met Artikel 4 EU AI Act. Certificaat op naam. Vanaf 2 augustus 2026 handhaving. €249 ex BTW per deelnemer.",
    url: "https://aigeletterdheid.academy/ai-geletterdheid-training",
    type: "website",
    locale: "nl_NL",
  },
};

// Single source of truth — used for both the visible FAQ accordion and FAQPage JSON-LD
const faqs: FaqItem[] = [
  {
    q: "Is AI-geletterdheid wettelijk verplicht?",
    a: "Ja. Artikel 4 van de EU AI Act verplicht organisaties die AI inzetten om de ontwikkeling van AI-geletterdheid te ondersteunen bij medewerkers die met AI werken. Na de Digital Omnibus (aangenomen juni 2026) is de verplichting verschoven van een resultaatverplichting naar een inspanningsverplichting. De plicht zelf geldt al sinds 2 februari 2025 en wordt handhavingsgereed op 2 augustus 2026.",
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
    a: "De verplichting geldt al sinds 2 februari 2025. Vanaf 2 augustus 2026 krijgen nationale markttoezichthouders formele handhavingsbevoegdheden. Artikel 4 kent geen eigen boete. Toezichthouders kunnen het wel meewegen als verzwarende omstandigheid bij andere overtredingen.",
  },
  {
    q: "Is AI-geletterdheid nog steeds verplicht na de Digital Omnibus?",
    a: "Ja. Artikel 4 is versoepeld, niet geschrapt. De plicht ging van 'zorgen voor een toereikend niveau' naar 'het ondersteunen van de ontwikkeling van AI-geletterdheid'. Vanaf 2 augustus 2026 kunnen toezichthouders erop handhaven.",
  },
  {
    q: "Krijgen wij een boete van 35 miljoen als we niets doen?",
    a: "Nee. Dat bedrag hoort bij verboden AI-toepassingen uit Artikel 5, niet bij Artikel 4. Artikel 4 kent geen eigen boete. Het risico zit erin dat toezichthouders het meewegen bij andere overtredingen, en in civiele aansprakelijkheid als er schade ontstaat.",
  },
  {
    q: "Hoeveel kost de training?",
    a: "€249 ex BTW per deelnemer. Vanaf 50 deelnemers ontvang je de leiderschapsmasterclass gratis. Neem contact op voor een offerte op maat.",
  },
  {
    q: "Krijg ik een certificaat?",
    a: "Ja. Elke deelnemer die slaagt voor het adaptieve examen ontvangt het AI Literacy Practitioner-certificaat. Digitaal ondertekend en deelbaar via LinkedIn. De AI Act schrijft geen verplicht certificaat voor, maar het certificaat is onderdeel van het dossier waarmee je aantoont dat er getraind is en waarom dat voldoende is.",
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
