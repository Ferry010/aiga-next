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
| `HUBSPOT_SERVICE_KEY` | Leads into HubSpot | HubSpot service key, see below |
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

Every lead is labelled with the website it came in on (`SITE_LABEL = "AIGA"` in `lib/hubspot.ts`):
deal names start with "AIGA ·", notes start with "AIGA website ·", and the contact property
"Bron website" (internal name `bron_website`) is set to AIGA when that property exists.

Setup:
1. HubSpot → Development → Keys → Service keys → Create service key, named "AIGA website".
   Scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.deals.read`,
   `crm.objects.deals.write`. (Only super admins or users with Developer tools access can do this.)
2. Put the key in Vercel as `HUBSPOT_SERVICE_KEY` and redeploy.
3. Optional but recommended: Settings → Properties → Contact properties → Create property
   "Bron website", field type Dropdown select, options `AIGA` and `Brand Humanizing`
   (the internal name must be `bron_website`).

Without a key the site works as before; Slack notifications are unaffected. The older name
`HUBSPOT_ACCESS_TOKEN` still works as a fallback.
