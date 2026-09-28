'use client';
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import FerryAuthority from "@/components/FerryAuthority";
import LeadForm from "@/components/LeadForm";
import FaqList from "@/components/FaqList";
import ShareWithColleague from "@/components/ShareWithColleague";
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
  { title: "Eindexamen en certificaat", body: "Een digitaal eindexamen. Bij voldoende resultaat krijgt iedere deelnemer een certificaat van deelname." },
];

const included = [
  "Vier online modules, in eigen tempo",
  "Tussentijdse toetsen",
  "Digitaal eindexamen",
  "Certificaat van deelname",
  "Dashboard: jij ziet wie klaar is",
  "Data op Europese servers",
  "Onbeperkt deelnemers toevoegen",
];

const examples = [
  { n: 10, total: "€2.490", extra: "" },
  { n: 25, total: "€6.225", extra: "" },
  { n: 50, total: "€12.450", extra: "+ masterclass voor je MT gratis" },
];

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-3xl">
              Je team gebruikt AI al.
              <span className="neon-text block mt-2">Weet iedereen wat er níet in mag?</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Zonder gedeelde afspraken verdwijnt er elke dag bedrijfsdata in tools die jij niet ziet. Niet uit
              onwil: AI kwam sneller binnen dan de afspraken erover. Deze online training geeft je hele team in een
              paar uur dezelfde basis.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
              <a href="#prijs" className="text-[15px] font-semibold text-primary hover:underline">
                Bekijk wat het kost
              </a>
            </div>
            <p className="mt-6 font-mono text-sm text-muted-foreground">
              €249 ex btw per deelnemer · onbeperkt deelnemers toevoegen · binnen 2 werkdagen live
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
              Wat je team leert, in vier modules.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Geen theorie over neurale netwerken. Praktijk die ze morgen gebruiken.
            </p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {modules.map((m, i) => (
              <StaggerItem key={m.title}>
                <div className="flex gap-5 py-6 border-t border-border h-full">
                  <span className="font-mono text-sm font-bold text-primary w-6 shrink-0 pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground tracking-tight">{m.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight max-w-3xl">
              De grootste angst bij online training is dat niemand hem afmaakt.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Terecht. Daarom is deze kort, met toetsen tussendoor en een examen aan het eind. En jij ziet in het
              dashboard precies wie klaar is.
            </p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="border-t-2 border-foreground pt-5 pb-6 h-full">
                  <span className="font-mono text-sm font-bold text-primary">Stap {i + 1}</span>
                  <h3 className="mt-2 text-lg font-display font-bold text-foreground tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Price */}
      <section id="prijs" className="py-20 block-lilac border-y border-border scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight">
              Wat het kost.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14">
              <div>
                <p className="text-6xl sm:text-7xl font-display font-bold text-foreground leading-none tracking-tight">€249</p>
                <p className="mt-3 text-lg text-muted-foreground">ex btw per deelnemer</p>
                <div className="mt-8 border-b border-border">
                  {examples.map((e) => (
                    <div key={e.n} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border py-3">
                      <span className="text-foreground">{e.n} deelnemers</span>
                      <span className="font-mono text-foreground">
                        {e.total} <span className="text-muted-foreground text-sm">ex btw</span>
                      </span>
                      {e.extra && <span className="w-full text-sm font-semibold text-primary">{e.extra}</span>}
                    </div>
                  ))}
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
                <div className="mt-6 border-l-2 border-primary pl-5">
                  <p className="font-display font-bold text-foreground">Vanaf 50 deelnemers: de masterclass gratis</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    Je directie en management krijgen de live masterclass van twee uur erbij. Normaal €495 ex btw per
                    persoon.{" "}
                    <Link href="/masterclass" className="text-primary font-semibold hover:underline">Bekijk de masterclass</Link>
                  </p>
                </div>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Handig meegenomen: het certificaat van deelname laat zien dat je AI-geletterdheid ondersteunt, precies
                  wat de AI Act vraagt.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Vraag een offerte aan
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Authority */}
      <FerryAuthority />

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.15] tracking-tight mb-8">
              Wat je waarschijnlijk wil weten.
            </h2>
            <FaqList items={TRAINING_FAQ} />
          </AnimatedSection>
        </div>
      </section>

      {/* Colleague package */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShareWithColleague product="training" />
        </div>
      </section>

      {/* Offerte */}
      <section id="offerte" className="py-20 block-peach border-t border-border scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
                Elke week zonder afspraken is data die je niet terugkrijgt.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Laat je gegevens achter. Binnen één werkdag belt een van ons je.
              </p>
            </div>
            <LeadForm source="Training pagina, offerte aanvraag" />
            <p className="mt-6 text-muted-foreground">
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
