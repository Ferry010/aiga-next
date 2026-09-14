import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "AI-training voor je hele team en je directie | AIGA",
  description:
    "Je mensen gebruiken AI al, vaak buiten je zicht. AIGA brengt je hele team op dezelfde praktische basis en geeft je directie de richting. Twee manieren, één premisse.",
  alternates: { canonical: "https://aigeletterdheid.academy" },
  openGraph: {
    title: "AI-training voor je hele team en je directie | AIGA",
    description:
      "Je mensen gebruiken AI al, vaak buiten je zicht. Breng je team op dezelfde basis en geef je directie de richting.",
    url: "https://aigeletterdheid.academy",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "AIGA, AI-training voor teams en directies" }],
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "AIGA | AI Geletterdheid Academy",
  alternateName: "AIGA",
  url: "https://aigeletterdheid.academy",
  logo: "https://aigeletterdheid.academy/assets/AIGA_transparent-CxHDVoMM.png",
  description:
    "AIGA brengt organisaties op één praktische basis voor verantwoord AI-gebruik: een online teamtraining voor iedereen en een live masterclass voor directie en management.",
  areaServed: { "@type": "Country", name: "Nederland" },
  telephone: "+31103167827",
  email: "robbert@speakersacademy.nl",
  foundingDate: "2024",
  contactPoint: { "@type": "ContactPoint", telephone: "+31103167827", contactType: "sales", availableLanguage: "Dutch" },
  sameAs: ["https://www.linkedin.com/company/aiga-nl"],
  knowsAbout: ["AI-geletterdheid", "verantwoord AI-gebruik", "AI governance", "AI training"],
};

// Exact gelijk aan de drie vraag-antwoordparen in sectie 3 van de homepage.
const faqItems = [
  {
    q: "Kan ik het niet gewoon verbieden?",
    a: "Dat werkt niet meer. AI zit in de tools die je mensen elke dag gebruiken. Verbieden betekent alleen dat het verder uit je zicht verdwijnt.",
  },
  {
    q: "We hebben toch al een AI-beleid?",
    a: "Een document verandert geen gedrag. Als niemand het kent of toepast, gebeurt op de werkvloer alsnog precies wat er nu gebeurt.",
  },
  {
    q: "Moet mijn hele team dan AI-expert worden?",
    a: "Nee. Ze hoeven alleen te weten hoe AI werkt, waar het misgaat, en hoe je het verstandig inzet. Dat is een paar uur, geen opleiding.",
  },
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

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePageClient />
    </>
  );
}
