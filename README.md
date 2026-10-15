# AIGA website (aigeletterdheid.academy)

Next.js (App Router) site, deployed on Vercel from `main`. Data and admin login run on Supabase.

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables) and, for local work, in `.env.local`.
Never commit real values.

| Variable | Needed for | Where it comes from |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Database, admin login | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Database, admin login | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side scripts only | Supabase project settings (keep secret) |
| `HUBSPOT_ACCESS_TOKEN` | Leads into HubSpot | HubSpot private app, see below |
| `LEADS_NOTIFY_TO` | Optional team e-mail per lead | Comma-separated addresses |
| `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Sending e-mail (Strato SMTP) | Mailbox settings |
| `RESEND_API_KEY` | Sending e-mail (alternative to SMTP) | Resend dashboard |

## Leads into HubSpot

Every form (offerte, masterclass, contact, callback after the check, questions on the
"Dit gebeurt er nu" page) and every check result someone mails to themselves goes to
HubSpot via `lib/hubspot.ts`:

- The contact is created, or updated when the e-mail exists. "Lead source" is filled only
  when empty (Google Ads, Linkedin, Keynote audience, Speakers Academy, AI-risicocheck, Website).
- Quote, masterclass and callback requests also get a deal in the Sales pipeline, first stage.
- Every lead gets a note with all details.

Setup: in HubSpot, Settings → Integrations → Private Apps → create an app with the scopes
`crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.deals.read`,
`crm.objects.deals.write`. Put its access token in `HUBSPOT_ACCESS_TOKEN` and redeploy.
Without the token the site works as before; Slack notifications are unaffected.
