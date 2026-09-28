'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import Panel from "@/components/Panel";
import ProgramCard, { PROGRAM } from "@/components/ProgramCard";
import SectionNav from "@/components/SectionNav";
import BookingBox from "@/components/BookingBox";
import AskUs from "@/components/AskUs";
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

const questions = [
  "Wat mag AI wel en niet beslissen in ons proces?",
  "Wie is verantwoordelijk als het misgaat?",
  "Waar ligt de grens tussen snelheid en risico?",
  "Hoe zorg je dat beleid ook echt gedrag wordt?",
];

const keyFacts = [
  { value: "2 uur", note: "live, in vier blokken" },
  { value: "€495", note: "ex btw per persoon, minimaal 5" },
  { value: "Op locatie", note: "of online, op een datum die jullie past" },
  { value: "Gratis", note: "bij 50+ plekken teamtraining in één keer" },
];

const steps = [
  { title: "Je meldt je aan", body: "Binnen één werkdag belt een van ons je om een datum en de opzet te prikken." },
  { title: "Open of besloten", body: "Schuif aan bij een open sessie, of kies een besloten sessie met alleen jullie eigen mensen." },
  { title: "Twee uur live", body: "Op jullie locatie of online, met Ferry Hoes en ruimte voor jullie eigen vragen." },
  { title: "Bewijs van deelname", body: "Iedere deelnemer krijgt na afloop een bewijs van deelname." },
];

const nav = [
  { id: "overzicht", label: "Overzicht" },
  { id: "programma", label: "Programma" },
  { id: "meeneemt", label: "Wat je meeneemt" },
  { id: "zo-werkt-het", label: "Zo werkt het" },
  { id: "prijs", label: "Prijs" },
  { id: "vragen", label: "Vragen" },
];

const minutes = (t: string) => parseInt(t, 10);
const startTimes = PROGRAM.reduce<string[]>((acc, _p, i) => {
  const m = PROGRAM.slice(0, i).reduce((sum, p) => sum + minutes(p.time), 0);
  acc.push(`${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`);
  return acc;
}, []);

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

function SectionTitle({ children, intro }: { children: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <>
      <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">{children}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>}
    </>
  );
}

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
      <section className="pt-10 pb-12 sm:pt-16 sm:pb-16">
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
              <a href="#programma" className="text-[15px] font-semibold text-primary hover:underline">
                Bekijk het programma
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ProgramCard />
          </AnimatedSection>
        </div>

        {/* Key facts, like a course prospectus */}
        <div className={`${container} mt-12`}>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-border pt-8">
            {keyFacts.map((f) => (
              <div key={f.value}>
                <dt className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">{f.value}</dt>
                <dd className="mt-1 text-muted-foreground">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SectionNav items={nav} />

      {/* Course body with the booking box beside it */}
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-12 xl:gap-16`}>
        <div>
          <section id="overzicht" className="scroll-mt-32 pt-14 sm:pt-20">
            <SectionTitle intro="Je mensen leren in de teamtraining hoe ze AI veilig gebruiken. Maar op jouw niveau spelen andere vragen:">
              De teamtraining lost het gedrag op. De masterclass lost de richting op.
            </SectionTitle>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
              {questions.map((q) => (
                <p key={q} className="border-t-2 border-primary pt-4 text-xl font-display font-bold text-foreground leading-snug">{q}</p>
              ))}
            </div>
            <p className="mt-8 text-lg text-foreground leading-relaxed max-w-2xl">
              Dat zijn geen vragen voor een e-learning. Die beantwoord je met de mensen die de knopen doorhakken, in
              één ruimte. Daarom is deze masterclass voor directie, management en iedereen die beslist hoe jullie met
              AI omgaan.
            </p>
          </section>

          <section id="programma" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle intro="Twee uur, vier blokken. Ferry Hoes geeft de sessie zelf en sluit af met jullie eigen vragen.">
              Het programma
            </SectionTitle>
            {/* The two hours to scale */}
            <div className="mt-8 flex h-3 overflow-hidden rounded-full" aria-hidden>
              {PROGRAM.map((p, i) => (
                <span
                  key={p.title}
                  style={{ flexGrow: minutes(p.time) }}
                  className={`${i % 2 ? "bg-primary/45" : "bg-primary"} ${i ? "ml-1" : ""}`}
                />
              ))}
            </div>
            <ol className="mt-6 rounded-3xl bg-white border border-border">
              {PROGRAM.map((p, i) => (
                <li key={p.title} className={`grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 px-5 py-5 sm:px-7 sm:py-6 ${i ? "border-t border-border" : ""}`}>
                  <div>
                    <p className="font-display font-bold text-primary tabular-nums">{startTimes[i]}</p>
                    <p className="text-sm text-muted-foreground">{p.time}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground leading-snug">{p.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </li>
              ))}
              <li className="block-lilac rounded-b-3xl border-t border-border px-5 py-5 sm:px-7">
                <p className="font-display font-bold text-foreground">Na afloop</p>
                <p className="mt-1 text-muted-foreground">Elke deelnemer krijgt een bewijs van deelname.</p>
              </li>
            </ol>
          </section>

          <section id="meeneemt" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle intro="Je loopt naar buiten met een richting, niet met huiswerk.">Wat je na deze sessie weet</SectionTitle>
            <div className="mt-6 border-b border-border">
              {takeaways.map((t) => (
                <div key={t} className="flex gap-4 py-4 border-t border-border">
                  <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  <p className="text-lg text-foreground leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="zo-werkt-het" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle>Zo werkt het</SectionTitle>
            <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {steps.map((st, i) => (
                <li key={st.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground">{st.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{st.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="prijs" className="scroll-mt-32 pt-16 sm:pt-24">
            <div className="statement-block rounded-[1.75rem] px-6 py-10 sm:px-10 sm:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center">
                <div>
                  <p className="text-7xl sm:text-8xl font-display font-bold leading-[0.85] tracking-tighter text-foreground">€495</p>
                  <p className="mt-3 text-lg text-muted-foreground">ex btw per persoon, minimaal 5</p>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
                    Twee uur live, op een datum die jullie past.
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Inbegrepen: de sessie met Ferry Hoes, op locatie of online, een live Q&amp;A over jullie eigen
                    situatie en een bewijs van deelname.
                  </p>
                </div>
              </div>
              <p className="mt-8 rounded-2xl bg-white/10 px-5 py-4 text-lg text-foreground leading-relaxed">
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
          </section>

          <section id="vragen" className="scroll-mt-32 pt-16 sm:pt-24 pb-6">
            <SectionTitle>Wat je waarschijnlijk wil weten</SectionTitle>
            <div className="mt-6">
              <FaqList items={MASTERCLASS_FAQ} />
            </div>
          </section>
        </div>

        {/* Sticky booking box (desktop) */}
        <aside className="hidden lg:block pt-20">
          <div className="sticky top-36">
            <BookingBox product="masterclass" />
          </div>
        </aside>
      </div>

      <FerryAuthority />

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
              <AskUs className="mt-8" />
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
