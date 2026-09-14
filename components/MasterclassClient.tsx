'use client';
import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

/** Zichtbare placeholder tot Ferry de echte waarde invult. Niet verzinnen. */
function Ph({ children }: { children: ReactNode }) {
  return (
    <span className="rounded px-1 font-medium text-foreground" style={{ backgroundColor: "hsl(var(--warning) / 0.18)" }}>
      {children}
    </span>
  );
}

function Dot() {
  return <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-neon-purple shrink-0" aria-hidden />;
}

const meeneemt = [
  "Waar in jouw organisatie AI risico oplevert, en waar rendement",
  "Wat verantwoord AI-gebruik betekent op directieniveau",
  "Hoe je governance inricht die mensen ook echt volgen",
  "Waar jouw aansprakelijkheid ligt, en hoe je die beperkt",
  "Hoe je van AI-beleid naar AI-gedrag komt",
];

export default function MasterclassClient() {
  const [form, setForm] = useState({
    naam: "", organisatie: "", functie: "", email: "", telefoon: "", sessieType: "", vragen: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("masterclass_submissions").insert({
      naam: form.naam,
      organisatie: form.organisatie,
      functie: form.functie || null,
      email: form.email,
      telefoon: form.telefoon || null,
      sessie_type: form.sessieType,
      vragen: form.vragen || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("Er ging iets mis bij het versturen. Probeer het opnieuw.");
      return;
    }

    supabase.functions.invoke("notify-new-submission", {
      body: {
        type: "masterclass",
        naam: form.naam,
        organisatie: form.organisatie,
        email: form.email,
        telefoon: form.telefoon || null,
        extra: `Type: ${form.sessieType}`,
      },
    }).catch(console.error);

    setSubmitted(true);
    toast.success("Aanvraag verstuurd. We nemen snel contact met je op.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.1]">
              Je team kun je trainen.{" "}
              <span className="neon-text">Maar wie stuurt de mensen die de beslissingen nemen?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Een live masterclass voor directie en management. Over wat verantwoord AI-gebruik betekent
              voor hoe je leidt, wat je governance nodig heeft, en waar jouw aansprakelijkheid ligt.{" "}
              <Ph>[Dagdeel]</Ph>, <Ph>[op locatie of online]</Ph>.
            </p>
            <div className="mt-8">
              <a href="#aanmelden" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Plan de masterclass
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Waarom de leiding een eigen sessie nodig heeft */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              De teamtraining lost het gedrag op. De masterclass lost de richting op.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Je mensen leren hoe ze AI veilig gebruiken. Maar op jouw niveau spelen andere vragen. Wat
              mag AI wel en niet beslissen in ons proces? Wie is verantwoordelijk als het misgaat? Waar
              ligt de grens tussen snelheid en risico? En hoe zorg je dat beleid ook echt gedrag wordt?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-8 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Dat zijn geen vragen voor een e-learning. Die beantwoord je met de mensen die de knopen
              doorhakken, in één ruimte.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Wat je meeneemt */}
      <section className="py-24 block-lilac border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Wat je na een <Ph>[dagdeel]</Ph> weet.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="mt-8 space-y-3 max-w-2xl">
            {meeneemt.map((m) => (
              <StaggerItem key={m}>
                <div className="flex items-start gap-3 bg-background border border-border rounded-xl p-4 shadow-soft">
                  <Dot />
                  <span className="text-foreground leading-relaxed">{m}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.1}>
            <p className="mt-8 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Je loopt naar buiten met een richting, niet met huiswerk.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Voor wie de toon zet.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Directie, management, en iedereen die beslist hoe de organisatie met AI omgaat. Live en
              interactief, toegespitst op jouw sector. <Ph>[Groepsgrootte, duur, locatie: vul in]</Ph>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sterker samen (cross-sell naar /training) */}
      <section className="py-24 block-sage border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Op zijn best in combinatie.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              De meeste organisaties doen allebei. De masterclass zet de richting bij de leiding. De
              teamtraining brengt iedereen daaronder op dezelfde basis. Zo komen beleid en gedrag bij
              elkaar, in plaats van los van elkaar te bestaan.
            </p>
            <p className="mt-6">
              <Link href="/training" className="text-primary hover:underline font-medium">
                Bekijk de teamtraining →
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* De AI Act */}
      <section className="py-24 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              En het maakt je governance aantoonbaar.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              De AI Act vraagt organisaties om AI-geletterdheid te ondersteunen en verantwoord met AI om
              te gaan. Op directieniveau betekent dat: kunnen laten zien dat je het gestructureerd hebt
              aangepakt. De masterclass helpt je die keuzes te maken en vast te leggen. Geen dreiging,
              wel iets wat je straks moet kunnen uitleggen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Slot-CTA + aanmeldformulier */}
      <section id="aanmelden" className="py-24 block-peach scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground text-center">
              Zet de richting voordat iedereen zijn eigen AI-regels verzint.
            </h2>
          </AnimatedSection>

          {submitted ? (
            <div className="mt-10 bg-background border border-neon-purple/30 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt voor je aanvraag.</h3>
              <p className="text-muted-foreground">We nemen zo snel mogelijk contact met je op om een datum te plannen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              {[
                { name: "naam", label: "Naam", required: true },
                { name: "organisatie", label: "Organisatie", required: true },
                { name: "functie", label: "Functie", required: false },
                { name: "email", label: "E-mailadres", required: true, type: "email" },
                { name: "telefoon", label: "Telefoonnummer", required: false, type: "tel" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-sm text-muted-foreground mb-1 block">{f.label} {f.required && <span className="text-neon-purple">*</span>}</label>
                  <input
                    type={f.type || "text"}
                    required={f.required}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Type sessie <span className="text-neon-purple">*</span></label>
                <select
                  required
                  value={form.sessieType}
                  onChange={(e) => setForm({ ...form, sessieType: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300"
                >
                  <option value="">Kies een optie</option>
                  <option value="open">Open sessie</option>
                  <option value="besloten">Besloten sessie</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
                <textarea
                  value={form.vragen}
                  onChange={(e) => setForm({ ...form, vragen: e.target.value })}
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300 resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-lg disabled:opacity-50">
                {submitting ? "Bezig met versturen..." : "Plan de masterclass"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
