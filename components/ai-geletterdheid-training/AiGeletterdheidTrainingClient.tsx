'use client';
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
}

export default function AiGeletterdheidTrainingClient({ faqs }: Props) {
  return (
    <div className="min-h-screen">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "AI-geletterdheid training" },
        ]}
      />

      {/* Section 1: Hero */}
      <section className="pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4">
              AI is je organisatie al binnengekomen.{" "}
              <span className="neon-text">Train je mensen op de risico's.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Je mensen gebruiken ChatGPT, Copilot en Gemini, vaak zonder te weten welke data eruit moet blijven of wanneer output niet klopt. Deze AI-geletterdheid training geeft je hele team dezelfde praktische basis: data, shadow AI, output controleren, veilig én nuttig werken. Kant-en-klaar, online, met certificaat.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="https://aigeletterdheid.academy/training#offerte" className="btn-neon px-7 py-3.5 rounded-lg text-[15px]">
                Vraag een offerte aan
              </Link>
              <Link href="/tools" className="btn-neon-outline px-7 py-3.5 rounded-lg text-[15px] font-semibold border-2">
                Doe de gratis AI Readiness Scan
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> Audit-proof certificaat
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> 100% online
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> In je eigen tempo
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> €249 ex BTW per deelnemer
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> Geschikt voor teams van elke omvang
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-primary/60" /> Vanaf 50 deelnemers: gratis leiderschapsmasterclass
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2: Voor wie */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VOOR WIE" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Voor elke rol in jouw organisatie.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "HR & L&D",
                body: "Jij geeft iedereen dezelfde basis, ook de niet-technische mensen, en houdt de voortgang bij in één dashboard.",
              },
              {
                title: "Management & directie",
                body: "Je wilt weten dat je mensen veilig met AI werken. Dit maakt het geregeld, en aantoonbaar.",
              },
              {
                title: "Teams die AI gebruiken",
                body: "Iedereen die ChatGPT, Copilot of andere tools inzet. Je leert wat wél en niet mag, en hoe je er meer uit haalt.",
              },
            ].map((card) => (
              <StaggerItem key={card.title}>
                <div className="bg-background border border-border rounded-2xl p-8 hover:border-neon-purple/40 neon-glow transition-all duration-300 h-full">
                  <p className="text-lg font-semibold text-foreground mb-2">{card.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.2} className="mt-8">
            <p className="text-sm text-muted-foreground">
              Geen voorkennis nodig. De training past het niveau aan op de rol.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 3: Wat is Artikel 4 en waarom nu */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="DE WET" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Artikel 4 EU AI Act: <span className="text-primary">wat moet jij doen?</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Artikel 4 van de EU AI Act verplicht organisaties die AI inzetten om te zorgen voor voldoende AI-geletterdheid bij medewerkers.
              </p>
              <p>
                De verplichting geldt voor elke organisatie die AI gebruikt. Ook als je alleen ChatGPT of Microsoft Copilot inzet, val je als deployer onder de wet.
              </p>
              <p>
                De verplichting is van kracht sinds{" "}
                <strong className="text-foreground">2 februari 2025</strong>. De Autoriteit
                Persoonsgegevens start met handhaven op{" "}
                <strong className="text-foreground">2 augustus 2026</strong>.
              </p>
              <p>
                AI-geletterdheid is niet alleen een compliance-checkbox. Teams die AI begrijpen,
                werken veiliger, sneller en met meer commercieel voordeel.
              </p>
            </div>
            {/* TODO: replace /kenniscentrum with specific Artikel 4 article URL once published */}
            <Link
              href="/kenniscentrum"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 mt-6 transition-colors"
            >
              Lees alles over Artikel 4 in het Kenniscentrum →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4: Wat je leert */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT JE LEERT" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Vijf modules. <span className="text-primary">Direct toepasbaar.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-3xl">
            {[
              "Welke data wél en niet in een AI-tool mag",
              "Risico's, privacy en datalekken herkennen",
              "Output controleren en hallucinaties eruit halen",
              "Wanneer je AI juist niet gebruikt, en wanneer wel",
              "AI veilig én nuttig inzetten binnen jouw rol",
            ].map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 p-4">
                  <Check size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 5: Formaat, duur, certificaat */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="PRAKTISCHE INFO" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Alles wat je wilt weten{" "}
              <span className="text-primary">over de training.</span>
            </h2>
            <div className="mt-10 border border-border rounded-2xl overflow-hidden">
              {[
                { label: "Vorm", value: "100% online, in je eigen tempo" },
                { label: "Duur", value: "Gemiddeld 2,5 uur, in eigen tempo" },
                { label: "Toetsing", value: "Adaptief examen aan het einde" },
                { label: "Herkansen", value: "Onbeperkt" },
                {
                  label: "Certificaat",
                  value:
                    "AI Literacy Practitioner-certificaat na het adaptieve examen. Digitaal ondertekend, deelbaar via LinkedIn. Controleerbaar bewijs van deelname.",
                },
                { label: "Prijs", value: "€249 ex BTW per deelnemer" },
                { label: "50+ deelnemers", value: "Gratis leiderschapsmasterclass inbegrepen" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`flex flex-col sm:flex-row sm:items-start px-6 py-4 gap-2 ${
                    i % 2 === 0 ? "bg-card" : "bg-background"
                  }`}
                >
                  <span className="sm:w-52 text-sm font-semibold text-foreground shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{row.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 6: Waarom AIGA */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAAROM AIGA" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Drie redenen om voor AIGA te kiezen.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              {
                title: "Gebouwd vanuit Brand Humanizing",
                body: "Technologie moet mensen sterker maken, niet vervangen. Dat principe zit in elke module van de training.",
              },
              {
                title: "Ontwikkeld met Speakers Academy",
                body: "Inhoud gemaakt door trainers die dagelijks voor organisaties als a.s.r., VodafoneZiggo en Nederlandse Ministeries staan.",
              },
              {
                title: "Praktisch en direct toepasbaar",
                body: "Geen droge theorie. Medewerkers leren wat ze morgen kunnen toepassen in hun werk.",
              },
            ].map((reason) => (
              <StaggerItem key={reason.title}>
                <p className="text-lg font-semibold text-foreground mb-2">{reason.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.body}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VEELGESTELDE VRAGEN" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2">
              Antwoorden op jouw vragen.
            </h2>
          </AnimatedSection>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:no-underline text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section 8: Slot CTA */}
      <section className="py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionLabel text="KLAAR OM TE STARTEN?" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground">
              Klaar om het te regelen?<br />
              <span className="text-primary">Voor je hele team, kant-en-klaar.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="https://aigeletterdheid.academy/training#offerte"
                className="btn-neon px-8 py-4 rounded-lg text-[15px]"
              >
                Vraag een offerte aan
              </Link>
              <Link
                href="https://aigeletterdheid.academy/training#offerte"
                className="btn-neon-outline px-8 py-4 rounded-lg text-[15px] font-semibold border-2"
              >
                Plan een gesprek
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Of bel direct: +31 (0)10 316 7827</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
