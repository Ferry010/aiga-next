// FAQ copy for /training and /masterclass. Rendered on the page and emitted
// as FAQPage JSON-LD from the same source, so they can never drift apart.

export type Faq = { q: string; a: string };

export const TRAINING_FAQ: Faq[] = [
  {
    q: "Wat kost de teamtraining?",
    a: "Je betaalt per persoon: €249 ex btw voor 1 tot 10 personen, €229 ex btw voor 11 tot 49 personen. Vanaf 50 personen werk je met een enterprise-licentie en een offerte op maat, met een gratis MT-masterclass voor je directie en management (t.w.v. vanaf €2.475).",
  },
  {
    q: "Wat krijg ik als we met 50 of meer mensen starten?",
    a: "Dan werk je met één enterprise-licentie voor je hele organisatie, met een offerte op maat. Je directie en management krijgen er een MT-masterclass van twee uur gratis bij, op locatie of online. Die heeft een waarde van minimaal €2.475.",
  },
  {
    q: "Wat als een medewerker vertrekt?",
    a: "Je koopt plekken, geen namen. Zolang een plek nog niet geactiveerd is, geef je hem aan iemand anders of bewaar je hem voor later. Een geactiveerde plek hoort bij die ene persoon.",
  },
  {
    q: "Kunnen we later nog mensen toevoegen?",
    a: "Ja. Je zet zoveel mensen in de training als je wil, nu of later. Vanaf 11 personen betaal je €229 per persoon, vanaf 50 werk je met een enterprise-licentie met gratis MT-masterclass.",
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
    a: "Gemiddeld 2 à 3 uur, inclusief het eindexamen, verdeeld over vier modules die mensen tussen het werk door volgen. Volledig in eigen tempo, dus zonder roostergedoe.",
  },
  {
    q: "Hoe lang heeft iedereen toegang?",
    a: "12 maanden, gerekend vanaf het moment dat iemand zijn account activeert. Geen abonnement: je betaalt één keer per plek. Heeft iemand meer tijd nodig, dan kun je die plek verlengen.",
  },
  {
    q: "Zie ik wie de training heeft afgerond?",
    a: "Ja. Je krijgt regelmatig een voortgangsupdate. Wil je dat we iemand een herinnering of activatiemail sturen, dan doen we dat. Dat zit bij de prijs inbegrepen.",
  },
  {
    q: "Hoe wordt er getoetst?",
    a: "Na de modules volgen tussentijdse toetsen, aan het eind een digitaal eindexamen. Wie voldoende scoort, krijgt een certificaat van deelname. Niet gehaald? Herkansen kan zo vaak als nodig.",
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
    a: "€495 ex btw per persoon, met een minimum van 5 deelnemers. Bij de teamtraining vanaf 50 personen krijg je de masterclass gratis.",
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
