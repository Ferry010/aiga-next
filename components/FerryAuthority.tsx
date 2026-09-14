import { AnimatedSection } from "@/components/AnimatedSection";

/** Quiet social-proof / authority strip. Real credentials only, no stats or quotes. */
export default function FerryAuthority() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-card border border-border rounded-3xl p-8 shadow-soft">
            <img
              src="/assets/ferry-stage.jpg"
              alt="Ferry Hoes op het podium voor een publiek"
              className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-soft shrink-0"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                Gebouwd en gegeven door Ferry Hoes.
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Veelgevraagd AI-spreker die sinds 2017 organisaties helpt met verantwoord AI-gebruik en
                maandelijks op het podium staat voor organisaties als a.s.r., VodafoneZiggo en
                verschillende Ministeries. Winnaar van de Anti-Discriminatie AI-Hackathon in 2020. Geen
                consultant met een deck, maar iemand die dagelijks ziet waar het in de praktijk misgaat
                en waar het goedgaat.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
