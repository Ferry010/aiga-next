import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadFormClient from "./LeadFormClient";
import CountdownClient from "./CountdownClient";

export const metadata: Metadata = {
  title: "AI Act training voor je team | Online, met certificaat | AIGA",
  description:
    "Maak je team aantoonbaar AI-geletterd voor 2 augustus 2026. Online, in eigen tempo, met examen en certificaat. Vanaf 249 euro per medewerker. Vraag een offerte aan.",
  alternates: {
    canonical: "https://aigeletterdheid.academy/ai-act-training",
  },
  openGraph: {
    title: "AI Act training voor je team | Online, met certificaat | AIGA",
    description:
      "Maak je team aantoonbaar AI-geletterd voor 2 augustus 2026. Online, in eigen tempo, met examen en certificaat. Vanaf 249 euro per medewerker.",
    url: "https://aigeletterdheid.academy/ai-act-training",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Act training voor je team | Online, met certificaat | AIGA",
    description:
      "Maak je team aantoonbaar AI-geletterd voor 2 augustus 2026. Vanaf 249 euro per medewerker.",
  },
};

const faqs = [
  {
    q: "We hebben geen tijd voor een training.",
    a: "Daarom is alles online en in eigen tempo. 2 tot 3 uur, wanneer het je mensen uitkomt. Geen klassikale sessies, geen planning.",
  },
  {
    q: "We zijn maar een klein team.",
    a: "Geen probleem. Je boekt per seat, ook voor een handvol mensen.",
  },
  {
    q: "We zijn juist een groot team.",
    a: "Ook goed. Van 1 tot meer dan 1000 seats, met een dashboard om de voortgang te volgen. Bij 50+ krijg je de leadership masterclass er gratis bij.",
  },
  {
    q: "Telt dit echt bij een audit?",
    a: "Ja. Elke deelnemer krijgt een certificaat op naam, digitaal ondertekend en audit-proof.",
  },
  {
    q: "Wat kost het?",
    a: "Vanaf 249 euro per medewerker, ex btw. Vraag een offerte aan voor je team.",
  },
  {
    q: "Kunnen we eerst even sparren?",
    a: "Zeker. Vraag een offerte aan of plan een gesprek, dan bellen we je binnen 1 werkdag.",
  },
  {
    q: "Hoe snel kan het team starten?",
    a: "Direct na aanmelding. Alles staat online klaar.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "AI Geletterdheid Academy",
      url: "https://aigeletterdheid.academy",
      description:
        "AIGA is de AI Geletterdheid Academy, gebouwd door het Brand Humanizing Institute samen met Speakers Academy.",
    },
    {
      "@type": "Course",
      name: "AI-geletterdheid training (EU AI Act)",
      description:
        "Online AI-geletterdheid training in lijn met Artikel 4 van de EU AI Act. Met examen en AI Literacy Practitioner-certificaat op naam.",
      provider: {
        "@type": "Organization",
        name: "AI Geletterdheid Academy",
        url: "https://aigeletterdheid.academy",
      },
      offers: {
        "@type": "Offer",
        price: "249",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://aigeletterdheid.academy/ai-act-training",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT2H30M",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function AiActTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section className="pt-16 pb-16 px-4">
          <div className="max-w-3xl mx-auto">

            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
              EU AI Act · Artikel 4 · Handhaving vanaf 2 augustus 2026
            </p>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight">
              Je hele team AI-geletterd.{" "}
              <span className="neon-text">Zonder je agenda om te gooien.</span>
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              De EU AI Act verplicht aantoonbare AI-geletterdheid voor iedereen die met AI werkt.
              Onze online training regelt dat. Zelfstandig te volgen in 2 tot 3 uur, met examen en
              certificaat op naam. Vanaf 249 euro per medewerker. Bij 50+ zetels een gratis
              leadership masterclass.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#gesprek"
                className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-semibold w-full sm:w-auto sm:self-start"
              >
                Vraag vrijblijvend een offerte aan
              </a>
              <p className="text-xs text-muted-foreground">
                We bellen je binnen 1 werkdag. Geen verplichting.
              </p>
              <Link
                href="/gereedheidscan"
                className="text-sm font-medium text-primary hover:underline"
              >
                Nog niet zeker? Doe de gratis AI Act-check. 10 vragen, 2 minuten.
              </Link>
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Nog
              </p>
              <CountdownClient />
              <p className="mt-2 text-xs text-muted-foreground">tot de handhaving start op 2 augustus 2026</p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-xl">
              Ontwikkeld door het Brand Humanizing Institute met Speakers Academy. Training uit de
              praktijk, voor organisaties als a.s.r., VodafoneZiggo en meerdere ministeries.
            </p>
          </div>
        </section>

        {/* ── PARTNER LOGO BAR ────────────────────────────────────────── */}
        <section className="py-6 px-4 border-y border-border bg-muted/40">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-4">
              Een samenwerking tussen
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <img
                src="/assets/brand-humanizing-logo.png"
                alt="Brand Humanizing Institute"
                className="rounded"
                style={{ height: "50px" }}
              />
              <img
                src="/assets/speakers-academy-logo.png"
                alt="Speakers Academy"
                className="rounded"
                style={{ height: "50px" }}
              />
            </div>
          </div>
        </section>

        {/* ── 2. WAAROM NU ────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
              De deadline is dichterbij dan je denkt
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              AI-geletterdheid is geen 2026-probleem. Artikel 4 van de AI Act geldt al since
              2 februari 2025. Vanaf 2 augustus 2026 start de actieve handhaving. De vraag is
              niet of je het regelt, maar of je het kunt aantonen als er iemand naar vraagt.
            </p>
            <ul className="space-y-4">
              {[
                "Het geldt voor je hele organisatie, niet alleen de techniek. Werkt iemand met ChatGPT, Copilot of AI in software? Dan valt het eronder.",
                "Aantoonbaar is het sleutelwoord. Een certificaat op naam is je bewijs bij een audit.",
                "De teams die het nu regelen, lopen straks voor. De teams die wachten, staan eind juli in de rij.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 3. BENEFITS ─────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
              Gemaakt voor teams die geen tijd hebben om stil te staan
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Geen agendadruk",
                  body: "Online en in eigen tempo. Geen klassikale sessies, geen roostergedoe. Je mensen volgen de training wanneer het uitkomt, in 2 tot 3 uur. Weinig tot geen druk op de agenda.",
                },
                {
                  title: "Voor kleine en grote teams",
                  body: "Per seat te boeken, van 1 tot meer dan 1000 medewerkers. Een voortgangsdashboard laat zien wie klaar is en wie nog niet.",
                },
                {
                  title: "Direct contact met de trainer",
                  body: "Geen anonieme e-learning waar je vragen in een leegte verdwijnen. Je hebt een echte expert aan de lijn, geen helpdesk.",
                },
                {
                  title: "Getraind door een van de meest geboekte AI-sprekers van Nederland",
                  body: "De training komt uit de praktijk van Ferry Hoes, die maandelijks op het podium staat voor organisaties als a.s.r., VodafoneZiggo en ministeries. Geen theorie uit een boekje, maar wat werkt op de werkvloer.",
                },
                {
                  title: "Examen en audit-proof certificaat",
                  body: "Elke deelnemer sluit af met een adaptief examen en ontvangt het AI Literacy Practitioner certificaat. Digitaal ondertekend, deelbaar via LinkedIn, geldig als bewijs bij een audit.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <Check size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HOE HET WERKT ────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
              In drie stappen aantoonbaar compliant
            </h2>
            <ol className="space-y-8 mb-10">
              {[
                {
                  n: "01",
                  title: "Vraag een offerte aan",
                  body: "We bellen je binnen 1 werkdag en stemmen af op je team en je sector.",
                },
                {
                  n: "02",
                  title: "Je team volgt de online training",
                  body: "In eigen tempo, 2 tot 3 uur, met praktijkcases en een afsluitend examen.",
                },
                {
                  n: "03",
                  title: "Iedereen is aantoonbaar compliant",
                  body: "Elke deelnemer ontvangt het certificaat. Jij hebt je bewijs op zak.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-5">
                  <span
                    className="font-display font-bold text-2xl neon-text shrink-0 w-10 text-right leading-tight"
                    aria-hidden
                  >
                    {n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="#gesprek"
              className="btn-neon inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-semibold"
            >
              Vraag vrijblijvend een offerte aan
            </a>
          </div>
        </section>

        {/* ── 5. WAT JE KRIJGT ────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
              Wat er in de training zit
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                "Online cursus met videolessen en praktijkcases",
                "EU AI Act in gewone taal, plus praktische AI-geletterdheid",
                "Adaptief afsluitend examen",
                "AI Literacy Practitioner certificaat op naam",
                "Voortgangsdashboard voor de hele organisatie",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-2xl font-display font-bold text-foreground">
              Vanaf 249 euro per medewerker (ex btw).
            </p>
            <p className="mt-2 text-muted-foreground">
              Bij 50+ zetels krijg je een gratis leadership masterclass voor je directie en managers.
            </p>
          </div>
        </section>

        {/* ── 6. DE TRAINER ───────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
              Je traint met een expert, niet met een cursus
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Achter de training staat Ferry Hoes. Hij werkt since 2017 op het snijvlak van AI en
              menselijk gedrag, won in 2020 de Anti-Discriminatie AI-Hackathon van de Nederlandse
              overheid, en staat meermaals per maand op het podium voor organisaties als a.s.r.,
              VodafoneZiggo en verschillende ministeries. Via Speakers Academy is hij een van de
              meest gevraagde AI-sprekers van Nederland. Bij AIGA train je niet met een anonieme
              cursus, maar met iemand die je ook echt kunt spreken.
            </p>
            {/* Testimonial slot — echt citaat van een echte klant invoegen als beschikbaar */}
          </div>
        </section>

        {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
              Veelgestelde vragen
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-background border border-border rounded-xl px-5"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground py-4 hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── 8. LAATSTE CTA + FORM ────────────────────────────────────── */}
        <section id="gesprek" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              De handhaving start op 2 augustus 2026
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Zorg dat je team op tijd, en aantoonbaar, compliant is.
            </p>

            <LeadFormClient />

            <div className="mt-6 space-y-3">
              <p className="text-xs text-muted-foreground">
                We bellen je binnen 1 werkdag. Geen verplichting.
              </p>
              <p className="text-sm text-muted-foreground">
                Of doe eerst de gratis AI Act-check.{" "}
                <Link href="/gereedheidscan" className="text-primary hover:underline font-medium">
                  10 vragen, 2 minuten.
                </Link>
              </p>
              <div className="pt-4">
                <CountdownClient />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span>Robbert &amp; Tom | Speakers Academy</span>
              <a href="tel:+31103167827" className="text-primary hover:underline">+31 (0)10 316 7827</a>
              <a href="mailto:robbert@speakersacademy.nl" className="text-primary hover:underline">robbert@speakersacademy.nl</a>
              <a href="mailto:tom@speakersacademy.nl" className="text-primary hover:underline">tom@speakersacademy.nl</a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="border-t border-border py-8 px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Brand Humanizing Institute &amp; Speakers Academy</span>
            <Link href="/privacyverklaring" className="hover:text-foreground transition-colors">
              Privacyverklaring
            </Link>
            <Link href="/kenniscentrum" className="hover:text-foreground transition-colors">
              Kenniscentrum
            </Link>
            <a href="mailto:robbert@speakersacademy.nl" className="hover:text-foreground transition-colors">
              robbert@speakersacademy.nl
            </a>
            <a href="mailto:tom@speakersacademy.nl" className="hover:text-foreground transition-colors">
              tom@speakersacademy.nl
            </a>
            <a href="tel:+31103167827" className="hover:text-foreground transition-colors">
              +31 (0)10 316 7827
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}
