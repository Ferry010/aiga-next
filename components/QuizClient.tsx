'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection, RevealItem } from "@/components/AnimatedSection";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import ScanCallback from "@/components/ScanCallback";
import { trackLead, trackEvent } from "@/lib/track";
import { QUESTIONS as questions, DIMENSIONS as dimensions } from "@/lib/scan";
import { useInlineValidation, FieldError } from "@/components/InlineValidation";

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
    badge: "HOOG RISICO", color: "hsl(0, 84%, 60%)",
    heading: "Je loopt op meerdere plekken risico met AI",
    body: "Je mensen gebruiken AI, maar zonder gedeelde basis, duidelijke afspraken of zicht. Data kan weglekken en fouten blijven onopgemerkt. Het goede nieuws: dit is precies wat één training oplost.",
    textLink: { label: "Bekijk hoe de training dit oplost →", to: "/training" },
  },
  {
    minPct: 41, maxPct: 70,
    badge: "GEMIDDELD RISICO", color: "hsl(38, 92%, 50%)",
    heading: "Je hebt een deel op orde, maar er zijn blinde vlekken",
    body: "Een deel van je team werkt bewust met AI. Maar niet iedereen werkt vanuit dezelfde basis, en op sommige plekken loop je nog risico.",
    textLink: { label: "Bekijk hoe de training de gaten dicht →", to: "/training" },
  },
  {
    minPct: 71, maxPct: 100,
    badge: "WEINIG RISICO", color: "hsl(152, 55%, 42%)",
    heading: "Je hebt het aardig op orde",
    body: "Je team heeft een solide basis, en dat is zeldzamer dan je denkt. De volgende stap is het borgen, zodat iedereen dezelfde veilige manier van werken aanhoudt, ook nieuwe mensen.",
    textLink: { label: "Bekijk hoe je dit borgt →", to: "/training" },
  },
];

type Phase = "intro" | "quiz" | "result";

export default function QuizClient({ canEmail = false }: { canEmail?: boolean }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const calm = useReduceMotion() || !!useReducedMotion();
  const [shownPct, setShownPct] = useState(0);
  const [formData, setFormData] = useState({ naam: "", email: "" });
  const v = useInlineValidation();
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const goBack = () => {
    if (current === 0 || selected !== null) return;
    setDir(-1);
    setAnswers((a) => a.slice(0, -1));
    setCurrent((c) => c - 1);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setDir(1);
    setTimeout(() => {
      const next = [...answers, idx];
      setAnswers(next);
      setSelected(null);
      if (current < 9) {
        setCurrent(current + 1);
      } else {
        setPhase("result");
        trackEvent("scan_complete");
      }
    }, calm ? 150 : 380);
  };

  const score = answers.reduce((sum, a) => sum + a, 0);
  const pct = Math.round((score / 30) * 100);
  const tier = tiers.find((t) => pct >= t.minPct && pct <= t.maxPct) || tiers[0];

  // Each phase starts at the top, also when started from a button lower on the page
  useEffect(() => {
    if (phase !== "intro") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [phase]);

  // The score counts up when the result appears
  useEffect(() => {
    if (phase !== "result") return;
    if (calm || document.visibilityState === "hidden") { setShownPct(pct); return; }
    const c = animate(0, pct, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setShownPct(Math.round(x)) });
    // Never leave the score short of its real value, even if frames are paused
    const t = setTimeout(() => setShownPct(pct), 1400);
    return () => { c.stop(); clearTimeout(t); };
  }, [phase, pct, calm]);

  // Keys 1 to 4 answer, Backspace goes back
  useEffect(() => {
    if (phase !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= questions[current].options.length) handleAnswer(n - 1);
      if (e.key === "Backspace") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Optional: mail the result to yourself. The result itself is never behind this.
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendState("sending");
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
          score: pct,
          score_category: tier.badge,
          dimension_scores: dimensieScores,
          answers,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      const { emailSent } = await res.json();
      if (!emailSent) throw new Error("mail not sent");
      trackLead("lead_scan");
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
          <AnimatedSection>

            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight">
              Welke bedrijfsdata verdwijnt er bij jou in AI-tools?<br />
              <span className="neon-text">Ontdek in 3 minuten waar je risico loopt.</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Je mensen gebruiken AI al. Deze gratis scan laat zien wáár je risico loopt: shadow AI, bedrijfsdata die weglekt, en waar de kennis in je team te ver uiteenloopt. Je ziet je uitslag direct, zonder iets in te vullen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 text-[0.9375rem] font-semibold"
              >
                Start de gratis scan →
              </button>
              <p className="text-sm text-muted-foreground">10 vragen · 3 minuten · direct resultaat</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-8">
              {["Gratis, altijd", "Geen account nodig", "Direct je uitslag"].map((t) => (
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
                    title: "Hoeveel zicht je écht hebt",
                    body: "Welke AI-tools je mensen gebruiken, en hoeveel er buiten je zicht gebeurt (shadow AI).",
                  },
                  {
                    title: "Waar je data-risico zit",
                    body: "Op welke plekken bedrijfsdata via AI-tools je organisatie uit kan lekken.",
                  },
                  {
                    title: "Hoe groot het kennisverschil is",
                    body: "Hoe ver de AI-vaardigheid in je team uiteenloopt, en waar dat risico oplevert.",
                  },
                  {
                    title: "Wat je als eerste aanpakt",
                    body: "Een heldere prioriteit zodat je vandaag kunt beginnen, zonder te gokken.",
                  },
                ].map((item, i) => (
                  <RevealItem key={item.title} index={i} className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_-24px_hsl(256_56%_33%/0.45)]">
                    <h3 className="font-display font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-muted-foreground leading-relaxed">{item.body}</p>
                  </RevealItem>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Mid CTA ── */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          <AnimatedSection>
            <div className="block-lilac rounded-[1.75rem] p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                De meeste organisaties denken dat het wel meevalt.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Tot ze de scan doen. Ontdek in 3 minuten waar jij staat, en wat je moet doen om jezelf te beschermen.
              </p>
              <button
                onClick={() => setPhase("quiz")}
                className="btn-neon px-8 py-4 text-[0.9375rem]"
              >
                Doe de scan nu, gratis →
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
                    body: "Direct na de laatste vraag zie je jouw resultaat: een score op 5 onderdelen en hoeveel risico je loopt.",
                  },
                  {
                    step: "03",
                    title: "Weet wat je eerst aanpakt",
                    body: "Je ziet waar het grootste gat zit en wat je antwoordde. Bewaren of doorsturen kan, hoeft niet.",
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
                  a: "Voor iedereen die verantwoordelijk is voor mensen of werkprocessen: managers, HR, IT, directie en ondernemers die willen weten welke data er via AI hun organisatie verlaat.",
                },
                {
                  q: "Hoe lang duurt de scan?",
                  a: "Minder dan 3 minuten. Je beantwoordt 10 vragen en ziet daarna direct je resultaat, zonder wachten of aanmelden.",
                },
                {
                  q: "Is de scan echt gratis?",
                  a: "Ja. Geen creditcard, geen proefperiode, geen verborgen kosten. De scan is een service van AIGA om organisaties te helpen begrijpen waar ze staan.",
                },
                {
                  q: "Wat ontvang ik na de scan?",
                  a: "Direct na de laatste vraag zie je je score op 5 onderdelen, waar je grootste gat zit en een overzicht van je antwoorden. Je hoeft daarvoor niets in te vullen.",
                },
                {
                  q: "Wat voor risico's meet de scan?",
                  a: "Denk aan bedrijfsdata die weglekt via AI-tools, shadow AI (tools die mensen gebruiken buiten het zicht van IT), ongecontroleerde output die de deur uit gaat, en grote verschillen in kennis binnen je team. Precies de dingen die pas opvallen als het misgaat.",
                },
                {
                  q: "Wat als ik hoog risico scoor?",
                  a: "Dan ben je in goed gezelschap, de meeste organisaties staan er niet zo goed voor als ze denken. Wat je wél hebt na de scan: inzicht. Je uitslag laat zien waar je grootste gat zit, dus waar je als eerste begint.",
                },
                {
                  q: "Worden mijn gegevens gedeeld met derden?",
                  a: "Nee. Voor de uitslag vragen we geen gegevens. Laat je zelf je e-mailadres of telefoonnummer achter, dan gebruiken we dat alleen om je uitslag te sturen of je te bellen. We delen niets met derden.",
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
              Elke dag zonder inzicht is een dag dat je risico loopt zonder het te weten. De scan is gratis en duurt 3 minuten.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="btn-neon px-10 py-4 text-base font-semibold"
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
    const slide = calm
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          initial: { opacity: 0, x: 28 * dir },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -28 * dir },
        };
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-14 sm:py-20">
        <div className="max-w-2xl w-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={goBack}
              disabled={current === 0}
              className="press shrink-0 font-semibold text-primary disabled:invisible"
            >
              Terug
            </button>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={current}>
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${(current / 10) * 100}%` }}
                transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.5 }}
              />
            </div>
            <span className="shrink-0 tabular-nums">{current + 1} van 10</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current} {...slide} transition={calm ? { duration: 0.12 } : { type: "spring", bounce: 0, duration: 0.35 }}>
              <h2 className="mt-10 text-2xl sm:text-3xl font-display font-bold text-foreground leading-snug tracking-tight">{q.q}</h2>
              <div className="mt-8 space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`press flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors duration-200 ${
                      selected === i
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        selected === i ? "bg-white text-primary" : "bg-muted text-muted-foreground"
                      }`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-[1.0625rem] font-medium">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="mt-6 hidden text-center text-sm text-muted-foreground sm:block">Tip: je kunt ook met de toetsen 1 tot 4 antwoorden.</p>
        </div>
      </div>
    );
  }

  // Result phase: shown straight away, never behind a form
  const dimScores = dimensions.map((d) => ({
    label: d.label,
    score: Math.round((d.indices.reduce((sum, i) => sum + (answers[i] || 0), 0) / 6) * 100),
  }));

  const input =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-[0.9375rem] focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/20";

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4" style={{ backgroundColor: tier.color }}>
              {tier.badge}
            </span>
            <div className="text-7xl font-display font-bold text-foreground tabular-nums">{shownPct}%</div>
            <p className="text-sm text-muted-foreground mt-1">grip op AI-gebruik</p>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-5 tracking-tight">{tier.heading}</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">{tier.body}</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 mb-4">
            <h2 className="text-base font-bold text-foreground mb-4">Score per onderdeel</h2>
            <div className="space-y-3">
              {dimScores.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{d.label}</span>
                    <span className="text-muted-foreground tabular-nums">{d.score}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={calm ? false : { width: "0%" }}
                      animate={{ width: `${Math.max(d.score, 3)}%` }}
                      transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.9, delay: 0.3 }}
                      style={{ background: d.score < 40 ? "hsl(0 65% 48%)" : d.score < 70 ? "hsl(38 85% 42%)" : "hsl(152 45% 36%)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <details className="rounded-2xl border border-border bg-white px-6 py-4 mb-10 group">
            <summary className="cursor-pointer font-bold text-foreground list-none flex justify-between items-center">
              Jouw antwoorden
              <span className="text-primary text-sm font-semibold group-open:hidden">Bekijk</span>
              <span className="text-primary text-sm font-semibold hidden group-open:inline">Verberg</span>
            </summary>
            <ol className="mt-4 border-t border-border">
              {questions.map((q, i) => (
                <li key={q.q} className="border-b border-border last:border-0 py-3">
                  <p className="text-sm text-muted-foreground">{i + 1}. {q.q}</p>
                  <p className="mt-1 text-foreground font-semibold">{q.options[answers[i]] ?? "-"}</p>
                </li>
              ))}
            </ol>
          </details>

          {canEmail && (
            <div className="border-t-2 border-foreground pt-6 mb-12">
              {sendState === "sent" ? (
                <>
                  <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Staat in je mailbox.</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    Je uitslag en je antwoorden zijn verstuurd naar {formData.email}. Niet binnen een paar minuten? Kijk
                    even in je spam.
                  </p>
                </>
              ) : (
                <form onSubmit={handleSend} {...v.formProps} aria-label="Uitslag mailen">
                  <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Uitslag bewaren of doorsturen?</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    We mailen je de uitslag met al je antwoorden. Handig om erbij te pakken, of door te sturen naar wie
                    over AI-gebruik beslist.
                  </p>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="scan-email" className="text-sm text-muted-foreground mb-1 block">E-mailadres</label>
                      <input id="scan-email" type="email" required autoComplete="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={input} />
                      <FieldError id="scan-email" errors={v.errors} />
                    </div>
                    <div>
                      <label htmlFor="scan-naam" className="text-sm text-muted-foreground mb-1 block">Voornaam (optioneel)</label>
                      <input id="scan-naam" autoComplete="given-name" value={formData.naam}
                        onChange={(e) => setFormData({ ...formData, naam: e.target.value })} className={input} />
                    </div>
                  </div>
                  {sendState === "error" && (
                    <p role="alert" className="mt-3 text-sm text-destructive">
                      Versturen lukte niet. Probeer het nog eens, je uitslag hierboven blijft gewoon staan.
                    </p>
                  )}
                  <button type="submit" disabled={sendState === "sending"} className="btn-neon mt-5 px-7 py-3.5 font-semibold disabled:opacity-50">
                    {sendState === "sending" ? "Even versturen..." : "Mail mij de uitslag"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Next step: one-click callback, then the training */}
          <ScanCallback
            name={sendState === "sent" ? formData.naam : ""}
            email={sendState === "sent" ? formData.email : ""}
            summary={`${tier.badge}, ${pct}% grip`}
          />

          <p className="mt-10 text-center text-sm">
            <Link href={tier.textLink.to} className="text-primary font-semibold hover:underline">
              {tier.textLink.label}
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
