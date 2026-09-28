'use client';
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import FerryAuthority from "@/components/FerryAuthority";
import StickyCta from "@/components/StickyCta";

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

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-10 pb-10 sm:pt-24 sm:pb-16">
        <div className={container}>
          <AnimatedSection>
            <h1 className="text-[2.15rem] sm:text-6xl font-display font-bold text-foreground leading-[1.06] tracking-tight max-w-4xl">
              Ergens in je team verdwijnt vandaag een contract in ChatGPT.
              <span className="neon-text block mt-2">En niemand weet waar het daarna blijft.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {"“Even erin gooien, scheelt me een uur.”"} Onschuldig bedoeld, handig zelfs. Maar die data staat
              nu in een tool die jij niet ziet. En morgen gebeurt het weer.
            </p>
            <div className="mt-8">
              <a href="#oplossing" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                Bekijk de oplossing
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Recognition */}
      <SplitSection title="Het zijn nooit de grote beslissingen. Het zijn de kleine, de hele dag door.">
        <div className="border-b border-border">
          {dinsdag.map((d) => (
            <p key={d.main} className="py-5 border-t border-border text-lg text-foreground leading-relaxed">
              {d.main} <span className="italic text-muted-foreground">{d.soft}</span>
            </p>
          ))}
        </div>
        <p className="mt-8 text-xl font-display font-bold text-foreground leading-snug">
          Niet omdat je mensen slordig zijn,{" "}
          <span className="neon-text">maar omdat AI sneller ging dan de begeleiding.</span>
        </p>
      </SplitSection>

      {/* Proof */}
      <SplitSection
        title="Bijna geen enkele organisatie heeft dit in beeld."
        intro="Het meeste AI-gebruik loopt via privé-accounts, buiten alles om wat je hebt afgesproken. Dat maakt dit geen klein probleem. Maar wel een heel normaal probleem."
      >
        <div className="border-l-2 border-primary pl-6 sm:pl-8">
          <p className="text-7xl sm:text-8xl font-display font-bold text-primary leading-none tracking-tight">82%</p>
          <p className="mt-5 text-xl text-foreground leading-relaxed max-w-md">
            van de bedrijfsdata die in AI-tools belandt, komt uit privé-accounts buiten het zicht van de organisatie.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">LayerX, 2025</p>
          <Link href="/gereedheidscan" className="mt-6 inline-block font-semibold text-primary hover:underline">
            Benieuwd hoe dat bij jou zit? Doe de gratis AI-risicocheck →
          </Link>
        </div>
        <p className="mt-10 text-lg text-foreground leading-relaxed">
          Je hebt dus niets verkeerd gedaan. Je hebt alleen nog geen manier om er grip op te krijgen.
        </p>
      </SplitSection>

      {/* Objections */}
      <SplitSection title="Misschien denk je nu een van deze dingen.">
        <div className="border-b border-border">
          {gedachten.map((g) => (
            <div key={g.q} className="py-6 border-t border-border">
              <p className="text-xl font-display font-bold text-foreground">{`“${g.q}”`}</p>
              <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{g.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg text-foreground leading-relaxed">
          De oplossing is dus geen nieuwe regel. Het is je mensen leren hoe het wél moet.
        </p>
      </SplitSection>

      {/* The relief */}
      <SplitSection title="Zo voelt het als het geregeld is.">
        <div className="border-b border-border">
          {geregeld.map((g) => (
            <div key={g} className="flex gap-4 py-5 border-t border-border">
              <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              <p className="text-lg text-foreground leading-relaxed">{g}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xl font-display font-bold text-foreground">Geen onrust op de achtergrond. Gewoon grip.</p>
      </SplitSection>

      <FerryAuthority />

      {/* The choice */}
      <section id="oplossing" className="py-14 sm:py-20 lg:py-24 scroll-mt-20">
        <div className={container}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight max-w-2xl">
              Hoe je het regelt, hangt af van wie je wil bereiken.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Je mensen en je leiding hebben niet dezelfde vraag. De meeste organisaties doen allebei.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-16">
              <div className="flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">De teamtraining</h3>
                <p className="mt-3 text-lg text-muted-foreground leading-relaxed flex-1">
                  Voor je hele team. Online, in eigen tempo, een paar uur per persoon.
                </p>
                <p className="mt-6 text-4xl font-display font-bold text-foreground tracking-tight">
                  &euro;249 <span className="text-base font-normal text-muted-foreground">ex btw per persoon</span>
                </p>
                <p className="mt-2 text-muted-foreground">Zoveel mensen als je wil. Bij 50+ plekken in één keer is de masterclass gratis.</p>
                <Link href="/training" className="btn-neon self-start mt-6 px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                  Bekijk de teamtraining
                </Link>
              </div>

              <div className="hidden md:block bg-border" aria-hidden />

              <div className="flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">De masterclass</h3>
                <p className="mt-3 text-lg text-muted-foreground leading-relaxed flex-1">
                  Voor directie en management. Twee uur live over verantwoord AI-gebruik, governance en waar jouw
                  verantwoordelijkheid ligt.
                </p>
                <p className="mt-6 text-4xl font-display font-bold text-foreground tracking-tight">
                  &euro;495 <span className="text-base font-normal text-muted-foreground">ex btw per persoon</span>
                </p>
                <p className="mt-2 text-muted-foreground">Minimaal 5 deelnemers, op locatie of online.</p>
                <Link href="/masterclass" className="btn-neon-outline self-start mt-6 px-7 py-3.5 rounded-lg text-[15px] font-semibold">
                  Bekijk de masterclass
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The one colored moment */}
      <section className="pb-24 sm:pb-16 pt-4">
        <div className={container}>
          <AnimatedSection>
            <div className="statement-block rounded-3xl px-6 py-14 sm:px-16 sm:py-20">
              <h2 className="text-3xl sm:text-5xl font-display font-bold leading-[1.08] tracking-tight max-w-2xl">
                Je team gebruikt AI. Zorg dat ze weten hoe.
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/training"
                  className="inline-flex justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ background: "#fff", color: "hsl(263 52% 40%)" }}
                >
                  Bekijk de teamtraining
                </Link>
                <Link
                  href="/masterclass"
                  className="inline-flex justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold border-2 border-white/60 text-white transition-colors hover:bg-white/10"
                >
                  Bekijk de masterclass
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <StickyCta target="oplossing" label="Bekijk de oplossing" />
    </div>
  );
}
