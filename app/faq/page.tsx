import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Veelgestelde Vragen over AI-Geletterdheid & AI Act | AIGA",
  description: "Antwoorden op veelgestelde vragen over AI-geletterdheid en de EU AI Act. Wat is verplicht, hoe werkt het certificaat en wat kost het?",
  alternates: { canonical: "https://aigeletterdheid.academy/faq" },
};

const faqItems = [
  { q: "Wat is AI-geletterdheid?", a: "AI-geletterdheid is het vermogen van medewerkers om AI-systemen te begrijpen, risico's te herkennen en AI veilig en verantwoord in te zetten op de werkvloer. Onder de EU AI Act is AI-geletterdheid voor alle medewerkers die met AI werken wettelijk verplicht." },
  { q: "Is een AI-geletterdheid training verplicht in Nederland?", a: "Ja. Sinds februari 2025 vereist de EU AI Act dat organisaties die AI inzetten aantoonbaar investeren in AI-geletterdheid van hun medewerkers. Vanaf augustus 2026 wordt dit actief gehandhaafd." },
  { q: "Wat zijn de boetes voor niet-naleving van de AI Act?", a: "Boetes voor overtredingen van de EU AI Act kunnen oplopen tot 35 miljoen euro of 7% van de wereldwijde jaaromzet, afhankelijk van welke overtreding het zwaarst is." },
  { q: "Hoe lang duurt de AI-geletterdheid training?", a: "De online AI-geletterdheid training voor teams duurt 2 tot 3 uur. De training is volledig selfpaced en kan door medewerkers in eigen tempo worden gevolgd." },
  { q: "Wat is het AI Literacy Practitioner certificaat?", a: "Het AI Literacy Practitioner certificaat is een digitaal ondertekend certificaat dat elke deelnemer ontvangt na afronding van de AIGA training. Het certificaat is audit-proof en deelbaar via LinkedIn." },
  { q: "Hoe lang is het certificaat geldig?", a: "Het certificaat is één jaar geldig vanaf de dag van behalen. De inhoud van de training wordt elk kwartaal ge-update." },
  { q: "Hoe verhoudt jullie training zich tot Google of Microsoft Learn?", a: "Onze training is wettelijk gericht, software-onafhankelijk en leidt tot een officieel certificaat, iets wat big tech trainingen niet bieden." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen">
        <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        <section className="pt-12 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionLabel text="FAQ" />
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
                Veelgestelde vragen over<br />
                <span className="neon-text">AI-geletterdheid</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Hier vind je de antwoorden op de meestgestelde vragen over AI-geletterdheid en de EU AI Act.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:neon-card-top">
                    <AccordionTrigger className="text-foreground hover:no-underline text-left font-semibold py-5">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}
