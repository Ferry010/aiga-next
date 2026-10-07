'use client';
import Link from "next/link";
import { AnimatedSection, RevealItem, CountUp, SettleIn } from "@/components/AnimatedSection";
import Panel from "@/components/Panel";
import HeroVideo from "@/components/HeroVideo";
import FerryAuthority from "@/components/FerryAuthority";
import StickyCta from "@/components/StickyCta";
import { motion, useReducedMotion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

// The second line of the hero lands a beat after the first: fact, then the question.
function HeroBeat({ children }: { children: React.ReactNode }) {
  const calm = useReduceMotion() || !!useReducedMotion();
  return (
    <motion.span
      initial={calm ? false : { opacity: 0.15, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.6, delay: 0.55 }}
      className="neon-text block mt-2"
    >
      {children}
    </motion.span>
  );
}

// One card in the "geregeld" list. Each card rises into place as it enters the
// viewport. It never starts invisible, so nothing looks broken mid-scroll.
function ReliefCard({ children, index }: { children: React.ReactNode; index: number }) {
  const calm = useReduceMotion() || !!useReducedMotion();
  return (
    <motion.li
      initial={calm ? false : { y: 28, scale: 0.96, opacity: 0.5 }}
      whileInView={{ y: 0, scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.55, delay: index * 0.06 }}
      className="rounded-2xl border border-border bg-white px-5 py-4 text-[1.0625rem] leading-relaxed text-foreground shadow-[0_12px_30px_-22px_hsl(256_56%_33%/0.45)]"
    >
      {children}
    </motion.li>
  );
}

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
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center`}>
          <AnimatedSection>
            <h1 className="text-[2.15rem] sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Er verdwijnt vandaag gevoelige data in AI.
              <HeroBeat>Weet jij welke?</HeroBeat>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Klantgegevens, contracten, cijfers. Ze belanden in tools die jij niet ziet. Eén online training, en je
              hele team weet waar de grens ligt.
            </p>
            <a href="#oplossing" className="btn-neon mt-8 inline-flex items-center justify-center px-7 py-3.5 text-[0.9375rem] font-semibold">
              Zo regel je het
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <HeroVideo />
          </AnimatedSection>
        </div>
      </section>

      {/* Recognition: the soft lilac moment, one calm centered column */}
      <Panel tone="tint">
        <div className="mx-auto max-w-3xl text-center">
          <SettleIn>
            <h2 className="text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-foreground leading-[1.1] tracking-tight text-balance">
              Het zijn nooit de grote beslissingen.
            </h2>
          </SettleIn>
          <SettleIn delay={0.25}>
            <p className="mt-2 text-[1.75rem] sm:text-[2.6rem] font-display font-bold text-primary leading-[1.1] tracking-tight text-balance">
              Het zijn de kleine, de hele dag door.
            </p>
          </SettleIn>
          <ul className="mx-auto mt-12 flex max-w-xl flex-col gap-8 sm:gap-9">
            {dinsdag.map((d, i) => (
              <RevealItem as="li" key={d.main} index={i}>
                <p className="text-lg sm:text-xl text-foreground leading-relaxed text-balance">{d.main}</p>
                <p className="mt-1 italic text-muted-foreground text-balance">{d.soft}</p>
              </RevealItem>
            ))}
          </ul>
          <SettleIn>
            <p className="mx-auto mt-12 max-w-2xl text-xl sm:text-2xl font-display font-bold text-foreground leading-snug text-balance">
              Niet uit onwil, en niet omdat je mensen slordig zijn. <span className="text-primary">AI ging gewoon sneller dan de begeleiding.</span>
            </p>
          </SettleIn>
        </div>
      </Panel>

      {/* Proof: the bold deep-purple moment */}
      <div className="pt-4 sm:pt-6">
        <Panel tone="deep">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-16 items-center">
              <p className="text-[6.5rem] sm:text-[11rem] font-display font-bold leading-[0.85] tracking-tighter text-primary"><CountUp to={82} suffix="%" /></p>
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

      {/* Objections: the thought as a bubble, the answer right under it */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className={container}>
          <SettleIn className="text-center">
            <h2 className="mx-auto max-w-2xl text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight text-balance">
              Misschien denk je nu een van deze dingen.
            </h2>
          </SettleIn>
          <ul className="mx-auto mt-10 sm:mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {gedachten.map((g, i) => (
              <RevealItem
                as="li"
                key={g.q}
                index={i}
                className="flex flex-col rounded-[1.75rem] border border-border bg-white p-6 sm:p-7 shadow-[0_16px_40px_-28px_hsl(256_56%_33%/0.5)]"
              >
                <p className="self-start rounded-[1.25rem] rounded-bl-md bg-primary px-4 py-3 font-display text-lg font-bold leading-snug text-white text-balance">
                  {g.q}
                </p>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-foreground/80">{g.a}</p>
              </RevealItem>
            ))}
          </ul>
          <SettleIn className="text-center">
            <p className="mx-auto mt-12 max-w-2xl text-xl sm:text-2xl font-display font-bold text-foreground leading-snug text-balance">
              De oplossing is dus geen nieuwe regel. <span className="text-primary">Het is je mensen leren hoe het wél moet.</span>
            </p>
          </SettleIn>
        </div>
      </section>

      {/* The relief: four small cards, one after another as you scroll */}
      <section className="pb-14 sm:pb-20">
        <div className={`${container} text-center`}>
          <AnimatedSection>
            <h2 className="text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight">
              Zo voelt het als het geregeld is.
            </h2>
          </AnimatedSection>
          <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-3">
            {geregeld.map((g, i) => (
              <ReliefCard key={g} index={i}>{g}</ReliefCard>
            ))}
          </ul>
          <AnimatedSection>
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
          <AnimatedSection className="text-center">
            <h2 className="mx-auto text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight max-w-2xl">
              Hoe je het regelt, hangt af van wie je wil bereiken.
            </h2>
            <p className="mx-auto mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Je mensen en je leiding hebben niet dezelfde vraag. De meeste organisaties doen allebei.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              <RevealItem index={0} className="block-lilac rounded-[1.75rem] p-7 sm:p-10 flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">De teamtraining</h3>
                <p className="mt-3 text-lg text-muted-foreground leading-relaxed flex-1">
                  Voor je hele team. Online, in eigen tempo, een paar uur per persoon.
                </p>
                <p className="mt-6 text-4xl font-display font-bold text-foreground tracking-tight">
                  &euro;249 <span className="text-base font-normal text-muted-foreground">ex btw per persoon</span>
                </p>
                <p className="mt-2 text-muted-foreground">€229 vanaf 11 personen. Vanaf 50: een enterprise-offerte op maat.</p>
                <Link href="/training" className="btn-neon self-start mt-6 px-7 py-3.5 text-[0.9375rem] font-semibold">
                  Bekijk de teamtraining
                </Link>
              </RevealItem>
              <RevealItem index={1} className="rounded-[1.75rem] border-[1.5px] border-border p-7 sm:p-10 flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">De masterclass</h3>
                <p className="mt-3 text-lg text-muted-foreground leading-relaxed flex-1">
                  Voor directie en management. Twee uur live over verantwoord AI-gebruik, governance en waar jouw
                  verantwoordelijkheid ligt.
                </p>
                <p className="mt-6 text-4xl font-display font-bold text-foreground tracking-tight">
                  &euro;495 <span className="text-base font-normal text-muted-foreground">ex btw per persoon</span>
                </p>
                <p className="mt-2 text-muted-foreground">Minimaal 5 deelnemers, op locatie of online.</p>
                <Link href="/masterclass" className="btn-neon-outline self-start mt-6 px-7 py-3.5 text-[0.9375rem] font-semibold">
                  Bekijk de masterclass
                </Link>
              </RevealItem>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final ask */}
      <div className="pb-24 sm:pb-10">
        <Panel tone="deep">
          <AnimatedSection className="text-center">
            <h2 className="mx-auto text-3xl sm:text-[3.4rem] font-display font-bold leading-[1.05] tracking-tight max-w-3xl">
              Je team gebruikt AI. <span className="text-primary">Zorg dat ze weten hoe.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Een paar uur per persoon, online en in eigen tempo. Daarna weet iedereen waar de grens ligt.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center items-center gap-x-6 gap-y-4">
              <Link
                href="/training"
                className="btn-white px-7 py-3.5 text-[0.9375rem]"
              >
                Bekijk de teamtraining
              </Link>
              <Link href="/masterclass" className="text-[0.9375rem] font-semibold text-primary hover:underline">
                Alleen voor je directie? Bekijk de masterclass
              </Link>
            </div>
          </AnimatedSection>
        </Panel>
      </div>

      <StickyCta target="oplossing" label="Zo regel je het" />
    </div>
  );
}
