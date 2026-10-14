// What happens after a form: the route per kind of request, and the lead's details
// kept for this visit only, so a follow-up question doesn't ask for them again.

export type NextStepsKind = "training" | "masterclass" | "contact" | "terugbellen";

export type NextStep = { title: string; body: string; when: string; ask: string };

export const NEXT_STEPS: Record<NextStepsKind, { intro: string; steps: NextStep[] }> = {
  training: {
    intro: "Je aanvraag is binnen. Zo gaat het verder, van ons eerste contact tot je team aan de slag gaat.",
    steps: [
      {
        title: "Je aanvraag komt bij een van ons binnen",
        body: "Ferry, Robbert of Tom bekijkt je aanvraag en neemt contact met je op. Vroeg je om een offerte, dan sturen we die soms meteen.",
        when: "Binnen één werkdag",
        ask: "Bijvoorbeeld: kun je me bellen op een ander nummer?",
      },
      {
        title: "Je keurt de offerte goed",
        body: "Daarna spreken we af wanneer je team, of een eerste groep, toegang krijgt tot de online leeromgeving. Wij zetten alles klaar, jij deelt de link.",
        when: "Na je akkoord",
        ask: "Bijvoorbeeld: kunnen we met één afdeling beginnen?",
      },
      {
        title: "Je team gaat van start",
        body: "Iedereen leert online en in eigen tempo, met korte lessen tussen het werk door. Wie het eindexamen haalt, krijgt een certificaat van deelname.",
        when: "Op het moment dat jullie past",
        ask: "Bijvoorbeeld: hoeveel tijd kost het per persoon?",
      },
    ],
  },
  masterclass: {
    intro: "Je aanvraag is binnen. Zo gaat het verder, van ons eerste gesprek tot de sessie zelf.",
    steps: [
      {
        title: "Je aanvraag komt bij een van ons binnen",
        body: "Ferry, Robbert of Tom belt je om een datum en de opzet te prikken.",
        when: "Binnen één werkdag",
        ask: "Bijvoorbeeld: kun je me bellen op een ander nummer?",
      },
      {
        title: "We stemmen de sessie op jullie af",
        body: "Een open sessie, of besloten met alleen jullie eigen mensen. Op jullie locatie of online, op een datum die past.",
        when: "In het eerste gesprek",
        ask: "Bijvoorbeeld: kan de sessie bij ons op kantoor?",
      },
      {
        title: "Twee uur live met Ferry Hoes",
        body: "Vier blokken, met ruimte voor jullie eigen vragen. Iedere deelnemer krijgt na afloop een bewijs van deelname.",
        when: "Op de afgesproken datum",
        ask: "Bijvoorbeeld: kunnen we vooraf onderwerpen aandragen?",
      },
    ],
  },
  contact: {
    intro: "Je bericht is binnen. Zo gaat het verder.",
    steps: [
      {
        title: "Je bericht komt bij een van ons binnen",
        body: "Ferry, Robbert of Tom leest je bericht en neemt contact met je op.",
        when: "Binnen één werkdag",
        ask: "Bijvoorbeeld: ik ben alleen 's ochtends bereikbaar.",
      },
      {
        title: "We zoeken samen uit wat past",
        body: "De teamtraining, de masterclass voor je directie, of allebei. Je krijgt een voorstel dat past bij jullie situatie.",
        when: "In het eerste gesprek",
        ask: "Bijvoorbeeld: wat is het verschil tussen de training en de masterclass?",
      },
      {
        title: "Je kunt beginnen",
        body: "Na je akkoord zetten wij alles klaar. Je team leert online en in eigen tempo, je directie live.",
        when: "Op het moment dat jullie past",
        ask: "Bijvoorbeeld: kunnen we in januari starten?",
      },
    ],
  },
  terugbellen: {
    intro: "Je terugbelverzoek is binnen. Zo gaat het verder.",
    steps: [
      {
        title: "We bellen je",
        body: "Een van ons belt je en kijkt samen met je naar je resultaat van de check: waar het goed zit, en waar nog niet.",
        when: "Binnen één werkdag",
        ask: "Bijvoorbeeld: bel me liever na 14:00.",
      },
      {
        title: "Je krijgt een voorstel",
        body: "Past de teamtraining, dan sturen we een offerte voor het aantal mensen dat je wilt trainen.",
        when: "Na het gesprek",
        ask: "Bijvoorbeeld: kan ik ook met een klein team beginnen?",
      },
      {
        title: "Je team gaat van start",
        body: "Iedereen leert online en in eigen tempo. Daarna weet iedereen wat wel en niet in een AI-tool mag.",
        when: "Op het moment dat jullie past",
        ask: "Bijvoorbeeld: hoeveel tijd kost het per persoon?",
      },
    ],
  },
};

export type RememberedLead = {
  naam?: string;
  email?: string;
  telefoon?: string;
  organisatie?: string;
};

const KEY = "aiga_lead_next";

export function rememberLead(lead: RememberedLead) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(lead));
  } catch { /* sessionStorage unavailable */ }
}

export function readLead(): RememberedLead {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// The contact form's "waarmee kunnen we helpen" choice decides which route to show
export function kindFromHulp(hulp: string | undefined): NextStepsKind {
  if (hulp === "training") return "training";
  if (hulp === "masterclass") return "masterclass";
  return "contact";
}

export const firstName = (naam?: string) => (naam || "").trim().split(/\s+/)[0] || "";
