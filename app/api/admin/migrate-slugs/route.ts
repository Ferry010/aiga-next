import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// One-time migration — delete this file after running.
// Trigger: curl -H "x-migrate-secret: aiga-slug-fix-2026-d7e3f1a9" \
//   "https://aigeletterdheid.academy/api/admin/migrate-slugs?dry=true"
// Approve the table, then re-run with ?dry=false to apply.

const MIGRATE_SECRET = "aiga-slug-fix-2026-d7e3f1a9";

const MIGRATIONS = [
  {
    old: "drie-soorten-collega-s-e-n-wordt-onvervangbaar-welke-ben-jij",
    new: "drie-soorten-collegas-een-wordt-onvervangbaar-welke-ben-jij",
    reason: "apostrophe→hyphen + é→nothing (collega's, Eén)",
  },
  {
    old: "ai-geletterdheid-verplicht-wat-hr-nu-moet-regelen-v-r-augustus-2026",
    new: "ai-geletterdheid-verplicht-wat-hr-nu-moet-regelen-voor-augustus-2026",
    reason: "ó→nothing (vóór)",
  },
  {
    old: "ai-act-per-sector-financi-le-dienstverlening",
    new: "ai-act-per-sector-financiele-dienstverlening",
    reason: "ë→nothing (Financiële)",
  },
  {
    old: "ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen-aiga",
    new: "ai-geletterdheidsplicht-zo-voldoe-je-in-5-stappen",
    reason: "| AIGA suffix from import artefact",
  },
];

export async function GET(req: NextRequest) {
  if (req.headers.get("x-migrate-secret") !== MIGRATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || serviceKey === "YOUR_SERVICE_ROLE_KEY_HERE") {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY is not set in Vercel environment variables." },
      { status: 500 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const dry = req.nextUrl.searchParams.get("dry") !== "false";

  // Verify current DB state for every migration
  const checks = await Promise.all(
    MIGRATIONS.map(async (m) => {
      const [{ data: oldRow }, { data: newRow }] = await Promise.all([
        supabase.from("articles").select("id, title, slug").eq("slug", m.old).maybeSingle(),
        supabase.from("articles").select("id").eq("slug", m.new).maybeSingle(),
      ]);
      return { ...m, oldRow, conflict: !!newRow };
    })
  );

  if (dry) {
    const rows = checks.map((c) => {
      const status = !c.oldRow
        ? "⚠️ OLD NOT FOUND"
        : c.conflict
        ? "⚠️ NEW SLUG CONFLICT"
        : "✅ ready";
      return `| \`${c.old}\` | \`${c.new}\` | ${status} | ${c.reason} |`;
    });

    const table = [
      "## Proposed slug migrations (dry run)\n",
      "| Old slug | New slug | Status | Reason |",
      "|---|---|---|---|",
      ...rows,
      "\nRe-run with `?dry=false` to apply.",
    ].join("\n");

    return new NextResponse(table, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Apply migrations
  const results = [];
  for (const c of checks) {
    if (!c.oldRow) {
      results.push({ slug: c.old, status: "skipped — old slug not found" });
      continue;
    }
    if (c.conflict) {
      results.push({ slug: c.old, status: "skipped — new slug already exists" });
      continue;
    }
    const { error } = await supabase
      .from("articles")
      .update({ slug: c.new })
      .eq("slug", c.old);
    results.push({
      old: c.old,
      new: c.new,
      status: error ? `error: ${error.message}` : "updated ✅",
    });
  }

  return NextResponse.json({ results }, { status: 200 });
}
