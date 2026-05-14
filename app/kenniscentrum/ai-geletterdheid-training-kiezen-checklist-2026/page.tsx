import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const SLUG = "ai-geletterdheid-training-kiezen-checklist-2026";
const URL = `https://aigeletterdheid.academy/kenniscentrum/${SLUG}`;
const IMAGE = "/assets/artikel-checklist-header.svg";
const PUBLISHED = "2026-05-13";
const H1 = "Hoe kies je de juiste AI-geletterdheid training? Een checklist voor 2026.";

export const metadata: Metadata = {
  title: "Hoe kies je een AI-geletterdheid training? Checklist met 10 criteria (2026) | AIGA",
  description: "10 criteria om de juiste AI-geletterdheid training te kiezen voor jouw organisatie. Audit-proof? Nederlandstalig? Snel te starten? Lees de complete checklist.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Hoe kies je een AI-geletterdheid training? Checklist met 10 criteria (2026)",
    description: "10 criteria om de juiste AI-geletterdheid training te kiezen voor jouw organisatie.",
    images: [{ url: IMAGE, width: 1200, height: 630, alt: H1 }],
    type: "article",
    publishedTime: PUBLISHED,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  author: { "@id": "https://aigeletterdheid.academy/#ferry" },
  publisher: { "@id": "https://aigeletterdheid.academy/#org" },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: URL,
  image: `https://aigeletterdheid.academy${IMAGE}`,
};

const criteria = [
  {
    n: "1",
    title: "Is er een examen met slagingsgrens?",
    body: "Een training die eindigt met een deelnamebewijs bewijst aanwezigheid. Een training die eindigt met een examen bewijst kennis. Dat verschil is bij een audit groot. Zoek naar trainingen met een adaptief examen, een minimale slagingsdrempel van 70%, en een certificaat dat daaraan gekoppeld is. Vraag altijd: wat moet iemand bewijzen om het certificaat te ontvangen?",
  },
  {
    n: "2",
    title: "Is de training volledig Nederlandstalig?",
    body: "Ondertitels zijn geen vervanging. Een training die je medewerkers in het Engels doorloopt, terwijl zij in het Nederlands werken, vergroot de kans op begripsfouten en verkleint de retentie. AI-geletterdheid gaat over nuance. Nuance gaat verloren in vertaling.",
  },
  {
    n: "3",
    title: "Is de prijs per seat transparant gepubliceerd?",
    body: 'Trainingen die alleen "op aanvraag" een prijs geven zijn niet per definitie duurder. Maar het gebrek aan transparantie vertraagt je inkoopproces en maakt vergelijken lastig. Publiceer je prijs of niet: dat is een keuze die iets zegt over hoe een aanbieder met zijn klanten omgaat.',
  },
  {
    n: "4",
    title: "Hoe snel kun je starten na bestelling?",
    body: "Als jij vandaag besluit, wanneer kan je team beginnen? Sommige aanbieders starten binnen twee werkdagen. Andere hebben een offertefase van drie weken, gevolgd door een LMS-integratie die nog eens vier weken duurt. Als augustus 2026 je deadline is, telt die doorlooptijd.",
  },
  {
    n: "5",
    title: "Sluit de inhoud aan op EU AI Act Artikel 4?",
    body: "Niet elke AI-training is EU AI Act-specifiek. Trainingen gebaseerd op internationale kaders, andere AI-standaarden of generieke digitale vaardigheden dekken niet automatisch de verplichtingen van Artikel 4. Controleer of de training expliciet verwijst naar Verordening 2024/1689 en de deployer-verplichtingen die daarin staan.",
  },
  {
    n: "6",
    title: "Is de training geschikt voor medewerkers zonder technische achtergrond?",
    body: "De AI Act gaat over iedereen die met AI werkt, niet alleen over IT'ers of data scientists. De meeste medewerkers in een gemiddelde organisatie hebben geen technische achtergrond. Een training die uitgaat van programmeerkennis of wiskundig begrip sluit de meerderheid van je team uit.",
  },
  {
    n: "7",
    title: "Hoe wordt de inhoud actueel gehouden?",
    body: "De AI Act is in beweging. De uitvoeringsbesluiten van de Europese Commissie, de richtsnoeren van de Autoriteit Persoonsgegevens, de handhavingspraktijk: alles verandert nog. Vraag naar de update-frequentie van de cursusmaterialen. Een training die voor het laatst werd bijgewerkt in 2024 dekt de stand van 2026 niet.",
  },
  {
    n: "8",
    title: "Is er rolspecifieke verdieping beschikbaar?",
    body: "Een receptioniste die een AI-chatbot gebruikt heeft andere kennis nodig dan een HR-manager die werft met een AI-selectietool. Een goede training biedt minimaal drie niveaus: basisbewustzijn voor alle medewerkers, functionele toepassing voor actieve gebruikers, en risicobeheer voor beslissers. Vraag of dat onderscheid gemaakt wordt.",
  },
  {
    n: "9",
    title: "Hoe wordt het certificaat opgeslagen en gedeeld?",
    body: "Een certificaat dat alleen als PDF in een e-mail aankomt, is minder bruikbaar dan een digitaal ondertekend certificaat dat deelbaar is via LinkedIn en herleidbaar is bij een audit. Vraag: is het certificaat persoonsgebonden, digitaal ondertekend, en hoe bewaar je de resultaten centraal voor jouw organisatie?",
  },
  {
    n: "10",
    title: "Is er een optie voor leidinggevenden?",
    body: "Artikel 4 geldt voor alle medewerkers die met AI werken. Maar leidinggevenden dragen een extra verantwoordelijkheid: zij beslissen over de inzet van AI-systemen. Een training die alleen de werkvloer bedient en management negeert, is onvolledig. Vraag of er een apart traject is voor directie en management, en of dat bij het pakket inbegrepen is of apart geprijsd.",
  },
];

export default function ChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="min-h-screen">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Kenniscentrum", href: "/kenniscentrum" },
            { label: H1 },
          ]}
        />

        {/* Hero image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={IMAGE} alt={H1} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <AnimatedSection>
            {/* Category + read time */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">AI-geletterdheid uitgelegd</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> 8 min lezen
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              {H1}
            </h1>

            {/* Author byline */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              <img
                src="/assets/ferry-hoes.gif"
                alt="Ferry Hoes"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Ferry Hoes</p>
                <p className="text-xs text-muted-foreground">13 mei 2026</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Article content */}
          <AnimatedSection delay={0.1}>
            <div className="prose prose-neutral max-w-none dark:prose-invert">

              <p>
                De markt voor AI-geletterdheid trainingen is vol. Elke grote opleider, elk adviesbureau en elk e-learningplatform biedt inmiddels iets aan onder de noemer "AI-geletterdheid". De prijzen lopen uiteen van gratis tot meer dan duizend euro per medewerker. De kwaliteit nog verder.
              </p>
              <p>
                Voor jou als HR-manager, L&D-professional of directeur is dat lastig. Want een foute keuze heeft gevolgen. Niet alleen voor de portemonnee, maar ook voor de audit-readiness van je organisatie.
              </p>
              <p>
                Deze checklist geeft je 10 concrete criteria om elke training snel en systematisch te beoordelen.
              </p>

              <h2>Waarom de keuze meer is dan een prijsvraag</h2>
              <p>
                Artikel 4 van de EU AI Act verplicht organisaties om passende maatregelen te nemen voor AI-geletterdheid. De wet schrijft geen specifiek certificaat voor, maar het woord "passend" is niet vrijblijvend. Bij een audit moet je kunnen aantonen dat de training aansloot bij de context van jouw organisatie, de rollen van je medewerkers en de risico's van de systemen die je gebruikt.
              </p>
              <p>
                Dat stelt eisen aan de training die je kiest. Niet elke "AI-training" telt even zwaar.
              </p>

              <h2>De 10 criteria</h2>

            </div>

            {/* Numbered criteria cards */}
            <div className="space-y-4 mt-4">
              {criteria.map((c) => (
                <div key={c.n} className="flex gap-5 bg-card border border-border rounded-xl p-5">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{c.n}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{c.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="prose prose-neutral max-w-none dark:prose-invert mt-8">

              <h2>De optelsom</h2>
              <p>
                Niet elk criterium weegt even zwaar voor elke organisatie. Voor de meeste Nederlandse organisaties zijn drie criteria doorslaggevend: examen-gebaseerde certificering (criterium 1), volledig Nederlandstalig (criterium 2) en snel starten (criterium 4). De overige criteria bepalen de kwaliteit op de langere termijn.
              </p>
              <p>
                Gebruik deze checklist niet als afvinklijstje. Gebruik hem als gespreksstarter met de aanbieders die je overweegt. Een aanbieder die geen van deze vragen kan beantwoorden, kan jou ook niet helpen bij een audit.
              </p>

              <h2>Wat een training niet vervangt</h2>
              <p>
                Een AI-geletterdheid training is een bouwsteen, geen compleet huis. Een training vervangt niet: een AI-beleid voor jouw organisatie, een AI-register van de systemen die je gebruikt, heldere governance over wie welke AI-beslissingen neemt, en periodieke evaluatie van de risico's van je AI-toepassingen.
              </p>
              <p>
                Als je die vier elementen mist, heb je gecertificeerde medewerkers in een organisatie die niet compliant is. Dat is beter dan niets. Maar het is niet genoeg.
              </p>

              <h2>Wil je meer context?</h2>
              <p>
                Niet zeker in welke categorie een aanbieder valt die je bekijkt? Lees{" "}
                <Link href="/kenniscentrum/ai-geletterdheid-training-landschap-nederland">
                  het overzicht van 6 categorieën AI-geletterdheid aanbieders in Nederland
                </Link>
                . Dat helpt je elke aanbieder direct te plaatsen.
              </p>

            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.2}>
            <div className="mt-10 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Waar staat jouw organisatie nu?
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto">
                Doe de gratis{" "}
                <Link href="/gereedheidscan" className="text-primary font-medium hover:underline">
                  AI Gereedheidscan
                </Link>
                . Tien vragen, drie minuten, direct inzicht in wat je nog mist voor augustus 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/gereedheidscan" className="btn-neon px-8 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center">
                  Start de gereedheidscan
                </Link>
                <Link href="/training" className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary/40 transition-colors inline-flex items-center justify-center">
                  Bekijk de AIGA training
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Ferry bio */}
          <AnimatedSection delay={0.25}>
            <div className="mt-10 pt-8 border-t border-border flex gap-4">
              <img
                src="/assets/ferry-hoes.gif"
                alt="Ferry Hoes"
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Ferry Hoes</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Social share */}
          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Deel dit artikel:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(H1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.263 5.632 5.901-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / Twitter
            </a>
          </div>

          {/* Back link */}
          <div className="mt-6">
            <Link href="/kenniscentrum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Terug naar Kenniscentrum
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
