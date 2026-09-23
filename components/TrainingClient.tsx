'use client';
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import FerryAuthority from "@/components/FerryAuthority";
import LeadForm from "@/components/LeadForm";

function Dot() {
  return <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-neon-purple shrink-0" aria-hidden />;
}

const leren = [
  "Wanneer je AI wel en niet inzet",
  "Welke informatie je wel en niet mag invoeren",
  "Hoe je goede output krijgt en slechte herkent",
  "Wanneer een mens moet controleren",
  "Hoe je herkent dat AI overtuigend klinkt maar fout zit",
];

const inclusief = [
  "Onbeperkt aantal deelnemers",
  "Volledig opgenomen, altijd beschikbaar",
  "Toets en deelnamebewijs per medewerker",
  "Dashboard: wie heeft afgerond",
  "Rapportage die je kunt laten zien",
];

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.1]">
              Geef je hele team dezelfde AI-basis.{" "}
              <span className="neon-text">Zonder er zelf een dag aan kwijt te zijn.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              De online training van AIGA leert je mensen generatieve AI veilig, kritisch en effectief
              gebruiken. Uitrollen naar iedereen, een paar uur per persoon. Jij bouwt niets en beheert
              niets. Het staat er gewoon.
            </p>
            <div className="mt-8">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wat je mensen leren */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Niet méér AI gebruiken. AI beter gebruiken.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              In een paar korte modules leren je mensen de dingen die echt het verschil maken:
            </p>
          </AnimatedSection>
          <StaggerContainer className="mt-8 space-y-3 max-w-2xl">
            {leren.map((l) => (
              <StaggerItem key={l}>
                <div className="flex items-start gap-3 bg-background border border-border rounded-xl p-4 shadow-soft">
                  <Dot />
                  <span className="text-foreground leading-relaxed">{l}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.1}>
            <p className="mt-8 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Geen theorie over neurale netwerken. Praktijk die ze morgen gebruiken.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gemaakt om afgemaakt te worden */}
      <section className="py-24 block-butter border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              De grootste angst bij online training is dat niemand hem afmaakt.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Terecht. Daarom is deze kort, concreet en direct toepasbaar. Een paar uur per persoon,
              opgedeeld in korte modules die mensen tussen het werk door doen. Met een toets en een
              deelnamebewijs per persoon, zodat je precies ziet wie klaar is. Geen video van drie uur
              die halverwege wordt weggeklikt.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mt-10 bg-background border border-border rounded-2xl p-8 shadow-soft max-w-2xl">
              <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Wat erbij zit</p>
              <ul className="mt-4 space-y-3">
                {inclusief.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Dot />
                    <span className="text-foreground leading-relaxed">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mt-8 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Jij hoeft alleen de link te delen. De rest loopt vanzelf.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Prijs */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Eén prijs per medewerker. Daarna is het van jullie.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              &euro;249 per deelnemer. Vanaf 50 deelnemers op maat. Geen abonnement, geen kosten per
              maand. Je betaalt één keer en rolt het uit zo breed als je wil.
            </p>
            <div className="mt-8">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wie zit hierachter - authority strip */}
      <FerryAuthority />

      {/* De AI Act (laag) */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              En ja, het helpt ook met de AI Act.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              De EU AI Act vraagt organisaties om AI-geletterdheid te ondersteunen. Met een
              gestructureerd programma regel je dat in één keer, en kun je het aantonen. Maar dat is de
              bijvangst. De reden is simpeler: je mensen gebruiken AI nu al.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Slot-CTA + offerteformulier */}
      <section id="offerte" className="py-24 block-peach scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground">
                Klaar om je team op één basis te zetten?
              </h2>
            </div>
            <LeadForm source="Training pagina, offerte aanvraag" />
            <p className="mt-6 text-center text-muted-foreground">
              Ook je directie meenemen?{" "}
              <Link href="/masterclass" className="text-primary hover:underline font-medium">
                Bekijk de masterclass.
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
