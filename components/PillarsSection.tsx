import { ShieldCheck, Sparkles, Network, BadgeCheck } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const pillars = [
  {
    icon: ShieldCheck,
    tag: "Responsible AI",
    title: "Je mensen kennen de risico's",
    body: "Wat je wél en niet met AI deelt, waar het misgaat met data en hallucinaties, en hoe je dat voorkomt.",
  },
  {
    icon: Sparkles,
    tag: "AI productivity",
    title: "Ze halen er echt iets uit",
    body: "Ze leren goede AI-toepassingen herkennen en betere resultaten krijgen. Slimmer werken, niet eindeloos prompten.",
  },
  {
    icon: Network,
    tag: "AI governance",
    title: "Eén gedeelde basis",
    body: "Je hele organisatie werkt vanuit dezelfde manier van verantwoord gebruik. Geen vijfhonderd eigen methodes.",
  },
  {
    icon: BadgeCheck,
    tag: "AI literacy / AI Act",
    title: "Aantoonbaar geregeld",
    body: "Je legt gestructureerd vast dat je maatregelen hebt genomen. Netjes op orde, zonder dat het je hele verhaal wordt.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-24 block-lilac border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground max-w-3xl leading-[1.1]">
            Eén programma.{" "}
            <span className="text-primary">Vier dingen geregeld.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Geen losse cursus, maar één basis die vier problemen tegelijk oplost.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {pillars.map((p, i) => (
            <StaggerItem key={p.tag}>
              <div className="bg-background border border-border rounded-2xl p-7 h-full hover:border-neon-purple/40 neon-glow transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                    <p.icon size={22} className="text-primary" aria-hidden />
                  </span>
                  <span className="text-sm font-mono text-muted-foreground/60">0{i + 1}</span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider neon-text">{p.tag}</span>
                <p className="text-lg font-semibold text-foreground mt-1 mb-2">{p.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
