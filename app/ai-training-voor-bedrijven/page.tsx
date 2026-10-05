import type { Metadata } from "next";
import { PageHero, TextSection, PointGrid, PriceTiers, OfferteBlock, container } from "@/components/PageKit";
import HeroChat from "@/components/HeroChat";

export const metadata: Metadata = {
  title: "AI-training voor bedrijven: welke data stopt je team in AI? | AIGA",
  description:
    "Je betaalt al voor AI-tools zoals Copilot. Zorg dat je team ze ook echt goed gebruikt: veilig, met minder fouten en meer rendement. Online training met certificaat van deelname, €249 ex btw per medewerker.",
  alternates: { canonical: "/ai-training-voor-bedrijven" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Training voor Bedrijven in Nederland",
  description: "Online AI-training voor Nederlandse bedrijven, met certificaat van deelname.",
  url: "https://aigeletterdheid.academy/ai-training-voor-bedrijven",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

export default function AiTrainingVoorBedrijvenPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="AI-training voor bedrijven"
        title="Je betaalt al voor AI-tools."
        accent="Maar weet je welke data je team erin stopt?"
        intro="Een licentie voor Copilot, ChatGPT of Gemini kost al snel €20 tot €30 per medewerker per maand. Maar een tool aanzetten is niet hetzelfde als er goed mee werken."
        primary={{ href: "#offerte", label: "Vraag een offerte aan" }}
        secondary={{ href: "/training#programma", label: "Bekijk het programma" }}
        aside={<HeroChat />}
      />

      <TextSection title="Licenties zonder uitleg">
        <p>
          De meeste mensen prompten maar wat, delen data die eruit moet blijven, of laten de tool links liggen. Niet uit
          onwil: niemand heeft ooit uitgelegd hoe het goed en veilig moet.
        </p>
        <p className="text-foreground">
          Voor een fractie van wat je al aan licenties betaalt, leert deze training je mensen AI veilig én goed te
          gebruiken. Minder fouten, minder data buiten beeld, meer uit de tools die je al hebt.
        </p>
      </TextSection>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <PointGrid
            cols={3}
            items={[
              { title: "Praktisch en Nederlandstalig", body: "Afgestemd op de Nederlandse werkvloer. Geen technische voorkennis nodig." },
              { title: "In eigen tempo", body: "Vier modules met korte lessen, een toets per module en een digitaal eindexamen." },
              { title: "Aantoonbaar geregeld", body: "Elke medewerker die slaagt, krijgt een certificaat van deelname. Later mensen toevoegen kan altijd." },
            ]}
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">Wat het kost</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">Je betaalt per persoon. Hoe groter je team, hoe lager de prijs per plek.</p>
          <div className="mt-8"><PriceTiers /></div>
        </div>
      </section>

      <OfferteBlock title="Haal meer uit de AI-tools die je al betaalt." source="AI training voor bedrijven, offerte aanvraag" />
    </div>
  );
}
