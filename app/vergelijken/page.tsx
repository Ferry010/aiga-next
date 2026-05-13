import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  title: "AIGA vergeleken met andere AI-geletterdheid trainingen | AIGA",
  description: "Eerlijke vergelijkingen tussen AIGA en andere AI-geletterdheid trainingen in Nederland. Feitelijk, met bronvermelding.",
  alternates: { canonical: "https://aigeletterdheid.academy/vergelijken" },
};

const comparisons = [
  {
    href: "/vergelijken/aiga-vs-pwc-academy",
    title: "AIGA vs PwC Academy AI Literacy",
    summary: "Prijs, taal, certificering en audit-proof bewijs vergeleken. Welke keuze past bij jouw EU AI Act compliance?",
    tags: ["Prijs", "Certificaat", "Taal", "Examen"],
  },
];

export default function VergelijkenPage() {
  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Vergelijken" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="VERGELIJKEN" />
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight mt-4">
              AIGA vergeleken met<br />
              <span className="neon-text">andere trainingen</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Op deze pagina vind je eerlijke vergelijkingen tussen AIGA en andere AI-geletterdheid trainingen in Nederland. Eerlijk, feitelijk, met bronvermelding.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {comparisons.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors neon-glow"
                >
                  <h2 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Lees vergelijking →
                  </span>
                </Link>
              ))}

              {/* Placeholder cards for upcoming comparisons */}
              {["AIGA vs AI-Certified", "AIGA vs Nationale AI-Cursus"].map((title) => (
                <div key={title} className="bg-muted/50 border border-dashed border-border rounded-2xl p-6">
                  <p className="text-sm font-semibold text-muted-foreground">{title}</p>
                  <p className="mt-1 text-xs text-text-faint">Binnenkort beschikbaar</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
