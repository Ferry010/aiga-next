import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const SLUG = "ai-geletterdheid-training-landschap-nederland";
const URL = `https://aigeletterdheid.academy/kenniscentrum/${SLUG}`;
const IMAGE = "/assets/artikel-landschap-header.svg";
const PUBLISHED = "2026-05-13";
const H1 = "Het Nederlandse AI-geletterdheid training landschap: 6 categorieën, en wat ze waard zijn";

export const metadata: Metadata = {
  title: "AI-geletterdheid training in Nederland: 6 categorieën aanbieders vergeleken | AIGA",
  description: "Het Nederlandse AI-geletterdheid training landschap. 6 categorieën aanbieders: van gratis overheidscursussen tot Big 4. Wat krijg je per categorie, en voor wie werkt het?",
  alternates: { canonical: URL },
  openGraph: {
    title: "AI-geletterdheid training in Nederland: 6 categorieën aanbieders vergeleken",
    description: "6 categorieën aanbieders: van gratis overheidscursussen tot Big 4. Wat krijg je per categorie?",
    images: [{ url: IMAGE, width: 1200, height: 630, alt: H1 }],
    type: "article",
    publishedTime: PUBLISHED,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  author: { "@id": "https://aigeletterdheid.academy/#ferry" },
  publisher: { "@id": "https://aigeletterdheid.academy/#org" },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: URL,
  image: `https://aigeletterdheid.academy${IMAGE}`,
};

const categories = [
  {
    n: "1",
    title: "Gratis overheidsinitiatieven en EU-programma's",
    body: "Gratis trainingen en bewustwordingsprogramma's aangeboden door of namens overheden, de Europese Commissie, of publiek gefinancierde instituten.",
    krijg: "Basisbewustzijn. De content is breed toegankelijk en gratis, maar niet specifiek gericht op de verplichtingen van de EU AI Act voor organisaties. Er is doorgaans geen examen, geen juridisch bruikbaar certificaat en geen aansluiting op de deployer-verplichtingen van Artikel 4.",
    sterk: "Gratis toegankelijk, laagdrempelig, breed bereik.",
    zwak: "Geen examen, geen controleerbaar bewijs van deelname, niet specifiek op EU AI Act gericht.",
    voor: "Particulieren die AI willen begrijpen, en als aanvulling op een bredere trainingsstrategie. Niet als standalone compliance-oplossing voor organisaties.",
  },
  {
    n: "2",
    title: "Grote internationale advies- en accountancybureaus",
    body: "Trainingen aangeboden door of via grote internationale bureaus die ook advies- en auditdiensten leveren. De naam van de aanbieder geeft geloofwaardigheid in grote organisaties.",
    krijg: "Engelstalige basistraining, vaak beschikbaar als SCORM-bestand voor integratie in een eigen LMS. Sommige trainingen zijn erkend voor PE-punten. Het bewijsmateriaal is doorgaans een deelnamebewijs zonder kennistoetsing. De prijs staat niet gepubliceerd en hangt af van volume en contractvorm.",
    sterk: "Professionele naam, schaalbaarheid voor multinationals, mogelijke PE-erkenning voor accountants.",
    zwak: "Niet primair Nederlandstalig, geen examen, hoge instapdrempel in procurementsproces.",
    voor: "Multinationals die internationaal uitrollen, organisaties met een bestaande relatie met de aanbieder, en teams met registeraccountants die PE-punten nodig hebben.",
  },
  {
    n: "3",
    title: "Generieke internationale online leerplatformen",
    body: "Grote internationale platforms met een breed aanbod van online cursussen, inclusief cursussen over AI en machine learning.",
    krijg: "Een brede introductie tot AI-concepten. De content is niet specifiek gericht op de EU AI Act of de verplichtingen van Artikel 4. Er is doorgaans wel een certificaat, maar dit is niet juridisch bruikbaar als bewijs voor EU AI Act-compliance.",
    sterk: "Laagdrempelig, herkenbare naam, breed aanbod.",
    zwak: "Niet EU AI Act-specifiek, niet Nederlandstalig, geen examen met slagingsgrens gericht op deployer-verplichtingen.",
    voor: "Als aanvulling, voor medewerkers die bredere AI-kennis willen opdoen. Niet als primaire compliance-oplossing.",
  },
  {
    n: "4",
    title: "Gespecialiseerde Nederlandse aanbieders",
    body: "Aanbieders die specifiek gericht zijn op AI-geletterdheid in de Nederlandse context, met focus op EU AI Act-compliance. De content is Nederlandstalig, gericht op Artikel 4 en de deployer-verplichtingen, en leidt tot een individueel certificaat.",
    krijg: "Nederlandstalige training, examen-gebaseerde certificering, en een focus op de juridische context van de EU AI Act. Prijzen zijn vaak publiek gepubliceerd per seat.",
    sterk: "Taal, juridische relevantie, snelle start, certificaat op naam.",
    zwak: "Kleinere naam dan de grote bureaus, minder relevant voor organisaties die internationaal uitrollen.",
    voor: "Nederlandse organisaties tussen 10 en 1000 medewerkers die snel en betaalbaar willen voldoen aan Artikel 4.",
    note: true,
  },
  {
    n: "5",
    title: "Sectorspecifieke cursusaanbieders",
    body: "Aanbieders die AI-geletterdheid training inbedden in sectorspecifieke context. Denk aan juridische, HR-gerichte of zorgspecifieke invullingen die AI koppelen aan de specifieke risico's van een sector.",
    krijg: "Diepgaande kennis op het snijvlak van AI en een specifieke sector. Sterker in verticale diepte dan in horizontale dekking. Het bewijsmateriaal varieert per aanbieder.",
    sterk: "Sectorrelevantie, praktische toepassing, contextgebondenheid.",
    zwak: "Dekt niet automatisch de bredere AI-geletterdheidsplicht voor alle medewerkers.",
    voor: "Als verdieping voor specifieke teams. Niet als organisatiebrede compliance-oplossing.",
  },
  {
    n: "6",
    title: "Incompany maatwerktrajecten",
    body: "Op maat ontwikkelde trainingen, gebouwd door een consultancybureau of een intern L&D-team op basis van de specifieke context van de organisatie.",
    krijg: "De meest relevante training die bestaat. Volledig op maat, inclusief jouw eigen AI-systemen en beleid. Het is ook de duurste en langzaamste optie: doorlooptijden van drie tot zes maanden zijn gebruikelijk.",
    sterk: "Maximale relevantie, volledige aansluiting op jouw organisatie.",
    zwak: "Hoge kosten, lange doorlooptijd, afhankelijkheid van externe partner of interne capaciteit.",
    voor: "Grote organisaties met complexe AI-implementaties of hoog-risico systemen, voor wie generieke training te ondiep is.",
  },
];

export default function LandschapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="min-h-screen">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Kenniscentrum", href: "/kenniscentrum" },
            { label: H1 },
          ]}
        />

        {/* Hero image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={IMAGE} alt={H1} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <AnimatedSection>
            {/* Category + read time */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">AI-geletterdheid uitgelegd</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> 7 min lezen
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              {H1}
            </h1>

            {/* Author byline */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              <img
                src="/assets/ferry-hoes.gif"
                alt="Ferry Hoes"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Ferry Hoes</p>
                <p className="text-xs text-muted-foreground">13 mei 2026</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Article content */}
          <AnimatedSection delay={0.1}>
            <div className="prose prose-neutral max-w-none dark:prose-invert">
              <p>
                De markt voor AI-geletterdheid in Nederland is het afgelopen jaar snel gegroeid. Overheden, grote consultancybureaus, e-learningplatformen, gespecialiseerde aanbieders en sectorpartijen: iedereen biedt nu iets aan. Dat maakt kiezen lastig.
              </p>
              <p>
                Dit artikel helpt je navigeren. We onderscheiden zes categorieën aanbieders, beschrijven wat je per categorie kunt verwachten, en leggen uit voor wie elke categorie het beste werkt.
              </p>
              <p>
                We noemen geen specifieke aanbieders op naam. In plaats daarvan beschrijven we de kenmerken die de categorieën definiëren. Zo kun je elke aanbieder die je tegenkomt zelf plaatsen.
              </p>
              <p>
                <em>Transparantievermelding: AIGA valt in categorie 4. We beschrijven alle categorieën zo eerlijk mogelijk.</em>
              </p>
            </div>

            {/* 6 category cards */}
            <div className="mt-8 space-y-6">
              {categories.map((cat) => (
                <div key={cat.n} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/40">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {cat.n}
                    </span>
                    <h2 className="text-base font-display font-semibold text-foreground m-0 p-0">
                      {cat.title}
                    </h2>
                  </div>
                  <div className="px-6 py-5 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.body}</p>
                    <div>
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">Wat krijg je?</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cat.krijg}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                        <p className="text-xs font-semibold text-primary mb-1">Sterk in</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{cat.sterk}</p>
                      </div>
                      <div className="bg-muted/50 border border-border rounded-lg p-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Minder sterk in</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{cat.zwak}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">Voor wie?</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cat.voor}</p>
                    </div>
                    {cat.note && (
                      <p className="text-xs text-muted-foreground/70 italic border-t border-border pt-3">
                        AIGA valt in deze categorie. We beschrijven dit zo neutraal mogelijk.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="prose prose-neutral max-w-none dark:prose-invert mt-8">
              <h2>Hoe nu kiezen?</h2>
              <p>
                Je kiest op basis van drie factoren: het kennisniveau van je medewerkers, de tijdsdruk die je hebt, en de bewijslast die je bij een audit nodig hebt.
              </p>
              <p>
                Heb je medewerkers zonder technische achtergrond, een deadline van augustus 2026 en een toezichthouder die om examen-gebaseerd bewijs kan vragen? Dan zoek je iets in categorie 4.
              </p>
              <p>
                Heb je een internationaal personeelsbestand, registeraccountants in dienst, en een bestaande LMS-infrastructuur? Dan is categorie 2 of 6 relevanter.
              </p>
              <p>
                Wil je systematisch vergelijken? Gebruik de{" "}
                <Link href="/kenniscentrum/ai-geletterdheid-training-kiezen-checklist-2026">
                  10-criteria checklist voor AI-geletterdheid trainingen
                </Link>{" "}
                als leidraad voor je gesprekken met aanbieders.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.2}>
            <div className="mt-10 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Weet je nog niet welk niveau je team al heeft?
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto">
                Doe de gratis{" "}
                <Link href="/gereedheidscan" className="text-primary font-medium hover:underline">
                  AI Gereedheidscan
                </Link>
                . Drie minuten, tien vragen, direct inzicht in wat er nog mist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/gereedheidscan" className="btn-neon px-8 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center">
                  Start de gereedheidscan
                </Link>
                <Link href="/training" className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary/40 transition-colors inline-flex items-center justify-center">
                  Bekijk de AIGA training
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Ferry bio */}
          <AnimatedSection delay={0.25}>
            <div className="mt-10 pt-8 border-t border-border flex gap-4">
              <img
                src="/assets/ferry-hoes.gif"
                alt="Ferry Hoes"
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Ferry Hoes</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Social share */}
          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">Deel dit artikel:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(URL)}&text=${encodeURIComponent(H1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.263 5.632 5.901-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / Twitter
            </a>
          </div>

          {/* Back link */}
          <div className="mt-6">
            <Link href="/kenniscentrum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Terug naar Kenniscentrum
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
