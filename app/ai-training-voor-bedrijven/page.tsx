import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "AI-training voor bedrijven: welke data stopt je team in AI? | AIGA",
  description:
    "Je betaalt al voor AI-tools zoals Copilot. Zorg dat je team ze ook echt goed gebruikt: veilig, met minder fouten en meer rendement. Online training met certificaat van deelname, €249 ex btw per medewerker.",
  alternates: { canonical: "/ai-training-voor-bedrijven" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Training voor Bedrijven in Nederland",
  description: "Online AI-training voor Nederlandse bedrijven, met certificaat van deelname.",
  url: "https://aigeletterdheid.academy/ai-training-voor-bedrijven",
  publisher: { "@type": "Organization", name: "AIGA | AI Geletterdheid Academy" },
};

export default function AiTrainingVoorBedrijvenPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "AI Training voor Bedrijven" }]} />

      <section className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="AI TRAINING VOOR BEDRIJVEN" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mt-4">
              Je betaalt al voor AI-tools.{" "}
              <span className="text-primary">Maar weet je welke data je team erin stopt?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Je geeft al snel €20 tot €30 per medewerker per maand uit aan Copilot, ChatGPT of Gemini. Maar tools aanzetten is niet hetzelfde als er waarde uit halen. De meesten prompten maar wat, delen data die eruit moet blijven, of laten de tool links liggen. Voor een fractie van wat je al aan licenties betaalt, zorgt deze AI-training voor bedrijven dat je mensen AI veilig én goed gebruiken. Minder fouten, meer rendement.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              De zakelijke case voor AI-training
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Bedrijven die hun mensen leren goed met AI te werken, zien meetbare resultaten: minder fouten met AI-tools, minder data die eruit lekt, en meer rendement uit de licenties die je al betaalt.
              </p>
              <p>
                De ROI is direct meetbaar. Teams die AI écht begrijpen, werken sneller, leveren betere output en maken minder domme fouten. Voor een fractie van wat je maandelijks aan tooling uitgeeft.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Wat maakt de AIGA training uniek?
            </h2>
            <StaggerContainer className="mt-6 max-w-2xl border-b border-border">
              {[
                "Volledig Nederlandstalig en afgestemd op de Nederlandse praktijk",
                "Schaalbaar: van 1 tot 1000+ medewerkers tegelijk",
                "Vier modules in eigen tempo, met tussentijdse toetsen",
                "Digitaal eindexamen en certificaat van deelname",
                "Voortgangsdashboard voor HR en L&D",
                "Geen technische voorkennis vereist",
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

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-16 mb-4">
              Een team dat AI vertrouwt, en goed gebruikt
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Bedrijven die hun mensen nu leren AI goed te gebruiken, halen er meer uit én lopen minder risico. Niet omdat ze meer AI hebben, maar omdat hun team het slim én veilig inzet. Dat merk je aan de kwaliteit van het werk en aan de rust in de organisatie.
              </p>
              <p>
                Wie het digitale eindexamen haalt, krijgt een certificaat van deelname. Zo laat je intern en naar klanten zien dat het geregeld is.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25}>
            <div className="mt-16 bg-card border border-border rounded-2xl p-8 neon-glow">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Haal meer uit de AI-tools die je al betaalt
                </h2>
                <p className="mt-3 text-muted-foreground">€249 ex btw per deelnemer. Binnen één werkdag belt een van ons je.</p>
              </div>
              <LeadForm source="AI training voor bedrijven — offerte aanvraag" />
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Liever eerst de gratis check? <Link href="/gereedheidscan" className="text-primary hover:underline font-medium">In 3 minuten weet je waar je team staat.</Link>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
