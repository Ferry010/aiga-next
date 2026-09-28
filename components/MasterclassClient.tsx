'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import Panel from "@/components/Panel";
import ProgramCard from "@/components/ProgramCard";
import FerryAuthority from "@/components/FerryAuthority";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
import StickyCta from "@/components/StickyCta";
import { MASTERCLASS_FAQ } from "@/lib/faq";
import { createClient } from "@/lib/supabase/client";
import { trackLead, alertTeam } from "@/lib/track";
import { toast } from "sonner";

const takeaways = [
  "Waar in jouw organisatie AI risico oplevert, en waar rendement",
  "Wat verantwoord AI-gebruik betekent op directieniveau",
  "Hoe je afspraken maakt die mensen ook echt volgen",
  "Waar jouw verantwoordelijkheid ligt, en hoe je die afbakent",
  "Hoe je van AI-beleid naar AI-gedrag komt",
];

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

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

    trackLead("lead_masterclass", 495);
    alertTeam({
      type: "masterclass",
      naam: form.naam,
      email: form.email,
      telefoon: form.telefoon,
      organisatie: form.organisatie,
      extra: [form.functie && `Functie: ${form.functie}`, `Sessie: ${form.sessieType}`, form.vragen].filter(Boolean).join(" · "),
      source: "Masterclass pagina",
    });

    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-[15px] focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300";

  return (
    <div className="min-h-screen">
      {/* Hero: the agenda beside the promise */}
      <section className="pt-10 pb-14 sm:pt-20 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Je mensen gebruiken AI.
              <span className="neon-text block mt-2">Wie bepaalt waar de grens ligt?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Een live masterclass van twee uur voor directie en management. Over wat AI wel en niet mag in jullie
              processen, wie verantwoordelijk is als het misgaat, en hoe beleid ook echt gedrag wordt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#aanmelden" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Plan de masterclass
              </a>
              <a href="#prijs" className="text-[15px] font-semibold text-primary hover:underline">
                Bekijk wat het kost
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
              {["€495 ex btw per persoon, minimaal 5", "Op locatie of online", "Gratis bij 50+ plekken in de teamtraining"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ProgramCard />
          </AnimatedSection>
        </div>
      </section>

      {/* Why leadership: the questions only the leadership can answer */}
      <Panel tone="tint">
        <AnimatedSection>
          <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl">
            De teamtraining lost het gedrag op. De masterclass lost de richting op.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Je mensen leren hoe ze AI veilig gebruiken. Maar op jouw niveau spelen andere vragen.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8">
            {[
              "Wat mag AI wel en niet beslissen in ons proces?",
              "Wie is verantwoordelijk als het misgaat?",
              "Waar ligt de grens tussen snelheid en risico?",
              "Hoe zorg je dat beleid ook echt gedrag wordt?",
            ].map((q) => (
              <p key={q} className="border-t-2 border-primary pt-5 text-xl font-display font-bold text-foreground leading-snug">{q}</p>
            ))}
          </div>
          <p className="mt-10 text-lg text-foreground leading-relaxed max-w-2xl">
            Dat zijn geen vragen voor een e-learning. Die beantwoord je met de mensen die de knopen doorhakken, in één ruimte.
          </p>
        </AnimatedSection>
      </Panel>

      {/* Takeaways */}
      <SplitSection title="Wat je na deze sessie weet." intro="Je loopt naar buiten met een richting, niet met huiswerk.">
        <div className="border-b border-border">
          {takeaways.map((t) => (
            <div key={t} className="flex gap-4 py-5 border-t border-border">
              <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              <p className="text-lg text-foreground leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </SplitSection>

      {/* Price: the deep-purple decision moment */}
      <Panel tone="deep" id="prijs">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-[5.5rem] sm:text-[8.5rem] font-display font-bold leading-[0.85] tracking-tighter text-foreground">€495</p>
              <p className="mt-4 text-xl text-muted-foreground">ex btw per persoon, minimaal 5</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-[2.1rem] font-display font-bold text-foreground leading-[1.15] tracking-tight">
                Twee uur live, op een datum die jullie past.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Inbegrepen: de sessie met Ferry Hoes, op locatie of online, een live Q&amp;A over jullie eigen situatie
                en een bewijs van deelname. Geen technische kennis nodig.
              </p>
              <p className="mt-6 rounded-2xl bg-white/10 px-5 py-4 text-lg text-foreground leading-relaxed">
                <strong>Gratis bij de teamtraining.</strong> Boek je 50 plekken of meer in de teamtraining in één keer?
                Dan is de masterclass gratis.{" "}
                <Link href="/training" className="text-primary font-semibold underline underline-offset-2">Bekijk de teamtraining</Link>
              </p>
              <a
                href="#aanmelden"
                className="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-[hsl(var(--deep))] transition-transform hover:-translate-y-0.5"
              >
                Plan de masterclass
              </a>
            </div>
          </div>
        </AnimatedSection>
      </Panel>

      <FerryAuthority />

      {/* FAQ */}
      <SplitSection title="Wat je waarschijnlijk wil weten.">
        <FaqList items={MASTERCLASS_FAQ} />
      </SplitSection>

      {/* Form: reassurance beside it */}
      <div className="pb-28 sm:pb-10">
        <Panel tone="tint" id="aanmelden">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight">
                Zet de richting voordat iedereen zijn eigen AI-regels verzint.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Laat je gegevens achter. Binnen één werkdag belt Robbert, Tom of Ferry je om een datum te prikken.
              </p>
              <div className="mt-6">
                <ShareWithColleague product="masterclass" inline />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
              {submitted ? (
                <div className="border-t border-border pt-6">
                  <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Gelukt. De telefoon gaat zo.</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Binnen één werkdag belt een van ons je om een datum te prikken. Robbert, Tom of Ferry: wie het
                    wordt, hangt af van wie het eerst zijn koffie op heeft.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "naam", label: "Naam", required: true, auto: "name" },
                      { name: "organisatie", label: "Organisatie", required: true, auto: "organization" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label htmlFor={`mc-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                        <input
                          id={`mc-${f.name}`}
                          name={f.name}
                          required={f.required}
                          autoComplete={f.auto}
                          value={form[f.name as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>
                  {[
                    { name: "email", label: "E-mailadres", required: true, type: "email", auto: "email" },
                    { name: "telefoon", label: "Telefoonnummer", required: true, type: "tel", auto: "tel" },
                    { name: "functie", label: "Functie (optioneel)", required: false, auto: "organization-title" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`mc-${f.name}`} className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                      <input
                        id={`mc-${f.name}`}
                        name={f.name}
                        type={f.type || "text"}
                        required={f.required}
                        autoComplete={f.auto}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="mc-sessie" className="text-sm text-muted-foreground mb-1 block">Type sessie</label>
                    <select
                      id="mc-sessie"
                      required
                      value={form.sessieType}
                      onChange={(e) => setForm({ ...form, sessieType: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Kies een optie</option>
                      <option value="open">Open sessie</option>
                      <option value="besloten">Besloten sessie</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mc-vragen" className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen (optioneel)</label>
                    <textarea
                      id="mc-vragen"
                      value={form.vragen}
                      onChange={(e) => setForm({ ...form, vragen: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-lg disabled:opacity-50">
                    {submitting ? "Bezig met versturen..." : "Plan de masterclass"}
                  </button>
                </form>
              )}
              </div>
            </AnimatedSection>
          </div>
        </Panel>
      </div>

      <StickyCta target="aanmelden" label="Plan de masterclass" note="€495 ex btw p.p." />
    </div>
  );
}
