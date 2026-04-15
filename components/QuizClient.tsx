'use client';
import { useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { createClient } from "@/lib/supabase/client";

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
  buttonLabel: string;
  textLink: { label: string; to: string };
}

const tiers: TierData[] = [
  {
    minPct: 0, maxPct: 40,
    badge: "NIET GEREED", color: "hsl(0, 84%, 60%)",
    heading: "Jullie organisatie is nog niet gereed",
    body: "Jullie gebruiken waarschijnlijk al AI-tools, maar zonder gedeelde kennis of spelregels. Dat maakt jullie kwetsbaar bij een audit.",
    buttonLabel: "Neem contact met mij op →",
    textLink: { label: "Of bekijk direct onze trainingen voor teams →", to: "/training" },
  },
  {
    minPct: 41, maxPct: 70,
    badge: "GEDEELTELIJK GEREED", color: "hsl(38, 92%, 50%)",
    heading: "Jullie zijn op de goede weg, maar er zijn blinde vlekken",
    body: "Een deel van je team begrijpt AI goed. Maar zonder gedeelde basis werkt niet iedereen vanuit dezelfde kennis.",
    buttonLabel: "Neem contact met mij op →",
    textLink: { label: "Bekijk onze e-learning met EU AI Act-certificering →", to: "/training" },
  },
  {
    minPct: 71, maxPct: 100,
    badge: "VOORLOPER", color: "hsl(160, 84%, 39%)",
    heading: "Jullie lopen voor op de meeste organisaties",
    body: "Je team heeft een solide basis, en dat is zeldzamer dan je denkt. Dit is precies het moment om dat te formaliseren.",
    buttonLabel: "Neem contact met mij op →",
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    const supabase = createClient();

    const dimensieScores: Record<string, number> = {};
    dimensions.forEach((d) => {
      const dim = d.indices.reduce((sum, i) => sum + (answers[i] || 0), 0);
      dimensieScores[d.label] = Math.round((dim / 6) * 100);
    });

    await supabase.from("risk_scan_submissions").insert({
      naam: formData.naam,
      email: formData.email,
      bedrijfsnaam: formData.bedrijf,
      totaal_score: pct,
      tier: tier.badge,
      dimensie_scores: dimensieScores,
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-24">
          <AnimatedSection>
            <SectionLabel text="GRATIS AI GEREEDHEIDSCAN" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              Gratis AI Gereedheidscan voor<br />
              <span className="text-primary">Nederlandse Organisaties</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Sinds februari 2025 is AI-geletterdheid wettelijk verplicht onder de EU AI Act. Maar hoe gereed is jouw organisatie? De AIGA AI Gereedheidscan geeft je in drie minuten een helder beeld van waar je staat op het gebied van AI-gebruik, wetgeving, risicobeheer, leiderschap en audit-readiness.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              De scan meet vijf dimensies: AI-gebruik, bewustzijn van wetgeving, risicobeheer, leiderschap en audit-readiness. Na afloop ontvang je direct je score, inclusief een uitsplitsing per dimensie en persoonlijk advies.
            </p>

            <div className="mt-8 bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Voorbeeldvragen uit de scan</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">1.</span> Hoeveel medewerkers in jouw organisatie gebruiken AI-tools?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">2.</span> Heeft jouw organisatie een beleid voor verantwoord AI-gebruik?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">3.</span> Weten jouw medewerkers wat de EU AI Act van hen vraagt?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">4.</span> Heeft jouw organisatie een AI-verantwoordelijke?</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">5.</span> Hoe sta je ervoor als er morgen een audit is?</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 rounded-lg text-[15px]"
              >
                Start de scan · 3 minuten
              </button>
              <p className="mt-3 text-xs text-muted-foreground">10 vragen. Direct resultaat. Geen account nodig.</p>
            </div>
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

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4" style={{ backgroundColor: tier.color }}>
              {tier.badge}
            </span>
            <div className="text-7xl font-display font-bold text-foreground">{pct}%</div>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-4">{tier.heading}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">{tier.body}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">Score per dimensie</h3>
            <div className="space-y-3">
              {dimScores.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{d.label}</span>
                    <span className="text-muted-foreground">{d.score}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${d.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ontvang een persoonlijk actieplan</h3>
              <p className="text-sm text-muted-foreground mb-6">Vul je gegevens in en we nemen contact op.</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {[
                  { name: "naam", label: "Naam", required: true },
                  { name: "email", label: "E-mailadres", required: true, type: "email" },
                  { name: "bedrijf", label: "Bedrijfsnaam", required: true },
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
                <button type="submit" disabled={submitting} className="btn-neon w-full py-3 rounded-lg">
                  {submitting ? "Bezig..." : tier.buttonLabel}
                </button>
              </form>
              <p className="text-center mt-4">
                <Link href={tier.textLink.to} className="text-sm text-primary hover:underline">
                  {tier.textLink.label}
                </Link>
              </p>
            </div>
          ) : (
            <div className="bg-card border border-neon-purple/30 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Bedankt!</h3>
              <p className="text-muted-foreground">We nemen snel contact met je op.</p>
              <Link href="/training" className="btn-neon inline-block mt-6 px-8 py-3 rounded-lg">
                Bekijk de training
              </Link>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
