'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function readUtmsFromUrl() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
    utm_term: p.get("utm_term") ?? undefined,
    utm_content: p.get("utm_content") ?? undefined,
    gclid: p.get("gclid") ?? undefined,
  };
}

function getStoredUtms(): Record<string, string | undefined> {
  try {
    const raw = sessionStorage.getItem("aiga_utm");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// TODO: Remove GOOGLE_ADS_CONVERSION placeholder before shipping ads traffic
// const GOOGLE_ADS_CONVERSION = "AW-XXXXXXXXX/zzzzzzzzzzz";

function fireTracking() {
  if (typeof window === "undefined") return;
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", { currency: "EUR", value: 249 });
    // TODO: Uncomment and fill once Google Ads conversion ID is known:
    // (window as any).gtag("event", "conversion", { send_to: "AW-XXXXXXXXX/zzzzzzzzzzz", currency: "EUR", value: 249 });
  }
  // TODO: Meta Pixel — load after consent, then: fbq("track", "Lead")
  try {
    const consent = localStorage.getItem("aiga_cookie_consent");
    if (consent === "accepted" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  } catch { /* localStorage unavailable */ }
}

export default function LeadFormClient() {
  const [form, setForm] = useState({ naam: "", bedrijf: "", email: "", telefoon: "", teamgrootte: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const utms = readUtmsFromUrl();
      if (Object.values(utms).some(Boolean)) {
        sessionStorage.setItem("aiga_utm", JSON.stringify(utms));
      }
    } catch { /* sessionStorage unavailable */ }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const utms = getStoredUtms();
    const utmNote = [
      utms.utm_source && `utm_source: ${utms.utm_source}`,
      utms.utm_campaign && `utm_campaign: ${utms.utm_campaign}`,
      utms.gclid && `gclid: ${utms.gclid}`,
    ].filter(Boolean).join(" · ");

    const supabase = createClient();
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      naam: form.naam,
      organisatie: form.bedrijf,
      functie: null,
      email: form.email,
      telefoon: form.telefoon || null,
      hulp: "training",
      aantal: form.teamgrootte || null,
      opmerkingen: [
        "Bron: AI Act Training campagnepagina",
        form.teamgrootte && `Teamgrootte: ${form.teamgrootte}`,
        utmNote,
      ].filter(Boolean).join(" · ") || null,
    });

    if (dbError) {
      setError("Er ging iets mis. Probeer het opnieuw of mail naar info@aigeletterdheid.academy");
      setSubmitting(false);
      return;
    }

    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "contact",
        naam: form.naam,
        organisatie: form.bedrijf,
        email: form.email,
        telefoon: form.telefoon || null,
        extra: `AI Act campagnepagina · Teamgrootte: ${form.teamgrootte || "onbekend"}${utmNote ? ` · ${utmNote}` : ""}`,
      },
    }).catch(console.error);

    fireTracking();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-card border border-neon-purple/30 rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt voor je bericht!</h3>
        <p className="text-muted-foreground">We nemen snel contact met je op.</p>
      </div>
    );
  }

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contactformulier">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cl-naam" className="text-sm text-muted-foreground mb-1 block">
            Naam <span className="text-neon-purple" aria-hidden>*</span>
          </label>
          <input
            id="cl-naam" name="naam" type="text" required autoComplete="name"
            value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cl-bedrijf" className="text-sm text-muted-foreground mb-1 block">
            Bedrijf <span className="text-neon-purple" aria-hidden>*</span>
          </label>
          <input
            id="cl-bedrijf" name="bedrijf" type="text" required autoComplete="organization"
            value={form.bedrijf} onChange={(e) => setForm({ ...form, bedrijf: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cl-email" className="text-sm text-muted-foreground mb-1 block">
            Werk e-mail <span className="text-neon-purple" aria-hidden>*</span>
          </label>
          <input
            id="cl-email" name="email" type="email" required autoComplete="email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cl-telefoon" className="text-sm text-muted-foreground mb-1 block">
            Telefoonnummer <span className="text-xs text-muted-foreground/60">(optioneel)</span>
          </label>
          <input
            id="cl-telefoon" name="telefoon" type="tel" autoComplete="tel"
            value={form.telefoon} onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cl-teamgrootte" className="text-sm text-muted-foreground mb-1 block">
          Teamgrootte <span className="text-neon-purple" aria-hidden>*</span>
        </label>
        <select
          id="cl-teamgrootte" name="teamgrootte" required
          value={form.teamgrootte} onChange={(e) => setForm({ ...form, teamgrootte: e.target.value })}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>Kies een optie</option>
          <option value="1-10">1-10 medewerkers</option>
          <option value="11-50">11-50 medewerkers</option>
          <option value="50+">50+ medewerkers</option>
        </select>
      </div>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-lg disabled:opacity-50">
        {submitting ? "Bezig met versturen..." : "Stuur bericht"}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Door te versturen ga je akkoord met de{" "}
        <Link href="/privacyverklaring" className="underline hover:text-foreground transition-colors" target="_blank" rel="noopener">
          privacyverklaring
        </Link>
        .
      </p>
    </form>
  );
}
