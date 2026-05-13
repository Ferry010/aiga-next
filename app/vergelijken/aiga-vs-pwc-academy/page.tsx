import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  title: "AIGA vs PwC AI Literacy: welke kies je in 2026?",
  description: "Eerlijke vergelijking van AIGA en PwC Academy AI Literacy. Prijs, taal, certificering, audit-proof bewijs. Welke past bij jouw EU AI Act compliance?",
  alternates: { canonical: "https://aigeletterdheid.academy/vergelijken/aiga-vs-pwc-academy" },
  openGraph: {
    title: "AIGA vs PwC Academy AI Literacy: de eerlijke vergelijking",
    description: "Prijs, taal, certificering, examen-bewijs. Wat is het verschil tussen AIGA en PwC Academy voor AI Act compliance?",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Vergelijking AIGA en PwC Academy AI Literacy" }],
  },
};

const tableRows = [
  { label: "Prijs", aiga: "€249 per seat (ex BTW), gepubliceerd", pwc: "Op aanvraag, offerte op maat" },
  { label: "Taal", aiga: "Volledig Nederlandstalig", pwc: "Engels met Nederlandse ondertitels" },
  { label: "Duur", aiga: "2–3 uur, selfpaced", pwc: "4 modules van 25–50 min (totaal ~2u 5min), selfpaced" },
  { label: "Bewijsvorm", aiga: "AI Literacy Practitioner certificaat na adaptief examen (70% slagingsgrens)", pwc: "Certificate of participation (deelnamebewijs zonder examen)" },
  { label: "Audit-proof", aiga: "Ja: digitaal ondertekend, examen-gebaseerd, deelbaar via LinkedIn", pwc: "Deelnamebewijs zonder kennistoetsing" },
  { label: "Format", aiga: "Online platform, in eigen tempo", pwc: "SCORM-bestand voor eigen LMS, of pay-per-view via PwC Academy" },
  { label: "Trainer", aiga: "Ferry Hoes, winnaar Anti-Discriminatie AI Hackathon Nederlandse overheid 2020", pwc: "Wisselende AI-professionals (geen vaste docent)" },
  { label: "Minimum seats", aiga: "1", pwc: "Geen hard minimum, pakketten ontworpen voor grote groepen" },
  { label: "Masterclass voor leidinggevenden", aiga: "Gratis inbegrepen vanaf 50 seats", pwc: "Aparte AI Inspiration / AI Hackathon pakketten (apart geprijsd)" },
  { label: "PE-erkenning accountants (NBA, AA/RA)", aiga: "Niet erkend", pwc: "Erkend, telt mee in PE-portfolio" },
  { label: "Start-tijd na bestelling", aiga: "Binnen 2 werkdagen", pwc: "Maatwerktraject met offertefase" },
  { label: "Internationale uitrol", aiga: "Nederlandstalig, EU AI Act-gericht", pwc: "Engelstalige basis, schaalbaar voor multinationals" },
  { label: "Aanvullende diensten", aiga: "Gratis Gereedheidscan, kenniscentrum, tools, masterclass", pwc: "AI kick-starter, AI Hackathon, AI Accelerator (consultancy)" },
];

const aigaReasons = [
  {
    lead: "Je hebt een Nederlandstalig team.",
    body: "AIGA is van begin tot eind in het Nederlands. Geen ondertitels, geen vertalingen, geen verlies van nuance. Voor teams op de werkvloer maakt dat het verschil tussen wel of niet écht begrijpen wat je leert.",
  },
  {
    lead: "Je wil aantoonbaar bewijs voor een AI Act audit.",
    body: "Het AIGA-certificaat komt na een adaptief examen met een 70% slagingsgrens. Dat is een ander verhaal dan een deelnamebewijs. Bij een audit heb je dan een sterker bewijsstuk in handen.",
  },
  {
    lead: "Je wil snel kunnen starten, zonder offertefase.",
    body: "De prijs staat publiek: €249 per seat. Je kunt vandaag bestellen en je team kan binnen 2 werkdagen beginnen.",
  },
  {
    lead: "Je organisatie heeft tussen de 1 en 1000 medewerkers.",
    body: "Er is geen minimum. Klein beginnen en opschalen kan. Vanaf 50 seats krijg je de Masterclass voor leidinggevenden gratis erbij.",
  },
];

const pwcReasons = [
  {
    lead: "Je bent een multinational met internationale uitrol.",
    body: "PwC's Engelstalige basis schaalt naar veel landen. De SCORM-uitvoering integreert met grote enterprise LMS-omgevingen.",
  },
  {
    lead: "Je hebt registeraccountants of register controllers in dienst.",
    body: "PwC's training is NBA-erkend en telt mee in PE-portfolio's. AIGA heeft die erkenning niet. Voor RA's en AA's is dat een reëel voordeel.",
  },
  {
    lead: "Je hebt al een lopende relatie met PwC.",
    body: "Als PwC al je accountant of consultant is, kan de training meeliften op bestaande contracten en governance. Dat scheelt soms in de inkoop.",
  },
  {
    lead: "Je wil training combineren met consultancy.",
    body: "PwC biedt AI Inspiration Sessions, AI Hackathons en AI Accelerator-trajecten. Als je naast geletterdheid ook een implementatieproject zoekt, is dat een logische combinatie.",
  },
];

const faqItems = [
  {
    q: "Voldoet een PwC-deelnamebewijs aan Artikel 4 van de AI Act?",
    a: "Het kan voldoen aan de letter van de wet. De Autoriteit Persoonsgegevens stelt geen specifieke certificeringseisen. Maar de geest van Artikel 4 is dat je een toereikend kennisniveau aantoont. Een examen-gebaseerd certificaat met slagingsgrens biedt meer bewijswaarde dan een deelnamebewijs zonder kennistoetsing.",
  },
  {
    q: "Kan ik AIGA volgen als mijn team al PwC-training heeft gedaan?",
    a: "Ja. De trainingen sluiten elkaar niet uit. Sommige organisaties combineren ze: PwC voor de strategische laag, AIGA voor de breedte van de werkvloer. De vraag is of het budget dat rechtvaardigt.",
  },
  {
    q: "Krijgen mijn medewerkers een persoonlijk certificaat?",
    a: "Bij AIGA: ja, digitaal ondertekend, op naam, deelbaar via LinkedIn. Bij PwC: ja, een deelnamebewijs met aantal training-uren.",
  },
  {
    q: "Is AIGA NRTO-erkend of CRKBO-geregistreerd?",
    a: "Op dit moment niet. Voor AI Act Artikel 4 is geen NRTO of CRKBO erkenning vereist. We werken wel aan beide.",
  },
  {
    q: "Wat kost de PwC-training werkelijk?",
    a: "PwC publiceert geen prijslijst. Op basis van openbare Academy-tarieven voor vergelijkbare e-learning curricula ligt de indicatie tussen €350 en €700 per medewerker, afhankelijk van volume en leveringsmodus. Vraag voor een actuele prijs een offerte aan bij PwC.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AIGA vs PwC Academy AI Literacy: welke kies je in 2026?",
  author: { "@id": "https://aigeletterdheid.academy/#ferry" },
  publisher: { "@id": "https://aigeletterdheid.academy/#org" },
  datePublished: "2026-05-13",
  dateModified: "2026-05-13",
  mainEntityOfPage: "https://aigeletterdheid.academy/vergelijken/aiga-vs-pwc-academy",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AigaVsPwcPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Vergelijken", href: "/vergelijken" },
            { label: "AIGA vs PwC Academy" },
          ]}
        />

        {/* Hero */}
        <section className="pt-12 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionLabel text="VERGELIJKING" />
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
                AIGA vs PwC Academy AI Literacy:<br />
                <span className="neon-text">welke kies je in 2026?</span>
              </h1>
            </AnimatedSection>

            {/* TL;DR callout */}
            <AnimatedSection delay={0.1}>
              <div className="mt-8 bg-brand-dim border-l-4 border-primary rounded-r-2xl px-6 py-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Korte versie</p>
                <p className="text-foreground leading-relaxed">
                  AIGA is de beste keuze voor Nederlandse organisaties die snel, betaalbaar en met een audit-proof certificaat willen voldoen aan Artikel 4 van de EU AI Act. PwC Academy is sterker voor multinationals die internationaal uitrollen, NBA-erkende PE-punten nodig hebben, of training willen combineren met een groter PwC-traject.
                </p>
              </div>
            </AnimatedSection>

            {/* Intro */}
            <AnimatedSection delay={0.15}>
              <div className="mt-10 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Twee AI-geletterdheid trainingen. Allebei beloven ze dat ze je helpen voldoen aan de EU AI Act. Maar de overeenkomsten houden snel op. Onder de motorkap kiezen ze totaal verschillende doelgroepen, prijzen en bewijsvormen.
                </p>
                <p>
                  Op 2 augustus 2026 wordt Artikel 4 van de AI Act volledig handhaafbaar. Dan vraagt een toezichthouder bij een audit twee dingen: kun je aantonen dat je medewerkers AI-geletterd zijn, en is dat bewijs robuust genoeg om stand te houden? Deze keuze is dus niet alleen een prijsvraag.
                </p>
                <p className="text-sm">
                  We zijn AIGA. We schrijven deze vergelijking zelf. We doen het zo eerlijk mogelijk en linken alle feiten over PwC rechtstreeks naar hun eigen pagina. Lees mee en kies wat past.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
                In één oogopslag
              </h2>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-4 font-semibold text-foreground w-1/3 bg-muted/50">Onderdeel</th>
                      <th className="text-left px-5 py-4 font-semibold text-primary bg-brand-dim w-1/3">AIGA</th>
                      <th className="text-left px-5 py-4 font-semibold text-muted-foreground bg-muted/30 w-1/3">PwC Academy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="px-5 py-3.5 font-medium text-foreground border-r border-border">{row.label}</td>
                        <td className="px-5 py-3.5 text-foreground border-r border-border bg-brand-dim/30">{row.aiga}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{row.pwc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {tableRows.map((row) => (
                  <div key={row.label} className="border border-border rounded-xl overflow-hidden">
                    <div className="bg-muted px-4 py-2.5">
                      <p className="text-xs font-bold uppercase tracking-wide text-foreground">{row.label}</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="bg-brand-dim/40 px-4 py-3">
                        <p className="text-xs font-bold text-primary mb-1">AIGA</p>
                        <p className="text-sm text-foreground leading-snug">{row.aiga}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-xs font-bold text-muted-foreground mb-1">PwC Academy</p>
                        <p className="text-sm text-muted-foreground leading-snug">{row.pwc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Wanneer kies je voor X */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                Wanneer kies je voor AIGA of PwC Academy?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AIGA column */}
                <div className="bg-brand-dim border border-primary/20 rounded-2xl p-6">
                  <h3 className="text-lg font-display font-semibold text-primary mb-5">
                    Kies AIGA als…
                  </h3>
                  <ul className="space-y-5">
                    {aigaReasons.map((r) => (
                      <li key={r.lead}>
                        <p className="font-semibold text-foreground text-sm">{r.lead}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <Link href="/training" className="text-sm font-semibold text-primary hover:underline">
                      Bekijk de AIGA online training →
                    </Link>
                  </div>
                </div>

                {/* PwC column */}
                <div className="bg-muted/50 border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-display font-semibold text-muted-foreground mb-5">
                    Kies PwC Academy als…
                  </h3>
                  <ul className="space-y-5">
                    {pwcReasons.map((r) => (
                      <li key={r.lead}>
                        <p className="font-semibold text-foreground text-sm">{r.lead}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{r.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Eindoordeel */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                Eindoordeel
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  De keuze hangt af van waar je staat.
                </p>
                <p>
                  Voor de meeste Nederlandse organisaties tussen 10 en 1000 medewerkers die snel willen voldoen aan Artikel 4, levert{" "}
                  <Link href="/training" className="text-primary font-medium hover:underline">de AIGA online training</Link>{" "}
                  meer bewijswaarde tegen een fractie van de doorlooptijd en kosten. Het audit-proof certificaat is praktisch belangrijker dan de big-4 naam, zeker als je aan een toezichthouder moet uitleggen wat er precies getoetst is.
                </p>
                <p>
                  Voor multinationals, accountantskantoren en organisaties die training willen koppelen aan een groter PwC-traject is PwC Academy een verdedigbare keuze. Vooral als interne accountants PE-punten nodig hebben.
                </p>
                <p className="italic text-sm border-t border-border pt-4 mt-2">
                  Wat geen van beide oplossingen kan vervangen: een AI-beleid, een AI-register en heldere governance binnen je organisatie. Een training is een bouwsteen. Niet het hele huis.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <details key={i} className="group bg-card border border-border rounded-xl px-6 open:neon-card-top">
                    <summary className="flex items-center justify-between py-5 font-semibold text-foreground cursor-pointer list-none">
                      <span>{item.q}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 ml-4" />
                    </summary>
                    <p className="text-muted-foreground pb-5 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="bg-card border border-border rounded-2xl p-8 text-center neon-glow">
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
                  Klaar om te beslissen?
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                  Doe eerst de{" "}
                  <Link href="/gereedheidscan" className="text-primary font-medium hover:underline">
                    gratis AI Gereedheidscan
                  </Link>
                  . 10 vragen, 3 minuten, direct inzicht of jouw team klaar is voor 2 augustus 2026.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/gereedheidscan" className="btn-neon px-8 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center">
                    Start de gereedheidscan
                  </Link>
                  <Link href="/contact" className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary/40 transition-colors inline-flex items-center justify-center">
                    Vraag een offerte aan
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Source callout */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <em>
              Feiten over PwC Academy AI Literacy in deze vergelijking komen rechtstreeks van{" "}
              <a
                href="https://www.pwc.nl/en/pwc-academy/training-offer/ai-literacy-elearning-curriculum.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                PwC's eigen productpagina
              </a>
              . Laatst gecontroleerd: 13 mei 2026. Zie je een feitelijke onjuistheid?{" "}
              <Link href="/contact" className="hover:underline">Mail ons</Link> en we passen het aan.
            </em>
          </p>
        </div>
      </div>
    </>
  );
}
