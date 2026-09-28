import { NextRequest, NextResponse } from "next/server";
import { sendMail, teamAlertHtml, TEAM_INBOX } from "@/lib/mail";

// Emails the team when a form comes in, so the "we bellen binnen één werkdag"
// promise can be kept. The recipient is fixed server-side: callers can only
// describe a lead, never choose who gets mail.

const TITLES: Record<string, string> = {
  offerte: "Nieuwe offerteaanvraag teamtraining",
  masterclass: "Nieuwe aanvraag masterclass",
  contact: "Nieuw contactformulier",
  callback: "Terugbelverzoek na AI-risicocheck",
};

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b || !TITLES[b.type] || !b.naam || !(b.email || b.telefoon)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = await sendMail({
    to: TEAM_INBOX,
    subject: `${TITLES[b.type]}: ${String(b.naam).slice(0, 60)}${b.organisatie ? `, ${String(b.organisatie).slice(0, 60)}` : ""}`,
    html: teamAlertHtml(TITLES[b.type], [
      ["Naam", b.naam],
      ["Organisatie", b.organisatie],
      ["Telefoon", b.telefoon],
      ["E-mail", b.email],
      ["Details", b.extra],
      ["Bron", b.source],
    ]),
    replyTo: b.email ? String(b.email).slice(0, 200) : undefined,
  });

  return NextResponse.json({ ok: result.sent });
}
