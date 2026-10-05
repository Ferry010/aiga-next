// Teamtraining price tiers. One source for the site, the chat and the FAQ.
// Rule: 11 seats must never cost less in total than 10 (11 × 229 > 10 × 249).

export type Tier = { id: "small" | "mid" | "enterprise"; label: string; range: string; price: number | null };

export const TIERS: Tier[] = [
  { id: "small", label: "1 tot 10", range: "1 tot 10 personen", price: 249 },
  { id: "mid", label: "11 tot 49", range: "11 tot 49 personen", price: 229 },
  { id: "enterprise", label: "50 of meer", range: "50+ personen", price: null },
];

export const BASE_PRICE = 249;
export const MID_PRICE = 229;

export const eur = (n: number) => `€${n.toLocaleString("nl-NL")}`;
