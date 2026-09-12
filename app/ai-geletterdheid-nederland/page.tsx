import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DefinitionBlock from "@/components/DefinitionBlock";

export const metadata: Metadata = {
  title: "AI-Geletterdheid in Nederland: Complete Gids 2026 | AIGA",
  description:
    "AI zit al in je organisatie. Weten je mensen wat ze ermee mogen? Kort en concreet: wat de EU AI Act in Nederland vraagt, en hoe je het in één keer regelt met een kant-en-klaar programma.",
  alternates: { canonical: "/ai-geletterdheid-nederland" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI-Geletterdheid in Nederland",
  description: "Alles over AI-geletterdheid in Nederland en de EU AI Act.",
  url: "https://aigeletterdheid.academy/ai-geletterdheid-nederland",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

export default function AiGeletterdheidNederlandPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI-Geletterdheid Nederland" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="AI-GELETTERDHEID IN NEDERLAND" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4">
              AI zit al in je organisatie.{" "}
              <span className="text-primary">Weten je mensen wat ze ermee mogen?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              De EU AI Act vraagt sinds februari 2025 dat je aantoonbaar investeert in AI-geletterdheid. Maar het echte probleem is niet de wet. Het is dat je mensen AI allang gebruiken zonder dat iemand ze heeft uitgelegd wat wél en niet mag. Hieronder kort wat er in Nederland speelt. En hoe je het in één keer regelt.
            </p>
          </AnimatedSection>

          <DefinitionBlock
            term="Wat is AI-geletterdheid?"
            definition="AI-geletterdheid is het vermogen van medewerkers om te begrijpen wat kunstmatige intelligentie is, hoe AI-systemen werken, welke risico's ze met zich meebrengen, en hoe ze AI op een veilige, verantwoorde en ethisch verantwoorde manier kunnen inzetten in hun dagelijks werk. Onder Artikel 4 van de EU AI Act (van kracht vanaf februari 2025) zijn organisaties in de EU verplicht om AI-geletterdheid te waarborgen voor alle medewerkers die met AI-systemen werken."
          />

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              De EU AI Act in Nederland
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                De EU AI Act is de eerste wetgeving ter wereld die specifiek gericht is op het reguleren van kunstmatige intelligentie. In Nederland werken de Autoriteit Persoonsgegevens (AP) en de Rijksinspectie Digitale Infrastructuur samen als coördinerende toezichthouders, naast ongeveer tien sectorale toezichthouders. Artikel 4 (AI-geletterdheid) geldt al sinds 2 februari 2025. Vanaf 2 augustus 2026 kunnen toezichthouders hierop handhaven. Na de Digital Omnibus (juni 2026) geldt een inspanningsverplichting: organisaties moeten de ontwikkeling van AI-geletterdheid ondersteunen en dat kunnen aantonen.
              </p>
              <p>
                De wet maakt onderscheid tussen verschillende risiconiveaus van AI-systemen. Maar ongeacht het risiconiveau geldt Artikel 4: alle organisaties moeten investeren in AI-geletterdheid van hun medewerkers.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Wat verwacht de Rijksoverheid?
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                De Nederlandse overheid heeft via het Algoritmebeleid en het Werkprogramma AI al duidelijk gemaakt dat AI-geletterdheid een prioriteit is. De Rijksoverheid verwacht dat organisaties:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Aantoonbaar investeren in AI-kennis van medewerkers</li>
                <li>Documentatie bijhouden van trainingen en certificeringen</li>
                <li>Een intern AI-beleid opstellen met duidelijke richtlijnen</li>
                <li>Verantwoordelijkheden voor AI-gebruik vastleggen</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Hoe gaan Nederlandse organisaties om met AI-geletterdheid?
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Minder dan 20% van de Nederlandse organisaties heeft een formeel AI-geletterdheidsbeleid. De rest weet dat er iets moet, maar niet waar te beginnen. Ondertussen gebruiken hun mensen AI gewoon door.
              </p>
              <p>
                Wachten op het perfecte beleid heeft geen zin: een document verandert geen gedrag. Wat wél werkt is één gedeelde basis voor álle medewerkers, niet alleen IT. Precies dat regelt AIGA, met een kant-en-klaar programma dat je mensen in 2 tot 3 uur zelfstandig volgen.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25}>
            <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Regel het in één keer
              </h2>
              <p className="mt-4 text-muted-foreground">
                Eén kant-en-klaar programma voor je hele team. Online, in eigen tempo, met certificaat als bewijs. Je bouwt niks zelf.
              </p>
              <Link href="/training" className="btn-neon inline-block mt-6 px-8 py-3 rounded-lg text-sm">
                Bekijk het programma
              </Link>
            </div>
          </AnimatedSection>

          {/* Internal links */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Lees verder in ons Kenniscentrum</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/kenniscentrum/wat-is-ai-geletterdheid" className="text-primary hover:underline">Wat is AI-geletterdheid?</Link></li>
                <li><Link href="/kenniscentrum/eu-ai-act-uitgelegd" className="text-primary hover:underline">De EU AI Act uitgelegd</Link></li>
                <li><Link href="/kenniscentrum/ai-geletterdheid-voor-leiders" className="text-primary hover:underline">AI-geletterdheid voor leiders</Link></li>
                <li><Link href="/kenniscentrum/wat-zijn-high-risk-ai-systemen" className="text-primary hover:underline">Wat zijn high-risk AI-systemen?</Link></li>
                <li><Link href="/faq" className="text-primary hover:underline">Veelgestelde vragen over AI-geletterdheid</Link></li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
