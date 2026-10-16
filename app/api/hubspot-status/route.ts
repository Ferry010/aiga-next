import { NextResponse } from "next/server";

// Read-only health check for the HubSpot link: is a key set on this deployment, and does HubSpot
// accept it for reading contacts and deals? Shows only status codes and HubSpot's error category,
// never the key or any CRM data.

export const dynamic = "force-dynamic";

async function probe(path: string, key: string) {
  try {
    const res = await fetch(`https://api.hubapi.com${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const body = res.ok ? null : await res.json().catch(() => null);
    return { status: res.status, ...(body ? { category: body.category, message: String(body.message || "").slice(0, 200) } : {}) };
  } catch (e) {
    return { status: 0, message: e instanceof Error ? e.message : "request failed" };
  }
}

export async function GET() {
  const key = process.env.HUBSPOT_SERVICE_KEY || process.env.hubspot_service_key || process.env.HUBSPOT_ACCESS_TOKEN;
  if (!key) {
    return NextResponse.json({ keyConfigured: false, hint: "HUBSPOT_SERVICE_KEY is not set on this deployment (or it was added without redeploying)." });
  }
  const [contacts, deals] = await Promise.all([
    probe("/crm/v3/objects/contacts?limit=1&properties=email", key),
    probe("/crm/v3/objects/deals?limit=1&properties=dealname", key),
  ]);
  return NextResponse.json({
    keyConfigured: true,
    keyVariable: process.env.HUBSPOT_SERVICE_KEY ? "HUBSPOT_SERVICE_KEY" : process.env.hubspot_service_key ? "hubspot_service_key" : "HUBSPOT_ACCESS_TOKEN",
    contactsRead: contacts,
    dealsRead: deals,
  });
}
