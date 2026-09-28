'use client';
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import FerryAuthority from "@/components/FerryAuthority";
import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
import StickyCta from "@/components/StickyCta";
import { TRAINING_FAQ } from "@/lib/faq";

const modules = [
  {
    title: "Begrijpen wat AI is",
    body: "Hoe generatieve AI werkt, wat het wel en niet kan, en waarom het overtuigend kan klinken terwijl het fout zit.",
  },
  {
    title: "Veilig en verantwoord werken met AI",
    body: "Welke informatie je wel en niet invoert, hoe je shadow AI voorkomt en waar de grenzen liggen.",
  },
  {
    title: "Slim werken met AI",
    body: "Hoe je goede output krijgt, slechte output herkent en weet wanneer een mens moet controleren.",
  },
  {
    title: "AI toepassen in je werk",
    body: "Van uitleg naar je eigen taken: waar AI tijd scheelt, en waar je het beter laat.",
  },
];

const steps = [
  { title: "Je vraagt een offerte aan", body: "Binnen één werkdag belt een van ons je om het aantal deelnemers en de start door te nemen." },
  { title: "Binnen 2 werkdagen live", body: "Jij deelt de link met je team. Je hoeft niets te bouwen of te beheren." },
  { title: "Iedereen in eigen tempo", body: "Vier modules met tussentijdse toetsen, te volgen tussen het werk door." },
  { title: "Examen en certificaat", body: "Een digitaal eindexamen. Wie slaagt, krijgt een certificaat van deelname." },
];

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-10 pb-10 sm:pt-24 sm:pb-16">
        <div className={container}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl">
              Je team gebruikt AI al.
              <span className="neon-text block mt-2">Weet iedereen wat er níet in mag?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Zonder afspraken verdwijnt er elke dag bedrijfsdata in tools die jij niet ziet. Niet uit onwil:
              niemand heeft de grens ooit uitgelegd. Deze training doet dat, voor je hele team, in een paar uur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
              <a href="#prijs" className="text-[15px] font-semibold text-primary hover:underline">
                Bekijk wat het kost
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
              {["€249 ex btw per persoon", "Zoveel mensen als je wil", "Binnen 2 werkdagen live"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Modules */}
      <SplitSection
        title="Wat je team leert."
        intro="Vier korte modules. Praktijk die ze morgen gebruiken, geen theorie over neurale netwerken."
      >
        <div className="border-b border-border">
          {modules.map((m) => (
            <div key={m.title} className="py-6 border-t border-border">
              <h3 className="text-xl font-display font-bold text-foreground tracking-tight">{m.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </SplitSection>

      {/* How it works */}
      <SplitSection
        title="Zo werkt het."
        intro="De grootste angst bij online training is dat niemand hem afmaakt. Daarom is deze kort, met toetsen tussendoor en een examen aan het eind."
      >
        <ol className="border-b border-border">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] py-6 border-t border-border">
              <span className="text-xl font-display font-bold neon-text">{i + 1}</span>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground tracking-tight">{s.title}</h3>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </SplitSection>

      {/* Price */}
      <SplitSection id="prijs" title="Wat het kost.">
        <p className="text-7xl sm:text-8xl font-display font-bold text-foreground leading-none tracking-tight">€249</p>
        <p className="mt-3 text-lg text-muted-foreground">ex btw per persoon</p>
        <p className="mt-8 text-xl text-foreground leading-relaxed max-w-xl">
          Zet zoveel mensen in de training als je wil, nu of later. Iedereen kost hetzelfde.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Inbegrepen: vier modules, tussentijdse toetsen, een digitaal eindexamen en een certificaat van deelname.
          Je data staat op Europese servers.
        </p>
        <p className="mt-8 border-l-2 border-primary pl-5 text-lg text-foreground leading-relaxed max-w-xl">
          <strong>Boek je 50 plekken of meer in één keer?</strong> Dan krijgen je directie en MT de live masterclass
          er gratis bij. Normaal €495 ex btw per persoon.{" "}
          <Link href="/masterclass" className="text-primary font-semibold hover:underline">Bekijk de masterclass</Link>
        </p>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">
          Handig meegenomen: het certificaat van deelname laat zien dat je AI-geletterdheid ondersteunt, precies wat
          de AI Act vraagt.
        </p>
        <a href="#offerte" className="btn-neon mt-10 inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
          Vraag een offerte aan
        </a>
      </SplitSection>

      <FerryAuthority />

      {/* FAQ */}
      <SplitSection title="Wat je waarschijnlijk wil weten.">
        <FaqList items={TRAINING_FAQ} />
      </SplitSection>

      {/* Offerte: the reassurance beside the form */}
      <section id="offerte" className="pt-4 pb-28 sm:pb-24 scroll-mt-20">
        <div className={container}>
          <div className="border-t-2 border-foreground pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-20">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight">
                Elke week zonder afspraken is data die je niet terugkrijgt.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Laat je gegevens achter. Binnen één werkdag belt Robbert, Tom of Ferry je. Geen verplichtingen.
              </p>
              <div className="mt-6">
                <ShareWithColleague product="training" inline />
              </div>
              <p className="mt-4 text-muted-foreground">
                Ook je directie meenemen?{" "}
                <Link href="/masterclass" className="text-primary font-semibold hover:underline">Bekijk de masterclass</Link>
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <LeadForm source="Training pagina, offerte aanvraag" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <StickyCta target="offerte" label="Vraag een offerte aan" note="€249 ex btw p.p." />
    </div>
  );
}
