// Client-side helpers shared by every form: report the conversion to GA4
// (imported into Google Ads as a key event) and Meta, and alert the team.

type Win = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * GA4 event names used as Google Ads conversions:
 * lead_offerte, lead_masterclass, lead_contact, lead_callback (primary)
 * lead_scan (secondary: observe, don't bid on it)
 */
export function trackLead(event: string, value?: number) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  if (typeof w.gtag === "function") {
    w.gtag("event", event, value ? { currency: "EUR", value } : {});
  }
  try {
    if (localStorage.getItem("aiga_cookie_consent") === "accepted" && typeof w.fbq === "function") {
      w.fbq("track", "Lead", { content_name: event });
    }
  } catch {
    /* localStorage unavailable */
  }
}

/** A plain GA4 event, e.g. scan_complete. No personal data, no Meta "Lead". */
export function trackEvent(event: string) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  if (typeof w.gtag === "function") w.gtag("event", event);
}

export type LeadAlert = {
  type: "offerte" | "masterclass" | "contact" | "callback";
  naam: string;
  email?: string;
  telefoon?: string;
  organisatie?: string;
  extra?: string;
  source?: string;
};

/** Fire-and-forget: a failed alert must never block the visitor. */
export function alertTeam(lead: LeadAlert) {
  fetch("/api/lead-alert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    keepalive: true,
  }).catch(() => {});
}
