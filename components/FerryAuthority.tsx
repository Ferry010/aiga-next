import { AnimatedSection } from "@/components/AnimatedSection";

/** Quiet authority line. Real credentials only, no stats or quotes. No card: a photo and a sentence. */
export default function FerryAuthority() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 border-t border-border pt-10">
            <img
              src="/assets/ferry-stage.jpg"
              alt="Ferry Hoes op het podium voor een publiek"
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-2xl shrink-0"
            />
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              <span className="font-display font-bold text-foreground">Gebouwd en gegeven door Ferry Hoes.</span>{" "}
              Veelgevraagd AI-spreker die sinds 2017 organisaties helpt met verantwoord AI-gebruik, van a.s.r. tot
              VodafoneZiggo en verschillende Ministeries. Geen consultant met een deck, maar iemand die dagelijks ziet
              waar het in de praktijk misgaat en waar het goedgaat.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
