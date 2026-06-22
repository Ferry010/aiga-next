import type { Metadata } from "next";
import QuizClient from "@/components/QuizClient";

export const metadata: Metadata = {
  title: "AI Gereedheidscan — Voldoe jij aan de EU AI Act? | AIGA",
  description:
    "Doe de gratis AI Gereedheidscan en ontdek in 3 minuten hoe jouw organisatie scoort op AI-compliance. 10 vragen, directe score op 5 dimensies, persoonlijk actieplan per e-mail.",
  alternates: { canonical: "https://aigeletterdheid.academy/gereedheidscan" },
  openGraph: {
    title: "AI Gereedheidscan — Voldoe jij aan de EU AI Act?",
    description:
      "Doe de gratis scan en ontdek in 3 minuten hoe jouw organisatie scoort op AI-compliance. Persoonlijk actieplan in je inbox.",
    url: "https://aigeletterdheid.academy/gereedheidscan",
    type: "website",
    siteName: "AI Geletterdheid Academy",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Gereedheidscan — Voldoe jij aan de EU AI Act?",
    description:
      "Doe de gratis scan en ontdek in 3 minuten hoe jouw organisatie scoort op AI-compliance.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Voor wie is de AI Gereedheidscan bedoeld?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor iedereen die verantwoordelijkheid draagt voor mensen, beleid of compliance binnen een organisatie. Denk aan managers, HR-directeuren, compliance officers, bestuurders en ondernemers die willen weten hoe ze er echt voor staan.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt de AI Gereedheidscan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minder dan 3 minuten. Je beantwoordt 10 vragen en ziet daarna direct je resultaat — zonder wachten of aanmelden.",
      },
    },
    {
      "@type": "Question",
      name: "Is de AI Gereedheidscan echt gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Geen creditcard, geen proefperiode, geen verborgen kosten. De scan is een service van AIGA om organisaties te helpen begrijpen waar ze staan.",
      },
    },
    {
      "@type": "Question",
      name: "Wat ontvang ik na de AI Gereedheidscan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct na de laatste vraag zie je jouw score op 5 dimensies en de bijbehorende tier. Als je je naam en e-mailadres achterlaat, ontvang je een persoonlijk rapport met uitleg en concrete aanbevelingen per e-mail.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is de EU AI Act en wat verandert er voor mij?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De EU AI Act is de Europese wetgeving die regelt hoe organisaties AI mogen gebruiken. Sinds februari 2025 geldt de verplichting dat alle medewerkers die met AI werken, AI-geletterd moeten zijn. Organisaties die dat niet kunnen aantonen riskeren boetes tot €35 miljoen of 7% van hun wereldwijde jaaromzet.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ik laag scoor op de AI Gereedheidscan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dan ben je in goed gezelschap — de meeste organisaties staan er niet zo goed voor als ze denken. Wat je wél hebt na de scan: inzicht. En inzicht is het begin van actie. In je rapport staat precies wat je als eerste moet doen.",
      },
    },
    {
      "@type": "Question",
      name: "Worden mijn gegevens gedeeld met derden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Je gegevens worden alleen gebruikt om je rapport te sturen en om de kwaliteit van de scan te verbeteren. We delen niets met derden.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://aigeletterdheid.academy",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Gereedheidscan",
      item: "https://aigeletterdheid.academy/gereedheidscan",
    },
  ],
};

export default function GereedheidscanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <QuizClient />
    </>
  );
}
