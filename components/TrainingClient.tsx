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
import { TIERS, eur } from "@/lib/pricing";
import { QuoteBody, QuoteBenefits } from "@/components/PageKit";

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const keyFacts = [
  { value: `4 modules`, note: `${TOTAL_LESSONS} lessen, in eigen tempo` },
  { value: "€249", note: "ex btw p.p., €229 vanaf 11 personen" },
  { value: "Certificaat", note: "van deelname, na het eindexamen" },
  { value: "50+ plekken", note: "enterprise, offerte op maat" },
];

const outcomes = [
  "Iedereen begrijpt wat AI is, wat het goed kan en waar het misgaat.",
  "Je team zet AI slim in voor het eigen werk, met opdrachten die echt iets opleveren.",
  "Iedereen weet wat wel en niet in een AI-tool mag, en controleert output voordat die de deur uitgaat.",
  "Jij weet dat je hele organisatie dezelfde basis heeft. Aantoonbaar, met een certificaat per medewerker.",
];

const steps = [
  { title: "Je vraagt een offerte aan", body: "Binnen één werkdag belt een van ons je om het aantal deelnemers en de start door te nemen." },
  { title: "Wij zetten alles klaar", body: "Jij deelt de link met je team. Je hoeft niets te bouwen of te beheren." },
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
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight text-balance">
              Je team werkt al met AI.
              <span className="neon-text block mt-2">Maar niemand heeft ze geleerd hoe het moet.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              In een paar uur leert iedereen wat AI is, hoe je het slim inzet in je eigen werk, en wat er níet in
              mag. Online, in eigen tempo, met examen en certificaat. €249 per persoon, €229 vanaf 11.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 text-[0.9375rem] font-semibold">
                Vraag een offerte aan
              </a>
              <a href="#programma" className="text-[0.9375rem] font-semibold text-primary hover:underline">
                Bekijk het programma
              </a>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Reactie binnen één werkdag, geen verplichtingen.</p>
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
              Na de training doet je team dit anders
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
              Vier modules: van wat AI is tot hoe je het slim en veilig inzet
            </SectionTitle>
            <div className="mt-8">
              <ProgramAccordion />
            </div>
          </section>

          <section id="zo-werkt-het" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle intro="De grootste angst bij online training is dat niemand hem afmaakt. Daarom is deze kort en concreet, met toetsen tussendoor en een examen aan het eind.">
              Jij deelt één link. Wij doen de rest.
            </SectionTitle>
            <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[1.0625rem] font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="certificaat" className="scroll-mt-32 pt-16 sm:pt-24">
            <SectionTitle>Afsluiten met een examen. Wie slaagt, krijgt een certificaat op naam.</SectionTitle>
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
              Handig meegenomen: zo laat je ook zien dat je werk maakt van AI-geletterdheid.
            </p>
          </section>

          <section id="prijs" className="scroll-mt-32 pt-16 sm:pt-24">
            <div className="statement-block rounded-[1.75rem] px-6 py-10 sm:px-10 sm:py-12">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-[1.15] tracking-tight max-w-xl">
                €249 per persoon. Hoe groter je team, hoe lager de prijs.
              </h2>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIERS.map((t) => (
                  <div key={t.id} className={`rounded-2xl px-5 py-5 ${t.id === "enterprise" ? "bg-white/15" : "bg-white/10"}`}>
                    <p className="text-sm text-muted-foreground">{t.range}</p>
                    <p className="mt-1 text-4xl font-display font-bold tracking-tight text-foreground">
                      {t.price ? eur(t.price) : "Op maat"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.price ? "ex btw per persoon" : "enterprise-offerte, inclusief masterclass voor je MT"}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
                Inbegrepen: alle vier modules, de toetsen, het eindexamen en een certificaat van deelname. Later mensen
                toevoegen kan altijd. Je data staat op Europese servers.{" "}
                <Link href="/masterclass" className="text-primary font-semibold underline underline-offset-2">Over de masterclass</Link>
              </p>
              <a
                href="#offerte"
                className="mt-8 btn-white px-7 py-3.5 text-[0.9375rem]"
              >
                Vraag een offerte aan
              </a>
            </div>
          </section>

          <section id="vragen" className="scroll-mt-32 pt-16 sm:pt-24 pb-6">
            <SectionTitle>Nog vragen voordat je een offerte aanvraagt?</SectionTitle>
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
          {/* On phones the form comes right after the promise; on desktop it sits beside everything */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] lg:grid-rows-[auto_1fr] gap-x-16 gap-y-8">
            <AnimatedSection className="lg:col-start-1 lg:row-start-1">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight text-balance">
                Je weet niet wat je team vandaag in AI heeft gezet. <span className="text-primary">Morgen ook niet, tenzij je nu begint.</span>
              </h2>
              <QuoteBody />
            </AnimatedSection>
            <AnimatedSection delay={0.05} className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                <LeadForm source="Training pagina, offerte aanvraag" />
              </div>
            </AnimatedSection>
            <AnimatedSection className="lg:col-start-1 lg:row-start-2">
              <QuoteBenefits />
              <AskUs className="mt-8" />
              <div className="mt-6">
                <ShareWithColleague product="training" inline />
              </div>
            </AnimatedSection>
          </div>
        </Panel>
      </div>

      <StickyCta target="offerte" label="Vraag een offerte aan" note="€249 ex btw p.p." />
    </div>
  );
}
