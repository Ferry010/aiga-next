// FAQ copy for /training and /masterclass. Rendered on the page and emitted
// as FAQPage JSON-LD from the same source, so they can never drift apart.

export type Faq = { q: string; a: string };

export const TRAINING_FAQ: Faq[] = [
  {
    q: "Wat kost de teamtraining?",
    a: "€249 ex btw per persoon. Vanaf 50 plekken is het een enterprise-traject: dan maken we een offerte op maat, inclusief de live masterclass voor je directie en MT.",
  },
  {
    q: "Kunnen we later nog mensen toevoegen?",
    a: "Ja. Je zet zoveel mensen in de training als je wil, nu of later. Kom je boven de 50 plekken, dan maken we een enterprise-offerte op maat.",
  },
  {
    q: "Hoe snel kunnen we starten?",
    a: "Een klein team kan snel beginnen. Bij een grotere organisatie plannen we de start samen in, zodat het past bij jullie planning.",
  },
  {
    q: "Wat leren medewerkers precies?",
    a: "Vier modules met samen 22 lessen: begrijpen wat AI is, veilig en verantwoord werken met AI, slim werken met AI, en AI toepassen in je eigen werk. Van wat je nooit in een AI-tool invoert tot je eerste drie toepassingen. Het volledige programma staat op deze pagina.",
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
    a: "€495 ex btw per persoon, met een minimum van 5 deelnemers. Bij een enterprise-traject voor de teamtraining (vanaf 50 plekken) is de masterclass inbegrepen.",
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
