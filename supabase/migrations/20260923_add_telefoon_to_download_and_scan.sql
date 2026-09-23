-- Make telefoon capturable on the free scan and the document-download gate.
-- The contact_submissions and masterclass_submissions tables already have a
-- telefoon column; these two did not. Writes are non-fatal in the app, so the
-- forms keep working before this runs; run it to actually persist the numbers.

alter table if exists public.download_leads
  add column if not exists telefoon text;

alter table if exists public.risk_scan_submissions
  add column if not exists telefoon text;
