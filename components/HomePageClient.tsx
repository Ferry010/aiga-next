'use client';
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SplitSection from "@/components/SplitSection";
import Panel from "@/components/Panel";
import HeroChat from "@/components/HeroChat";
import FerryAuthority from "@/components/FerryAuthority";
import StickyCta from "@/components/StickyCta";

const dinsdag = [
  { main: "Iemand plakt een klantenlijst in ChatGPT voor een snelle samenvatting.", soft: "Slim bedoeld. Scheelt een uur." },
  { main: "Iemand stuurt een AI-antwoord door naar een klant zonder het te checken.", soft: "Het klonk goed." },
  { main: "Iemand neemt een cijfer over dat AI heeft verzonnen.", soft: "Niemand die het narekent." },
  { main: "Iemand vraagt zich af of dit eigenlijk wel mag, en doet het toch.", soft: "Niemand heeft ooit gezegd waar de grens ligt." },
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
  "Je mensen weten wat er wel en niet in een AI-tool mag, zonder dat ze het hoeven te vragen.",
  "Ze controleren output voordat het de deur uitgaat, omdat ze weten waar het misgaat.",
  "Iedereen werkt vanaf dezelfde basis. Niet vijfhonderd eigen manieren, maar één.",
  "En als iemand vraagt hoe jullie AI aanpakken, laat je het gewoon zien.",
];

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      {/* Hero: the story in words, and the moment itself */}
      <section className="pt-10 pb-14 sm:pt-20 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-[2.15rem] sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Ergens in je team verdwijnt vandaag een contract in ChatGPT.
              <span className="neon-text block mt-2">En niemand weet waar het daarna blijft.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Onschuldig bedoeld, handig zelfs. Maar die data staat nu in een tool die jij niet ziet. En morgen
              gebeurt het weer.
            </p>
            <a href="#oplossing" className="btn-neon mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-[15px] font-semibold">
              Bekijk de oplossing
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <HeroChat />
          </AnimatedSection>
        </div>
      </section>

      {/* Recognition: the soft lilac moment */}
      <Panel tone="tint">
        <AnimatedSection>
          <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl">
            Het zijn nooit de grote beslissingen. Het zijn de kleine, de hele dag door.
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
            {dinsdag.map((d) => (
              <p key={d.main} className="py-5 border-t border-border text-lg text-foreground leading-relaxed">
                {d.main} <span className="italic text-muted-foreground">{d.soft}</span>
              </p>
            ))}
          </div>
          <p className="mt-8 text-xl sm:text-2xl font-display font-bold text-foreground leading-snug max-w-3xl">
            Niet omdat je mensen slordig zijn, <span className="text-primary">maar omdat AI sneller ging dan de begeleiding.</span>
          </p>
        </AnimatedSection>
      </Panel>

      {/* Proof: the bold deep-purple moment */}
      <div className="pt-4 sm:pt-6">
        <Panel tone="deep">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-center">
              <p className="text-[6.5rem] sm:text-[11rem] font-display font-bold leading-[0.85] tracking-tighter text-primary">82%</p>
              <div>
                <h2 className="text-2xl sm:text-[2.2rem] font-display font-bold text-foreground leading-[1.15] tracking-tight">
                  van de bedrijfsdata die in AI-tools belandt, komt uit privé-accounts.
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Buiten het zicht van de organisatie. Bijna niemand heeft dit in beeld, dus je hebt niets verkeerd
                  gedaan. Je hebt alleen nog geen manier om er grip op te krijgen.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">LayerX, 2025</p>
                <Link href="/gereedheidscan" className="mt-6 inline-block font-semibold text-white border-b-2 border-[hsl(256_80%_87%)] pb-0.5 hover:border-white">
                  Doe de gratis AI-risicocheck →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Panel>
      </div>

      {/* Objections: back to cream */}
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

      {/* The relief: a calm 2x2 */}
      <section className="pb-14 sm:pb-20">
        <div className={container}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight">
              Zo voelt het als het geregeld is.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {geregeld.map((g) => (
                <div key={g} className="border-t-2 border-primary pt-5">
                  <p className="text-lg text-foreground leading-relaxed">{g}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xl sm:text-2xl font-display font-bold text-foreground">
              Geen onrust op de achtergrond. <span className="text-primary">Gewoon grip.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <FerryAuthority />

      {/* The choice: the recommended option carries the tint */}
      <section id="oplossing" className="py-14 sm:py-20 scroll-mt-20">
        <div className={container}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight max-w-2xl">
              Hoe je het regelt, hangt af van wie je wil bereiken.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Je mensen en je leiding hebben niet dezelfde vraag. De meeste organisaties doen allebei.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              <div className="block-lilac rounded-[1.75rem] p-7 sm:p-10 flex flex-col">
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
              <div className="rounded-[1.75rem] border-[1.5px] border-border p-7 sm:p-10 flex flex-col">
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

      {/* Final ask */}
      <div className="pb-24 sm:pb-10">
        <Panel tone="deep">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-[3.4rem] font-display font-bold leading-[1.05] tracking-tight max-w-3xl">
              Je team gebruikt AI. <span className="text-primary">Zorg dat ze weten hoe.</span>
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/training"
                className="inline-flex justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold bg-white text-[hsl(var(--deep))] transition-transform hover:-translate-y-0.5"
              >
                Bekijk de teamtraining
              </Link>
              <Link
                href="/masterclass"
                className="inline-flex justify-center px-7 py-3.5 rounded-full text-[15px] font-semibold border-2 border-white/50 text-white transition-colors hover:bg-white/10"
              >
                Bekijk de masterclass
              </Link>
            </div>
          </AnimatedSection>
        </Panel>
      </div>

      <StickyCta target="oplossing" label="Bekijk de oplossing" />
    </div>
  );
}
