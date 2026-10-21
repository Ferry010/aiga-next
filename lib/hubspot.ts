// Every lead from the site lands in HubSpot (portal: Brand Humanizing Institute).
// Server-only: the private app token never reaches the browser.
//
// What happens per lead:
//  1. The contact is created, or updated when the e-mail already exists. "Lead source" is only
//     filled when it is still empty, so the first source a contact came from is kept.
//  2. For buying intent (offerte, masterclass, callback after the check) a deal is created in the
//     Sales pipeline at the first stage, linked to the contact.
//  3. A note with all details is added to the contact (and the deal).
//
// Needs HUBSPOT_SERVICE_KEY: a HubSpot service key (Development > Keys > Service keys) with the
// scopes crm.objects.contacts.read/write and crm.objects.deals.read/write. Each website has its own
// key, and every lead is labelled with the site it came from (SITE_LABEL). Without a key this does
// nothing and the site works as before.

const API = "https://api.hubapi.com";
// Names in Vercel are case-sensitive; accept the lowercase spelling too
const TOKEN = process.env.HUBSPOT_SERVICE_KEY || process.env.hubspot_service_key || process.env.HUBSPOT_ACCESS_TOKEN;

// Which website this lead came in on. Shown in deal names and notes, and stored in the contact
// property "Bron website" (internal name bron_website) when that property exists in HubSpot.
const SITE_LABEL = "AIGA";
const SITE_PROPERTY = "bron_website";
// Referral programme properties (create them in HubSpot to fill them). Writes skip any that don't exist.
const REFERRED_BY = "referred_by";
const REFERRAL_CODE = "referral_code";
const REFERRAL_PAYOUT = "referral_payout";
const OPTIONAL = [SITE_PROPERTY, REFERRED_BY, REFERRAL_CODE, REFERRAL_PAYOUT];

export type HubspotLeadKind = "offerte" | "masterclass" | "contact" | "callback" | "vraag" | "scan";

export type HubspotLead = {
  kind: HubspotLeadKind;
  naam: string;
  email?: string;
  telefoon?: string;
  organisatie?: string;
  details?: string;
  source?: string;
  /** Referral code or the name of whoever sent this lead */
  referral?: string;
};

// Values of the existing contact property "lead_source"
function leadSource(kind: HubspotLeadKind, source = "", referral = ""): string {
  const s = source.toLowerCase();
  if (referral) return "Referral";
  if (kind === "callback" || kind === "scan") return "AI-risicocheck";
  if (s.includes("gclid") || /utm_source: ?google/.test(s)) return "Google Ads";
  if (/utm_source: ?linkedin/.test(s)) return "Linkedin";
  if (/utm_source: ?keynote/.test(s)) return "Keynote audience";
  if (/utm_source: ?speakersacademy/.test(s) || s.includes("speakers academy")) return "Speakers Academy";
  return "Website";
}

const DEAL_KINDS: HubspotLeadKind[] = ["offerte", "masterclass", "callback"];

function dealName(l: HubspotLead): string {
  const who = l.organisatie && !l.organisatie.startsWith("Onbekend") ? l.organisatie : l.naam;
  const size = l.details?.match(/Teamgrootte: ([^·]+)/)?.[1]?.trim();
  // "via CODE" makes referred deals easy to find when it's time to pay out
  const via = l.referral ? ` · via ${l.referral}` : "";
  if (l.kind === "masterclass") return `${SITE_LABEL} · Masterclass · ${who}${via}`;
  if (l.kind === "callback") return `${SITE_LABEL} · Terugbellen na AI-risicocheck · ${who}${via}`;
  return `${SITE_LABEL} · Teamtraining · ${who}${size && size !== "onbekend" ? ` (${size})` : ""}${via}`;
}

const TITLES: Record<HubspotLeadKind, string> = {
  offerte: "Offerte-aanvraag teamtraining",
  masterclass: "Aanvraag masterclass",
  contact: "Contactformulier",
  callback: "Terugbelverzoek na AI-risicocheck",
  vraag: "Vraag op de pagina 'Dit gebeurt er nu'",
  scan: "AI-risicocheck gedaan (uitslag gemaild)",
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

async function hs<T = any>(path: string, init: RequestInit = {}): Promise<{ status: number; data: T }> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
    signal: AbortSignal.timeout(8000),
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  return { status: res.status, data };
}

// Write contact properties; if an optional property (Bron website, the referral fields) doesn't exist
// (yet) in HubSpot, write the rest anyway
async function writeContact(path: string, method: "POST" | "PATCH", props: Record<string, string>) {
  const first = await hs(path, { method, body: JSON.stringify({ properties: props }) });
  const error = first.status === 400 ? JSON.stringify(first.data || "") : "";
  const missing = OPTIONAL.filter((p) => p in props && error.includes(p));
  if (!missing.length) return first;
  const rest = { ...props };
  missing.forEach((p) => delete rest[p]);
  return hs(path, { method, body: JSON.stringify({ properties: rest }) });
}

export const NO_KEY = "HUBSPOT_SERVICE_KEY not set";

const assoc = (id: string, typeId: number) => ({
  to: { id },
  types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: typeId }],
});

export async function pushLeadToHubspot(l: HubspotLead): Promise<{ ok: boolean; reason?: string }> {
  if (!TOKEN) return { ok: false, reason: NO_KEY };
  const email = l.email?.trim().toLowerCase();
  if (!email) return { ok: false, reason: "no e-mail" };

  try {
    // 1. Contact: find by e-mail, then update or create
    const found = await hs(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=lead_source,${SITE_PROPERTY},${REFERRED_BY}`);
    const [firstname, ...rest] = l.naam.trim().split(/\s+/);
    const props: Record<string, string> = { email };
    if (l.telefoon) props.phone = l.telefoon;
    if (l.organisatie && !l.organisatie.startsWith("Onbekend")) props.company = l.organisatie;

    let contactId: string;
    if (found.status === 200 && found.data?.id) {
      contactId = found.data.id;
      if (!found.data.properties?.lead_source) props.lead_source = leadSource(l.kind, l.source, l.referral);
      if (!found.data.properties?.[SITE_PROPERTY]) props[SITE_PROPERTY] = SITE_LABEL;
      if (l.referral && !found.data.properties?.[REFERRED_BY]) props[REFERRED_BY] = l.referral;
      await writeContact(`/crm/v3/objects/contacts/${contactId}`, "PATCH", props);
    } else {
      // Names only on create: an existing contact keeps how it was entered in HubSpot
      props.firstname = firstname || "";
      props.lastname = rest.join(" ");
      props.lead_source = leadSource(l.kind, l.source, l.referral);
      props.hs_lead_status = "NEW";
      props[SITE_PROPERTY] = SITE_LABEL;
      if (l.referral) props[REFERRED_BY] = l.referral;
      const created = await writeContact(`/crm/v3/objects/contacts`, "POST", props);
      if (!created.data?.id) return { ok: false, reason: `contact create failed (${created.status})` };
      contactId = created.data.id;
    }

    // 2. Deal for buying intent (deal → contact: association type 3)
    let dealId: string | undefined;
    if (DEAL_KINDS.includes(l.kind)) {
      const deal = await hs(`/crm/v3/objects/deals`, {
        method: "POST",
        body: JSON.stringify({
          properties: { dealname: dealName(l), pipeline: "default", dealstage: "appointmentscheduled" },
          associations: [assoc(contactId, 3)],
        }),
      });
      dealId = deal.data?.id;
    }

    // 3. Note with everything we know (note → contact: 202, note → deal: 214)
    const lines = [
      `<strong>${esc(SITE_LABEL)} website · ${esc(TITLES[l.kind])}</strong>`,
      l.organisatie ? `Organisatie: ${esc(l.organisatie)}` : "",
      l.telefoon ? `Telefoon: ${esc(l.telefoon)}` : "",
      l.details ? `Details: ${esc(l.details)}` : "",
      l.source ? `Bron: ${esc(l.source)}` : "",
      l.referral ? `<strong>Doorverwezen door: ${esc(l.referral)}</strong>` : "",
    ].filter(Boolean);
    await hs(`/crm/v3/objects/notes`, {
      method: "POST",
      body: JSON.stringify({
        properties: { hs_timestamp: new Date().toISOString(), hs_note_body: lines.join("<br>") },
        associations: [assoc(contactId, 202), ...(dealId ? [assoc(dealId, 214)] : [])],
      }),
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown error" };
  }
}

export type Referrer = { naam: string; email: string; organisatie?: string; uitbetaling: string; code: string };

/**
 * Someone signs up for the referral programme. Saves them as a contact with their code and payout
 * choice, plus a note. Signing up again with the same e-mail keeps the code they already have.
 */
export async function registerReferrer(r: Referrer): Promise<{ ok: boolean; code: string; reason?: string }> {
  if (!TOKEN) return { ok: false, code: r.code, reason: NO_KEY };
  const email = r.email.trim().toLowerCase();
  try {
    const found = await hs(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=lead_source,${SITE_PROPERTY},${REFERRAL_CODE}`);
    const code = (found.status === 200 && found.data?.properties?.[REFERRAL_CODE]) || r.code;
    const props: Record<string, string> = { email, [REFERRAL_CODE]: code, [REFERRAL_PAYOUT]: r.uitbetaling };
    if (r.organisatie) props.company = r.organisatie;

    let contactId: string;
    if (found.status === 200 && found.data?.id) {
      contactId = found.data.id;
      if (!found.data.properties?.lead_source) props.lead_source = "Website";
      if (!found.data.properties?.[SITE_PROPERTY]) props[SITE_PROPERTY] = SITE_LABEL;
      await writeContact(`/crm/v3/objects/contacts/${contactId}`, "PATCH", props);
    } else {
      const [firstname, ...rest] = r.naam.trim().split(/\s+/);
      Object.assign(props, { firstname: firstname || "", lastname: rest.join(" "), lead_source: "Website", [SITE_PROPERTY]: SITE_LABEL });
      const created = await writeContact(`/crm/v3/objects/contacts`, "POST", props);
      if (!created.data?.id) return { ok: false, code, reason: `contact create failed (${created.status})` };
      contactId = created.data.id;
    }

    await hs(`/crm/v3/objects/notes`, {
      method: "POST",
      body: JSON.stringify({
        properties: {
          hs_timestamp: new Date().toISOString(),
          hs_note_body: [
            `<strong>${esc(SITE_LABEL)} website · Aangemeld voor het aanbevelingsprogramma</strong>`,
            `Code: ${esc(code)}`,
            `Ontvangen als: ${esc(r.uitbetaling)}`,
            r.organisatie ? `Organisatie: ${esc(r.organisatie)}` : "",
          ].filter(Boolean).join("<br>"),
        },
        associations: [assoc(contactId, 202)],
      }),
    });
    return { ok: true, code };
  } catch (e) {
    return { ok: false, code: r.code, reason: e instanceof Error ? e.message : "unknown error" };
  }
}
