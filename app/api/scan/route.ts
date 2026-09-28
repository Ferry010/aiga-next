import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendMail, escapeHtml, teamAlertHtml, TEAM_INBOX } from "@/lib/mail";

const SITE = "https://aigeletterdheid.academy";

const TIERS: Record<string, { color: string; label: string; heading: string; body: string }> = {
  "HOOG RISICO": {
    color: "#C53030",
    label: "Hoog risico",
    heading: "Je mensen gebruiken AI, maar niemand ziet wat er gebeurt.",
    body: "Er zijn geen gedeelde afspraken en weinig zicht op welke data waar terechtkomt. Dat is niemands schuld: AI kwam sneller binnen dan de begeleiding eromheen. Het goede nieuws is dat je dit in één keer rechttrekt.",
  },
  "GEMIDDELD RISICO": {
    color: "#A86B00",
    label: "Gemiddeld risico",
    heading: "Een deel staat. Maar er zitten gaten waar je niet naar kijkt.",
    body: "Sommige mensen werken al bewust met AI, anderen nog op gevoel. Precies in dat verschil lekt data weg en glippen fouten erdoor. Eén gedeelde basis voor iedereen dicht die gaten.",
  },
  "WEINIG RISICO": {
    color: "#2F7A4D",
    label: "Weinig risico",
    heading: "Je hebt meer grip dan de meeste organisaties.",
    body: "Houd dat zo. Elke nieuwe collega en elke nieuwe AI-tool is een nieuw gat als niemand het borgt. De volgende stap is die basis vastleggen, zodat hij niet afhangt van een paar mensen.",
  },
};

function buildEmail(name: string, score: number, category: string, dims: Record<string, number>, resultUrl: string): string {
  const tier = TIERS[category] ?? TIERS["HOOG RISICO"];
  const trainingUrl = `${SITE}/training?utm_source=scan_email&utm_medium=email&utm_campaign=risicocheck`;
  const weakestFirst = Object.entries(dims).sort((a, b) => a[1] - b[1]);

  const dimRows = weakestFirst
    .map(([label, value], i) => {
      const v = Math.max(0, Math.min(100, Math.round(value)));
      const bar = v < 40 ? "#C53030" : v < 70 ? "#C98A10" : "#2F7A4D";
      return `<tr><td style="padding:10px 0 4px;font-size:14px;color:#23201D">${escapeHtml(label)}${i === 0 ? ' <span style="color:#C53030;font-weight:bold">&nbsp;grootste gat</span>' : ""}</td><td style="padding:10px 0 4px;font-size:14px;color:#6B6459;text-align:right">${v}%</td></tr>
<tr><td colspan="2" style="padding:0 0 4px"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EDE6DA;border-radius:4px"><tr><td style="width:${Math.max(v, 3)}%;height:8px;background:${bar};border-radius:4px;font-size:0;line-height:0">&nbsp;</td><td style="font-size:0;line-height:0">&nbsp;</td></tr></table></td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Je AI-risicocheck</title></head>
<body style="margin:0;padding:0;background:#F3EDE3;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">Je score: ${score}% grip op AI-gebruik. Hier zit je grootste gat, en zo los je het op.</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F3EDE3;padding:32px 16px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background:#FAF8F4;border-radius:14px">

<tr><td style="padding:28px 36px 0"><span style="font-size:22px;font-weight:bold;color:#6E43D6;letter-spacing:-0.5px">AIGA</span></td></tr>

<tr><td style="padding:24px 36px 0">
<p style="margin:0 0 6px;font-size:16px;color:#23201D">Hoi ${escapeHtml(name)},</p>
<p style="margin:0;font-size:16px;line-height:1.6;color:#6B6459">Dit is je uitslag van de AI-risicocheck.</p>
</td></tr>

<tr><td style="padding:24px 36px 0">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid #23201D"><tr>
<td style="padding:18px 0 0;vertical-align:bottom"><span style="font-size:56px;font-weight:bold;line-height:1;color:#23201D">${score}%</span><br><span style="font-size:13px;color:#6B6459">grip op AI-gebruik</span></td>
<td style="padding:18px 0 0;text-align:right;vertical-align:bottom"><span style="display:inline-block;background:${tier.color};color:#ffffff;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;border-radius:999px">${tier.label}</span></td>
</tr></table>
</td></tr>

<tr><td style="padding:24px 36px 0">
<p style="margin:0 0 10px;font-size:19px;font-weight:bold;line-height:1.35;color:#23201D">${tier.heading}</p>
<p style="margin:0;font-size:15px;line-height:1.65;color:#23201D">${tier.body}</p>
</td></tr>

<tr><td style="padding:26px 36px 0">
<p style="margin:0 0 4px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#2F7E8B">Per onderdeel, zwakste eerst</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0">${dimRows}</table>
</td></tr>

<tr><td style="padding:30px 36px 0">
<p style="margin:0 0 14px;font-size:17px;font-weight:bold;color:#23201D">Zo krijg je je hele team op dezelfde basis</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#23201D">Een online training in vier modules, in eigen tempo, met tussentijdse toetsen en een digitaal eindexamen. Wie slaagt, krijgt een certificaat van deelname.</p>
<table cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#6E43D6;border-radius:999px"><a href="${trainingUrl}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">Bekijk de teamtraining</a></td></tr></table>
<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#6B6459">&euro;249 ex btw per persoon &middot; zoveel mensen als je wil &middot; binnen 2 werkdagen live &middot; 50+ plekken in één keer geboekt? Dan is de masterclass voor je MT gratis</p>
</td></tr>

<tr><td style="padding:28px 36px 0">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #E4DCCF"><tr><td style="padding:18px 0 0;font-size:15px;line-height:1.65;color:#23201D">
<strong>Liever eerst even sparren?</strong> Beantwoord deze mail met je telefoonnummer. Dan belt Robbert, Tom of Ferry je binnen één werkdag. Wie het wordt, hangt af van wie het eerst de koffie op heeft.
</td></tr></table>
</td></tr>

<tr><td style="padding:24px 36px 32px">
<p style="margin:0;font-size:13px;line-height:1.6;color:#9B9284"><a href="${resultUrl}" style="color:#6E43D6">Bekijk je volledige uitslag online</a>. Beslist iemand anders over AI-gebruik? Stuur deze mail gerust door.</p>
<p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:#9B9284">Je krijgt deze mail omdat je de AI-risicocheck deed op aigeletterdheid.academy. AIGA is een samenwerking van Brand Humanizing Institute en Speakers Academy.</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, email, bedrijf, score, score_category, dimension_scores } = body ?? {};

  if (!name || !email || typeof score !== "number" || !TIERS[score_category]) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const cleanScore = Math.max(0, Math.min(100, Math.round(score)));
  const dims: Record<string, number> =
    dimension_scores && typeof dimension_scores === "object"
      ? Object.fromEntries(
          Object.entries(dimension_scores as Record<string, unknown>)
            .filter(([, v]) => typeof v === "number")
            .slice(0, 10) as [string, number][]
        )
      : {};

  // Fallback id so the result page still works if the insert fails
  let id: string = crypto.randomUUID();

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("risk_scan_submissions")
      .insert({
        naam: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        bedrijfsnaam: bedrijf ? String(bedrijf).slice(0, 200) : "Niet opgegeven",
        tier: score_category,
        totaal_score: cleanScore,
        dimensie_scores: dims,
      })
      .select("id")
      .single();
    if (error) console.error("Scan insert error (non-fatal):", error.message);
    else if (data) id = data.id;
  } catch (dbErr) {
    console.error("Scan insert exception (non-fatal):", dbErr);
  }

  const params = new URLSearchParams({
    n: String(name),
    s: String(cleanScore),
    c: score_category,
    d: Buffer.from(JSON.stringify(dims)).toString("base64"),
  });
  const resultUrl = `${SITE}/gereedheidscan/resultaat/${id}?${params.toString()}`;
  const tier = TIERS[score_category];

  const [toLead] = await Promise.all([
    sendMail({
      to: String(email),
      subject: `Je AI-risicocheck: ${tier.label.toLowerCase()} (${cleanScore}% grip)`,
      html: buildEmail(String(name), cleanScore, score_category, dims, resultUrl),
      replyTo: TEAM_INBOX.split(",")[0].trim(),
    }),
    sendMail({
      to: TEAM_INBOX,
      subject: `Nieuwe AI-risicocheck: ${String(name).slice(0, 60)} (${tier.label})`,
      html: teamAlertHtml("Nieuwe AI-risicocheck", [
        ["Naam", name],
        ["E-mail", email],
        ["Bedrijf", bedrijf],
        ["Uitslag", `${tier.label}, ${cleanScore}% grip`],
        ["Uitslag bekijken", resultUrl],
      ]),
      replyTo: String(email),
    }),
  ]);

  return NextResponse.json({ id, score: cleanScore, score_category, dimension_scores: dims, emailSent: toLead.sent });
}
