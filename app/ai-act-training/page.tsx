import type { Metadata } from "next";
import Link from "next/link";
import { Award, Play, Users, Check } from "lucide-react";
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
    "Maak je team aantoonbaar AI-geletterd voor de EU AI Act deadline van 2 augustus 2026. Online training met examen en certificaat. Gratis Team AI Audit. EUR 249 per medewerker.",
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
    a: "Voor elke organisatie waarvan medewerkers met AI werken. Niet alleen de techniek, de hele organisatie. Ook als je alleen ChatGPT of Microsoft Copilot gebruikt.",
  },
  {
    q: "Wat houdt de training in?",
    a: "Een online cursus over de EU AI Act en AI-geletterdheid, met een adaptief examen en een AI Literacy Practitioner-certificaat op naam. Volledig online, in eigen tempo.",
  },
  {
    q: "Wat kost het?",
    a: "EUR 249 per medewerker. Bij 50+ zetels krijg je een gratis leadership masterclass erbij.",
  },
  {
    q: "Hoe snel kan mijn team starten?",
    a: "Direct na boeking. De cursus is online en in eigen tempo te volgen. Gemiddeld 2,5 uur per deelnemer.",
  },
  {
    q: "Wat is het verschil tussen de scan en de training?",
    a: "De gratis Team AI Audit laat zien waar je team nu staat. De training zorgt dat medewerkers gecertificeerd zijn en dat je dat bij een audit kunt aantonen.",
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
        <section className="pt-16 pb-20 px-4">
          <div className="max-w-3xl mx-auto">

            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
              EU AI Act · Artikel 4 · Deadline 2 augustus 2026
            </p>

            {/* Pull quote from the actual regulation */}
            <blockquote className="border-l-2 border-neon-purple/60 pl-5 mb-8">
              <p className="text-muted-foreground text-base italic leading-relaxed">
                "Deployers of AI systems shall take measures to ensure, to their best
                extent, a sufficient level of AI literacy of their staff."
              </p>
              <footer className="mt-2 text-xs text-muted-foreground/60 not-italic">
                EU AI Act, Artikel 4 &mdash; van kracht
              </footer>
            </blockquote>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight">
              Je team compliant.{" "}
              <span className="neon-text">En een stap voor.</span>
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Vanaf 2 augustus 2026 moet je aantonen dat je mensen AI-geletterd
              zijn. Met bewijs. De organisaties die dit nu regelen, werken straks
              sneller met AI, lopen minder risico, en staan sterk bij een audit.
              Wij regelen de training: online, met examen en certificaat, zonder
              maandenlange consultant.
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                De klok tikt:
              </p>
              <CountdownClient />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/gereedheidscan"
                className="btn-neon px-7 py-3.5 rounded-lg text-sm font-semibold"
              >
                Doe de gratis Team AI Audit
              </Link>
              <a href="#gesprek" className="text-sm font-medium text-primary hover:underline">
                Of plan een gesprek →
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Audit: gratis · 2 minuten · direct resultaat
            </p>
          </div>
        </section>

        {/* ── 2. PARTNER TRUST BAR ───────────────────────────────────── */}
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
            {/* TODO: Add real client/partner logos here when supplied */}
          </div>
        </section>

        {/* ── 3. OUTCOME CARDS ────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
              Wat je ermee wint
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Compliance is het minimum. Wat je er echt uithaalt, is meer.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  Icon: Award,
                  title: "Audit-proof",
                  body: "Elk certificaat is digitaal ondertekend. Als de Autoriteit Persoonsgegevens klopt, heb je het bewijs klaarliggen.",
                },
                {
                  Icon: Users,
                  title: "Concurrentievoordeel",
                  body: "Teams die nu handelen, werken straks vrijuiter met AI. Geen rem op gebruik, geen twijfel over risico's.",
                },
                {
                  Icon: Play,
                  title: "Snel geregeld",
                  body: "Online, in eigen tempo, gemiddeld 2,5 uur per medewerker. Geen roosterproblemen, geen dagenlange offsite.",
                },
              ].map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="neon-card-top bg-card border border-border rounded-xl p-6"
                >
                  <Icon size={22} className="text-primary mb-4" aria-hidden />
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. STAKES ───────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
              Wat de AI Act van je vraagt
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              De wet is helder. De verplichting geldt voor iedereen die AI
              gebruikt, niet alleen voor technici.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Je hele organisatie valt onder de verplichting, niet alleen de IT-afdeling.",
                "Je moet kunnen aantonen dat medewerkers getraind zijn. Een certificaat is dat bewijs.",
                "De deadline is hard: 2 augustus 2026. Daarna start handhaving.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p>
              <Link
                href="/kenniscentrum"
                className="text-sm font-medium text-primary underline hover:no-underline"
              >
                Lees de details in het Kenniscentrum
              </Link>
            </p>
          </div>
        </section>

        {/* ── 5. HOE HET WERKT ────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
              Van nulmeting naar certificaat
            </h2>
            <ol className="space-y-8">
              {[
                {
                  n: "01",
                  title: "Doe de gratis Team AI Audit",
                  body: "2 minuten. Je ziet direct waar je team staat en wat de grootste gaps zijn.",
                },
                {
                  n: "02",
                  title: "Bespreek de uitslag met ons",
                  body: "We kijken samen naar je resultaat en de snelste route naar compliant. Vrijblijvend.",
                },
                {
                  n: "03",
                  title: "Team gecertificeerd, bewijs op zak",
                  body: "Medewerkers volgen de online training in eigen tempo. Na het examen krijgen ze het AI Literacy Practitioner-certificaat. Audit-proof.",
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

            <div className="mt-10 pt-8 border-t border-border">
              <Link href="/gereedheidscan" className="text-sm font-semibold text-primary hover:underline">
                Start met de gratis Team AI Audit →
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">Gratis · 2 minuten · geen account nodig</p>
            </div>
          </div>
        </section>

        {/* ── 6. TRAINING + PRICING ───────────────────────────────────── */}
        <section className="py-20 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
              Wat je team krijgt
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                "Online cursus: EU AI Act basis en AI-geletterdheid",
                "Adaptief examen op naam",
                "AI Literacy Practitioner-certificaat, digitaal ondertekend",
                "Voortgangsdashboard voor leidinggevenden",
                "Bij 50+ zetels: gratis leadership masterclass",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-2xl font-display font-bold text-foreground">
              EUR 249 per medewerker.
            </p>
            <p className="mt-2 text-muted-foreground">
              Geen abonnement. Geen verborgen kosten. Per seat.
            </p>
          </div>
        </section>

        {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
              Veelgestelde vragen
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-5"
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

        {/* ── 8. GESPREK FORM ──────────────────────────────────────────── */}
        <section id="gesprek" className="py-20 px-4 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Left: context */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                  Laten we praten.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Vul het formulier in. We nemen snel contact met je op om je
                  situatie door te nemen en te kijken wat de snelste route naar
                  compliant is voor jouw team.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-foreground font-semibold">Direct contact</p>
                  <p className="text-sm text-muted-foreground">Robbert &amp; Tom | Speakers Academy</p>
                  <a
                    href="tel:+31103167827"
                    className="block text-sm text-primary hover:underline"
                  >
                    +31 (0)10 316 7827
                  </a>
                  <a
                    href="mailto:robbert@speakersacademy.nl"
                    className="block text-sm text-primary hover:underline"
                  >
                    robbert@speakersacademy.nl
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Nog niet zeker?</p>
                  <Link
                    href="/gereedheidscan"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Doe eerst de gratis Team AI Audit →
                  </Link>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <LeadFormClient />
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER LINKS ─────────────────────────────────────────────── */}
        <footer className="border-t border-border py-8 px-4">
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
            <span>Training door Brand Humanizing Institute &amp; Speakers Academy</span>
          </div>
        </footer>

      </div>
    </>
  );
}
