// Referrals, without a public programme page. A personal link (aigeletterdheid.academy/?ref=CODE)
// is remembered for the rest of the visit (sessionStorage, nothing after the browser closes), and
// the quote form sends it along. Leads can also type the name of whoever sent them. In HubSpot a
// referred deal is named "... · via CODE".

/** Bonuses for a referred client */
export const WEBINAR_FROM = 10;
export const WORKSHOP_FROM = 100;

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
