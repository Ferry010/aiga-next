import type { Metadata } from "next";
import { PageHero, TextSection, DotList, OfferteBlock } from "@/components/PageKit";

export const metadata: Metadata = {
  title: "AI-geletterdheid in Nederland: wat je moet weten | AIGA",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="AI-geletterdheid in Nederland"
        title="AI zit al in je organisatie."
        accent="Weten je mensen wat ze ermee mogen?"
        intro="De EU AI Act vraagt organisaties om AI-geletterdheid te ondersteunen. Maar het echte probleem is niet de wet. Het is dat je mensen AI allang gebruiken zonder dat iemand heeft uitgelegd wat wel en niet mag."
        primary={{ href: "/training", label: "Bekijk de teamtraining" }}
        secondary={{ href: "/gereedheidscan", label: "Doe de gratis AI-risicocheck" }}
      />

      <TextSection title="Wat is AI-geletterdheid?">
        <p className="text-foreground">
          AI-geletterdheid is dat medewerkers begrijpen wat AI is, waar het misgaat en hoe ze het veilig en verantwoord
          inzetten in hun eigen werk.
        </p>
        <p>
          Niet technisch, wel praktisch: welke gegevens je nooit in een AI-tool zet, hoe je output controleert, en
          wanneer je AI juist niet gebruikt.
        </p>
      </TextSection>

      <TextSection title="De AI Act in Nederland">
        <p>
          De EU AI Act is de eerste wet die kunstmatige intelligentie specifiek regelt. Artikel 4, over AI-geletterdheid,
          geldt sinds 2 februari 2025 voor alle organisaties die AI gebruiken, ook als dat alleen ChatGPT, Copilot of
          Gemini is.
        </p>
        <p>
          Na de Digital Omnibus is dat een inspanningsverplichting: je ondersteunt de ontwikkeling van AI-geletterdheid
          en kunt laten zien hoe. In Nederland werken de Autoriteit Persoonsgegevens en de Rijksinspectie Digitale
          Infrastructuur samen als toezichthouders.
        </p>
      </TextSection>

      <TextSection title="Wat je verstandig regelt">
        <DotList
          items={[
            "Eén gedeelde basis voor alle medewerkers, niet alleen IT",
            "Heldere afspraken over welke data wel en niet in AI-tools mag",
            "Vastleggen wie welke training heeft gevolgd",
            "Iemand die verantwoordelijk is voor AI-gebruik in de organisatie",
          ]}
        />
        <p>
          Wachten op het perfecte beleid heeft weinig zin: een document verandert geen gedrag. Een training die iedereen
          in een paar uur volgt, wel.
        </p>
      </TextSection>

      <OfferteBlock title="Regel het voor je hele team in één keer." source="AI-geletterdheid Nederland, offerte aanvraag" />
    </div>
  );
}
