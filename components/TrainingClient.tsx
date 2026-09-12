'use client';
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import TrainerSection from "@/components/TrainerSection";
import LeadForm from "@/components/LeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Wat als onze mensen al AI gebruiken?", a: "Precies daarom. De training gaat niet over óf ze AI mogen gebruiken, maar of ze het veilig en goed doen: welke data eruit blijft, hoe je output controleert, en waar het misgaat." },
  { q: "Wat is shadow AI en waarom is het een risico?", a: "Medewerkers gebruiken AI-tools buiten het zicht van IT. Handig, maar zo lekt bedrijfsdata weg en sluipen er fouten in. De training leert je mensen waar de grenzen liggen, zodat je er grip op houdt." },
  { q: "Wat leren onze mensen over data en privacy?", a: "Welke informatie wél en niet in een AI-tool mag, waarom dat uitmaakt, en hoe je gevoelige of vertrouwelijke data herkent voordat je het deelt." },
  { q: "Krijgen we er ook het EU AI Act-certificaat bij?", a: "Ja. Iedereen sluit af met een examen en het AI Literacy Practitioner certificaat op naam. Digitaal ondertekend en deelbaar via LinkedIn. Daarmee toon je aan dat er getraind is, precies wat de EU AI Act van organisaties vraagt. Maar het is niet de reden dat je het doet." },
  { q: "Hoe lang duurt de training?", a: "De training is selfpaced en kan in meerdere sessies worden gevolgd. Gemiddeld zijn medewerkers twee tot drie uur bezig. Geen klassikale sessies, geen roostergedoe." },
  { q: "Is er technische voorkennis nodig?", a: "Nee. De training is ontwikkeld voor alle medewerkers, ook zonder technische achtergrond." },
  { q: "Wat als een deelnemer niet slaagt voor het examen?", a: "Dan kan de deelnemer het examen herkansen. Er is geen limiet op het aantal pogingen." },
  { q: "Hoe werkt het certificaat?", a: "Na het afronden van het adaptieve examen ontvangt iedere deelnemer automatisch het AI Literacy Practitioner certificaat. Digitaal ondertekend en deelbaar via LinkedIn. Het certificaat is onderdeel van het dossier waarmee je aantoont dat er getraind is. De AI Act schrijft geen verplicht certificaatformaat voor." },
  { q: "Kan ik seats bijboeken?", a: "Ja. Je kunt op elk moment extra seats toevoegen via robbert@speakersacademy.nl of tom@speakersacademy.nl." },
  { q: "Hoe snel kunnen we starten?", a: "Na akkoord op de offerte staat jouw organisatie binnen twee werkdagen live op het platform." },
];

export default function TrainingClient() {
  return (
    <div className="min-h-screen">
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ONLINE TRAINING VOOR TEAMS" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4 max-w-4xl">
              Op dit moment deelt iemand in je organisatie{" "}
              <span className="neon-text">data met AI.</span>
            </h1>
            <p className="mt-5 text-xl sm:text-2xl font-display font-semibold text-primary max-w-2xl">
              Zorg dat je team weet wat het doet.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Train je hele team op de risico's van AI: welke data wél en niet in een tool mag, hoe je
              shadow AI voorkomt, en hoe je AI veilig én nuttig inzet. Online, in eigen tempo, met een
              examen en certificaat op naam. Kant-en-klaar, je bouwt niks zelf. En je voldoet er meteen
              mee aan de EU AI Act.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#offerte" className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-semibold">
                Vraag de mogelijkheden aan
              </a>
              <Link href="/gereedheidscan" className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-medium text-primary hover:underline">
                Nog niet zeker? Doe de gratis AI-check. 10 vragen, 2 minuten.
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="WAAROM NU" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 max-w-3xl leading-[1.1]">
              AI is sneller binnengekomen <span className="text-primary">dan de afspraken erover.</span>
            </h2>
            <div className="mt-6 text-muted-foreground max-w-3xl space-y-4 leading-relaxed">
              <p>Je hebt het niet aangezet, het gebeurde gewoon. Terwijl je dit leest, plakt iemand in je team bedrijfsdata in ChatGPT, neemt iemand AI-output klakkeloos over, of gebruikt iemand een tool die niemand heeft goedgekeurd.</p>
              <p>Deze training geeft je hele team dezelfde praktische basis: welke data wél en niet in AI mag, hoe je shadow AI voorkomt, hoe je output controleert en hoe je de tools veilig én nuttig inzet. Modulair, volledig online en direct toepasbaar. Kant-en-klaar, je bouwt niks zelf.</p>
              <p>Het certificaat op naam is het bewijs dat het geregeld is. En je voldoet er meteen mee aan de AI-geletterdheidseis van de EU AI Act, zonder dat het je hele verhaal wordt.</p>
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
              "Certificaat op naam: AI Literacy Practitioner (digitaal ondertekend)",
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
            <SectionLabel text="WAT JE TEAM ERUIT HAALT" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 max-w-3xl leading-[1.1]">
              Concreet, begrijpelijk <span className="text-primary">en direct toepasbaar.</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {[
              "Slim prompten: betere output uit ChatGPT, Copilot en Gemini",
              "AI toepassen op je eigen werk, met herkenbare voorbeelden",
              "Veilig omgaan met bedrijfsdata en gevoelige informatie",
              "Wat AI wél en niet kan (en waar het de mist in gaat)",
              "Risico's als bias en fouten herkennen en voorkomen",
              "Wat de EU AI Act van jullie vraagt, in gewone taal",
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
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 text-center">
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
                    Vraag de mogelijkheden aan
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
            <SectionLabel text="AAN DE SLAG" />
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground mt-2 mb-3">
              Klaar om je team AI-vaardig te maken?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Laat je gegevens achter, dan bespreken we de snelste route. Voor jezelf of voor je hele
              team. Binnen twee werkdagen staat alles klaar.
            </p>
            <LeadForm source="Training pagina — offerte aanvraag" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
