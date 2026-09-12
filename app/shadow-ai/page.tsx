import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Shadow AI in je organisatie | Grip zonder verbod | AIGA",
  description:
    "Shadow AI: je mensen gebruiken AI-tools buiten het zicht van IT. Een verbod werkt niet. Maak medewerkers onderdeel van je AI-governance met een kant-en-klaar trainingsprogramma.",
  alternates: { canonical: "/shadow-ai" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shadow AI in je organisatie",
  description: "Hoe je grip krijgt op shadow AI zonder een verbod, door medewerkers onderdeel te maken van je AI-governance.",
  url: "https://aigeletterdheid.academy/shadow-ai",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

export default function ShadowAiPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Shadow AI" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4">
              Een verbod stopt shadow AI niet.{" "}
              <span className="text-primary">Maak je mensen onderdeel van je governance.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Je mensen gebruiken AI-tools die niemand heeft goedgekeurd. Niet uit onwil, maar omdat het werkt. Verbieden drijft het alleen ondergronds, waar je er helemaal geen zicht meer op hebt. De echte oplossing is niet meer controle op de tools, maar mensen die weten waar de grenzen liggen en waarom. Zo wordt je grootste risico juist je eerste verdedigingslinie.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Wat is shadow AI?
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Shadow AI is het gebruik van AI-tools binnen je organisatie zonder dat IT of Security er zicht op of grip op heeft. Denk aan een medewerker die een gratis ChatGPT-account gebruikt voor werk, een browser-extensie met AI installeert, of bedrijfsdata in een tool plakt die nooit is beoordeeld op veiligheid.
              </p>
              <p>
                Het is de AI-variant van shadow IT, en het gaat harder dan welke tool je ook uitrolt. ChatGPT, Copilot, Gemini, Claude en AI-features in software die je al hebt: het zit overal, en het gebeurt nu al.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Waarom een verbod niet werkt
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Je kunt AI-gebruik niet meer tegenhouden. Blokkeer je de ene tool, dan pakken mensen de volgende, op hun telefoon of privélaptop. Een verbod verplaatst het probleem naar een plek waar je helemaal niks meer ziet.
              </p>
              <p>
                De zwakste schakel is niet de tool, het is de medewerker die niet weet welke data eruit moet blijven of wanneer output niet klopt. Daar valt het meeste te winnen, en het snelst.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Van zwakste schakel naar eerste verdedigingslinie
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Eén kant-en-klaar trainingsprogramma geeft je hele organisatie dezelfde basis, zodat verantwoord AI-gebruik een gewoonte wordt in plaats van een gok. Wat je team leert:
              </p>
            </div>
            <StaggerContainer className="space-y-3 mt-6">
              {[
                "Welke bedrijfsdata wél en niet in een AI-tool mag",
                "Hoe je herkent of een tool veilig is om te gebruiken",
                "Hoe je AI-output controleert en hallucinaties eruit haalt",
                "Wanneer je AI juist beter niet gebruikt",
                "Eén gedeelde standaard, in plaats van vijfhonderd eigen methodes",
                "Aantoonbaar vastgelegd, ook voor de EU AI Act",
              ].map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3 p-3">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25}>
            <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center neon-glow">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Krijg grip op shadow AI
              </h2>
              <p className="mt-4 text-muted-foreground">
                Kant-en-klaar, van 1 tot 1000+ medewerkers. Je bouwt niks zelf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/training" className="btn-neon px-8 py-3 rounded-lg text-sm">
                  Bekijk het programma
                </Link>
                <Link href="/gereedheidscan" className="btn-neon-outline px-8 py-3 text-sm font-semibold">
                  Doe de gratis AI Gereedheidscan
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Related pages */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Gerelateerd</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ai-act-compliance-nederland" className="text-primary hover:underline">AI Act Compliance Nederland</Link></li>
                <li><Link href="/ai-training-voor-bedrijven" className="text-primary hover:underline">AI Training voor Bedrijven</Link></li>
                <li><Link href="/ai-cursus-medewerkers" className="text-primary hover:underline">AI Cursus voor Medewerkers</Link></li>
                <li><Link href="/kenniscentrum" className="text-primary hover:underline">Kenniscentrum</Link></li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
