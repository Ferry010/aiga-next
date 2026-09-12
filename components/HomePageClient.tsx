'use client';
import Link from "next/link";
import { AlertTriangle, ChevronDown, FileX, HelpCircle, Play, Award, Users, Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import dynamic from "next/dynamic";
const TrainerSection = dynamic(() => import("@/components/TrainerSection"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
import DefinitionBlock from "@/components/DefinitionBlock";
import PillarsSection from "@/components/PillarsSection";
import { useState, useRef, useEffect } from "react";

const faqItems = [
  {
    q: "Wat als onze mensen al AI gebruiken?",
    a: "Precies daarom. De training gaat niet over óf ze AI mogen gebruiken, maar of ze het veilig en goed doen: welke data eruit blijft, hoe je output controleert, en waar het misgaat.",
  },
  {
    q: "Wat is shadow AI en waarom is het een risico?",
    a: "Medewerkers gebruiken AI-tools buiten het zicht van IT. Handig, maar zo lekt bedrijfsdata weg en sluipen er fouten in. De training leert je mensen waar de grenzen liggen, zodat je er grip op houdt.",
  },
  {
    q: "Wat leren onze mensen over data en privacy?",
    a: "Welke informatie wél en niet in een AI-tool mag, waarom dat uitmaakt, en hoe je gevoelige of vertrouwelijke data herkent voordat je het deelt.",
  },
  {
    q: "Is dit niet gewoon een promptcursus?",
    a: "Nee. Het gaat net zo goed over wanneer je AI juist níét gebruikt, hoe je output beoordeelt, welke data eruit blijft, en hoe je AI als assistent inzet in plaats van als autoriteit.",
  },
  {
    q: "Moeten we eerst een AI-beleid hebben?",
    a: "Nee. Een beleid dat niemand toepast verandert geen gedrag. Deze training maakt van de regels praktijk, ook als je beleid nog niet af is.",
  },
  {
    q: "En de AI Act dan?",
    a: "Die vraagt dat je aantoonbaar aandacht besteedt aan AI-geletterdheid. Hoe je dat organiseert, is aan jou. Dit programma dekt dat af, met een certificaat als bewijs. Maar het is niet de reden dat je het doet.",
  },
  {
    q: "Wat als een medewerker het examen niet haalt?",
    a: "Deelnemers mogen het examen herhalen. We zorgen dat iedereen het certificaat behaalt voordat de toegang verloopt.",
  },
  {
    q: "Hoe snel kunnen we starten?",
    a: "Direct na boeking krijg je toegang tot het platform. Je kunt dezelfde dag nog medewerkers uitnodigen.",
  },
  {
    q: "Zijn er volumekortingen bij een groot team?",
    a: "Ja. Vraag een offerte aan via het contactformulier voor een prijsopgave op maat. Vanaf 50 seats ontvang je de Masterclass gratis.",
  },
];

export default function HomePageClient() {
  const reduced = useReduceMotion();
  const [videoPlaying, setVideoPlaying] = useState(false);

  const calcDays = () => Math.max(0, Math.ceil((new Date('2026-08-02').getTime() - Date.now()) / 86400000));
  const [daysLeft, setDaysLeft] = useState(calcDays);
  useEffect(() => {
    const id = setInterval(() => setDaysLeft(calcDays()), 3600000);
    return () => clearInterval(id);
  }, []);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4 max-w-4xl">
              Op dit moment deelt iemand in je organisatie{" "}
              <span className="neon-text">data met AI.</span>
            </h1>
            <p className="text-xl sm:text-2xl font-display font-semibold text-primary mt-5">
              Zorg dat je team weet wat het doet.
            </p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Train je hele team op de risico's van AI: welke data wél en niet in een tool mag, hoe je shadow AI voorkomt, en hoe je AI veilig én nuttig inzet. Kant-en-klaar programma, je bouwt niks zelf. En je voldoet er meteen mee aan de{" "}
              <a href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EU AI Act</a>.
            </p>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Volledig Nederlandstalig en ontwikkeld door AI-experts die dagelijks met Nederlandse organisaties werken. De #1 AI-geletterdheid training van Nederland.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/training" className="btn-neon px-7 py-3.5 rounded-lg text-[15px]">
                Bekijk de training
              </Link>
              <Link href="/gereedheidscan" className="btn-neon-outline px-7 py-3.5 rounded-lg text-[15px] font-semibold border-2">
                Doe de gratis gereedheidscan
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Per seat beschikbaar</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Gratis Masterclass vanaf 50 seats</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Direct starten</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos */}
      <section className="py-6 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground font-body">Een samenwerking tussen</span>
            <div className="flex items-center gap-8">
              <img src="/assets/brand-humanizing-logo.png" alt="Brand Humanizing Institute" className="rounded" style={{ height: '65px' }} />
              <img src="/assets/speakers-academy-logo.png" alt="Speakers Academy" className="rounded" style={{ height: '65px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Definition Block */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <DefinitionBlock
            term="Wat is AI-geletterdheid?"
            definition="AI-geletterdheid is het vermogen van medewerkers om te begrijpen wat kunstmatige intelligentie is, hoe AI-systemen werken, welke risico's ze met zich meebrengen, en hoe ze AI op een veilige, verantwoorde en ethisch verantwoorde manier kunnen inzetten in hun dagelijks werk. Onder Artikel 4 van de EU AI Act (van kracht vanaf februari 2025) zijn organisaties in de EU verplicht om AI-geletterdheid te waarborgen voor alle medewerkers die met AI-systemen werken."
          />
        </div>
      </section>

      {/* Problem section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="HERKEN JE DIT?" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 max-w-3xl leading-[1.1]">
              AI is sneller binnengekomen{" "}
              <span className="text-primary">dan de afspraken erover.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Je hebt het niet aangezet, het gebeurde gewoon. Terwijl je dit leest, plakt iemand in je team bedrijfsdata in ChatGPT, neemt iemand AI-output klakkeloos over, of gebruikt iemand een tool die niemand heeft goedgekeurd.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { icon: AlertTriangle, title: "Bedrijfsdata in een chatbot", body: "Iemand plakt een klantcontract of persoonsgegevens in ChatGPT om tijd te besparen. Weg is het, en je weet niet waarheen." },
              { icon: FileX, title: "Output die niemand controleert", body: "Een AI-antwoord gaat één op één de deur uit. Inclusief een verzonnen getal of bron die niemand heeft nagekeken." },
              { icon: Users, title: "Shadow AI en wildgroei", body: "Mensen gebruiken tools buiten het zicht van IT. Handig, tot er iets misgaat en niemand weet wat er draait." },
              { icon: HelpCircle, title: "Iedereen doet het anders", body: "De één haalt er wonderen uit, de ander durft niet. Er is een AI-beleid, maar niemand heeft het gelezen." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-card border border-border rounded-2xl p-10 hover:border-neon-purple/40 neon-glow transition-all duration-300 group">
                  <c.icon size={24} className="text-neon-purple mb-4" />
                  <p className="text-lg font-semibold text-foreground mb-2">{c.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Risico-scan CTA */}
      <section className="py-24 bg-brand-dim border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionLabel text="NIET ZEKER WAAR JE STAAT?" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Doe de gratis AI Gereedheidscan.<br />
              <span className="text-primary">In drie minuten weet je waar je staat.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              10 vragen over hoe je team AI gebruikt, welke risico's je loopt en waar je staat. Direct resultaat.
            </p>
            <Link href="/gereedheidscan" className="btn-neon inline-block mt-8 px-8 py-4 rounded-lg text-[15px]">
              Start de AI Gereedheidscan
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="DE OPLOSSING" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 max-w-3xl leading-[1.1]">
              Eén praktische basis.{" "}
              <span className="text-primary">Kant-en-klaar, zonder dat je iets bouwt.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Niet iedereen hoeft AI-expert te worden. Iedereen moet wél weten wat je met AI deelt, hoe je output controleert en waar het misgaat. De AIGA online training regelt dat organisatiebreed. Zelfstandig, in eigen tempo, volledig online. Jij hoeft geen programma te bouwen, uit te rollen en bij te houden.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              { icon: Play, title: "Selfpaced", body: "Geen klassikale sessies. Medewerkers volgen de training wanneer het hen uitkomt, in 2 tot 3 uur." },
              { icon: Award, title: "Gecertificeerd", body: "Iedere deelnemer ontvangt het AI Literacy Practitioner certificaat. Digitaal ondertekend, deelbaar via LinkedIn." },
              { icon: Users, title: "Schaalbaar", body: "Per seat te boeken. Geschikt voor teams van 1 tot 1000+ medewerkers. Voortgangsdashboard inbegrepen." },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <c.icon size={24} className="text-primary mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">{c.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4 pijlers */}
      <PillarsSection />

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="HOE HET WERKT" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Van aanvraag tot certificaat<br />
              <span className="text-primary">in drie stappen.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              { step: "01", title: "Meldt je team gemakkelijk aan", body: "Meldt je team gemakkelijk aan in de online omgeving. We stellen alles direct voor je in." },
              { step: "02", title: "Medewerkers volgen de training zelfstandig", body: "Volledig online, in eigen tempo. Videolessen, praktijkcases en een adaptief afsluitend examen." },
              { step: "03", title: "Ontvang de certificaten", body: "Iedere deelnemer ontvangt het AI Literacy Practitioner certificaat. Digitaal ondertekend, direct deelbaar via LinkedIn." },
            ].map((s) => (
              <StaggerItem key={s.step}>
                <div className="relative">
                  <span className="text-5xl font-mono neon-text font-bold">{s.step}</span>
                  <p className="text-lg font-semibold text-foreground mt-2 mb-2">{s.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center"><SectionLabel text="ZIE HET IN ACTIE" /></div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 text-center">
              Kijk hoe simpel het werkt. 👇
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
              Van inschrijving tot certificaat op naam, uitgelegd in twee minuten.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="mt-10">
            <div className="neon-border-lg rounded-2xl" style={{ padding: '3px' }}>
              <div className="neon-inner bg-background rounded-2xl overflow-hidden relative">
                <video
                  ref={videoRef}
                  src="/assets/AI-Geletterdheid-Homepage-scaled-1.webm"
                  controls={videoPlaying}
                  muted
                  playsInline
                  className="w-full rounded-2xl"
                  onPlay={() => setVideoPlaying(true)}
                />
                {!videoPlaying && (
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-foreground/10 rounded-2xl transition-colors hover:bg-foreground/20"
                    aria-label="Video afspelen"
                  >
                    <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                      <Play size={36} className="text-primary ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Ons Aanbod */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center"><SectionLabel text="ONS AANBOD" /></div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 text-center">
              Kies wat bij jouw organisatie past.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <StaggerItem>
              <div className="neon-border-lg h-full">
                <div className="neon-inner bg-background rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] neon-text mb-2">ONLINE TRAINING</span>
                  <h3 className="text-xl font-semibold text-foreground">AI-Geletterdheid voor teams</h3>
                  <p className="text-sm text-muted-foreground mt-1">Online training met certificaat</p>
                  <p className="text-2xl font-bold text-foreground mt-4">249,- <span className="text-sm font-normal text-muted-foreground">per deelnemer (ex BTW)</span></p>
                  <p className="text-xs text-muted-foreground mt-1">Vanaf 50 seats: neem contact op voor een voorstel op maat</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">Minder dan één dag klassikale training, en meteen compliant.</p>
                  <ul className="space-y-2 mt-6 mb-8 flex-1">
                    {["Volledig online, in eigen tempo", "Adaptief examen", "AI Literacy Practitioner certificaat", "Voortgangsdashboard"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/ai-geletterdheid-training" className="btn-neon text-center py-3 rounded-lg text-sm">
                    AI-geletterdheid training
                  </Link>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-card rounded-2xl p-8 sm:p-10 h-full flex flex-col border border-border hover:border-neon-purple/40 neon-glow transition-all duration-300">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">MASTERCLASS</span>
                <h3 className="text-xl font-semibold text-foreground">AI Geletterdheid voor leidinggevenden</h3>
                <p className="text-sm text-muted-foreground mt-1">Min. 5 deelnemers · op locatie</p>
                <p className="text-2xl font-bold text-foreground mt-4">495,- <span className="text-sm font-normal text-muted-foreground">per deelnemer (ex BTW)</span></p>
                <p className="text-xs text-muted-foreground mt-1">Gratis bij 50+ training seats</p>
                <p className="text-xs text-muted-foreground mt-1 italic">Inclusief bij 50+ online seats, anders minder dan één middag extern advies.</p>
                <ul className="space-y-2 mt-6 mb-8 flex-1">
                  {["In-company, ca. 2 uur", "Voor C-level, management & beleidsmakers", "Strategisch inzicht in de AI Act", "Direct toepasbaar in beleid"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/masterclass" className="btn-neon-outline text-center py-3 font-semibold text-sm">
                  Bekijk masterclass
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About Ferry */}
      <TrainerSection bio="Ferry Hoes staat meermaals per maand op het podium voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en verschillende Ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon. Hij weet precies hoe je AI-geletterdheid vertaalt naar actie, compliance en voordeel." />

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center"><SectionLabel text="VEELGESTELDE VRAGEN" /></div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 text-center">
              Alles wat je wilt weten.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-10">
            <div className="w-full">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-border">
                  <summary className="flex items-center justify-between py-4 text-foreground font-semibold text-[15px] cursor-pointer list-none">
                    <span>{item.q}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="text-muted-foreground leading-relaxed pb-4">{item.a}</p>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground">
              Klaar om je team echt goed te maken in AI?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Vraag de mogelijkheden aan. Geen verplichtingen.
            </p>
            <Link href="/contact" className="btn-neon inline-block mt-8 px-8 py-4 rounded-lg text-[15px]">
              Vraag de mogelijkheden aan
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">Of bel direct: +31 (0)10 316 7827</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
