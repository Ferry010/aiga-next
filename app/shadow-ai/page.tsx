import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Panel from "@/components/Panel";
import HeroChat from "@/components/HeroChat";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Shadow AI: je team zet bedrijfsdata in ChatGPT | AIGA",
  description:
    "Iemand in je team zet klantgegevens in een privé ChatGPT-account. Dat heet shadow AI: AI-gebruik waar je organisatie niet van weet. Het kan in strijd zijn met de AVG en je beleid, en je data raakt uit beeld.",
  alternates: { canonical: "/shadow-ai" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shadow AI in je organisatie",
  description:
    "Wat shadow AI is, waarom het je AVG, je beleid en je bedrijfsdata raakt, en hoe je er grip op krijgt zonder verbod.",
  url: "https://aigeletterdheid.academy/shadow-ai",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const risks = [
  {
    title: "Het kan in strijd zijn met de AVG",
    body: "Staat er een naam, e-mailadres of klantnummer in? Dan deel je persoonsgegevens met een partij waar je organisatie geen afspraken mee heeft. Dat kan in strijd zijn met de AVG, en soms moet je het zelfs melden als datalek.",
  },
  {
    title: "Het gaat tegen je eigen beleid in",
    body: "Contracten, offertes en klantinformatie vallen vaak onder geheimhouding, of onder afspraken met je klant. Eén keer kopiëren en plakken en die afspraak is gebroken, zonder dat iemand het doorheeft.",
  },
  {
    title: "Je data raakt uit beeld",
    body: "Bij een gratis of privé-account kan wat je invoert worden gebruikt om het AI-model verder te trainen, afhankelijk van de instellingen. Wat eenmaal is verstuurd, haal je niet meer terug.",
  },
];

const today = [
  {
    title: "Het gebeurt elke werkdag",
    body: "Niet één keer, maar bij elke samenvatting, elke mail en elke offerte die sneller moet. Elke dag zonder afspraken is een dag extra data die je niet terugkrijgt.",
  },
  {
    title: "Terughalen kan niet",
    body: "Een verkeerd verstuurde mail kun je soms nog terugroepen. Een document in een AI-tool niet. Voorkomen is de enige optie.",
  },
  {
    title: "Het groeit sneller dan je beleid",
    body: "Er komen elke maand nieuwe AI-tools en AI-functies in software die je al gebruikt. Hoe langer je wacht, hoe meer eigen gewoontes er ontstaan.",
  },
  {
    title: "Als het misgaat, is de vraag wat jij had geregeld",
    body: "Niet wat de medewerker deed, maar of iemand ooit had uitgelegd waar de grens ligt. Dat antwoord wil je vandaag al kunnen geven.",
  },
];

const learns = [
  "Welke bedrijfsdata wél en niet in een AI-tool mag",
  "Hoe je herkent of een tool veilig is om te gebruiken",
  "Hoe je AI-output controleert voordat hij de deur uitgaat",
  "Wanneer je AI juist beter niet gebruikt",
  "Eén gedeelde standaard, in plaats van iedereen op een eigen manier",
];

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
      {children}
    </h2>
  );
}

export default function ShadowAiPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Shadow AI" }]} />

      {/* Hero: the moment first, the name second */}
      <section className="pt-6 pb-14 sm:pt-10 sm:pb-20">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
              Je team zet klantdata in ChatGPT.
              <span className="neon-text block mt-2">En jij weet van niks.</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-display font-bold text-foreground max-w-xl leading-snug">
              Dat heet shadow AI: AI-gebruik binnen je organisatie waar de organisatie zelf niet van weet.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Via een privé-account, om tijd te besparen. Niet uit onwil. Maar niemand heeft er afspraken over gemaakt
              en niemand ziet waar die gegevens daarna blijven. Dat kan in strijd zijn met de AVG, het gaat vaak tegen je eigen beleid
              in en je data is uit beeld.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/gereedheidscan"
                className="btn-neon inline-flex items-center justify-center px-7 py-3.5 text-[0.9375rem] font-semibold"
              >
                Check of het bij jou gebeurt
              </Link>
              <a href="#oplossing" className="text-[0.9375rem] font-semibold text-primary hover:underline">
                Zo los je het op
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <HeroChat />
          </AnimatedSection>
        </div>
      </section>

      {/* Definition, in plain words */}
      <section className="pb-16 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16`}>
          <AnimatedSection>
            <H2>Wat is shadow AI?</H2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Shadow AI is AI die je mensen gebruiken voor hun werk, zonder dat de organisatie ervan weet. Geen
                toestemming, geen afspraken, geen zicht. De naam komt van shadow IT: het gebeurt in de schaduw, buiten
                het zicht van IT en management.
              </p>
              <p>
                Het ziet er heel gewoon uit. Een klantmail laten herschrijven in een privé ChatGPT-account. Een gratis
                tool die een vergaderverslag uitwerkt. Een offerte laten samenvatten op je eigen telefoon.
              </p>
              <p className="text-foreground">
                Bijna iedereen doet het, meestal met de beste bedoelingen. Het probleem is niet de tool, maar dat
                niemand ooit heeft uitgelegd wat er wel en niet in mag.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What's at stake */}
      <Panel tone="tint">
        <AnimatedSection>
          <div className="max-w-3xl">
            <H2>Wat er gebeurt als iemand op Versturen klikt.</H2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {risks.map((r) => (
              <div key={r.title} className="border-t-2 border-primary pt-5">
                <h3 className="text-xl font-display font-bold text-foreground leading-snug">{r.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Panel>

      {/* Proof */}
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
                  Buiten het zicht van de organisatie. Dus ook buiten elke afspraak die je met een leverancier hebt
                  gemaakt.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">LayerX, 2025</p>
              </div>
            </div>
          </AnimatedSection>
        </Panel>
      </div>

      {/* Why today */}
      <section className="py-16 sm:py-24">
        <div className={container}>
          <AnimatedSection>
            <div className="max-w-3xl">
              <H2>Waarom je dit niet naar volgend kwartaal schuift.</H2>
            </div>
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8">
            {today.map((t, i) => (
              <AnimatedSection key={t.title} delay={i * 0.04}>
                <div className="border-t border-border pt-5">
                  <h3 className="text-xl font-display font-bold text-foreground leading-snug">{t.title}</h3>
                  <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why a ban doesn't work */}
      <section className="pb-16 sm:pb-24">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16`}>
          <AnimatedSection>
            <H2>En nee, verbieden werkt niet.</H2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Blokkeer je de ene tool, dan pakken mensen de volgende, op hun telefoon of privélaptop. Het werk moet
                nog steeds af. Een verbod verplaatst het probleem naar een plek waar je helemaal niets meer ziet.
              </p>
              <p className="text-foreground">
                Wat wel werkt: mensen die zelf weten waar de grens ligt. Dan herkennen ze een klantcontract als iets
                wat er niet in hoort, ook als er niemand meekijkt.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution + offerte */}
      <div className="pb-10">
        <Panel tone="tint" id="oplossing">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight">
                Zet de grens voordat het volgende contract erin gaat.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Een online training geeft je hele team dezelfde basis. Een paar uur per persoon, in eigen tempo. Na
                afloop weet iedereen:
              </p>
              <ul className="mt-5 border-b border-border">
                {learns.map((l) => (
                  <li key={l} className="flex items-start gap-3 border-t border-border py-3 text-foreground">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-muted-foreground">
                €249 ex btw per persoon, €229 vanaf 11 personen.{" "}
                <Link href="/training" className="text-primary font-semibold hover:underline">Bekijk het programma</Link>
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
                <LeadForm source="Shadow AI pagina, offerte aanvraag" />
              </div>
              <p className="mt-5 text-muted-foreground">
                Nog niet zeker of het bij jullie speelt?{" "}
                <Link href="/gereedheidscan" className="text-primary font-semibold hover:underline">
                  Doe eerst de gratis AI-risicocheck
                </Link>
              </p>
            </AnimatedSection>
          </div>
        </Panel>
      </div>
    </div>
  );
}
