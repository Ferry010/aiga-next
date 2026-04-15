'use client';
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import TrainerSection from "@/components/TrainerSection";
import ContactForm from "@/components/ContactForm";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is deze training verplicht?", a: "Ja. Sinds februari 2025 is AI-geletterdheid wettelijk verplicht voor organisaties binnen de EU die met AI werken. Dat geldt ook als medewerkers alleen ChatGPT of Copilot gebruiken. Per augustus 2025 wordt er gehandhaafd." },
  { q: "Hoe lang duurt de training?", a: "De training is selfpaced en kan in meerdere sessies worden gevolgd. Gemiddeld zijn medewerkers twee tot drie uur bezig." },
  { q: "Is er technische voorkennis nodig?", a: "Nee. De training is ontwikkeld voor alle medewerkers, ook zonder technische achtergrond." },
  { q: "Wat als een deelnemer niet slaagt voor het examen?", a: "Dan kan de deelnemer het examen herkansen. Er is geen limiet op het aantal pogingen." },
  { q: "Hoe werkt het certificaat?", a: "Na het afronden van het adaptieve examen ontvangt iedere deelnemer automatisch het AI Literacy Practitioner certificaat. Digitaal ondertekend, deelbaar via LinkedIn en audit-proof voor de AI Act." },
  { q: "Kan ik seats bijboeken?", a: "Ja. Je kunt op elk moment extra seats toevoegen via robbert@speakersacademy.nl of tom@speakersacademy.nl." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live op het platform." },
];

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Training" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ONLINE TRAINING" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AI-Geletterdheid training voor teams<br />
              <span className="neon-text">Voldoe aan de AI Act. Train je team slim, snel en gecertificeerd.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAAROM NU" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Waarom AI-geletterdheid trainen<br /><span className="text-primary">nú essentieel is voor je team</span>
            </h2>
            <div className="mt-6 text-muted-foreground max-w-3xl space-y-4 leading-relaxed">
              <p>De EU AI Act stelt duidelijke eisen: medewerkers moeten AI begrijpen, risico's herkennen en weten hoe ze technologie veilig en verantwoord inzetten in hun werk.</p>
              <p>Onze AI-geletterdheid training voor teams geeft je organisatie precies die kennis, modulair opgebouwd, volledig online en direct toepasbaar. Geen ingewikkelde tools, geen klassikale sessies. Wél een audit-proof certificaat waarmee je organisatie voldoet aan de EU AI wetgeving.</p>
              <p>
                Ook geschikt voor teams zonder technische voorkennis. En voor leidinggevenden is er de{" "}
                <Link href="/masterclass" className="text-primary hover:underline font-medium">AI Masterclass</Link>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Zelfstandig en in eigen tempo te volgen",
              "Adaptief examen aan het einde",
              "Geschikt voor teams van elke omvang",
              "Certificering: AI Literacy Practitioner (digitaal ondertekend en audit-proof)",
              "Kosten: 249,- (ex BTW) per deelnemer",
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

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAT MEDEWERKERS LEREN" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2">
              Concreet, begrijpelijk<br /><span className="text-primary">en direct toepasbaar.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {[
              "Wat AI is (en wat het niet is)",
              "Hoe AI in de praktijk werkt (op de werkvloer, niet in theorie)",
              "Wat de risico's zijn van bias, datamisbruik en fouten",
              "Hoe je AI veilig, verantwoord en binnen de wet gebruikt",
              "Welke rol medewerkers zelf spelen binnen de AI Act",
              "Hoe ze risico's herkennen en escaleren binnen de organisatie",
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

      <TrainerSection />

      <section className="py-24 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="INVESTERING" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2 text-center">
              Kies het pakket dat bij jouw team past.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <StaggerItem>
              <div className="neon-border-lg h-full">
                <div className="neon-inner bg-background rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] neon-text mb-2">STANDAARD</span>
                  <h3 className="text-xl font-semibold text-foreground">1 – 49 deelnemers</h3>
                  <p className="text-4xl font-display font-bold text-foreground mt-4">€249,-</p>
                  <p className="text-sm text-muted-foreground mt-1">per deelnemer, excl. BTW</p>
                  <ul className="space-y-3 mt-6 mb-8 flex-1">
                    {["Volledige online training, selfpaced", "Adaptief examen met onbeperkt herkansen", "AI Literacy Practitioner certificaat", "Voortgangsdashboard voor de organisatie", "Geen technische voorkennis vereist"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={16} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#offerte" className="btn-neon block text-center py-3 rounded-lg font-semibold text-sm">
                    Vraag een offerte aan
                  </a>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-surface-2 border border-border rounded-2xl p-8 sm:p-10 h-full flex flex-col hover:border-neon-purple/20 transition-all duration-300">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">ENTERPRISE</span>
                <h3 className="text-xl font-semibold text-foreground">50+ deelnemers</h3>
                <p className="text-4xl font-display font-bold text-foreground mt-4">Op maat</p>
                <p className="text-sm text-muted-foreground mt-1">Neem contact op voor een voorstel</p>
                <ul className="space-y-3 mt-6 mb-8 flex-1">
                  {["Alles uit het Standaard-pakket", "Gratis Masterclass voor management inbegrepen", "Dedicated accountmanager", "Voortgangsrapportages op organisatieniveau"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#offerte" className="btn-neon-outline text-center py-3 rounded-lg font-semibold text-sm">
                  Neem contact op
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VEELGESTELDE VRAGEN" />
          </AnimatedSection>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-foreground hover:no-underline text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="offerte" className="py-24 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="OFFERTE AANVRAGEN" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mt-2 mb-8">
              Hoeveel seats heeft jouw team nodig?
            </h2>
            <ContactForm product="training" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
