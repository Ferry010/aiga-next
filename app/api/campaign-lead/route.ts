import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// TODO: Create `campaign_leads` table in Supabase with columns:
//   naam text, bedrijf text, email text, teamgrootte text, source text,
//   utm_source text, utm_medium text, utm_campaign text, utm_term text,
//   utm_content text, gclid text, page_path text, created_at timestamptz default now()
// Note: user cannot create tables on Lovable's Supabase instance — DB insert is non-fatal.

// TODO: HubSpot contact creation
//   POST https://api.hubapi.com/crm/v3/objects/contacts
//   Requires HUBSPOT_API_KEY env var and HubSpot portal setup.
//   No HubSpot integration exists in this codebase yet.

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { naam, bedrijf, email, teamgrootte, source, page_path, ...utms } = body;

  if (!naam || !email) {
    return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
  }

  // Attempt Supabase insert (non-fatal — table may not exist yet)
  try {
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dbError } = await (supabase as any).from("campaign_leads").insert({
      naam,
      bedrijf: bedrijf ?? null,
      email,
      teamgrootte: teamgrootte ?? null,
      source: source ?? "gesprek",
      utm_source: utms.utm_source ?? null,
      utm_medium: utms.utm_medium ?? null,
      utm_campaign: utms.utm_campaign ?? null,
      utm_term: utms.utm_term ?? null,
      utm_content: utms.utm_content ?? null,
      gclid: utms.gclid ?? null,
      page_path: page_path ?? null,
    });
    if (dbError) console.error("campaign_leads insert error (non-fatal):", dbError.message);
  } catch (dbErr) {
    console.error("campaign_leads exception (non-fatal):", dbErr);
  }

  // Notification email to shared inbox
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: "AIGA Leads <ferry@brandhumanizing.com>",
      to: "ferry@brandhumanizing.com",
      subject: `Nieuw lead (${source ?? "gesprek"}): ${naam} — ${bedrijf ?? ""}`,
      html: `
        <h2>Nieuw campaign lead</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Naam</td><td>${naam}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Bedrijf</td><td>${bedrijf ?? "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">E-mail</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Teamgrootte</td><td>${teamgrootte ?? "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Bron</td><td>${source ?? "gesprek"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Pagina</td><td>${page_path ?? "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">utm_source</td><td>${utms.utm_source ?? "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">utm_campaign</td><td>${utms.utm_campaign ?? "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">gclid</td><td>${utms.gclid ?? "—"}</td></tr>
        </table>
      `,
    });
    if (emailError) console.error("Resend notification error (non-fatal):", emailError);
  } catch (emailErr) {
    console.error("Resend exception (non-fatal):", emailErr);
  }

  // TODO: HubSpot — create/update contact and trigger shared-inbox notification
  // const hubspotRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` },
  //   body: JSON.stringify({ properties: { firstname: naam, company: bedrijf, email } }),
  // });

  return NextResponse.json({ success: true });
}
