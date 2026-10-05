import type { Metadata } from "next";
import { PageHero, TextSection, DotList, OfferteBlock } from "@/components/PageKit";
import HeroChat from "@/components/HeroChat";

export const metadata: Metadata = {
  title: "Weet jij wat je team met AI doet? AI-gebruik en de AI Act | AIGA",
  description:
    "Je weet niet wat je mensen met AI doen. Maak verantwoord AI-gebruik een dagelijkse gewoonte en laat zien dat je AI-geletterdheid ondersteunt, zoals Artikel 4 van de EU AI Act vraagt. Gids en training voor Nederlandse organisaties.",
  alternates: { canonical: "/ai-act-compliance-nederland" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Act Compliance voor Nederlandse Organisaties",
  description: "Praktische gids voor AI Act compliance in Nederland.",
  url: "https://aigeletterdheid.academy/ai-act-compliance-nederland",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

const SOURCES = [
  { href: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689", label: "EUR-Lex: Verordening (EU) 2024/1689 (AI Act)" },
  { href: "https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai", label: "Rijksoverheid.nl: Kunstmatige intelligentie" },
  { href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", label: "Europese Commissie: AI Act" },
];

export default function AiActComplianceNederlandPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="Zicht op AI-gebruik"
        title="Je weet niet wat je mensen met AI doen."
        accent="Elke dag zonder zicht is data die al weg is."
        intro="AI is je organisatie binnengekomen zonder dat iemand het heeft aangezet. Mensen plakken vertrouwelijke informatie in ChatGPT, nemen output over zonder te checken en gebruiken tools die niemand heeft goedgekeurd."
        primary={{ href: "#offerte", label: "Vraag een offerte aan" }}
        secondary={{ href: "/gereedheidscan", label: "Check eerst waar je staat" }}
        aside={<HeroChat />}
      />

      <TextSection title="Een beleid op SharePoint verandert geen gedrag">
        <p>
          Afspraken die niemand leest, werken niet. Wat wel werkt: mensen die zelf weten waar de grens ligt. Deze training
          maakt verantwoord AI-gebruik onderdeel van het dagelijks werk: privacy, vertrouwelijke data, hallucinaties,
          menselijke controle, bias en het checken van output.
        </p>
      </TextSection>

      <TextSection title="Wat de AI Act vraagt">
        <p>
          Artikel 4 van de EU AI Act vraagt organisaties om de AI-geletterdheid te ondersteunen van iedereen die met AI
          werkt. Dat geldt ook als je alleen tools als ChatGPT, Copilot of Gemini gebruikt.
        </p>
        <p>
          Sinds de Digital Omnibus is dat een inspanningsverplichting: je moet kunnen laten zien dat je er gestructureerd
          werk van maakt. In Nederland werken de Autoriteit Persoonsgegevens en de Rijksinspectie Digitale Infrastructuur
          samen als toezichthouders.
        </p>
      </TextSection>

      <TextSection title="Wat de training je oplevert">
        <DotList
          items={[
            "Mensen die weten welke data wel en niet in een AI-tool mag",
            "Output die gecontroleerd wordt voordat hij de deur uitgaat",
            "Een certificaat van deelname per medewerker, na een digitaal eindexamen",
            "Een helder overzicht voor je eigen dossier: wie heeft wat gevolgd",
          ]}
        />
        <div className="pt-4">
          <p className="text-sm font-semibold text-foreground">Officiële bronnen</p>
          <ul className="mt-2 space-y-1 text-sm">
            {SOURCES.map((x) => (
              <li key={x.href}>
                <a href={x.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{x.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </TextSection>

      <OfferteBlock title="Maak verantwoord AI-gebruik een gewoonte." source="Zicht op AI-gebruik pagina, offerte aanvraag" />
    </div>
  );
}
