import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "AI Cursus voor Medewerkers | Gecertificeerd & Praktisch | AIGA",
  description:
    "Je mensen leren AI nu van YouTube en van elkaar. Geef je hele team dezelfde praktische basis: welke data eruit blijft, shadow AI, veilig én nuttig gebruik. Online, 2-3 uur, met certificaat.",
  alternates: { canonical: "/ai-cursus-medewerkers" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Cursus voor Medewerkers",
  description: "Praktische AI cursus voor medewerkers. Leer je hele team AI veilig en verantwoord gebruiken, met een digitaal certificaat op naam.",
  provider: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy", url: "https://aigeletterdheid.academy" },
  instructor: { "@type": "Person", name: "Ferry Hoes" },
  courseMode: "online",
  inLanguage: "nl",
  educationalLevel: "Beginner tot Intermediate",
  duration: "PT2H30M",
  offers: { "@type": "Offer", price: "249", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
};

export default function AiCursusMedewerkersPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI Cursus Medewerkers" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="AI CURSUS MEDEWERKERS" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4">
              Je mensen leren AI nu van YouTube en van elkaar.{" "}
              <span className="text-primary">Geef ze één gedeelde basis.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Iedereen gebruikt AI, maar iedereen op zijn eigen manier. De één plakt bedrijfsdata in ChatGPT, de ander durft er niet aan. Deze AI-cursus voor medewerkers geeft je hele team dezelfde praktische basis: welke data wél en niet in een tool mag, hoe je output controleert, en hoe je AI veilig én nuttig inzet. Geen technische voorkennis nodig, en direct inzetbaar bij onboarding.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Wat leren medewerkers in deze cursus?
            </h2>
            <StaggerContainer className="space-y-3 mt-6">
              {[
                "Welke bedrijfsdata wél en niet in een AI-tool mag",
                "Hoe je AI-output controleert voordat je het gebruikt",
                "Hoe je hallucinaties en verzonnen bronnen herkent",
                "Wanneer je AI juist beter niet gebruikt",
                "Hoe je AI veilig én nuttig inzet in je eigen werk",
                "Wat verantwoord AI-gebruik betekent in de praktijk",
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

          <AnimatedSection delay={0.15}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Format en opzet
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                De cursus is volledig online en selfpaced. Medewerkers volgen de training in hun eigen tempo, op een moment dat het hen uitkomt. De gemiddelde doorlooptijd is 2 tot 3 uur. De cursus bestaat uit videolessen, praktijkcases en wordt afgesloten met een adaptief examen.
              </p>
              <p>
                Na het behalen van het examen (minimaal 70% score) ontvangt elke medewerker het <strong className="text-foreground">AI Literacy Practitioner certificaat</strong>. Dit certificaat is digitaal ondertekend, deelbaar via LinkedIn en is controleerbaar bewijs dat er getraind is.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Prijs en beschikbaarheid
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                De cursus kost <strong className="text-foreground">€249 per medewerker</strong> (exclusief BTW). Er is geen minimum aantal deelnemers. Je kunt starten met 1 seat of direct je hele organisatie inschrijven. Voor grotere aantallen gelden staffelkortingen.
              </p>
              <p>
                Bij 50 of meer seats is een <Link href="/masterclass" className="text-primary hover:underline">live Masterclass voor leidinggevenden</Link> gratis inbegrepen.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25}>
            <div className="mt-16 bg-card border border-border rounded-2xl p-8 neon-glow">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Zet je hele team op dezelfde AI-basis
                </h2>
                <p className="mt-3 text-muted-foreground">Laat je gegevens achter. Er antwoordt een echt mens, meestal binnen een werkdag.</p>
              </div>
              <LeadForm source="AI cursus medewerkers — offerte aanvraag" />
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Liever eerst de gratis check? <Link href="/gereedheidscan" className="text-primary hover:underline font-medium">In 3 minuten weet je waar je team staat.</Link>
              </p>
            </div>
          </AnimatedSection>

          {/* Related pages */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Gerelateerd</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ai-training-voor-bedrijven" className="text-primary hover:underline">AI Training voor Bedrijven</Link></li>
                <li><Link href="/ai-act-compliance-nederland" className="text-primary hover:underline">AI Act Compliance Nederland</Link></li>
                <li><Link href="/ai-geletterdheid-nederland" className="text-primary hover:underline">AI-Geletterdheid in Nederland</Link></li>
                <li><Link href="/kenniscentrum" className="text-primary hover:underline">Kenniscentrum</Link></li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
