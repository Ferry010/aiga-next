'use client';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ScoreGauge from "@/components/ScoreGauge";

const TIER_COLORS: Record<string, string> = {
  "NIET GEREED": "hsl(0,84%,60%)",
  "GEDEELTELIJK GEREED": "hsl(38,92%,50%)",
  VOORLOPER: "hsl(160,84%,39%)",
};

const TIER_INTERPRETATIONS: Record<string, string> = {
  "NIET GEREED":
    "Jouw organisatie gebruikt waarschijnlijk al AI, maar zonder gedeelde kennis of spelregels. Dat maakt jullie kwetsbaar bij een audit. Het goede nieuws: je weet het nu — en dat is de eerste stap naar actie.",
  "GEDEELTELIJK GEREED":
    "Een deel van je team begrijpt AI goed, maar zonder een gedeelde basis zijn er blinde vlekken. Met gerichte stappen op de dimensies waar je laag scoort, kom je snel een stuk verder.",
  VOORLOPER:
    "Jullie lopen voor op de meeste Nederlandse organisaties. Je team heeft een solide basis. Dit is het moment om die voorsprong te formaliseren, te certificeren en te borgen voor de lange termijn.",
};

export default function ResultClient() {
  const params = useSearchParams();
  const name = params.get("n") ?? "";
  const score = parseInt(params.get("s") ?? "0", 10);
  const category = params.get("c") ?? "";
  const dimRaw = params.get("d");

  if (!name || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-display font-bold text-foreground mb-3">
            Resultaat niet beschikbaar
          </h1>
          <p className="text-muted-foreground mb-6">
            Doe de scan om jouw persoonlijke rapport te bekijken.
          </p>
          <Link href="/gereedheidscan" className="btn-neon px-8 py-3 rounded-lg">
            Doe de scan
          </Link>
        </div>
      </div>
    );
  }

  let dimScores: Record<string, number> = {};
  try {
    if (dimRaw) dimScores = JSON.parse(atob(dimRaw));
  } catch {
    // malformed param — just skip dimension bars
  }

  const tierColor = TIER_COLORS[category] ?? TIER_COLORS["NIET GEREED"];
  const interpretation = TIER_INTERPRETATIONS[category] ?? TIER_INTERPRETATIONS["NIET GEREED"];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          {name && (
            <p className="text-sm text-muted-foreground mb-1">{name}</p>
          )}
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1 mb-8">
            AI Gereedheidsresultaat
          </h1>

          <div className="flex justify-center mb-5">
            <ScoreGauge score={score} />
          </div>

          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: tierColor }}
          >
            {category}
          </span>
        </div>

        {/* Interpretation */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <p className="text-foreground leading-relaxed">{interpretation}</p>
        </div>

        {/* Dimension bars */}
        {Object.keys(dimScores).length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-5">Score per dimensie</h2>
            <div className="space-y-4">
              {Object.entries(dimScores).map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{label}</span>
                    <span className="text-muted-foreground font-medium">{pct}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg,#9B3FF5,#E040C8)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="btn-neon flex-1 text-center py-4 rounded-lg font-semibold text-sm"
          >
            Offerte aanvragen
          </Link>
          <Link
            href="/training"
            className="btn-neon-outline flex-1 text-center py-4 rounded-lg font-semibold text-sm"
          >
            Bekijk de training
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Dit rapport is alleen voor jou zichtbaar.
        </p>

      </div>
    </div>
  );
}
