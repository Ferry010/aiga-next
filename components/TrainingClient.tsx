'use client';
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import Panel from "@/components/Panel";
import CourseProgress from "@/components/CourseProgress";
import FerryAuthority from "@/components/FerryAuthority";
import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
import StickyCta from "@/components/StickyCta";
import { TRAINING_FAQ } from "@/lib/faq";

const modules = [
  { title: "Begrijpen wat AI is", body: "Hoe generatieve AI werkt, wat het wel en niet kan, en waarom het overtuigend kan klinken terwijl het fout zit." },
  { title: "Veilig en verantwoord werken met AI", body: "Welke informatie je wel en niet invoert, hoe je shadow AI voorkomt en waar de grenzen liggen." },
  { title: "Slim werken met AI", body: "Hoe je goede output krijgt, slechte output herkent en weet wanneer een mens moet controleren." },
  { title: "AI toepassen in je werk", body: "Van uitleg naar je eigen taken: waar AI tijd scheelt, en waar je het beter laat." },
];

const steps = [
  { title: "Je vraagt een offerte aan", body: "Binnen één werkdag belt een van ons je." },
  { title: "Binnen 2 werkdagen live", body: "Jij deelt de link. Niets te bouwen of te beheren." },
  { title: "Iedereen in eigen tempo", body: "Vier modules met toetsen tussendoor." },
  { title: "Examen en certificaat", body: "Wie slaagt, krijgt een certificaat van deelname." },
];

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      {/* Hero: what a participant actually sees */}
      <section className="pt-10 pb-14 sm:pt-20 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Je team gebruikt AI al.
              <span className="neon-text block mt-2">Weet iedereen wat er níet in mag?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
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
          <AnimatedSection delay={0.1}>
            <CourseProgress />
          </AnimatedSection>
        </div>
      </section>

      {/* Modules: soft lilac, 2x2 */}
      <Panel tone="tint">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-12">
            <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
              Wat je team leert.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Vier korte modules. Praktijk die ze morgen gebruiken, geen theorie over neurale netwerken.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
            {modules.map((m) => (
              <div key={m.title} className="border-t-2 border-primary pt-5">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">{m.title}</h3>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Panel>

      {/* How it works: a horizontal path */}
      <section className="py-16 sm:py-24">
        <div className={container}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl">
              Van offerte tot certificaat. Jij hoeft alleen de link te delen.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              De grootste angst bij online training is dat niemand hem afmaakt. Daarom is deze kort, met toetsen
              tussendoor en een examen aan het eind.
            </p>
            <ol className="relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              <span className="hidden lg:block absolute left-5 right-5 top-5 h-0.5 bg-[hsl(256_55%_88%)]" aria-hidden />
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-display font-bold text-foreground tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      {/* Price: the deep-purple decision moment */}
      <Panel tone="deep" id="prijs">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-[5.5rem] sm:text-[8.5rem] font-display font-bold leading-[0.85] tracking-tighter text-foreground">€249</p>
              <p className="mt-4 text-xl text-muted-foreground">ex btw per persoon</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-[2.1rem] font-display font-bold text-foreground leading-[1.15] tracking-tight">
                Zet zoveel mensen in de training als je wil. Iedereen kost hetzelfde.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Inbegrepen: vier modules, tussentijdse toetsen, een digitaal eindexamen en een certificaat van
                deelname. Je data staat op Europese servers.
              </p>
              <p className="mt-6 rounded-2xl bg-white/10 px-5 py-4 text-lg text-foreground leading-relaxed">
                <strong>50 plekken of meer in één keer?</strong> Dan krijgen je directie en MT de live masterclass er
                gratis bij. Normaal €495 ex btw per persoon.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Handig meegenomen: het certificaat laat zien dat je AI-geletterdheid ondersteunt, precies wat de AI Act vraagt.
              </p>
              <a
                href="#offerte"
                className="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-[hsl(var(--deep))] transition-transform hover:-translate-y-0.5"
              >
                Vraag een offerte aan
              </a>
            </div>
          </div>
        </AnimatedSection>
      </Panel>

      <FerryAuthority />

      <SplitSection title="Wat je waarschijnlijk wil weten.">
        <FaqList items={TRAINING_FAQ} />
      </SplitSection>

      {/* Offerte: reassurance beside a white form card */}
      <div className="pb-28 sm:pb-10">
        <Panel tone="tint" id="offerte">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16">
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
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                <LeadForm source="Training pagina, offerte aanvraag" />
              </div>
            </AnimatedSection>
          </div>
        </Panel>
      </div>

      <StickyCta target="offerte" label="Vraag een offerte aan" note="€249 ex btw p.p." />
    </div>
  );
}
