import type { Metadata } from "next";
import { PageHero, OfferteBlock, container } from "@/components/PageKit";
import SplitSection from "@/components/SplitSection";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = {
  title: "AI Act deadlines in Nederland: wat geldt wanneer | AIGA",
  description:
    "Overzicht van alle EU AI Act deadlines van 2025 tot 2028. Ontdek wanneer jouw organisatie moet voldoen aan de AI-geletterdheidsplicht en hoog-risico verplichtingen. Bijgewerkt na de Digital Omnibus (juni 2026).",
  alternates: { canonical: "/ai-act-deadlines" },
};

const deadlines = [
  { date: "2 februari 2025", label: "Al van kracht", description: "AI-geletterdheidsplicht (Artikel 4) en verbod op onaanvaardbare AI-toepassingen (Artikel 5, zoals sociale scoring en real-time biometrische identificatie in openbare ruimtes).", active: true },
  { date: "2 augustus 2025", label: "Al van kracht", description: "Verplichtingen voor aanbieders van general-purpose AI-modellen (GPAI), zoals grote taalmodellen. Transparantie-eisen en documentatieplichten treden in werking.", active: true },
  { date: "2 augustus 2026", label: "Handhaving Artikel 4", description: "Nationale markttoezichthouders krijgen formele handhavingsbevoegdheden voor Artikel 4 (AI-geletterdheid). Na de Digital Omnibus (juni 2026) zijn de hoog-risico verplichtingen voor Bijlage III-systemen uitgesteld naar 2 december 2027.", active: false },
  { date: "2 december 2027", label: "Uitgesteld (was 2 aug 2026)", description: "Verplichtingen voor hoog-risico AI-systemen uit Bijlage III. Conformiteitsbeoordelingen, menselijk toezicht, logging en incidentmelding. Uitgesteld via de Digital Omnibus.", active: false },
  { date: "2 augustus 2028", label: "In voorbereiding", description: "Verplichtingen voor AI-systemen in gereguleerde producten (Bijlage I). Eveneens uitgesteld via de Digital Omnibus.", active: false },
];

const faqItems = [
  { q: "Is de AI Act al van kracht?", a: "Ja. De EU AI Act (Verordening 2024/1689) is op 1 augustus 2024 in werking getreden. Sinds 2 februari 2025 gelden de eerste verplichtingen, waaronder de AI-geletterdheidsplicht en het verbod op onaanvaardbare AI-toepassingen. De wet geldt rechtstreeks in alle EU-lidstaten, ook in Nederland." },
  { q: "Geldt de AI Act ook voor kleine bedrijven?", a: "Ja. De AI Act maakt geen uitzondering op basis van bedrijfsgrootte. Elke organisatie die AI-systemen aanbiedt of inzet, ook als dat alleen ChatGPT of Copilot is, valt onder de wet." },
  { q: "Wat betekent dit concreet voor ons team?", a: "Voor de meeste organisaties draait het om Artikel 4: zorg dat je mensen weten hoe ze veilig en verstandig met AI werken, en dat je kunt laten zien hoe je dat ondersteunt. Een training met certificaten van deelname is daar de meest directe manier voor." },
  { q: "Hoe weet ik waar mijn organisatie staat?", a: "Doe de gratis AI-risicocheck. Tien vragen, en je ziet direct je score op vijf onderdelen: zicht op AI-gebruik, bescherming van data, gedeelde basiskennis, controle op output, en sturing en onboarding." },
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

export default function AiActDeadlinesPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        crumb="AI Act deadlines"
        title="AI Act deadlines in Nederland."
        accent="Wat geldt al, en wat komt nog."
        intro="Een overzicht van de belangrijkste data uit de EU AI Act, bijgewerkt na de Digital Omnibus. Voor de meeste organisaties telt vooral de eerste: AI-geletterdheid geldt al."
      />

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <ol className="max-w-3xl border-b border-border">
            {deadlines.map((d) => (
              <li key={d.date} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-2 sm:gap-6 border-t border-border py-6">
                <div>
                  <p className="font-display font-bold text-foreground">{d.date}</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${d.active ? "bg-primary text-white" : "block-lilac text-foreground"}`}>
                    {d.label}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{d.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SplitSection title="Veelgestelde vragen">
        <FaqList items={faqItems} />
      </SplitSection>

      <OfferteBlock title="Regel AI-geletterdheid voor je hele team." source="AI Act deadlines pagina, offerte aanvraag" />
    </div>
  );
}
