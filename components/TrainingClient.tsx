'use client';
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import Panel from "@/components/Panel";
import CourseProgress from "@/components/CourseProgress";
import SectionNav from "@/components/SectionNav";
import ProgramAccordion from "@/components/ProgramAccordion";
import BookingBox from "@/components/BookingBox";
import AskUs from "@/components/AskUs";
import FerryAuthority from "@/components/FerryAuthority";
import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
import StickyCta from "@/components/StickyCta";
import { TRAINING_FAQ } from "@/lib/faq";
import { TOTAL_LESSONS, TOTAL_QUIZ_QUESTIONS } from "@/lib/curriculum";

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const keyFacts = [
  { value: `4 modules`, note: `${TOTAL_LESSONS} lessen, in eigen tempo` },
  { value: "€249", note: "ex btw per persoon" },
  { value: "Certificaat", note: "van deelname, na het eindexamen" },
  { value: "2 werkdagen", note: "en je team staat live" },
];

const outcomes = [
  "Iedereen weet wat er wel en niet in een AI-tool mag, zonder het te hoeven vragen.",
  "Output wordt gecontroleerd voordat hij de deur uitgaat, omdat mensen weten waar AI misgaat.",
  "Eén gedeelde basis in je hele organisatie, in plaats van vijfhonderd eigen manieren.",
  "Aantoonbaar geregeld: een certificaat van deelname per medewerker.",
];

const steps = [
  { title: "Je vraagt een offerte aan", body: "Binnen één werkdag belt een van ons je om het aantal deelnemers en de start door te nemen." },
  { title: "Binnen 2 werkdagen live", body: "Jij deelt de link met je team. Je hoeft niets te bouwen of te beheren." },
  { title: "Iedereen in eigen tempo", body: "Korte lessen tussen het werk door, met na elke module een toets." },
  { title: "Examen en certificaat", body: "Een digitaal eindexamen. Wie slaagt, krijgt een certificaat van deelname." },
];

const nav = [
  { id: "overzicht", label: "Overzicht" },
  { id: "programma", label: "Programma" },
  { id: "zo-werkt-het", label: "Zo werkt het" },
  { id: "certificaat", label: "Certificaat" },
  { id: "prijs", label: "Prijs" },
  { id: "vragen", label: "Vragen" },
];

function SectionTitle({ children, intro }: { children: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <>
      <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">{children}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">{intro}</p>}
    </>
  );
}

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Je team gebruikt AI al.
              <span className="neon-text block mt-2">Weet iedereen wat er níet in mag?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Zonder afspraken verdwijnt er elke dag bedrijfsdata in tools die jij niet ziet. Niet uit onwil:
              niemand heeft de grens ooit uitgelegd. Deze online training doet dat, voor je hele team.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
              <a href="#programma" className="text-[15px] font-semibold text-primary hover:underline">
                Bekijk het programma
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <CourseProgress />
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
            <SectionTitle intro="Je mensen gebruiken AI al, elk op hun eigen manier. Deze training geeft iedereen dezelfde praktische basis. Na afloop:">
              Waarom je team deze training volgt
            </SectionTitle>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
              {outcomes.map((o) => (
                <p key={o} className="border-t-2 border-primary pt-4 text-lg text-foreground leading-relaxed">{o}</p>
              ))}
            </div>
          </section>

          <section id="programma" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle
              intro={`Vier modules, ${TOTAL_LESSONS} lessen, ${TOTAL_QUIZ_QUESTIONS} toetsvragen en een digitaal eindexamen. Elke module opent met een korte introductie en sluit af met een toets. Klik een module open voor alle lessen.`}
            >
              Het programma
            </SectionTitle>
            <div className="mt-8">
              <ProgramAccordion />
            </div>
          </section>

          <section id="zo-werkt-het" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle intro="De grootste angst bij online training is dat niemand hem afmaakt. Daarom is deze kort en concreet, met toetsen tussendoor en een examen aan het eind.">
              Zo werkt het
            </SectionTitle>
            <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="certificaat" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle>Toetsen en certificaat</SectionTitle>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { t: "Na elke module", b: `Een korte toets. ${TOTAL_QUIZ_QUESTIONS} vragen in totaal, zodat iedereen weet waar hij staat.` },
                { t: "Aan het eind", b: "Een digitaal eindexamen over wat je hebt geleerd." },
                { t: "Bij voldoende resultaat", b: "Een certificaat van deelname op naam van de medewerker." },
              ].map((c) => (
                <div key={c.t} className="block-lilac rounded-2xl p-5">
                  <h3 className="font-display font-bold text-foreground">{c.t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.b}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
              Handig meegenomen: met de certificaten laat je zien dat je AI-geletterdheid ondersteunt, precies wat de
              AI Act van organisaties vraagt.
            </p>
          </section>

          <section id="prijs" className="scroll-mt-32 pt-16 sm:pt-24">
            <div className="statement-block rounded-[1.75rem] px-6 py-10 sm:px-10 sm:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center">
                <div>
                  <p className="text-7xl sm:text-8xl font-display font-bold leading-[0.85] tracking-tighter text-foreground">€249</p>
                  <p className="mt-3 text-lg text-muted-foreground">ex btw per persoon</p>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
                    Zet zoveel mensen in de training als je wil. Iedereen kost hetzelfde.
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Nu of later. Inbegrepen: alle vier modules, de toetsen, het eindexamen en een certificaat van
                    deelname. Je data staat op Europese servers.
                  </p>
                </div>
              </div>
              <p className="mt-8 rounded-2xl bg-white/10 px-5 py-4 text-lg text-foreground leading-relaxed">
                <strong>50 plekken of meer in één keer?</strong> Dan krijgen je directie en MT de live masterclass er
                gratis bij. Normaal €495 ex btw per persoon.{" "}
                <Link href="/masterclass" className="text-primary font-semibold underline underline-offset-2">Bekijk de masterclass</Link>
              </p>
              <a
                href="#offerte"
                className="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-[hsl(var(--deep))] transition-transform hover:-translate-y-0.5"
              >
                Vraag een offerte aan
              </a>
            </div>
          </section>

          <section id="vragen" className="scroll-mt-32 pt-16 sm:pt-24 pb-6">
            <SectionTitle>Wat je waarschijnlijk wil weten</SectionTitle>
            <div className="mt-6">
              <FaqList items={TRAINING_FAQ} />
            </div>
          </section>
        </div>

        {/* Sticky booking box (desktop) */}
        <aside className="hidden lg:block pt-20">
          <div className="sticky top-36">
            <BookingBox />
          </div>
        </aside>
      </div>

      <FerryAuthority />

      {/* Offerte */}
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
              <AskUs className="mt-8" />
              <div className="mt-6">
                <ShareWithColleague product="training" inline />
              </div>
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
