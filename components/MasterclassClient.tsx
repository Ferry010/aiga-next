'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
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

const included = [
  "Twee uur live met Ferry Hoes",
  "Op locatie of online",
  "Op een datum die jullie past",
  "Live Q&A over jullie eigen situatie",
  "Bewijs van deelname",
  "Geen technische kennis nodig",
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
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20 transition-all duration-300";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-10 pb-14 sm:pt-20 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-3xl">
              Je mensen gebruiken AI.
              <span className="neon-text block mt-2">Wie bepaalt waar de grens ligt?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
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
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />€495 ex btw per persoon, minimaal 5</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Op locatie of online</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Gratis bij 50+ plekken in de teamtraining</li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Why leadership */}
      <section className="py-14 sm:py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight max-w-3xl">
              De teamtraining lost het gedrag op. De masterclass lost de richting op.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Je mensen leren hoe ze AI veilig gebruiken. Maar op jouw niveau spelen andere vragen. Wat mag AI wel en
              niet beslissen in ons proces? Wie is verantwoordelijk als het misgaat? Waar ligt de grens tussen snelheid
              en risico? En hoe zorg je dat beleid ook echt gedrag wordt?
            </p>
            <p className="mt-6 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Dat zijn geen vragen voor een e-learning. Die beantwoord je met de mensen die de knopen doorhakken, in
              één ruimte.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Program */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
              Twee uur. Vier blokken.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Je loopt naar buiten met een richting, niet met huiswerk.
            </p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {program.map((p) => (
              <StaggerItem key={p.title}>
                <div className="border-t-2 border-foreground pt-5 pb-6 h-full">
                  <span className="font-mono text-sm font-bold text-primary">{p.time}</span>
                  <h3 className="mt-2 text-lg font-display font-bold text-foreground tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Takeaways */}
      <section className="py-14 sm:py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
              Wat je na deze sessie weet.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="mt-8 max-w-2xl border-b border-border">
            {takeaways.map((t) => (
              <StaggerItem key={t}>
                <div className="flex items-start gap-4 py-4 border-t border-border">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-neon-purple shrink-0" aria-hidden />
                  <span className="text-lg text-foreground leading-relaxed">{t}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Price */}
      <section id="prijs" className="py-14 sm:py-20 block-lilac border-b border-border scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
              Wat het kost.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14">
              <div>
                <p className="text-6xl sm:text-7xl font-display font-bold text-foreground leading-none tracking-tight">€495</p>
                <p className="mt-3 text-lg text-muted-foreground">ex btw per persoon, minimaal 5</p>
                <div className="mt-8 border-l-2 border-primary pl-5">
                  <p className="font-display font-bold text-foreground">Gratis bij 50+ plekken in de teamtraining</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    Boek je 50 plekken of meer in de teamtraining in één keer? Dan is de masterclass gratis.{" "}
                    <Link href="/training" className="text-primary font-semibold hover:underline">Bekijk de teamtraining</Link>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Wat erbij zit</p>
                <ul className="mt-3 border-b border-border">
                  {included.map((i) => (
                    <li key={i} className="flex items-start gap-4 py-3 border-t border-border">
                      <span className="mt-[0.6rem] h-1.5 w-1.5 rounded-full bg-neon-purple shrink-0" aria-hidden />
                      <span className="text-foreground">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <a href="#aanmelden" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Plan de masterclass
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Authority */}
      <FerryAuthority />

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight mb-8">
              Wat je waarschijnlijk wil weten.
            </h2>
            <FaqList items={MASTERCLASS_FAQ} />
          </AnimatedSection>
        </div>
      </section>

      {/* Colleague package */}
      <section className="pb-14 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShareWithColleague product="masterclass" />
        </div>
      </section>

      {/* Form */}
      <section id="aanmelden" className="py-14 sm:py-20 block-peach border-t border-border scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
              Zet de richting voordat iedereen zijn eigen AI-regels verzint.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Laat je gegevens achter. Binnen één werkdag belt een van ons je om een datum te prikken.
            </p>
          </AnimatedSection>

          {submitted ? (
            <div className="mt-10 bg-background border border-neon-purple/30 rounded-2xl p-8 sm:p-10">
              <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Gelukt. De telefoon gaat zo.</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Binnen één werkdag belt een van ons je om een datum te prikken. Robbert, Tom of Ferry: wie het wordt,
                hangt af van wie het eerst zijn koffie op heeft.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              {[
                { name: "naam", label: "Naam", required: true },
                { name: "organisatie", label: "Organisatie", required: true },
                { name: "functie", label: "Functie", required: false },
                { name: "email", label: "E-mailadres", required: true, type: "email" },
                { name: "telefoon", label: "Telefoonnummer", required: true, type: "tel" },
              ].map((f) => (
                <div key={f.name}>
                  <label htmlFor={`mc-${f.name}`} className="text-sm text-muted-foreground mb-1 block">
                    {f.label} {f.required && <span className="text-neon-purple">*</span>}
                  </label>
                  <input
                    id={`mc-${f.name}`}
                    name={f.name}
                    type={f.type || "text"}
                    required={f.required}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="mc-sessie" className="text-sm text-muted-foreground mb-1 block">
                  Type sessie <span className="text-neon-purple">*</span>
                </label>
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
                <label htmlFor="mc-vragen" className="text-sm text-muted-foreground mb-1 block">Vragen of opmerkingen</label>
                <textarea
                  id="mc-vragen"
                  value={form.vragen}
                  onChange={(e) => setForm({ ...form, vragen: e.target.value })}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-lg disabled:opacity-50">
                {submitting ? "Bezig met versturen..." : "Plan de masterclass"}
              </button>
            </form>
          )}
        </div>
      </section>
      <StickyCta target="aanmelden" label="Plan de masterclass" note="€495 ex btw p.p." />
    </div>
  );
}
