import { AnimatedSection } from "@/components/AnimatedSection";

// Social proof from the person who builds and teaches it. Only verified facts.

export default function FerryAuthority() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-8 md:gap-14 items-center">
            <img
              src="/assets/ferry-stage.jpg"
              alt="Ferry Hoes op het podium voor een publiek"
              width={959}
              height={904}
              className="w-full aspect-[959/904] object-cover rounded-[1.75rem]"
            />
            <div>
              <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">
                Gebouwd en gegeven door Ferry Hoes.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Veelgevraagd AI-spreker die sinds 2017 organisaties helpt met verantwoord AI-gebruik, van a.s.r. tot
                VodafoneZiggo en verschillende Ministeries.
              </p>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                Geen consultant met een deck, maar iemand die dagelijks ziet waar het in de praktijk misgaat en waar
                het goedgaat.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
