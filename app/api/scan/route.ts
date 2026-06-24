import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

function buildEmail({
  name,
  score,
  score_category,
  resultUrl,
}: {
  name: string;
  score: number;
  score_category: string;
  resultUrl: string;
}): string {
  const tierBg =
    score_category === "VOORLOPER"
      ? "#15a34a"
      : score_category === "GEDEELTELIJK GEREED"
      ? "#d97706"
      : "#dc2626";

  const interpretation =
    score_category === "VOORLOPER"
      ? "Jullie lopen voor op de meeste Nederlandse organisaties. Dit is het moment om die voorsprong te formaliseren en te certificeren."
      : score_category === "GEDEELTELIJK GEREED"
      ? "Er zijn blinde vlekken, maar de basis is er. Met gerichte stappen kom je snel tot volledige compliance."
      : "Jouw organisatie is nog niet klaar voor de EU AI Act. Maar je weet het nu — en dat is de eerste stap naar actie.";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

        <tr>
          <td style="background-color:#9B3FF5;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#e9d5ff;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;">AI Geletterdheid Academy</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">Jouw AI Gereedheidsresultaat</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hoi ${name},</p>
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">
              Bedankt voor het invullen van de AI Gereedheidscan. Hier is een samenvatting van jouw resultaat:
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;margin:0 0 24px;">
              <tr>
                <td style="padding:28px;text-align:center;">
                  <p style="margin:0 0 4px;color:#6b7280;font-size:13px;font-weight:500;">Totaalscore</p>
                  <p style="margin:0 0 10px;color:#111827;font-size:52px;font-weight:700;line-height:1;">${score}%</p>
                  <span style="display:inline-block;background-color:${tierBg};color:#ffffff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:999px;letter-spacing:0.06em;text-transform:uppercase;">${score_category}</span>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.7;">${interpretation}</p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:28px;">
                  <a href="${resultUrl}" style="display:inline-block;background-color:#9B3FF5;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;">Bekijk jouw volledige rapport &#8594;</a>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;text-align:center;">
              Je ontvangt dit bericht omdat je de AI Gereedheidscan hebt ingevuld op aigeletterdheid.academy.<br>
              Vragen? Mail naar <a href="mailto:info@aigeletterdheid.academy" style="color:#9B3FF5;text-decoration:none;">info@aigeletterdheid.academy</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:18px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:11px;">&#169; 2025 AI Geletterdheid Academy &middot; <a href="https://aigeletterdheid.academy" style="color:#9ca3af;text-decoration:none;">aigeletterdheid.academy</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, bedrijf, score, score_category, dimension_scores } = body;

  if (!name || !email || score === undefined || !score_category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Generate a local UUID as fallback in case the DB insert fails
  let id = crypto.randomUUID();

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("risk_scan_submissions")
      .insert({
        naam: name,
        email,
        bedrijfsnaam: bedrijf || "Niet opgegeven",
        tier: score_category,
        totaal_score: score,
        dimensie_scores: dimension_scores,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error (non-fatal):", error.message);
    } else if (data) {
      id = data.id;
    }
  } catch (dbErr) {
    console.error("Supabase exception (non-fatal):", dbErr);
  }

  const resultUrl = `https://aigeletterdheid.academy/gereedheidscan/resultaat/${id}`;

  let emailSent = false;
  let emailError: string | null = null;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "AIGA <ferry@brandhumanizing.com>",
      to: email,
      subject: `Jouw AI Gereedheidsresultaat: ${score}% — ${score_category}`,
      html: buildEmail({ name, score, score_category, resultUrl }),
    });
    if (error) {
      emailError = JSON.stringify(error);
      console.error("Resend send error:", error);
    } else {
      emailSent = true;
      console.log("Email sent:", data?.id);
    }
  } catch (err) {
    emailError = String(err);
    console.error("Resend exception:", err);
  }

  return NextResponse.json({ id, score, score_category, dimension_scores, emailSent, emailError });
}
