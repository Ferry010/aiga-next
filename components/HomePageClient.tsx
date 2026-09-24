'use client';
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import FerryAuthority from "@/components/FerryAuthority";

const dinsdag = [
  {
    main: "Iemand plakt een klantenlijst in ChatGPT voor een snelle samenvatting.",
    soft: "Slim bedoeld. Scheelt een uur.",
  },
  {
    main: "Iemand stuurt een AI-antwoord door naar een klant zonder het te checken.",
    soft: "Het klonk goed. Waarom zou je twijfelen.",
  },
  {
    main: "Iemand neemt een cijfer over dat AI heeft verzonnen.",
    soft: "Niemand die het narekent.",
  },
  {
    main: "Iemand vraagt zich af of dit eigenlijk wel mag, en doet het toch.",
    soft: "Want niemand heeft ooit gezegd waar de grens ligt.",
  },
];

const gedachten = [
  {
    q: "Kan ik het niet gewoon verbieden?",
    a: "Dat werkt niet meer. AI zit in de tools die je mensen elke dag gebruiken. Verbieden betekent alleen dat het verder uit je zicht verdwijnt.",
  },
  {
    q: "We hebben toch al een AI-beleid?",
    a: "Een document verandert geen gedrag. Als niemand het kent of toepast, gebeurt op de werkvloer alsnog precies wat er nu gebeurt.",
  },
  {
    q: "Moet mijn hele team dan AI-expert worden?",
    a: "Nee. Ze hoeven alleen te weten hoe AI werkt, waar het misgaat, en hoe je het verstandig inzet. Dat is een paar uur, geen opleiding.",
  },
];

const geregeld = [
  "Je mensen weten wat er wel en niet in een AI-tool mag. Zonder dat ze het hoeven te vragen.",
  "Ze controleren output voordat het de deur uitgaat. Omdat ze weten waar het misgaat.",
  "Iedereen werkt vanaf dezelfde basis. Niet vijfhonderd eigen manieren, maar één.",
  "En als iemand vraagt hoe jullie AI aanpakken, laat je het gewoon zien.",
];

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      {/* Sectie 0 - HERO */}
      <section className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-3xl">
              Ergens in je team, vandaag:
              <span className="neon-text block mt-2">
                {"“Even dit contract in ChatGPT gooien, scheelt me een uur.”"}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Onschuldig bedoeld, handig zelfs. En precies zo verdwijnt vertrouwelijke informatie in
              een tool die jij niet ziet. Dit gebeurt nu dagelijks in je organisatie. Hieronder zie je
              wat er nog meer speelt, en hoe je het oplost.
            </p>
            <div className="mt-8">
              <a href="#oplossing" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Bekijk de oplossing
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 1 - DE DINSDAG */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Het zijn nooit de grote beslissingen. Het zijn de kleine, de hele dag door.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 max-w-3xl border-b border-border">
            {dinsdag.map((d, i) => (
              <StaggerItem key={d.main}>
                <div className="flex gap-5 sm:gap-7 items-baseline py-5 border-t border-border">
                  <span className="font-mono text-sm font-bold text-primary shrink-0 w-6">0{i + 1}</span>
                  <p className="text-lg text-foreground leading-relaxed">
                    {d.main} <span className="italic text-muted-foreground/80">{d.soft}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.1}>
            <p className="mt-10 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Stuk voor stuk goedbedoeld. Bij elkaar precies waar het misgaat. Niet omdat je mensen
              slordig zijn, maar omdat AI sneller ging dan de begeleiding.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 2 - JE ZIET HET NIET */}
      <section className="py-24 block-lilac border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              En je bent niet de enige die dit niet in beeld heeft.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Het meeste AI-gebruik loopt via privé-accounts, buiten alles om wat je hebt afgesproken.
              Daardoor kan bijna geen enkele organisatie precies zien wat er gebeurt. Dat maakt dit geen
              klein probleem. Maar wel een heel normaal probleem.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mt-10 border-l-2 border-primary/30 pl-6 sm:pl-8 max-w-xl">
              <p className="text-6xl sm:text-7xl font-display font-bold text-primary leading-none tracking-tight">82%</p>
              <p className="mt-5 text-lg text-foreground leading-relaxed">
                van de bedrijfsdata die in AI-tools belandt, komt uit privé-accounts buiten het zicht
                van de organisatie.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Bron: LayerX, 2025.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mt-10 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              Je hebt dus niets verkeerd gedaan. Je hebt alleen nog geen manier om er grip op te krijgen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 3 - WAT JE NU WAARSCHIJNLIJK DENKT */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Misschien denk je nu een van deze dingen.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 max-w-3xl border-b border-border">
            {gedachten.map((g) => (
              <StaggerItem key={g.q}>
                <div className="py-6 border-t border-border">
                  <p className="text-lg sm:text-xl font-display font-semibold text-foreground">
                    {"“"}{g.q}{"”"}
                  </p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{g.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.1}>
            <p className="mt-10 text-lg text-foreground font-medium max-w-3xl leading-relaxed">
              De oplossing is dus geen nieuwe regel. Het is je mensen leren hoe het wél moet.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 4 - ZO VOELT HET GEREGELD */}
      <section className="py-24 block-sage border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15]">
              Zo voelt het als het geregeld is.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 max-w-4xl">
            {geregeld.map((g) => (
              <StaggerItem key={g}>
                <div className="flex gap-4 py-5 border-t border-border h-full">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  <p className="text-lg text-foreground leading-relaxed">{g}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.1}>
            <p className="mt-10 text-xl sm:text-2xl font-display font-semibold text-foreground">
              Geen onrust op de achtergrond. Gewoon grip.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Wie zit hierachter - authority strip */}
      <FerryAuthority />

      {/* Sectie 5 - TWEE MANIEREN (fork) */}
      <section id="oplossing" className="py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              Hoe je het regelt, hangt af van wie je wil bereiken.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Je mensen en je leiding hebben niet dezelfde vraag. Dus zijn er twee manieren om dit aan
              te pakken. De meeste organisaties doen ze allebei.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-14">
              <div className="flex flex-col border-t-2 border-foreground pt-7">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Voor je hele team</span>
                <h3 className="mt-2 text-2xl font-display font-bold text-foreground tracking-tight">De online teamtraining</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed flex-1">
                  Iedereen dezelfde praktische AI-basis. Online, in eigen tempo, in een paar uur per
                  persoon. Uitrollen naar honderd of duizend mensen kost je evenveel moeite.
                </p>
                <p className="mt-6 text-3xl font-display font-bold text-foreground tracking-tight">
                  &euro;249 <span className="text-base font-normal text-muted-foreground">per persoon</span>
                </p>
                <Link href="/training" className="btn-neon self-start mt-6 px-7 py-3 rounded-lg text-sm">
                  Bekijk de teamtraining →
                </Link>
              </div>

              <div className="hidden md:block bg-border" aria-hidden />

              <div className="flex flex-col border-t-2 border-border pt-7">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Voor directie &amp; management</span>
                <h3 className="mt-2 text-2xl font-display font-bold text-foreground tracking-tight">De live masterclass</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed flex-1">
                  Een live masterclass voor wie de beslissingen neemt. Over verantwoord AI-gebruik,
                  governance en waar jouw aansprakelijkheid ligt.
                </p>
                <p className="mt-6 text-3xl font-display font-bold text-foreground tracking-tight">
                  Prijs op aanvraag
                </p>
                <Link href="/masterclass" className="btn-neon-outline self-start mt-6 px-7 py-3 rounded-lg text-sm font-semibold">
                  Bekijk de masterclass →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 6 - DE AI ACT (laag, geen angst) */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-foreground leading-[1.15] max-w-3xl">
              En ja, het helpt ook met de AI Act.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
              De EU AI Act vraagt organisaties om AI-geletterdheid te ondersteunen. Hoe je dat doet,
              bepaal je zelf. Met een gestructureerd programma regel je dat in één keer, en kun je het
              aantonen. Maar dat is de bijvangst. De reden is simpeler: je mensen gebruiken AI nu al.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sectie 7 - SLOT */}
      <section className="py-24 statement-block">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-[1.12] max-w-2xl mx-auto">
              Je team gebruikt AI. Zorg dat ze weten hoe.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/training"
                className="inline-block px-8 py-4 rounded-full text-[15px] font-semibold shadow-soft transition-transform hover:-translate-y-0.5"
                style={{ background: "#fff", color: "hsl(263 52% 40%)" }}
              >
                Bekijk de teamtraining
              </Link>
              <Link
                href="/masterclass"
                className="inline-block px-8 py-4 rounded-full text-[15px] font-semibold border-2 border-white/70 text-white transition-colors hover:bg-white/10"
              >
                Bekijk de masterclass
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
