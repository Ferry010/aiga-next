import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Veelgestelde Vragen over AI-Geletterdheid & AI Act | AIGA",
  description: "Antwoorden op veelgestelde vragen over AI-geletterdheid en de EU AI Act. Wat is verplicht, hoe werkt het certificaat en wat kost het?",
  alternates: { canonical: "https://aigeletterdheid.academy/faq" },
};

const faqItems = [
  { q: "Wat is AI-geletterdheid?", a: "AI-geletterdheid is het vermogen van medewerkers om AI-systemen te begrijpen, risico's te herkennen en AI veilig en verantwoord in te zetten op de werkvloer. Onder Artikel 4 van de EU AI Act geldt een inspanningsverplichting voor organisaties om de ontwikkeling van AI-geletterdheid te ondersteunen bij medewerkers die met AI werken." },
  { q: "Is een AI-geletterdheid training verplicht in Nederland?", a: "Artikel 4 van de EU AI Act is van kracht sinds 2 februari 2025. Organisaties moeten de ontwikkeling van AI-geletterdheid ondersteunen bij medewerkers die met AI werken, en dat kunnen onderbouwen. Vanaf 2 augustus 2026 kunnen nationale toezichthouders hierop handhaven." },
  { q: "Is AI-geletterdheid nog steeds verplicht na de Digital Omnibus?", a: "Ja. Artikel 4 is versoepeld, niet geschrapt. De plicht ging van 'zorgen voor een toereikend niveau' naar 'het ondersteunen van de ontwikkeling van AI-geletterdheid'. Vanaf 2 augustus 2026 kunnen toezichthouders erop handhaven." },
  { q: "Krijgen wij een boete van 35 miljoen als we niets doen?", a: "Nee. Dat bedrag hoort bij verboden AI-toepassingen uit Artikel 5, niet bij Artikel 4. Artikel 4 kent geen eigen boete. Het risico zit erin dat toezichthouders het meewegen bij andere overtredingen, en in civiele aansprakelijkheid als er schade ontstaat." },
  { q: "Hoe lang duurt de AI-geletterdheid training?", a: "De online AI-geletterdheid training voor teams duurt 2 tot 3 uur. De training is volledig selfpaced en kan door medewerkers in eigen tempo worden gevolgd." },
  { q: "Wat is het AI Literacy Practitioner certificaat?", a: "Het AI Literacy Practitioner certificaat is een digitaal ondertekend certificaat dat elke deelnemer ontvangt na afronding van de AIGA training. Het is deelbaar via LinkedIn en dient als controleerbaar bewijs van deelname. De AI Act schrijft geen verplicht certificaat voor, maar vraagt dat je kunt onderbouwen wat er per functie geleerd is en waarom dat voldoende is." },
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
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <details key={i} className="group bg-card border border-border rounded-xl px-6 open:neon-card-top">
                    <summary className="flex items-center justify-between py-5 font-semibold text-foreground cursor-pointer list-none">
                      <span>{item.q}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="text-muted-foreground pb-5 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}
