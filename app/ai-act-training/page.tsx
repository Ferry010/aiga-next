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
  title: "EU AI Act training — Team compliant voor 2 augustus 2026 | AIGA",
  description:
    "Maak je team aantoonbaar AI-geletterd voor de EU AI Act deadline van 2 augustus 2026. Online training met examen en certificaat op naam. Gratis Team AI Audit. EUR 249 per medewerker.",
  alternates: {
    canonical: "https://aigeletterdheid.academy/ai-act-training",
  },
  openGraph: {
    title: "EU AI Act training — Team compliant voor 2 augustus 2026 | AIGA",
    description:
      "Gratis Team AI Audit + online training met examen en certificaat. EUR 249 per medewerker. Deadline 2 augustus 2026.",
    url: "https://aigeletterdheid.academy/ai-act-training",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "EU AI Act training — Team compliant voor 2 augustus 2026 | AIGA",
    description:
      "Gratis Team AI Audit + online training met examen en certificaat. EUR 249 per medewerker.",
  },
};

const faqs = [
  {
    q: "Voor wie geldt de AI Act-verplichting?",
    a: "Voor elke organisatie waarvan medewerkers met AI werken. Niet alleen de techniek, de hele organisatie.",
  },
  {
    q: "Wat houdt de training in?",
    a: "Een online cursus over de EU AI Act en AI-geletterdheid, met een examen en een certificaat op naam.",
  },
  {
    q: "Wat kost het?",
    a: "EUR 249 per medewerker. Bij 50+ zetels krijg je een gratis leadership masterclass.",
  },
  {
    q: "Hoe snel kan mijn team starten?",
    a: "Direct. De cursus is online en in eigen tempo te volgen.",
  },
  {
    q: "Ik twijfel nog. Wat nu?",
    a: "Doe de gratis Team AI Audit en zie waar je team staat. Of plan een vrijblijvend gesprek.",
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
        <section className="pt-12 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              EU AI Act · Artikel 4 · Deadline 2 augustus 2026
            </p>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight">
              Je team AI-geletterd en compliant.{" "}
              <span className="neon-text">Voor 2 augustus.</span>
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Vanaf 2 augustus 2026 eist de EU AI Act dat je team aantoonbaar
              AI-geletterd is. Met examen en certificaat. Wij regelen de training.
              Online, snel, zonder maandenlange consultant.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gereedheidscan"
                className="btn-neon px-7 py-3.5 rounded-lg text-sm font-semibold"
              >
                Doe de gratis Team AI Audit
              </Link>
              <a
                href="#gesprek"
                className="btn-neon-outline px-7 py-3.5 rounded-lg text-sm font-semibold border-2"
              >
                Of plan direct een gesprek
              </a>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Gratis · 2 minuten · direct je resultaat
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                De klok tikt:
              </p>
              <CountdownClient />
            </div>
          </div>
        </section>

        {/* ── 2. TRUST LINE ───────────────────────────────────────────── */}
        <section className="py-6 px-4 border-y border-border bg-card">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground text-center">
              Training ontwikkeld door het{" "}
              <strong className="text-foreground">Brand Humanizing Institute</strong>,
              in samenwerking met{" "}
              <strong className="text-foreground">Speakers Academy</strong>.
            </p>
            {/* TODO: Add real client logos here when supplied */}
            {/* <div className="flex flex-wrap justify-center gap-8 mt-6 opacity-50"> ... </div> */}
          </div>
        </section>

        {/* ── 3. WAT DE AI ACT VAN JE TEAM EIST ──────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Wat de AI Act van je team eist
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              De EU AI Act is geen toekomstmuziek. Vanaf 2 augustus 2026 moet iedereen
              die met AI werkt aantoonbaar AI-geletterd zijn. Niet "we doen iets met
              AI". Aantoonbaar, met bewijs.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Het geldt voor je hele organisatie, niet alleen voor de techniek.",
                "Je moet kunnen aantonen dat je mensen getraind zijn. Een certificaat is dat bewijs.",
                "De deadline is hard. 2 augustus 2026.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/kenniscentrum"
                className="text-sm font-medium text-primary underline hover:no-underline"
              >
                Lees de details in het Kenniscentrum
              </Link>
            </p>
          </div>
        </section>

        {/* ── 4. ZO WERKT HET ─────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
              Zo werkt het
            </h2>
            <ol className="space-y-8">
              {[
                {
                  n: "01",
                  title: "Doe de gratis Team AI Audit",
                  body: "2 minuten. Je ziet direct waar je team staat.",
                },
                {
                  n: "02",
                  title: "Je krijgt je resultaat op een eigen pagina",
                  body: "Bewaar hem of deel hem met je team.",
                },
                {
                  n: "03",
                  title: "We bellen je binnen 1 werkdag",
                  body: "Een van onze mensen neemt je gap door en de snelste route naar compliant.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-5">
                  <span
                    className="font-display font-bold text-2xl neon-text shrink-0 w-10 text-right leading-tight"
                    aria-hidden="true"
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
            <div className="mt-10">
              <Link
                href="/gereedheidscan"
                className="btn-neon inline-block px-7 py-3.5 rounded-lg text-sm font-semibold"
              >
                Doe de gratis Team AI Audit
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. DE TRAINING ──────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
              Wat je team krijgt
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                "Online cursus, EU AI Act basis en AI-geletterdheid",
                "Examen",
                "Certificaat op naam",
                "Bij 50+ zetels: een gratis leadership masterclass",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-display font-bold text-foreground">
              EUR 249 per medewerker.
            </p>
            <p className="mt-2 text-muted-foreground">
              Geen maandenlange consultant. Online, in je eigen tempo, met bewijs op
              zak.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gereedheidscan"
                className="btn-neon px-7 py-3.5 rounded-lg text-sm font-semibold"
              >
                Doe de gratis Team AI Audit
              </Link>
              <a
                href="#gesprek"
                className="btn-neon-outline px-7 py-3.5 rounded-lg text-sm font-semibold border-2"
              >
                Plan een gesprek
              </a>
            </div>
          </div>
        </section>

        {/* ── 6. WAAROM NU ────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
              Waarom nu
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              De teams die dit nu regelen, lopen straks voor. Minder risico, sneller
              met AI aan de slag, en klaar als de deadline valt. De teams die wachten,
              staan eind juli in de rij.
            </p>
          </div>
        </section>

        {/* ── 7. OVER AIGA ─────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
              Over AIGA
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AIGA is de AI Geletterdheid Academy. Gebouwd door het Brand Humanizing
              Institute, samen met Speakers Academy. We maken complexe AI-regels
              begrijpelijk en behapbaar, zodat je team niet alleen voldoet aan de wet,
              maar ook beter met AI werkt.
            </p>
          </div>
        </section>

        {/* ── 8. FAQ ───────────────────────────────────────────────────── */}
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

        {/* ── 9. FINAL CTA + GESPREK FORM ─────────────────────────────── */}
        <section id="gesprek" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                De klok tikt. Zorg dat je team op tijd compliant is.
              </h2>
              <div className="flex justify-center mt-6 mb-8">
                <CountdownClient />
              </div>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <Link
                  href="/gereedheidscan"
                  className="btn-neon px-7 py-3.5 rounded-lg text-sm font-semibold"
                >
                  Doe de gratis Team AI Audit
                </Link>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">
                Of plan direct een vrijblijvend gesprek
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Laat je gegevens achter, dan bellen we je binnen 1 werkdag.
              </p>
            </div>

            <LeadFormClient source="gesprek" />

            {/* TODO: PHONE — add click-to-call element once number is confirmed */}
            {/* <a href="tel:+31XXXXXXXXX" className="...">Bel direct: +31 X XXX XX XX</a> */}
          </div>
        </section>

        {/* ── 10. FOOTER LINKS ─────────────────────────────────────────── */}
        <footer className="border-t border-border py-10 px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacyverklaring" className="hover:text-foreground transition-colors">
              Privacyverklaring
            </Link>
            <Link href="/kenniscentrum" className="hover:text-foreground transition-colors">
              Kenniscentrum
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <span>
              Training door Brand Humanizing Institute &amp; Speakers Academy
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
