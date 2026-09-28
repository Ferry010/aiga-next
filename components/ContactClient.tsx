'use client';
import { useState } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AskUs from "@/components/AskUs";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { trackLead, alertTeam } from "@/lib/track";

const contactFaqs = [
  { q: "Kan ik eerst een demo aanvragen?", a: "Ja. Vermeld dit in je bericht en we plannen iets in." },
  { q: "Kan ik de training eerst zelf bekijken?", a: "Ja. Neem contact op en we geven je tijdelijk toegang tot een demoversie." },
  { q: "Wij zijn een overheidsorganisatie. Werkt dit ook voor ons?", a: "Ja. De training is geschikt voor alle sectoren, inclusief overheid." },
];

export default function ContactClient() {
  const [form, setForm] = useState({ naam: "", organisatie: "", functie: "", email: "", telefoon: "", hulp: "", aantal: "", opmerkingen: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      toast.error("Er ging iets mis bij het versturen. Probeer het opnieuw.");
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

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="CONTACT" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight mt-4">
              Hoe langer niemand afspraken maakt, hoe meer data er al weg is.<br />
              <span className="neon-text">Laten we praten.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Vul het formulier in. Binnen één werkdag belt een van ons je. Geen verplichtingen.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            <AnimatedSection delay={0.1}>
              {submitted ? (
                <div className="bg-card border border-neon-purple/30 rounded-2xl p-10 text-center">
                  <h3 className="text-2xl font-display font-bold text-foreground tracking-tight mb-2">Gelukt. De telefoon gaat zo.</h3>
                  <p className="text-muted-foreground">Binnen één werkdag belt een van ons je op. Robbert, Tom of Ferry: wie het wordt, hangt af van wie het eerst zijn koffie op heeft.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "naam", label: "Naam", required: true },
                    { name: "organisatie", label: "Organisatie", required: true },
                    { name: "email", label: "E-mailadres", required: true, type: "email" },
                    { name: "telefoon", label: "Telefoonnummer", required: true, type: "tel" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`contact-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label} {f.required && <span className="text-neon-purple">*</span>}</label>
                      <input
                        id={`contact-${f.name}`}
                        name={f.name}
                        type={f.type || "text"}
                        required={f.required}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="contact-hulp" className="text-sm text-muted-foreground mb-1 block">Waarmee kan ik je helpen? <span className="text-neon-purple">*</span></label>
                    <select id="contact-hulp" name="hulp" required value={form.hulp} onChange={(e) => setForm({ ...form, hulp: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300">
                      <option value="">Selecteer...</option>
                      <option value="training">Online Training</option>
                      <option value="masterclass">Masterclass</option>
                      <option value="beide">Beide</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-opmerkingen" className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
                    <textarea id="contact-opmerkingen" name="opmerkingen" value={form.opmerkingen} onChange={(e) => setForm({ ...form, opmerkingen: e.target.value })} rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg disabled:opacity-50">
                    {submitting ? "Bezig met versturen..." : "Vraag een offerte aan"}
                  </button>
                </form>
              )}
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <AskUs />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible>
            {contactFaqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
