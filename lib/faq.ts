// FAQ copy for /training and /masterclass. Rendered on the page and emitted
// as FAQPage JSON-LD from the same source, so they can never drift apart.

export type Faq = { q: string; a: string };

export const TRAINING_FAQ: Faq[] = [
  {
    q: "Wat kost de teamtraining?",
    a: "€249 ex btw per deelnemer. Vanaf 50 deelnemers krijg je de masterclass voor je directie en management er gratis bij.",
  },
  {
    q: "Kunnen we later nog mensen toevoegen?",
    a: "Ja, onbeperkt. Nieuwe collega's zet je er gewoon bij, voor hetzelfde tarief per deelnemer.",
  },
  {
    q: "Hoe snel kunnen we starten?",
    a: "Binnen twee werkdagen na akkoord staat je team live. Jij deelt de link, de rest loopt vanzelf.",
  },
  {
    q: "Wat leren medewerkers precies?",
    a: "Vier modules: begrijpen wat AI is, veilig en verantwoord werken met AI, slim werken met AI, en AI toepassen in je eigen werk.",
  },
  {
    q: "Hoeveel tijd kost het per medewerker?",
    a: "Een paar uur, verdeeld over vier modules die mensen tussen het werk door volgen. Volledig in eigen tempo, dus zonder roostergedoe.",
  },
  {
    q: "Hoe wordt er getoetst?",
    a: "Na de modules volgen tussentijdse toetsen, aan het eind een digitaal eindexamen. Wie voldoende scoort, krijgt een certificaat van deelname.",
  },
  {
    q: "Is er technische kennis nodig?",
    a: "Nee. De training is gemaakt voor iedereen die met AI werkt, van de collega die alles al met ChatGPT doet tot degene die het nog niet durft aan te raken.",
  },
  {
    q: "Waar staat onze data?",
    a: "Op Europese servers.",
  },
  {
    q: "Helpt dit ook voor de AI Act?",
    a: "Ja, als bijvangst. De AI Act vraagt organisaties om AI-geletterdheid te ondersteunen. Met de training en de certificaten van deelname kun je laten zien dat je dat gestructureerd hebt aangepakt.",
  },
];

export const MASTERCLASS_FAQ: Faq[] = [
  {
    q: "Wat kost de masterclass?",
    a: "€495 ex btw per deelnemer, met een minimum van 5 deelnemers. Volgen 50 of meer collega's de teamtraining, dan is de masterclass gratis.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Twee uur, in vier blokken: wat er nu al met AI gebeurt, wat het voor jou als leidinggevende betekent, van risico naar richting, en een live Q&A met Ferry Hoes.",
  },
  {
    q: "Op locatie of online?",
    a: "Allebei kan. We plannen de masterclass op een datum die jullie past.",
  },
  {
    q: "Voor wie is de masterclass?",
    a: "Voor directie, management en iedereen die beslist hoe de organisatie met AI omgaat.",
  },
  {
    q: "Krijgen deelnemers een bewijs van deelname?",
    a: "Ja. Iedere deelnemer krijgt een bewijs van deelname.",
  },
  {
    q: "Hoe verhoudt dit zich tot de teamtraining?",
    a: "De masterclass zet de richting bij de leiding. De teamtraining brengt iedereen daaronder op dezelfde basis. De meeste organisaties doen allebei.",
  },
  {
    q: "Helpt dit ook voor de AI Act?",
    a: "Als bijvangst. Op directieniveau kun je laten zien dat je AI-gebruik gestructureerd hebt aangepakt en vastgelegd.",
  },
];

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
