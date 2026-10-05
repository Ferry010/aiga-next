import type { Metadata } from "next";
import { PageHero, OfferteBlock } from "@/components/PageKit";
import SplitSection from "@/components/SplitSection";
import FaqList from "@/components/FaqList";
import { TRAINING_FAQ, type Faq } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over AI-geletterdheid en de AI-training | AIGA",
  description:
    "Antwoorden op de vragen die we het vaakst krijgen: shadow AI, data en privacy, wat de training kost, hoe het certificaat werkt en hoe het zit met de AI Act.",
  alternates: { canonical: "https://aigeletterdheid.academy/faq" },
};

const RISK_FAQ: Faq[] = [
  {
    q: "Wat als onze mensen al AI gebruiken?",
    a: "Precies daarom. De training gaat niet over óf ze AI mogen gebruiken, maar of ze het veilig en goed doen: welke data eruit blijft, hoe je output controleert en waar het misgaat.",
  },
  {
    q: "Wat is shadow AI en waarom is het een risico?",
    a: "Shadow AI is AI-gebruik voor je werk waar de organisatie niet van weet, zoals een privé ChatGPT-account voor een klantmail. Zo belandt bedrijfsdata buiten beeld en sluipen er fouten in. De training leert je mensen waar de grens ligt.",
  },
  {
    q: "Wat leren onze mensen over data en privacy?",
    a: "Welke informatie wel en niet in een AI-tool mag, waarom dat uitmaakt, en hoe je gevoelige of vertrouwelijke gegevens herkent voordat je ze deelt.",
  },
  {
    q: "Hoe verhoudt dit zich tot gratis cursussen van Google of Microsoft?",
    a: "Die leren vooral hoe hun eigen tools werken. Deze training is niet gebonden aan één tool en gaat over wat er wel en niet in een AI-tool mag in jullie eigen werk, met toetsen, een eindexamen en een certificaat van deelname.",
  },
];

const ACT_FAQ: Faq[] = [
  {
    q: "Wat is AI-geletterdheid?",
    a: "Dat je begrijpt wat AI is, waar het misgaat en hoe je het veilig en verstandig inzet in je werk. Niet technisch, wel praktisch.",
  },
  {
    q: "Is een AI-training verplicht?",
    a: "De EU AI Act vraagt organisaties om de AI-geletterdheid van medewerkers die met AI werken te ondersteunen. Dat is een inspanningsverplichting, geen verplichte cursus. Met de training en de certificaten van deelname laat je zien dat je het gestructureerd hebt aangepakt.",
  },
  {
    q: "Wat veranderde de Digital Omnibus?",
    a: "Artikel 4 is versoepeld, niet geschrapt. In plaats van 'zorgen voor een toereikend niveau' vraagt de wet nu dat je de ontwikkeling van AI-geletterdheid ondersteunt. Het echte risico zit voor de meeste organisaties ook niet in de wet, maar in data die buiten beeld raakt.",
  },
];

const all = [...TRAINING_FAQ, ...RISK_FAQ, ...ACT_FAQ];
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: all.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        crumb="FAQ"
        title="Vragen over AI in je team?"
        accent="Liever nu gesteld dan na een datalek."
        intro="De vragen die we het vaakst krijgen, kort beantwoord. Staat de jouwe er niet bij? Bel of mail ons."
      />
      <SplitSection title="Over de training" intro="Kosten, tijd, toetsen en certificaat.">
        <FaqList items={TRAINING_FAQ} />
      </SplitSection>
      <SplitSection title="Shadow AI en data" intro="Wat er misgaat als niemand de grens uitlegt.">
        <FaqList items={RISK_FAQ} />
      </SplitSection>
      <SplitSection title="AI-geletterdheid en de AI Act" intro="Wat de wet vraagt, zonder paniek.">
        <FaqList items={ACT_FAQ} />
      </SplitSection>
      <OfferteBlock title="Staat je vraag er niet bij?" source="FAQ pagina, offerte aanvraag" />
    </div>
  );
}
