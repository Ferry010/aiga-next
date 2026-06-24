'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// TODO: Replace with real Google Ads conversion ID + label (format AW-XXXXXXXXX/zzzzzzzzzzz)
// IMPORTANT: page cannot ship without this — conversion tracking will be silent
const GOOGLE_ADS_CONVERSION = "AW-XXXXXXXXX/zzzzzzzzzzz";

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

function fireTracking() {
  if (typeof window === "undefined") return;

  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "generate_lead", {
      currency: "EUR",
      value: 249,
    });

    // TODO: Remove the comment below and fill GOOGLE_ADS_CONVERSION once the real ID is known
    // (window as any).gtag("event", "conversion", {
    //   send_to: GOOGLE_ADS_CONVERSION,
    //   currency: "EUR",
    //   value: 249,
    // });
  }

  // Meta Pixel fires only after cookie consent
  // TODO: Set META_PIXEL_ID and initialise fbq() after consent (see CookieBanner.tsx)
  try {
    const consent = localStorage.getItem("aiga_cookie_consent");
    if (consent === "accepted" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  } catch {
    // localStorage unavailable
  }
}

interface Props {
  source?: "gesprek" | "scan";
}

export default function LeadFormClient({ source = "gesprek" }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Capture and persist UTMs on mount
  useEffect(() => {
    try {
      const utms = readUtmsFromUrl();
      const hasUtm = Object.values(utms).some(Boolean);
      if (hasUtm) sessionStorage.setItem("aiga_utm", JSON.stringify(utms));
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const validate = (fd: FormData) => {
    const errs: Record<string, string> = {};
    if (!fd.get("naam")) errs.naam = "Vul je naam in.";
    if (!fd.get("bedrijf")) errs.bedrijf = "Vul je bedrijfsnaam in.";
    const email = String(fd.get("email") ?? "");
    if (!email) {
      errs.email = "Vul je e-mailadres in.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Voer een geldig e-mailadres in.";
    }
    if (!fd.get("teamgrootte")) errs.teamgrootte = "Selecteer een teamgrootte.";
    if (!fd.get("consent")) errs.consent = "Je moet akkoord gaan om verder te gaan.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setLoading(true);

    const utms = getStoredUtms();
    const payload = {
      naam: fd.get("naam"),
      bedrijf: fd.get("bedrijf"),
      email: fd.get("email"),
      teamgrootte: fd.get("teamgrootte"),
      source,
      page_path: window.location.pathname,
      ...utms,
    };

    try {
      const res = await fetch("/api/campaign-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Er ging iets mis. Probeer het opnieuw.");
        setLoading(false);
        return;
      }
      fireTracking();
      setSubmitted(true);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <span className="text-3xl" aria-hidden>✓</span>
        <h3 className="text-xl font-display font-bold text-foreground mt-3 mb-2">
          Bedankt, we bellen je terug.
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Een van onze mensen belt je binnen 1 werkdag om je situatie door te nemen.
          Je kunt alvast de gratis Team AI Audit doen om te zien waar je team staat.
        </p>
        <Link
          href="/gereedheidscan"
          className="btn-neon inline-block mt-6 px-8 py-3 rounded-lg font-semibold text-sm"
        >
          Doe de gratis Team AI Audit
        </Link>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-2xl p-6 sm:p-8"
      aria-label="Formulier: plan een gesprek"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="naam" className="block text-sm font-medium text-foreground mb-1.5">
            Naam <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            autoComplete="name"
            required
            aria-describedby={fieldErrors.naam ? "err-naam" : undefined}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
          {fieldErrors.naam && (
            <p id="err-naam" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.naam}</p>
          )}
        </div>

        <div>
          <label htmlFor="bedrijf" className="block text-sm font-medium text-foreground mb-1.5">
            Bedrijf <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="bedrijf"
            name="bedrijf"
            type="text"
            autoComplete="organization"
            required
            aria-describedby={fieldErrors.bedrijf ? "err-bedrijf" : undefined}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
          {fieldErrors.bedrijf && (
            <p id="err-bedrijf" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.bedrijf}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Werk e-mail <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
          />
          {fieldErrors.email && (
            <p id="err-email" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="teamgrootte" className="block text-sm font-medium text-foreground mb-1.5">
            Teamgrootte <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <select
            id="teamgrootte"
            name="teamgrootte"
            required
            aria-describedby={fieldErrors.teamgrootte ? "err-teamgrootte" : undefined}
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
            defaultValue=""
          >
            <option value="" disabled>Kies een optie</option>
            <option value="1-10">1-10 medewerkers</option>
            <option value="11-50">11-50 medewerkers</option>
            <option value="50+">50+ medewerkers</option>
          </select>
          {fieldErrors.teamgrootte && (
            <p id="err-teamgrootte" role="alert" className="mt-1 text-xs text-destructive">{fieldErrors.teamgrootte}</p>
          )}
        </div>
      </div>

      {/* GDPR opt-in — unticked by default, required */}
      <div className="mt-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="consent"
            required
            aria-describedby={fieldErrors.consent ? "err-consent" : "consent-help"}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary focus:ring-2 focus:ring-primary/60"
          />
          <span className="text-sm text-muted-foreground leading-relaxed" id="consent-help">
            Ja, ik wil mijn scanresultaat en vrijblijvend advies over AI Act-training ontvangen. Ik ga akkoord met de{" "}
            <Link
              href="/privacyverklaring"
              className="underline text-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener"
            >
              privacyverklaring
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p id="err-consent" role="alert" className="mt-1.5 text-xs text-destructive pl-7">{fieldErrors.consent}</p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-neon mt-6 w-full py-3.5 rounded-lg font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Versturen..." : "Plan een vrijblijvend gesprek"}
      </button>
    </form>
  );
}
