import type { Metadata } from "next";
import { PageHero, TextSection, DotList, PriceTiers, OfferteBlock, container } from "@/components/PageKit";
import CourseProgress from "@/components/CourseProgress";

export const metadata: Metadata = {
  title: "AI-cursus voor medewerkers: weet je team wat er niet in ChatGPT mag? | AIGA",
  description:
    "Je mensen leren AI nu van YouTube en van elkaar. Geef je hele team dezelfde praktische basis: welke data eruit blijft, shadow AI, veilig én nuttig gebruik. Online in vier modules, met toetsen, digitaal eindexamen en certificaat van deelname. €249 ex btw per medewerker.",
  alternates: { canonical: "/ai-cursus-medewerkers" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Cursus voor Medewerkers",
  description: "Praktische AI cursus voor medewerkers. Leer je hele team AI veilig en verantwoord gebruiken, met een certificaat van deelname.",
  provider: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
  instructor: { "@type": "Person", name: "Ferry Hoes" },
  courseMode: "online",
  inLanguage: "nl",
  educationalLevel: "Beginner tot Intermediate",
  duration: "PT2H30M",
  offers: { "@type": "Offer", price: "249", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
};

export default function AiCursusMedewerkersPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="AI-cursus medewerkers"
        title="Je mensen leren AI nu van YouTube en van elkaar."
        accent="Ondertussen weet niemand welke data er weglekt."
        intro="Iedereen gebruikt AI, maar iedereen op een eigen manier. De één plakt bedrijfsdata in ChatGPT, de ander durft er niet aan. Deze cursus geeft je hele team dezelfde praktische basis."
        primary={{ href: "#offerte", label: "Vraag een offerte aan" }}
        secondary={{ href: "/training#programma", label: "Bekijk het programma" }}
        aside={<CourseProgress />}
      />

      <TextSection title="Wat medewerkers leren">
        <DotList
          items={[
            "Welke bedrijfsdata wel en niet in een AI-tool mag",
            "Hoe je AI-output controleert voordat je het gebruikt",
            "Hoe je hallucinaties en verzonnen bronnen herkent",
            "Wanneer je AI juist beter niet gebruikt",
            "Hoe je AI veilig én nuttig inzet in je eigen werk",
          ]}
        />
        <p>Geen technische voorkennis nodig, en direct inzetbaar bij onboarding van nieuwe collega&apos;s.</p>
      </TextSection>

      <TextSection title="Zo werkt het">
        <p>
          Volledig online en in eigen tempo. Vier modules: begrijpen wat AI is, veilig en verantwoord werken met AI,
          slim werken met AI, en AI toepassen in je werk.
        </p>
        <p>
          Na elke module een korte toets, aan het eind een digitaal eindexamen. Bij voldoende resultaat krijgt elke
          medewerker een <strong className="text-foreground">certificaat van deelname</strong>. Handig meegenomen:
          daarmee laat je ook zien dat je AI-geletterdheid ondersteunt, zoals de AI Act vraagt.
        </p>
      </TextSection>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
            Wat het kost
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Je betaalt per persoon, zonder minimum. Begin met één collega of een heel team, en zet er later mensen bij.
          </p>
          <div className="mt-8"><PriceTiers /></div>
        </div>
      </section>

      <OfferteBlock title="Zet je hele team op dezelfde AI-basis." source="AI cursus medewerkers, offerte aanvraag" />
    </div>
  );
}
