'use client';
import Link from "next/link";
import { AlertTriangle, ChevronDown, FileX, HelpCircle, Users, Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import dynamic from "next/dynamic";
const TrainerSection = dynamic(() => import("@/components/TrainerSection"));
import PillarsSection from "@/components/PillarsSection";

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
    q: "Werkt dit ook voor mensen zonder technische kennis?",
    a: "Ja. De training is gemaakt voor iedereen die met AI werkt, niet alleen de techneuten. Geen voorkennis nodig.",
  },
  {
    q: "Hoe snel kunnen we starten?",
    a: "Direct na boeking krijg je toegang tot het platform. Je kunt dezelfde dag nog medewerkers uitnodigen.",
  },
];

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4 max-w-4xl">
              Geef je hele team{" "}
              <span className="neon-text">dezelfde basiskennis van AI.</span>
            </h1>
            <p className="text-xl sm:text-2xl font-display font-semibold text-primary mt-5 max-w-2xl">
              De verschillen zijn soms groot. Wij zorgen dat iedereen dezelfde basiskennis van AI krijgt.
            </p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Van de collega die alles al met ChatGPT doet tot degene die het niet durft aan te raken: iedereen leert wat AI wél en niet kan, welke data eruit blijft, en hoe je het veilig én nuttig inzet. Geen cursus die je zelf bouwt: binnen een dag heeft je hele team dezelfde basis en weet iedereen wat hij doet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/training" className="btn-neon px-7 py-3.5 rounded-lg text-[15px]">
                Bekijk de training
              </Link>
              <Link href="/gereedheidscan" className="btn-neon-outline px-7 py-3.5 rounded-lg text-[15px] font-semibold border-2">
                Gratis scan: hoeveel risico loop je?
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Per seat beschikbaar</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Gratis Masterclass vanaf 50 seats</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-primary/60" /> Direct starten</span>
            </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative max-w-sm ml-auto">
                <img src="/assets/ferry-session.jpg" alt="Ferry Hoes tijdens een in-company sessie" className="rounded-3xl shadow-soft w-full object-cover aspect-[4/5] rotate-2" />
                <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-2xl px-4 py-3 shadow-soft -rotate-2">
                  <p className="text-sm font-display font-semibold text-foreground">Ferry Hoes</p>
                  <p className="text-xs text-muted-foreground">live voor teams &amp; directies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="HERKEN JE DIT?" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 max-w-3xl leading-[1.1]">
              Op dit moment deelt iemand in je organisatie{" "}
              <span className="text-primary">data met AI.</span>
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
          <p className="mt-12 text-center text-xl sm:text-2xl font-display font-semibold text-foreground max-w-2xl mx-auto leading-snug">
            Niemand doet het expres verkeerd. Ze weten gewoon niet beter. <span className="text-primary">Elke dag zonder duidelijke afspraken is een dag dat het misgaat.</span>
          </p>
        </div>
      </section>

      {/* 4 pijlers */}
      <PillarsSection />

      {/* Ons Aanbod */}
      <section className="py-24 block-sage border-y border-border">
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
                  <p className="text-xs text-muted-foreground mt-1 italic">Minder dan één dag klassikale training, en meteen goed geregeld.</p>
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
                  {["In-company, ca. 2 uur", "Voor C-level, management & beleidsmakers", "Strategisch inzicht in AI-risico's en governance", "Direct toepasbaar in beleid"].map((f) => (
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
      <TrainerSection bio="Ferry Hoes staat meermaals per maand op het podium voor organisaties als a.s.r. Verzekeringen, VodafoneZiggo en verschillende Ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon. Hij weet precies hoe je een team AI slim én veilig laat gebruiken." />

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

      {/* Stakes + scan lead magnet — bold statement block */}
      <section className="py-24 statement-block">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-[1.12] max-w-2xl mx-auto">
              AI-adoptie zonder grip is geen strategie.
            </h2>
            <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed text-muted-foreground">
              Als er morgen iets fout gaat door AI, kun jij uitleggen wat je vandaag hebt gedaan? Voorkom dat je pas na een incident ontdekt hoe je team AI gebruikt.
            </p>
            <Link
              href="/gereedheidscan"
              className="inline-block mt-8 px-8 py-4 rounded-full text-[15px] font-semibold shadow-soft transition-transform hover:-translate-y-0.5"
              style={{ background: "#fff", color: "hsl(263 52% 40%)" }}
            >
              Gratis scan: ontdek je risico met shadow AI
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Liever direct sparren over je team?{" "}
              <Link href="/contact" className="underline underline-offset-2 hover:opacity-80 font-medium" style={{ color: "#fff" }}>
                Neem contact op
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <Link
        href="/gereedheidscan"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 text-white text-center py-4 text-[15px] font-semibold shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        style={{ background: "hsl(263 70% 58%)" }}
      >
        Doe de gratis scan →
      </Link>
    </div>
  );
}
