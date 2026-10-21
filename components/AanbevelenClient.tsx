'use client';
import { useState } from "react";
import { PageHero, PointGrid, container } from "@/components/PageKit";
import { AnimatedSection } from "@/components/AnimatedSection";
import Panel from "@/components/Panel";
import { useInlineValidation, FieldError } from "@/components/InlineValidation";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/track";
import { eur } from "@/lib/pricing";
import {
  PAYOUTS, PER_SEAT, ENTERPRISE_FROM, ENTERPRISE_PCT, WEBINAR_FROM, WORKSHOP_FROM, referralLink, type PayoutId,
} from "@/lib/referral";

const examples: { seats: string; sub?: string; reward: string }[] = [
  { seats: "10 plekken", reward: eur(10 * PER_SEAT) },
  { seats: "40 plekken", reward: eur(40 * PER_SEAT) },
  { seats: `${ENTERPRISE_FROM} plekken of meer`, sub: "van het factuurbedrag", reward: `${ENTERPRISE_PCT}%` },
];

const forThem = [
  { title: `Vanaf ${WEBINAR_FROM} plekken`, body: "Een gratis webinar, alleen voor hun eigen team." },
  { title: `Vanaf ${ENTERPRISE_FROM} plekken`, body: "Ook de gratis MT-masterclass voor hun directie en management, zoals bij elke enterprise-licentie." },
  { title: `Vanaf ${WORKSHOP_FROM} plekken`, body: "Ferry komt langs voor een gratis workshop op locatie." },
];

const steps = [
  { title: "Maak je link", body: "Vul hieronder je naam en e-mail in. Je krijgt meteen een persoonlijke link en code, ook per mail." },
  { title: "Deel hem", body: "Stuur de link door. Of laat ze je naam of code invullen als ze een offerte aanvragen." },
  { title: "Zij starten", body: "Wij doen de rest: de offerte, de uitrol en de begeleiding van hun team." },
  { title: "Jij ontvangt je beloning", body: "Zodra hun factuur betaald is. We rekenen elke maand af." },
];

const rules = [
  "Het telt voor organisaties die nog niet met ons in gesprek zijn.",
  "Een aanbeveling blijft 12 maanden geldig.",
  `Je krijgt ${eur(PER_SEAT)} per betaalde plek bij 1 tot ${ENTERPRISE_FROM - 1} plekken, en ${ENTERPRISE_PCT}% van het factuurbedrag ex btw vanaf ${ENTERPRISE_FROM} plekken.`,
  "We betalen uit nadat de klant de factuur heeft betaald.",
  "Je eigen organisatie aanbevelen telt niet.",
  "Bevelen twee mensen dezelfde organisatie aan, dan telt de eerste.",
  "Het webinar en de workshop zijn voor de organisatie die je aanbeveelt.",
  "Je bent zelf verantwoordelijk voor eventuele belasting over je beloning.",
];

const SectionTitle = ({ children, intro }: { children: React.ReactNode; intro?: React.ReactNode }) => (
  <>
    <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight text-balance">{children}</h2>
    {intro && <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>}
  </>
);

function RewardCard() {
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
      <p className="font-display font-bold text-foreground">Wat jij krijgt</p>
      <dl className="mt-3 border-b border-border">
        {examples.map((e) => (
          <div key={e.seats} className="flex items-baseline justify-between gap-4 border-t border-border py-4">
            <dt className="text-muted-foreground">
              {e.seats}
              {e.sub && <span className="block text-xs">{e.sub}</span>}
            </dt>
            <dd className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground tabular-nums text-right">{e.reward}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">Uitbetaald, als tegoed of aan een goed doel. Jij kiest.</p>
    </div>
  );
}

function SignupForm() {
  const [form, setForm] = useState({ naam: "", email: "", organisatie: "", uitbetaling: "" as PayoutId | "", akkoord: false, website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const v = useInlineValidation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/aanbevelen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    if (!res?.ok || !data?.code) {
      setError(data?.error || "Er ging iets mis. Probeer het opnieuw of mail naar info@aigeletterdheid.academy");
      setSubmitting(false);
      return;
    }

    // Same path as every other form: stored, and the team gets a Slack message
    const payout = PAYOUTS.find((p) => p.id === form.uitbetaling)?.label;
    const note = `Aanmelding aanbevelingsprogramma · Code: ${data.code} · Ontvangen als: ${payout}`;
    const supabase = createClient();
    supabase.from("contact_submissions").insert({
      naam: form.naam, organisatie: form.organisatie || "", functie: null, email: form.email, telefoon: null,
      hulp: "aanbevelen", aantal: null, opmerkingen: note,
    }).then(() => {
      supabase.functions.invoke("notify-new-submission", {
        body: { type: "contact", naam: form.naam, organisatie: form.organisatie, email: form.email, extra: note },
      }).catch(console.error);
    });

    trackEvent("referral_signup", { uitbetaling: form.uitbetaling });
    setCode(data.code);
    setSubmitting(false);
  };

  if (code) {
    const link = referralLink(code);
    const text = `Gebruikt jullie team al AI? Bij AIGA leert iedereen in 2 à 3 uur wat AI is, hoe je het slim inzet en wat er niet in mag. Via deze link krijgen jullie vanaf ${WEBINAR_FROM} plekken een gratis webinar erbij: ${link}`;
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
      } catch { /* clipboard blocked: the link is selectable */ }
    };
    return (
      <div role="status">
        <p className="font-display text-xl font-bold text-foreground">Je link is klaar.</p>
        <p className="mt-2 text-muted-foreground">We hebben hem ook naar je gemaild.</p>
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Je persoonlijke link"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground" />
          <button type="button" onClick={copy} className="btn-neon px-5 py-3 text-sm font-semibold">
            {copied ? "Gekopieerd" : "Kopieer link"}
          </button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Je code is <strong className="text-foreground">{code}</strong>. Die kunnen mensen ook invullen bij hun offerteaanvraag.
        </p>
        <p className="mt-6 text-sm font-semibold text-foreground">Direct delen</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <a className="text-primary hover:underline" target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`}>LinkedIn</a>
          <a className="text-primary hover:underline" target="_blank" rel="noopener" href={`https://wa.me/?text=${encodeURIComponent(text)}`}>WhatsApp</a>
          <a className="text-primary hover:underline" href={`mailto:?subject=${encodeURIComponent("AI-training voor je team")}&body=${encodeURIComponent(text)}`}>E-mail</a>
        </div>
      </div>
    );
  }

  const input = "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300";

  return (
    <form onSubmit={submit} {...v.formProps} className="space-y-4" aria-label="Aanmelden als aanbeveler">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ab-naam" className="text-sm text-muted-foreground mb-1 block">Naam</label>
          <input id="ab-naam" name="naam" required minLength={2} autoComplete="name" className={input}
            value={form.naam} onChange={(e) => setForm({ ...form, naam: e.target.value })} />
          <FieldError id="ab-naam" errors={v.errors} />
        </div>
        <div>
          <label htmlFor="ab-email" className="text-sm text-muted-foreground mb-1 block">E-mail</label>
          <input id="ab-email" name="email" type="email" required autoComplete="email" className={input}
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <FieldError id="ab-email" errors={v.errors} />
        </div>
      </div>
      <div>
        <label htmlFor="ab-organisatie" className="text-sm text-muted-foreground mb-1 block">
          Organisatie <span className="text-muted-foreground/70">(optioneel)</span>
        </label>
        <input id="ab-organisatie" name="organisatie" autoComplete="organization" className={input}
          value={form.organisatie} onChange={(e) => setForm({ ...form, organisatie: e.target.value })} />
      </div>
      <fieldset>
        <legend className="text-sm text-muted-foreground mb-2">Hoe wil je je beloning ontvangen?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PAYOUTS.map((p) => (
            <label key={p.id}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${form.uitbetaling === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
              {/* Only the first radio has an id: the validation message for the group hangs on it */}
              <input type="radio" name="uitbetaling" value={p.id} required className="sr-only" id={p.id === PAYOUTS[0].id ? "ab-uitbetaling" : undefined}
                checked={form.uitbetaling === p.id} onChange={() => setForm({ ...form, uitbetaling: p.id })} />
              <span className="block font-semibold text-foreground">{p.label}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">{p.body}</span>
            </label>
          ))}
        </div>
        {!form.uitbetaling && <FieldError id="ab-uitbetaling" errors={v.errors} />}
      </fieldset>
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="hidden" aria-hidden>
        <label htmlFor="ab-website">Website</label>
        <input id="ab-website" name="website" tabIndex={-1} autoComplete="off"
          value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      </div>
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input id="ab-akkoord" type="checkbox" name="akkoord" required className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
          checked={form.akkoord} onChange={(e) => setForm({ ...form, akkoord: e.target.checked })} />
        <span>Ik ga akkoord met de <a href="#voorwaarden" className="underline hover:text-foreground">voorwaarden</a> van het aanbevelingsprogramma.</span>
      </label>
      {!form.akkoord && <FieldError id="ab-akkoord" errors={v.errors} />}

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 disabled:opacity-50">
        {submitting ? "Bezig..." : "Maak mijn link"}
      </button>
      <p className="text-xs text-muted-foreground leading-relaxed">
        We gebruiken je gegevens alleen voor het aanbevelingsprogramma: om je link te sturen en je beloning te regelen.
      </p>
    </form>
  );
}

export default function AanbevelenClient() {
  return (
    <div className="min-h-screen">
      <PageHero
        crumb="Aanbevelen"
        title="Ken je een organisatie die AI gebruikt zonder training?"
        accent={`Breng ze in. Jij krijgt ${eur(PER_SEAT)} per plek.`}
        intro="Iedereen kan meedoen: klanten, cursisten, adviseurs, iedereen met een netwerk. Jij krijgt een beloning voor elke plek die ze afnemen. Zij krijgen er een gratis webinar of workshop bij."
        primary={{ href: "#aanmelden", label: "Maak je persoonlijke link" }}
        aside={<RewardCard />}
      />

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <AnimatedSection>
            <SectionTitle intro="Een aanbeveling van iemand die ze kennen weegt zwaarder dan elke advertentie. Daarom krijgt de organisatie die jij aanbeveelt er ook iets bij.">
              Wat jouw aanbeveling krijgt
            </SectionTitle>
          </AnimatedSection>
          <div className="mt-8"><PointGrid items={forThem} cols={3} /></div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <SectionTitle>Zo werkt het</SectionTitle>
          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[1.0625rem] font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className={container}>
          <SectionTitle intro="Werk je zelf bij een organisatie? Kijk dan even wat je werkgever zegt over vergoedingen van derden. Daarom kun je ook kiezen voor tegoed of een goed doel.">
            Jij kiest hoe je het ontvangt
          </SectionTitle>
          <div className="mt-8">
            <PointGrid items={PAYOUTS.map((p) => ({ title: p.label, body: p.body }))} cols={3} />
          </div>
        </div>
      </section>

      <div className="pb-10">
        <Panel tone="tint" id="aanmelden">
          {/* On phones the form comes right after the heading, the conditions after it; on desktop they sit beside it */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] lg:grid-rows-[auto_1fr] gap-x-16 gap-y-8">
            <AnimatedSection className="lg:col-start-1 lg:row-start-1">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight text-balance">
                Maak je persoonlijke link
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Kost je een minuut. Je link werkt meteen, en je krijgt hem ook per mail.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.05} className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                <SignupForm />
              </div>
            </AnimatedSection>
            <AnimatedSection className="lg:col-start-1 lg:row-start-2">
              <div id="voorwaarden" className="scroll-mt-28">
                <p className="font-display font-bold text-foreground">De voorwaarden</p>
                <ul className="mt-2 border-b border-border">
                  {rules.map((r) => (
                    <li key={r} className="flex items-start gap-3 border-t border-border py-3 text-foreground leading-relaxed">
                      <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </Panel>
      </div>
    </div>
  );
}
