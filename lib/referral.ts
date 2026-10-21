// The referral programme ("Aanbevelen"): one place for the rules, so the page, the form and
// HubSpot always say the same thing.
//
// Anyone can sign up at /aanbevelen and gets a personal link: aigeletterdheid.academy/?ref=CODE.
// A visitor who arrives through that link keeps the code for the rest of the visit (sessionStorage,
// nothing after the browser closes), and the quote form sends it along. Leads can also type the
// name of whoever sent them. Payouts are done by hand once the client has paid.

/** Reward per paid seat for a client of 1 to 49 seats */
export const PER_SEAT = 25;
/** From this many seats it is an enterprise deal, rewarded as a share of the invoice */
export const ENTERPRISE_FROM = 50;
export const ENTERPRISE_PCT = 10;
/** Bonuses for the referred client */
export const WEBINAR_FROM = 10;
export const WORKSHOP_FROM = 100;

export const PAYOUTS = [
  { id: "uitbetaling", label: "Uitbetaling", body: "Op factuur, voor zzp'ers, adviseurs en partners." },
  { id: "tegoed", label: "Tegoed", body: "Voor je eigen organisatie, bijvoorbeeld extra plekken." },
  { id: "goed-doel", label: "Goed doel", body: "Wij maken het over naar een goed doel dat jij kiest." },
] as const;
export type PayoutId = (typeof PAYOUTS)[number]["id"];

const KEY = "aiga_ref";
const CODE = /^[A-Z0-9-]{3,24}$/;

export const normalizeCode = (raw: string | null | undefined) => {
  const c = (raw || "").trim().toUpperCase();
  return CODE.test(c) ? c : "";
};

/** Called on every page view: keep a ?ref= code for the rest of the visit */
export function captureRef() {
  try {
    const code = normalizeCode(new URLSearchParams(window.location.search).get("ref"));
    if (code) sessionStorage.setItem(KEY, code);
  } catch { /* sessionStorage unavailable */ }
}

export function readRef(): string {
  try {
    return normalizeCode(sessionStorage.getItem(KEY));
  } catch {
    return "";
  }
}

export const referralLink = (code: string) => `https://aigeletterdheid.academy/?ref=${encodeURIComponent(code)}`;
