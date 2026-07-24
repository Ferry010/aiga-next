'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

const questions = [
  { q: "Hoeveel medewerkers in jouw organisatie gebruiken AI-tools zoals ChatGPT, Copilot of vergelijkbare software?", options: ["Niemand, voor zover ik weet", "Een handvol early adopters", "Een significant deel van de teams", "De meeste medewerkers, dagelijks"] },
  { q: "Heeft jouw organisatie een beleid of richtlijn voor verantwoord AI-gebruik?", options: ["Nee, dat bestaat niet bij ons", "Er zijn informele afspraken maar niets op papier", "We hebben iets, maar het is niet actueel", "Ja, een formeel beleid dat actief wordt gebruikt"] },
  { q: "Weten jouw medewerkers wat de EU AI Act inhoudt en wat die van hen vraagt?", options: ["Nee, de meesten hebben er nog nooit van gehoord", "Enkelen hebben erover gelezen maar er is geen bewustzijn", "Het management weet het, de werkvloer nog niet", "Ja, er is breed bewustzijn en we zijn al bezig met compliance"] },
  { q: "Heeft jouw organisatie documentatie die bewijst dat medewerkers AI-geletterd zijn?", options: ["Nee, niets", "We hebben wat notities maar niets formeel", "Er zijn trainingen gevolgd maar geen formeel certificaat", "Ja, medewerkers zijn gecertificeerd via een erkend programma"] },
  { q: "Hoe worden AI-gerelateerde risico's (bias, datamisbruik, privacy) momenteel beheerd?", options: ["Dat wordt niet actief beheerd", "Incidenteel, als er iets misgaat", "Er zijn richtlijnen maar geen actieve monitoring", "Er is een actief risicobeheer met duidelijke verantwoordelijken"] },
  { q: "Zijn leidinggevenden in staat om AI-gebruik van hun team te beoordelen en te sturen?", options: ["Nee, ze weten zelf ook weinig van AI", "Ze begrijpen de basis maar missen diepgang", "De meesten wel, maar het is inconsistent", "Ja, leidinggevenden hebben voldoende kennis en kaders"] },
  { q: "Hoe urgent is AI Act-compliance voor jouw organisatie op dit moment?", options: ["We hebben er nog niet serieus over nagedacht", "We weten dat het moet maar hebben geen plan", "We zijn er mee bezig maar lopen achter", "We zijn goed op weg en hebben een duidelijk plan"] },
  { q: "Heeft jouw organisatie een AI-verantwoordelijke of intern aanspreekpunt voor AI-beleid?", options: ["Nee", "Iemand doet het erbij maar het is niet officieel", "Er is iemand aangewezen maar zonder budget of mandaat", "Ja, er is een dedicated verantwoordelijke met mandaat"] },
  { q: "Hoe worden nieuwe medewerkers geintroduceerd op het gebied van AI-gebruik en AI-risico's?", options: ["Dat gebeurt niet", "Via informele kennisoverdracht van collega's", "Er is een onboarding module maar die is niet up-to-date", "Via een formeel en actueel AI-onboardingprogramma"] },
  { q: "Stel: er is morgen een audit op AI-geletterdheid. Hoe sta je ervoor?", options: ["Slecht. We kunnen niets aantonen.", "Matig. We hebben wel iets maar het is niet overtuigend.", "Redelijk. We zijn bezig maar nog niet compliant.", "Goed. We kunnen aantonen dat ons team gecertificeerd is."] },
];

const dimensions = [
  { label: "AI-gebruik", indices: [0, 1] },
  { label: "Bewustzijn & wetgeving", indices: [2, 3] },
  { label: "Risicobeheer", indices: [4, 5] },
  { label: "Leiderschap & urgentie", indices: [6, 7] },
  { label: "Onboarding & audit-readiness", indices: [8, 9] },
];

interface TierData {
  minPct: number;
  maxPct: number;
  badge: string;
  color: string;
  heading: string;
  body: string;
  textLink: { label: string; to: string };
}

const tiers: TierData[] = [
  {
    minPct: 0, maxPct: 40,
    badge: "NIET GEREED", color: "hsl(0, 84%, 60%)",
    heading: "Jullie organisatie is nog niet gereed",
    body: "Jullie gebruiken waarschijnlijk al AI-tools, maar zonder gedeelde kennis of spelregels. Dat maakt jullie kwetsbaar bij een audit.",
    textLink: { label: "Of bekijk direct onze trainingen voor teams →", to: "/training" },
  },
  {
    minPct: 41, maxPct: 70,
    badge: "GEDEELTELIJK GEREED", color: "hsl(38, 92%, 50%)",
    heading: "Jullie zijn op de goede weg, maar er zijn blinde vlekken",
    body: "Een deel van je team begrijpt AI goed. Maar zonder gedeelde basis werkt niet iedereen vanuit dezelfde kennis.",
    textLink: { label: "Bekijk onze e-learning met EU AI Act-certificering →", to: "/training" },
  },
  {
    minPct: 71, maxPct: 100,
    badge: "VOORLOPER", color: "hsl(160, 84%, 39%)",
    heading: "Jullie lopen voor op de meeste organisaties",
    body: "Je team heeft een solide basis, en dat is zeldzamer dan je denkt. Dit is precies het moment om dat te formaliseren.",
    textLink: { label: "Bekijk onze e-learning met EU AI Act-certificering →", to: "/training" },
  },
];

type Phase = "intro" | "quiz" | "result";

export default function QuizClient() {
  const reduced = useReduceMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [formData, setFormData] = useState({ naam: "", email: "", bedrijf: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (current < 9) {
        setCurrent(current + 1);
      } else {
        setPhase("result");
      }
    }, 400);
  };

  const score = answers.reduce((sum, a) => sum + a, 0);
  const pct = Math.round((score / 30) * 100);
  const tier = tiers.find((t) => pct >= t.minPct && pct <= t.maxPct) || tiers[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    const dimensieScores: Record<string, number> = {};
    dimensions.forEach((d) => {
      const dim = d.indices.reduce((sum, i) => sum + (answers[i] || 0), 0);
      dimensieScores[d.label] = Math.round((dim / 6) * 100);
    });

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.naam,
          email: formData.email,
          bedrijf: formData.bedrijf,
          score: pct,
          score_category: tier.badge,
          dimension_scores: dimensieScores,
        }),
      });

      if (!res.ok) throw new Error("submission failed");

      const result = await res.json();
      const { id, score: s, score_category, dimension_scores } = result;
      const params = new URLSearchParams({
        n: formData.naam,
        s: String(s),
        c: score_category,
        d: btoa(JSON.stringify(dimension_scores)),
      });
      const url = `${window.location.origin}/gereedheidscan/resultaat/${id}?${params.toString()}`;
      setShareUrl(url);
    } catch {
      setSubmitError(true);
      setSubmitting(false);
    }
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
          <AnimatedSection>
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                EU AI Act is van kracht · Artikel 4 handhaving vanaf 2 augustus 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight">
              Jouw team gebruikt AI.<br />
              <span className="neon-text">Voldoe je ook aan de wet?</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Doe de gratis scan en ontdek in 3 minuten hoe jouw organisatie scoort op AI-compliance — met een persoonlijk actieplan in je inbox.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 rounded-lg text-[15px] font-semibold"
              >
                Start de gratis scan →
              </button>
              <p className="text-sm text-muted-foreground">10 vragen · 3 minuten · direct resultaat</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-8">
              {["Gratis, altijd", "Geen account nodig", "Persoonlijk rapport per e-mail"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="text-primary font-bold">✓</span> {t}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* ── Outcomes ── */}
        <div className="bg-card border-y border-border py-16">
          <div className="max-w-3xl mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                Dit weet je na de scan
              </h2>
              <p className="text-muted-foreground mb-8">Geen vage rapporten. Concrete inzichten voor jóuw organisatie.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "📊",
                    title: "Score op 5 dimensies",
                    body: "AI-gebruik, wetgeving, risicobeheer, leiderschap en audit-readiness — elk apart inzichtelijk.",
                  },
                  {
                    icon: "⚠️",
                    title: "Waar de grootste risico's zitten",
                    body: "Exact welke onderdelen van jouw organisatie blootgesteld zijn aan boetes of reputatieschade.",
                  },
                  {
                    icon: "🎯",
                    title: "Wat je als eerste aanpakt",
                    body: "Een heldere prioriteitenlijst zodat je vandaag kunt beginnen — zonder te gokken.",
                  },
                  {
                    icon: "📋",
                    title: "Of je een audit zou doorstaan",
                    body: "Een eerlijk antwoord op de vraag die elke manager en bestuurder wakker houdt.",
                  },
                ].map((item) => (
                  <div key={item.title} className="neon-card-top bg-background border border-border rounded-xl p-5">
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Mid CTA ── */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <AnimatedSection>
            <div className="rounded-2xl border border-neon-purple/30 bg-gradient-to-br from-neon-purple/5 to-neon-pink/5 p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                De meeste organisaties denken dat het wel meevalt.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Tot ze de scan doen. Ontdek in 3 minuten waar jij staat — en wat je moet doen om jezelf te beschermen.
              </p>
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 rounded-lg text-[15px]"
              >
                Doe de scan nu — gratis →
              </button>
              <p className="mt-3 text-xs text-muted-foreground">Geen creditcard. Geen account. Wel direct inzicht.</p>
            </div>
          </AnimatedSection>
        </div>

        {/* ── How it works ── */}
        <div className="bg-card border-t border-border py-16">
          <div className="max-w-3xl mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-10">
                Drie minuten. Eén helder antwoord.
              </h2>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Beantwoord 10 vragen",
                    body: "Eerlijke vragen over hoe jouw organisatie omgaat met AI, beleid en risico's. Duurt minder dan 3 minuten.",
                  },
                  {
                    step: "02",
                    title: "Zie direct je score",
                    body: "Direct na de laatste vraag zie je jouw resultaat: een score op 5 dimensies en je tier — van Niet Gereed tot Voorloper.",
                  },
                  {
                    step: "03",
                    title: "Ontvang je actieplan",
                    body: "Vul je e-mailadres in en ontvang een persoonlijk rapport met concrete aanbevelingen voor jouw situatie.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col gap-3">
                    <span className="neon-text text-4xl font-display font-bold leading-none">{s.step}</span>
                    <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
              Veelgestelde vragen
            </h2>
            <div className="divide-y divide-border">
              {[
                {
                  q: "Voor wie is deze scan bedoeld?",
                  a: "Voor iedereen die verantwoordelijkheid draagt voor mensen, beleid of compliance binnen een organisatie. Denk aan managers, HR-directeuren, compliance officers, bestuurders en ondernemers die willen weten hoe ze er echt voor staan.",
                },
                {
                  q: "Hoe lang duurt de scan?",
                  a: "Minder dan 3 minuten. Je beantwoordt 10 vragen en ziet daarna direct je resultaat — zonder wachten of aanmelden.",
                },
                {
                  q: "Is de scan echt gratis?",
                  a: "Ja. Geen creditcard, geen proefperiode, geen verborgen kosten. De scan is een service van AIGA om organisaties te helpen begrijpen waar ze staan.",
                },
                {
                  q: "Wat ontvang ik na de scan?",
                  a: "Direct na de laatste vraag zie je jouw score op 5 dimensies en de bijbehorende tier. Als je je naam en e-mailadres achterlaat, ontvang je een persoonlijk rapport met uitleg en concrete aanbevelingen per e-mail.",
                },
                {
                  q: "Wat is de EU AI Act en wat verandert er voor mij?",
                  a: "De EU AI Act is de Europese wetgeving die regelt hoe organisaties AI mogen gebruiken. Artikel 4 verplicht organisaties om de ontwikkeling van AI-geletterdheid te ondersteunen bij medewerkers die met AI werken. De plicht geldt al sinds 2 februari 2025. Vanaf 2 augustus 2026 kunnen toezichthouders handhaven. Artikel 4 kent geen eigen boete.",
                },
                {
                  q: "Wat als ik laag scoor?",
                  a: "Dan ben je in goed gezelschap — de meeste organisaties staan er niet zo goed voor als ze denken. Wat je wél hebt na de scan: inzicht. En inzicht is het begin van actie. In je rapport staat precies wat je als eerste moet doen.",
                },
                {
                  q: "Worden mijn gegevens gedeeld met derden?",
                  a: "Nee. Je gegevens worden alleen gebruikt om je rapport te sturen en om de kwaliteit van de scan te verbeteren. We delen niets met derden.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer gap-4 list-none font-semibold text-foreground">
                    {faq.q}
                    <span className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">↓</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Vandaag weten is beter dan<br />
              <span className="neon-text">morgen verrast worden</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              De EU AI Act wacht niet. Elk dag zonder inzicht is een dag meer risico. De scan is gratis en duurt 3 minuten.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="btn-neon px-10 py-4 rounded-lg text-base font-semibold"
            >
              Start de gratis scan →
            </button>
            <p className="mt-4 text-sm text-muted-foreground">10 vragen · 3 minuten · 0 euro</p>
          </AnimatedSection>
        </div>

      </div>
    );
  }

  if (phase === "quiz") {
    const q = questions[current];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground">
            <span>Vraag {current + 1} van 10</span>
            <div className="h-2 flex-1 mx-4 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(current / 10) * 100}%` }} />
            </div>
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-8">{q.q}</h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  selected === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/40 text-foreground"
                }`}
              >
                <span className="text-sm font-medium">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result phase
  const dimScores = dimensions.map((d) => ({
    label: d.label,
    score: Math.round((d.indices.reduce((sum, i) => sum + (answers[i] || 0), 0) / 6) * 100),
  }));

  const shareText = `Ik deed de AI Gereedheidscan van AIGA en scoorde ${pct}% — ${tier.badge}. Hoe scoort jouw organisatie?`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>

          {/* Form — shown until submitted */}
          {!shareUrl && (
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Je scan is klaar</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Laat je gegevens achter om je uitslag te bekijken en te bewaren.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {[
                  { name: "naam", label: "Naam", required: true },
                  { name: "email", label: "E-mailadres", required: true, type: "email" },
                  { name: "bedrijf", label: "Bedrijfsnaam", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-sm text-muted-foreground mb-1 block">{f.label}</label>
                    <input
                      type={f.type || "text"}
                      required={f.required}
                      value={formData[f.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-neon-purple transition-all"
                    />
                  </div>
                ))}
                {submitError && (
                  <p className="text-sm text-destructive">Er ging iets mis. Probeer het opnieuw.</p>
                )}
                <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg">
                  {submitting ? "Bezig..." : "Bekijk uitslag →"}
                </button>
              </form>
            </div>
          )}

          {/* Results — revealed after submit */}
          {shareUrl && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4" style={{ backgroundColor: tier.color }}>
                  {tier.badge}
                </span>
                <div className="text-7xl font-display font-bold text-foreground">{pct}%</div>
                <h2 className="text-2xl font-display font-semibold text-foreground mt-4">{tier.heading}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">{tier.body}</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Score per dimensie</h3>
                <div className="space-y-3">
                  {dimScores.map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{d.label}</span>
                        <span className="text-muted-foreground">{d.score}%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${d.score}%`, background: "linear-gradient(90deg,#9B3FF5,#E040C8)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/contact" className="btn-neon flex-1 text-center py-4 rounded-lg font-semibold text-sm">
                  Offerte aanvragen
                </Link>
                <Link href="/training" className="btn-neon-outline flex-1 text-center py-4 rounded-lg font-semibold text-sm">
                  Bekijk de training
                </Link>
              </div>

              {/* Sharing */}
              <div className="border-t border-border pt-6">
                <p className="text-sm font-semibold text-foreground mb-4">Deel jouw resultaat</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    {copied ? <><span className="text-primary">✓</span> Link gekopieerd</> : <><span>🔗</span> Kopieer link</>}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    <span>💬</span> WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    <span>💼</span> LinkedIn
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    <span>🖨️</span> Opslaan als PDF
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                <Link href={tier.textLink.to} className="text-primary hover:underline">
                  {tier.textLink.label}
                </Link>
              </p>
            </motion.div>
          )}

        </AnimatedSection>
      </div>
    </div>
  );
}
