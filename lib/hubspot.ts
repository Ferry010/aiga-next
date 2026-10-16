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
const TOKEN = process.env.HUBSPOT_SERVICE_KEY || process.env.HUBSPOT_ACCESS_TOKEN;

// Which website this lead came in on. Shown in deal names and notes, and stored in the contact
// property "Bron website" (internal name bron_website) when that property exists in HubSpot.
const SITE_LABEL = "AIGA";
const SITE_PROPERTY = "bron_website";

export type HubspotLeadKind = "offerte" | "masterclass" | "contact" | "callback" | "vraag" | "scan";

export type HubspotLead = {
  kind: HubspotLeadKind;
  naam: string;
  email?: string;
  telefoon?: string;
  organisatie?: string;
  details?: string;
  source?: string;
};

// Values of the existing contact property "lead_source"
function leadSource(kind: HubspotLeadKind, source = ""): string {
  const s = source.toLowerCase();
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
  if (l.kind === "masterclass") return `${SITE_LABEL} · Masterclass · ${who}`;
  if (l.kind === "callback") return `${SITE_LABEL} · Terugbellen na AI-risicocheck · ${who}`;
  return `${SITE_LABEL} · Teamtraining · ${who}${size && size !== "onbekend" ? ` (${size})` : ""}`;
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

// Write contact properties; if "Bron website" doesn't exist (yet) in HubSpot, write the rest anyway
async function writeContact(path: string, method: "POST" | "PATCH", props: Record<string, string>) {
  const first = await hs(path, { method, body: JSON.stringify({ properties: props }) });
  const missingProperty = first.status === 400 && JSON.stringify(first.data || "").includes(SITE_PROPERTY);
  if (!missingProperty) return first;
  const rest = { ...props };
  delete rest[SITE_PROPERTY];
  return hs(path, { method, body: JSON.stringify({ properties: rest }) });
}

const assoc = (id: string, typeId: number) => ({
  to: { id },
  types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: typeId }],
});

export async function pushLeadToHubspot(l: HubspotLead): Promise<{ ok: boolean; reason?: string }> {
  if (!TOKEN) return { ok: false, reason: "HUBSPOT_ACCESS_TOKEN not set" };
  const email = l.email?.trim().toLowerCase();
  if (!email) return { ok: false, reason: "no e-mail" };

  try {
    // 1. Contact: find by e-mail, then update or create
    const found = await hs(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=lead_source,${SITE_PROPERTY}`);
    const [firstname, ...rest] = l.naam.trim().split(/\s+/);
    const props: Record<string, string> = { email };
    if (l.telefoon) props.phone = l.telefoon;
    if (l.organisatie && !l.organisatie.startsWith("Onbekend")) props.company = l.organisatie;

    let contactId: string;
    if (found.status === 200 && found.data?.id) {
      contactId = found.data.id;
      if (!found.data.properties?.lead_source) props.lead_source = leadSource(l.kind, l.source);
      if (!found.data.properties?.[SITE_PROPERTY]) props[SITE_PROPERTY] = SITE_LABEL;
      await writeContact(`/crm/v3/objects/contacts/${contactId}`, "PATCH", props);
    } else {
      // Names only on create: an existing contact keeps how it was entered in HubSpot
      props.firstname = firstname || "";
      props.lastname = rest.join(" ");
      props.lead_source = leadSource(l.kind, l.source);
      props.hs_lead_status = "NEW";
      props[SITE_PROPERTY] = SITE_LABEL;
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
