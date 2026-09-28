import type { Metadata } from "next";
import QuizClient from "@/components/QuizClient";
import { mailConfigured } from "@/lib/mail";

export const metadata: Metadata = {
  title: "Gratis AI-risicocheck: hoeveel risico loop je met AI? | AIGA",
  description:
    "Doe de gratis AI-risicocheck en ontdek in 3 minuten waar je organisatie risico loopt met AI: shadow AI, bedrijfsdata en kennisverschil in je team. 10 vragen, direct je score, zonder dat je iets hoeft in te vullen.",
  alternates: { canonical: "https://aigeletterdheid.academy/gereedheidscan" },
  openGraph: {
    title: "Gratis AI-risicocheck: hoeveel risico loop je met AI?",
    description:
      "Ontdek in 3 minuten waar je organisatie risico loopt met AI: shadow AI, data en kennisverschil. Direct je score.",
    url: "https://aigeletterdheid.academy/gereedheidscan",
    type: "website",
    siteName: "AI Geletterdheid Academy",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis AI-risicocheck: welke data verdwijnt er in AI-tools?",
    description:
      "Ontdek in 3 minuten waar je organisatie risico loopt met AI: shadow AI, bedrijfsdata en kennisverschil in je team.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Voor wie is de AI-risicocheck bedoeld?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor iedereen die verantwoordelijk is voor mensen of werkprocessen: managers, HR, IT, directie en ondernemers die willen weten welke data er via AI hun organisatie verlaat.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang duurt de AI-risicocheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minder dan 3 minuten. Je beantwoordt 10 vragen en ziet daarna direct je resultaat, zonder wachten of aanmelden.",
      },
    },
    {
      "@type": "Question",
      name: "Is de AI-risicocheck echt gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Geen creditcard, geen proefperiode, geen verborgen kosten. De scan is een service van AIGA om organisaties te helpen begrijpen waar ze staan.",
      },
    },
    {
      "@type": "Question",
      name: "Wat ontvang ik na de AI-risicocheck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct na de laatste vraag zie je je score op 5 onderdelen, waar je grootste gat zit en een overzicht van je antwoorden. Je hoeft daarvoor niets in te vullen.",
      },
    },
    {
      "@type": "Question",
      name: "Wat als ik laag scoor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dan ben je in goed gezelschap, de meeste organisaties staan er niet zo goed voor als ze denken. Wat je wél hebt na de scan: inzicht. Je uitslag laat zien waar je grootste gat zit, dus waar je als eerste begint.",
      },
    },
    {
      "@type": "Question",
      name: "Worden mijn gegevens gedeeld met derden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Voor de uitslag vragen we geen gegevens. Laat je zelf je e-mailadres of telefoonnummer achter, dan gebruiken we dat alleen om je uitslag te sturen of je te bellen. We delen niets met derden.",
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
      name: "AI-risicocheck",
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
      <QuizClient canEmail={mailConfigured()} />
    </>
  );
}
