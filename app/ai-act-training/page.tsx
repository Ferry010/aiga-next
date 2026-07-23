import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, TrendingUp, Shield } from "lucide-react";
import LeadFormClient from "./LeadFormClient";
import CountdownClient from "./CountdownClient";

export const metadata: Metadata = {
  title: "AI Act training voor je team | Online, met certificaat | AIGA",
  description:
    "De AI Act is versoepeld, niet afgeschaft. Ondersteuning van AI-geletterdheid blijft verplicht en toezichthouders kunnen handhaven per 2 augustus 2026. Online training, certificaat op naam. Vanaf €249 per persoon.",
  alternates: {
    canonical: "https://aigeletterdheid.academy/ai-act-training",
  },
  openGraph: {
    title: "AI Act training voor je team | Online, met certificaat | AIGA",
    description:
      "De AI Act is versoepeld, niet afgeschaft. Online training voor AI-geletterdheid, certificaat op naam, handhaving vanaf 2 augustus 2026. Vanaf 249 euro per medewerker.",
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

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-24 px-4 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% -5%, hsl(263 70% 58% / 0.12) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="max-w-3xl mx-auto relative">
            <p className="text-sm font-semibold neon-text mb-5 tracking-wide">
              Online · Certificaat op naam · Vanaf €249 p.p.
            </p>

            {/* Hero copy: switch sub after 2 augustus 2026 */}
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
              De AI Act is versoepeld.<br />
              <span className="neon-text">Niet afgeschaft.</span>
            </h1>

            {/* Before 2 augustus 2026 */}
            <p className="mt-7 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Vanaf 2 augustus 2026 kunnen Nederlandse toezichthouders handhaven op
              AI-geletterdheid. Wij leggen uit wat er écht veranderd is, en regelen dat je het
              kunt aantonen. Online, op eigen tempo, met certificaat op naam.
            </p>
            {/* From 2 augustus 2026: change above to: "Sinds 2 augustus 2026 kunnen Nederlandse
                toezichthouders handhaven op AI-geletterdheid..." */}

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="#gesprek"
                className="btn-neon inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold"
              >
                Vraag een offerte aan →
              </a>
              <Link
                href="/gereedheidscan"
                className="inline-flex items-center px-8 py-4 rounded-xl border border-border text-sm font-medium text-foreground hover:border-neon-purple/50 transition-colors"
              >
                Doe de gratis AI-check
              </Link>
            </div>

            <div className="mt-12">
              <CountdownClient />
              <p className="mt-2 text-xs text-muted-foreground">
                tot toezichthouders kunnen handhaven op 2 augustus 2026
              </p>
            </div>

            <p className="mt-10 text-sm text-muted-foreground max-w-lg">
              Ontwikkeld door het Brand Humanizing Institute &amp; Speakers Academy. Ingezet bij
              a.s.r., VodafoneZiggo en meerdere ministeries.
            </p>
          </div>
        </section>

        {/* ── LOGO BAR ─────────────────────────────────────────────────── */}
        <section className="py-6 px-4 border-y border-border bg-muted/40">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-xs text-muted-foreground mb-5">
              Training gevolgd door medewerkers bij
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <img
                src="/assets/brand-humanizing-logo.png"
                alt="Brand Humanizing Institute"
                className="rounded opacity-70"
                style={{ height: "40px" }}
              />
              <img
                src="/assets/speakers-academy-logo.png"
                alt="Speakers Academy"
                className="rounded opacity-70"
                style={{ height: "40px" }}
              />
              {["a.s.r.", "VodafoneZiggo", "Rijksoverheid"].map((name) => (
                <span key={name} className="text-sm font-semibold text-muted-foreground/50 tracking-wide">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── DE UITKOMST ──────────────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              Stel je voor: elk teamlid weet hoe AI <em>écht</em> werkt.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-14 max-w-2xl">
              Geen vage chatbot-trucs. Kennis die werkt op de werkvloer. Jouw mensen worden
              degenen op wie anderen terugvallen als AI-vragen opkomen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  Icon: Zap,
                  title: "Sneller & beter werk",
                  body: "Prompts die meteen resultaat geven. Taken die eerder klaar zijn. Betere output zonder extra uren.",
                },
                {
                  Icon: TrendingUp,
                  title: "Voorsprong in de markt",
                  body: "AI-vaardigheid wordt de onderscheidende factor. Jouw team heeft die kennis. De rest loopt in.",
                },
                {
                  Icon: Shield,
                  title: "Veilig & gecertificeerd",
                  body: "Medewerkers weten hoe ze veilig met bedrijfsdata omgaan. Certificaat op naam als bewijs.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="neon-card-top bg-card border border-border rounded-xl p-6">
                  <Icon size={22} className="text-neon-purple mb-4" aria-hidden />
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TWEE REDENEN ─────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-14 leading-tight">
              Twee redenen om dit nú te regelen.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-1.5">
                  <TrendingUp size={13} className="text-neon-purple" aria-hidden />
                  <span className="text-xs font-semibold text-foreground">Omdat je wil winnen</span>
                </div>
                <p className="text-foreground leading-relaxed">
                  AI verandert hoe werk gedaan wordt — nu, niet straks. De kloof tussen teams
                  die AI écht begrijpen en teams die ermee aanmodderen, groeit elke maand.
                  Jouw mensen verdienen die voorsprong.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Betere output in minder tijd",
                    "De skills die recruiters al zoeken",
                    "Zelfvertrouwen om AI slim in te zetten",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check size={14} className="shrink-0 text-neon-purple" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-1.5">
                  <Shield size={13} className="text-neon-pink" aria-hidden />
                  <span className="text-xs font-semibold text-foreground">Omdat de wet het verplicht</span>
                </div>
                <p className="text-foreground leading-relaxed">
                  Artikel 4 van de EU AI Act verplicht organisaties om de ontwikkeling van
                  AI-geletterdheid te ondersteunen bij medewerkers die met AI werken. Na de
                  Digital Omnibus (juni 2026) is het een inspanningsverplichting. Vanaf
                  2 augustus 2026 kunnen toezichthouders handhaven. Elke deelnemer ontvangt
                  een certificaat op naam als controleerbaar bewijs.
                </p>
                <div>
                  <CountdownClient />
                  <p className="mt-1.5 text-xs text-muted-foreground">tot 2 augustus 2026</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── DE TRAINER ───────────────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 items-center">

              <div className="order-2 sm:order-1">
                <p className="text-sm font-semibold neon-text mb-4 tracking-wide uppercase">
                  De trainer
                </p>
                <h2 className="text-3xl font-display font-bold text-foreground mb-5 leading-tight">
                  Je traint niet met een cursus.<br />Je traint met een expert.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Ferry Hoes werkt sinds 2017 op het snijvlak van AI en menselijk gedrag. Via
                  Speakers Academy is hij een van de meest gevraagde AI-sprekers van
                  Nederland — maandelijks op het podium voor a.s.r., VodafoneZiggo en
                  ministeries. Hij won in 2020 de Anti-Discriminatie AI-Hackathon van de
                  Nederlandse overheid.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Bij AIGA train je niet met een anonieme e-learning. Je traint met iemand
                  die je ook echt kunt spreken.
                </p>
                <figure className="border-l-2 border-neon-purple/40 pl-5">
                  <blockquote className="text-muted-foreground italic leading-relaxed text-sm">
                    "Ferry heeft de gave om ingewikkelde theorie op een toegankelijke manier
                    uit te leggen. Zelfs deelnemers zonder enige AI-ervaring kwamen verrast
                    en zeer enthousiast de sessie uit."
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-muted-foreground/60 not-italic">
                    Maud — Chubb Fire &amp; Security
                  </figcaption>
                </figure>
              </div>

              <div className="order-1 sm:order-2 flex justify-center">
                <img
                  src="/assets/ferry-hoes.gif"
                  alt="Ferry Hoes — AI-trainer en spreker"
                  className="rounded-2xl w-full max-w-xs object-cover shadow-lg"
                  style={{ aspectRatio: "4/5", objectPosition: "top" }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── HOE HET WERKT ────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-card border-y border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-14">
              Zo werkt het
            </h2>
            <ol className="space-y-10 mb-12">
              {[
                {
                  n: "01",
                  title: "Vraag een offerte aan",
                  body: "We nemen snel contact op, bespreken hoeveel mensen je wil trainen en sturen een voorstel op maat. Geen verplichtingen.",
                },
                {
                  n: "02",
                  title: "Je team start direct online",
                  body: "Elke medewerker volgt de training op eigen tempo: 2 tot 3 uur, volledig online, met videolessen en praktijkcases uit de echte wereld.",
                },
                {
                  n: "03",
                  title: "Iedereen AI-vaardig — met bewijs",
                  body: "Na het afsluitende examen ontvangt elke deelnemer het AI Literacy Practitioner certificaat op naam. Audit-proof, deelbaar via LinkedIn.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-6">
                  <span
                    className="font-display font-bold text-3xl neon-text shrink-0 w-12 text-right leading-tight"
                    aria-hidden
                  >
                    {n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="#gesprek"
              className="btn-neon inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold"
            >
              Vraag een offerte aan →
            </a>
          </div>
        </section>

        {/* ── PRIJS ────────────────────────────────────────────────────── */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="neon-border-lg">
              <div className="neon-inner p-10 rounded-[calc(1rem-2px)]">
                <p className="text-sm font-semibold neon-text mb-3 tracking-wide uppercase">Prijs</p>
                <p className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-1">
                  Vanaf €249
                </p>
                <p className="text-muted-foreground mb-8">per persoon (ex btw) · per seat te boeken van 1 tot 1000+</p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Online cursus met videolessen en praktijkcases",
                    "De EU AI Act in gewone taal — precies wat je nodig hebt",
                    "Adaptief afsluitend examen",
                    "AI Literacy Practitioner certificaat op naam",
                    "Voortgangsdashboard voor je hele organisatie",
                    "Direct contact met de trainer",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                      <Check size={16} className="shrink-0 text-neon-purple" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Bij 50+ zetels: gratis leadership masterclass voor directie en managers.
                  </p>
                  <a
                    href="#gesprek"
                    className="btn-neon inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap"
                  >
                    Vraag een offerte aan →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA + FORM ───────────────────────────────────────────────── */}
        <section id="gesprek" className="py-24 px-4 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold neon-text mb-4 tracking-wide uppercase">
              Aan de slag
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              Vraag een offerte aan.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Laat je gegevens achter. We nemen contact op, bespreken hoeveel mensen je wil
              trainen en sturen een voorstel op maat. Geen verplichtingen, wel snel antwoord.
            </p>

            <LeadFormClient />

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                Liever eerst vragen?{" "}
                <Link href="/gereedheidscan" className="text-primary hover:underline font-medium">
                  Doe de gratis AI-check — 10 vragen, 2 minuten.
                </Link>
              </p>
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
