import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "AI-cursus voor medewerkers: weet je team wat er niet in ChatGPT mag? | AIGA",
  description:
    "Je mensen leren AI nu van YouTube en van elkaar. Geef je hele team dezelfde praktische basis: welke data eruit blijft, shadow AI, veilig én nuttig gebruik. Online in vier modules, met toetsen, digitaal eindexamen en certificaat van deelname. €249 ex btw per medewerker.",
  alternates: { canonical: "/ai-cursus-medewerkers" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Cursus voor Medewerkers",
  description: "Praktische AI cursus voor medewerkers. Leer je hele team AI veilig en verantwoord gebruiken, met een certificaat van deelname.",
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
              <span className="text-primary">Ondertussen weet niemand welke data er weglekt.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Iedereen gebruikt AI, maar iedereen op zijn eigen manier. De één plakt bedrijfsdata in ChatGPT, de ander durft er niet aan. Deze AI-cursus voor medewerkers geeft je hele team dezelfde praktische basis: welke data wél en niet in een tool mag, hoe je output controleert, en hoe je AI veilig én nuttig inzet. Geen technische voorkennis nodig, en direct inzetbaar bij onboarding.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Wat leren medewerkers in deze cursus?
            </h2>
            <StaggerContainer className="mt-6 max-w-2xl border-b border-border">
              {[
                "Welke bedrijfsdata wél en niet in een AI-tool mag",
                "Hoe je AI-output controleert voordat je het gebruikt",
                "Hoe je hallucinaties en verzonnen bronnen herkent",
                "Wanneer je AI juist beter niet gebruikt",
                "Hoe je AI veilig én nuttig inzet in je eigen werk",
                "Wat verantwoord AI-gebruik betekent in de praktijk",
              ].map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-4 py-4 border-t border-border">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    <span className="text-foreground">{item}</span>
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
                De cursus is volledig online en in eigen tempo. Medewerkers volgen vier modules op een moment dat het hen uitkomt: begrijpen wat AI is, veilig en verantwoord werken met AI, slim werken met AI, en AI toepassen in je werk.
              </p>
              <p>
                Na de modules volgen tussentijdse toetsen en een digitaal eindexamen. Bij voldoende resultaat ontvangt elke medewerker een <strong className="text-foreground">certificaat van deelname</strong>. Handig meegenomen: daarmee laat je ook zien dat je AI-geletterdheid ondersteunt, zoals de AI Act vraagt.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Prijs en beschikbaarheid
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                De cursus kost <strong className="text-foreground">€249 ex btw per persoon</strong>. Er is geen minimum: begin met één collega of schrijf direct je hele organisatie in, en zet er later zoveel mensen bij als je wil. Binnen twee werkdagen na akkoord staat je team live.
              </p>
              <p>
                Boek je 50 plekken of meer in één keer? Dan krijgen je directie en MT de <Link href="/masterclass" className="text-primary hover:underline">live masterclass</Link> gratis.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25}>
            <div className="mt-16 border-t-2 border-foreground pt-10">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
                  Zet je hele team op dezelfde AI-basis
                </h2>
                <p className="mt-3 text-muted-foreground">Laat je gegevens achter. Binnen één werkdag belt een van ons je.</p>
              </div>
              <LeadForm source="AI cursus medewerkers — offerte aanvraag" />
              <p className="mt-6 text-sm text-muted-foreground">
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
