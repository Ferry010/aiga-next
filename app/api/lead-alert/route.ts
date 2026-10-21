import { NextRequest, NextResponse } from "next/server";
import { sendMail, teamAlertHtml, TEAM_INBOX } from "@/lib/mail";
import { pushLeadToHubspot, NO_KEY, type HubspotLeadKind } from "@/lib/hubspot";

// Every form on the site calls this. It puts the lead in HubSpot and, when a team inbox is set,
// emails the team so the "we bellen binnen één werkdag" promise can be kept. The recipients are
// fixed server-side: callers can only describe a lead, never choose who gets it.

const TITLES: Record<string, string> = {
  offerte: "Nieuwe offerteaanvraag teamtraining",
  masterclass: "Nieuwe aanvraag masterclass",
  contact: "Nieuw contactformulier",
  callback: "Terugbelverzoek na AI-risicocheck",
  vraag: "Vraag over een stap na een aanvraag",
};

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : undefined);

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b || !TITLES[b.type] || !b.naam || !(b.email || b.telefoon)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const lead = {
    naam: clip(b.naam, 120)!,
    email: clip(b.email, 200),
    telefoon: clip(b.telefoon, 40),
    organisatie: clip(b.organisatie, 160),
    extra: clip(b.extra, 2000),
    source: clip(b.source, 500),
    referral: clip(b.referral, 120)?.trim() || undefined,
  };

  const [crm, mail] = await Promise.all([
    pushLeadToHubspot({
      kind: b.type as HubspotLeadKind,
      naam: lead.naam,
      email: lead.email,
      telefoon: lead.telefoon,
      organisatie: lead.organisatie,
      details: lead.extra,
      source: lead.source,
      referral: lead.referral,
    }),
    TEAM_INBOX
      ? sendMail({
          to: TEAM_INBOX,
          subject: `${TITLES[b.type]}: ${lead.naam.slice(0, 60)}${lead.organisatie ? `, ${lead.organisatie.slice(0, 60)}` : ""}`,
          html: teamAlertHtml(TITLES[b.type], [
            ["Naam", lead.naam],
            ["Organisatie", lead.organisatie],
            ["Telefoon", lead.telefoon],
            ["E-mail", lead.email],
            ["Details", lead.extra],
            ["Bron", lead.source],
            ["Doorverwezen door", lead.referral],
          ]),
          replyTo: lead.email,
        }).then((r) => r.sent)
      : Promise.resolve(false),
  ]);

  if (!crm.ok && crm.reason !== NO_KEY) console.error("HubSpot:", crm.reason);
  return NextResponse.json({ ok: crm.ok || mail, hubspot: crm.ok, mail });
}
