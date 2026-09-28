'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import FerryAuthority from "@/components/FerryAuthority";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
import StickyCta from "@/components/StickyCta";
import { MASTERCLASS_FAQ } from "@/lib/faq";
import { createClient } from "@/lib/supabase/client";
import { trackLead, alertTeam } from "@/lib/track";
import { toast } from "sonner";

const program = [
  { time: "30 min", title: "Wat er nu al met AI gebeurt", body: "Je mensen gebruiken AI allang. Wat betekent dat voor je data, voor shadow AI en voor de output die de deur uitgaat?" },
  { time: "45 min", title: "Wat dit betekent voor jou als leidinggevende", body: "Welke rollen, tools en processen het raakt, waar de gaten zitten en waar jij op stuurt." },
  { time: "30 min", title: "Van risico naar richting", body: "Hoe je AI-gebruik in goede banen leidt en er voordeel uit haalt, zonder je mensen af te remmen." },
  { time: "15 min", title: "Live Q&A met Ferry Hoes", body: "Jullie eigen vragen, over jullie eigen situatie." },
];

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
      {/* Hero */}
      <section className="pt-10 pb-10 sm:pt-24 sm:pb-16">
        <div className={container}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl">
              Je mensen gebruiken AI.
              <span className="neon-text block mt-2">Wie bepaalt waar de grens ligt?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
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
        </div>
      </section>

      {/* Why leadership */}
      <SplitSection title="De teamtraining lost het gedrag op. De masterclass lost de richting op.">
        <p className="text-xl text-foreground leading-relaxed">
          Je mensen leren hoe ze AI veilig gebruiken. Maar op jouw niveau spelen andere vragen.
        </p>
        <ul className="mt-6 border-b border-border">
          {[
            "Wat mag AI wel en niet beslissen in ons proces?",
            "Wie is verantwoordelijk als het misgaat?",
            "Waar ligt de grens tussen snelheid en risico?",
            "Hoe zorg je dat beleid ook echt gedrag wordt?",
          ].map((q) => (
            <li key={q} className="py-4 border-t border-border text-lg font-display font-bold text-foreground">{q}</li>
          ))}
        </ul>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Dat zijn geen vragen voor een e-learning. Die beantwoord je met de mensen die de knopen doorhakken, in
          één ruimte.
        </p>
      </SplitSection>

      {/* Program */}
      <SplitSection title="Twee uur. Vier blokken." intro="Je loopt naar buiten met een richting, niet met huiswerk.">
        <ol className="border-b border-border">
          {program.map((p) => (
            <li key={p.title} className="grid grid-cols-[4.5rem_1fr] py-6 border-t border-border">
              <span className="text-lg font-display font-bold neon-text">{p.time}</span>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground tracking-tight">{p.title}</h3>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </SplitSection>

      {/* Takeaways */}
      <SplitSection title="Wat je na deze sessie weet.">
        <div className="border-b border-border">
          {takeaways.map((t) => (
            <div key={t} className="flex gap-4 py-5 border-t border-border">
              <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              <p className="text-lg text-foreground leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </SplitSection>

      {/* Price */}
      <SplitSection id="prijs" title="Wat het kost.">
        <p className="text-7xl sm:text-8xl font-display font-bold text-foreground leading-none tracking-tight">€495</p>
        <p className="mt-3 text-lg text-muted-foreground">ex btw per persoon, minimaal 5 deelnemers</p>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Inbegrepen: twee uur live met Ferry Hoes, op locatie of online, op een datum die jullie past. Met een live
          Q&amp;A over jullie eigen situatie en een bewijs van deelname. Geen technische kennis nodig.
        </p>
        <p className="mt-8 border-l-2 border-primary pl-5 text-lg text-foreground leading-relaxed max-w-xl">
          <strong>Gratis bij de teamtraining.</strong> Boek je 50 plekken of meer in de teamtraining in één keer? Dan
          is de masterclass gratis.{" "}
          <Link href="/training" className="text-primary font-semibold hover:underline">Bekijk de teamtraining</Link>
        </p>
        <a href="#aanmelden" className="btn-neon mt-10 inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
          Plan de masterclass
        </a>
      </SplitSection>

      <FerryAuthority />

      {/* FAQ */}
      <SplitSection title="Wat je waarschijnlijk wil weten.">
        <FaqList items={MASTERCLASS_FAQ} />
      </SplitSection>

      {/* Form: reassurance beside it */}
      <section id="aanmelden" className="pt-4 pb-28 sm:pb-24 scroll-mt-20">
        <div className={container}>
          <div className="border-t-2 border-foreground pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-20">
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      <StickyCta target="aanmelden" label="Plan de masterclass" note="€495 ex btw p.p." />
    </div>
  );
}
