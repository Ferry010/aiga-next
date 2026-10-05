'use client';
import { useState } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AskUs from "@/components/AskUs";
import { AnimatedSection } from "@/components/AnimatedSection";
import FaqList from "@/components/FaqList";
import { useInlineValidation, FieldError, PHONE_PATTERN } from "@/components/InlineValidation";
import { createClient } from "@/lib/supabase/client";
import { trackLead, alertTeam, trackQuoteRequest } from "@/lib/track";

const contactFaqs = [
  { q: "Kan ik eerst een demo aanvragen?", a: "Ja. Vermeld dit in je bericht en we plannen iets in." },
  { q: "Kan ik de training eerst zelf bekijken?", a: "Ja. Neem contact op en we geven je tijdelijk toegang tot een demoversie." },
  { q: "Wij zijn een overheidsorganisatie. Werkt dit ook voor ons?", a: "Ja. De training is geschikt voor alle sectoren, inclusief overheid." },
];

export default function ContactClient() {
  const [form, setForm] = useState({ naam: "", organisatie: "", functie: "", email: "", telefoon: "", hulp: "", aantal: "", opmerkingen: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);
  const v = useInlineValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);
    setSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("contact_submissions").insert({
      naam: form.naam,
      organisatie: form.organisatie,
      functie: form.functie || null,
      email: form.email,
      telefoon: form.telefoon || null,
      hulp: form.hulp,
      aantal: form.aantal || null,
      opmerkingen: form.opmerkingen || null,
    });

    if (error) {
      setSubmitting(false);
      setSendError(true);
      return;
    }

    // Fire-and-forget admin notification
    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "contact",
        naam: form.naam,
        organisatie: form.organisatie,
        email: form.email,
        telefoon: form.telefoon || null,
        extra: `Hulp: ${form.hulp}${form.aantal ? ` · Aantal: ${form.aantal}` : ""}`,
      },
    }).catch(console.error);

    setSubmitting(false);
    trackLead("lead_contact");
    trackQuoteRequest();
    alertTeam({
      type: "contact",
      naam: form.naam,
      email: form.email,
      telefoon: form.telefoon,
      organisatie: form.organisatie,
      extra: [form.hulp && `Interesse: ${form.hulp}`, form.opmerkingen].filter(Boolean).join(" · "),
      source: "Contactpagina",
    });
    setSubmitted(true);
  };

  const input =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-[0.9375rem] focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-colors";

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="pt-6 pb-16 sm:pt-10 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl">
              Hoe langer niemand afspraken maakt, hoe meer data er al weg is.
              <span className="neon-text block mt-2">Laten we praten.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Laat je gegevens achter. Binnen één werkdag belt een van ons je. Geen verplichtingen.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16">
            <AnimatedSection delay={0.05}>
              <div className="rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                {submitted ? (
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">Gelukt. De telefoon gaat zo.</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      Binnen één werkdag belt een van ons je op. Robbert, Tom of Ferry: wie het wordt, hangt af van wie
                      het eerst zijn koffie op heeft.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} {...v.formProps} className="space-y-4" aria-label="Contactformulier">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: "naam", label: "Naam", auto: "name" },
                        { name: "organisatie", label: "Organisatie", auto: "organization" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label htmlFor={`contact-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                          <input
                            id={`contact-${f.name}`}
                            name={f.name}
                            required
                            autoComplete={f.auto}
                            value={form[f.name as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                            className={input}
                          />
                          <FieldError id={`contact-${f.name}`} errors={v.errors} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm text-muted-foreground mb-1 block">Werk e-mail</label>
                      <input id="contact-email" name="email" type="email" required autoComplete="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                      <FieldError id="contact-email" errors={v.errors} />
                    </div>
                    <div>
                      <label htmlFor="contact-telefoon" className="text-sm text-muted-foreground mb-1 block">Telefoonnummer</label>
                      <input id="contact-telefoon" name="telefoon" type="tel" required autoComplete="tel" pattern={PHONE_PATTERN}
                        value={form.telefoon} onChange={(e) => setForm({ ...form, telefoon: e.target.value })} className={input} />
                      <FieldError id="contact-telefoon" errors={v.errors} />
                    </div>
                    <div>
                      <label htmlFor="contact-hulp" className="text-sm text-muted-foreground mb-1 block">Waar gaat het over?</label>
                      <select id="contact-hulp" name="hulp" required value={form.hulp}
                        onChange={(e) => setForm({ ...form, hulp: e.target.value })} className={input}>
                        <option value="">Kies een optie</option>
                        <option value="training">De teamtraining</option>
                        <option value="masterclass">De masterclass</option>
                        <option value="beide">Allebei</option>
                        <option value="anders">Iets anders</option>
                      </select>
                      <FieldError id="contact-hulp" errors={v.errors} />
                    </div>
                    <div>
                      <label htmlFor="contact-opmerkingen" className="text-sm text-muted-foreground mb-1 block">Je vraag (optioneel)</label>
                      <textarea id="contact-opmerkingen" name="opmerkingen" rows={3} value={form.opmerkingen}
                        onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })} className={`${input} resize-none`} />
                    </div>
                    {sendError && (
                      <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        Versturen lukte niet. Probeer het nog eens, of bel ons op +31 (0)10 316 7827.
                      </p>
                    )}
                    <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 disabled:opacity-50">
                      {submitting ? "Even versturen..." : "Vraag een offerte aan"}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <AskUs />
              <h2 className="mt-12 text-2xl font-display font-bold text-foreground tracking-tight">Vaak gevraagd</h2>
              <div className="mt-4">
                <FaqList items={contactFaqs} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
