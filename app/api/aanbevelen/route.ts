import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import { z } from "zod";
import { registerReferrer, NO_KEY } from "@/lib/hubspot";
import { sendMail, teamAlertHtml, escapeHtml, TEAM_INBOX } from "@/lib/mail";
import { PAYOUTS, PER_SEAT, ENTERPRISE_FROM, ENTERPRISE_PCT, WEBINAR_FROM, WORKSHOP_FROM, referralLink } from "@/lib/referral";

// Sign-up for the referral programme. Gives the person a personal code and files them in HubSpot.
// Someone who signs up again with the same e-mail keeps the code they already had.

const Body = z.object({
  naam: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  organisatie: z.string().trim().max(160).optional().default(""),
  uitbetaling: z.enum(PAYOUTS.map((p) => p.id) as [string, ...string[]]),
  akkoord: z.literal(true),
  website: z.string().max(0).optional(), // honeypot: people never see this field
});

// No 0/O or 1/I, so a code read out loud or typed over still works
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeCode(naam: string) {
  const first = naam
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 8) || "AIGA";
  const tail = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
  return `${first}-${tail}`;
}

// The link by e-mail too, so nobody loses it once the page is closed
function welcomeHtml(naam: string, code: string) {
  const link = referralLink(code);
  const first = escapeHtml(naam.trim().split(/\s+/)[0]);
  return `<div style="font-family:Lato,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1F1A2E;line-height:1.6">
<p>Hoi ${first},</p>
<p>Je doet mee met het aanbevelingsprogramma van AIGA. Dit is je persoonlijke link:</p>
<p style="margin:18px 0;padding:14px 16px;background:#F1ECFB;border-radius:10px;font-weight:bold"><a href="${link}" style="color:#4B2A9B">${link}</a></p>
<p>Je code is <strong>${escapeHtml(code)}</strong>. Komt iemand niet via je link, dan kan die je naam of code invullen bij de offerteaanvraag.</p>
<p><strong>Wat jij krijgt:</strong> &euro;${PER_SEAT} per betaalde plek, en vanaf ${ENTERPRISE_FROM} plekken ${ENTERPRISE_PCT}% van het factuurbedrag ex btw. Je ontvangt het zodra de klant heeft betaald.</p>
<p><strong>Wat zij krijgen:</strong> vanaf ${WEBINAR_FROM} plekken een gratis webinar voor hun team, vanaf ${WORKSHOP_FROM} plekken een gratis workshop op locatie.</p>
<p>Vragen? Beantwoord gewoon deze mail.</p>
<p>Ferry Hoes<br>AI Geletterdheid Academy</p>
</div>`;
}

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Controleer je gegevens en probeer het opnieuw." }, { status: 400 });
  }
  const b = parsed.data;
  const label = PAYOUTS.find((p) => p.id === b.uitbetaling)!.label;

  const crm = await registerReferrer({ naam: b.naam, email: b.email, organisatie: b.organisatie, uitbetaling: label, code: makeCode(b.naam) });
  if (!crm.ok && crm.reason !== NO_KEY) console.error("HubSpot:", crm.reason);

  await sendMail({
    to: b.email,
    subject: "Je persoonlijke AIGA-aanbevelingslink",
    html: welcomeHtml(b.naam, crm.code),
    replyTo: TEAM_INBOX ? TEAM_INBOX.split(",")[0].trim() : undefined,
  }).catch(() => null);

  if (TEAM_INBOX) {
    await sendMail({
      to: TEAM_INBOX,
      subject: `Nieuwe aanbeveler: ${b.naam.slice(0, 60)}${b.organisatie ? `, ${b.organisatie.slice(0, 60)}` : ""}`,
      html: teamAlertHtml("Nieuwe aanmelding voor het aanbevelingsprogramma", [
        ["Naam", b.naam],
        ["Organisatie", b.organisatie],
        ["E-mail", b.email],
        ["Ontvangen als", label],
        ["Code", crm.code],
      ]),
      replyTo: b.email,
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true, code: crm.code });
}
