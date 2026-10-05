import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, TextSection, PriceTiers, OfferteBlock, container } from "@/components/PageKit";
import CourseProgress from "@/components/CourseProgress";
import ProgramAccordion from "@/components/ProgramAccordion";
import SplitSection from "@/components/SplitSection";
import FaqList from "@/components/FaqList";
import type { Faq } from "@/lib/faq";

export const metadata: Metadata = {
  title: "AI-geletterdheid training voor je hele team | AIGA",
  description:
    "Je mensen gebruiken AI al. Deze online training leert ze wat er wel en niet in een AI-tool mag, hoe ze output controleren en wanneer ze AI beter niet gebruiken. Met toetsen, eindexamen en certificaat van deelname.",
  alternates: { canonical: "https://aigeletterdheid.academy/ai-geletterdheid-training" },
  openGraph: {
    title: "AI-geletterdheid training voor je hele team | AIGA",
    description:
      "Online training in AI-geletterdheid: veilig en slim werken met AI, met toetsen, eindexamen en certificaat van deelname.",
    url: "https://aigeletterdheid.academy/ai-geletterdheid-training",
    type: "website",
    locale: "nl_NL",
  },
};

// One source for the visible FAQ and the FAQPage JSON-LD
const faqs: Faq[] = [
  {
    q: "Is AI-geletterdheid wettelijk verplicht?",
    a: "De EU AI Act vraagt organisaties die AI gebruiken om de AI-geletterdheid van hun medewerkers te ondersteunen. Na de Digital Omnibus is dat een inspanningsverplichting: je laat zien dat je er gestructureerd werk van maakt. Met de training en de certificaten van deelname kun je dat onderbouwen.",
  },
  {
    q: "Geldt dit ook als we alleen ChatGPT of Copilot gebruiken?",
    a: "Ja. Wie AI-tools inzet, valt onder de AI Act als gebruiker. Artikel 4 geldt dus ook als je team alleen met tools als ChatGPT, Copilot of Gemini werkt.",
  },
  {
    q: "Wat kost de training?",
    a: "Je betaalt per persoon: €249 ex btw voor 1 tot 10 personen, €229 ex btw voor 11 tot 49 personen. Vanaf 50 personen is het een enterprise-traject met een offerte op maat, inclusief de live masterclass voor je directie en MT.",
  },
  {
    q: "Krijgen deelnemers een certificaat?",
    a: "Ja. Na de modules volgen toetsen en een digitaal eindexamen. Wie voldoende scoort, krijgt een certificaat van deelname.",
  },
  {
    q: "Hoe lang duurt de training?",
    a: "Een paar uur per persoon, verdeeld over vier modules die mensen in eigen tempo volgen, tussen het werk door.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI-geletterdheid training",
  description: "Online training in AI-geletterdheid voor teams, met toetsen, een digitaal eindexamen en een certificaat van deelname.",
  provider: { "@type": "Organization", name: "AIGA - AI Geletterdheid Academy", sameAs: "https://aigeletterdheid.academy" },
  offers: { "@type": "Offer", price: "249", priceCurrency: "EUR", category: "Professional Training" },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT3H" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AiGeletterdheidTrainingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        crumb="AI-geletterdheid training"
        title="AI-geletterdheid training."
        accent="Voor iedereen die al met AI werkt."
        intro="Je mensen gebruiken AI al. Deze online training leert ze wat er wel en niet in een AI-tool mag, hoe ze output controleren en wanneer ze AI beter niet gebruiken."
        primary={{ href: "#offerte", label: "Vraag een offerte aan" }}
        secondary={{ href: "#programma", label: "Bekijk het programma" }}
        aside={<CourseProgress />}
      />

      <section id="programma" className="pb-16 sm:pb-24 scroll-mt-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">Het programma</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Vier modules met korte lessen, een toets per module en een digitaal eindexamen.{" "}
            <Link href="/training" className="text-primary font-semibold hover:underline">Alles over de teamtraining</Link>
          </p>
          <div className="mt-8 max-w-3xl"><ProgramAccordion /></div>
        </div>
      </section>

      <TextSection title="En de AI Act?">
        <p>
          Artikel 4 van de EU AI Act vraagt organisaties om AI-geletterdheid te ondersteunen. Dat is een mooie bijvangst:
          met de certificaten van deelname laat je zien dat het geregeld is.
        </p>
        <p className="text-foreground">
          Maar de echte reden om te trainen is dichterbij: data die buiten beeld raakt en output die ongecontroleerd de
          deur uitgaat.
        </p>
      </TextSection>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">Wat het kost</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">Je betaalt per persoon. Hoe groter je team, hoe lager de prijs per plek.</p>
          <div className="mt-8"><PriceTiers /></div>
        </div>
      </section>

      <SplitSection title="Wat je waarschijnlijk wil weten">
        <FaqList items={faqs} />
      </SplitSection>

      <OfferteBlock title="Geef je hele team dezelfde AI-basis." source="AI-geletterdheid training pagina, offerte aanvraag" />
    </div>
  );
}
