import { ShieldCheck, Sparkles, Network, BadgeCheck } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const pillars = [
  {
    icon: ShieldCheck,
    tag: "Responsible AI",
    body: "Medewerkers begrijpen de belangrijkste risico's.",
  },
  {
    icon: Sparkles,
    tag: "AI productivity",
    body: "Ze weten hoe ze goede toepassingen herkennen en betere resultaten krijgen.",
  },
  {
    icon: Network,
    tag: "AI governance",
    body: "De organisatie creëert één gemeenschappelijke basis voor verantwoord gebruik.",
  },
  {
    icon: BadgeCheck,
    tag: "AI literacy / AI Act",
    body: "Je legt gestructureerd vast dat je maatregelen hebt genomen om AI-geletterdheid te ondersteunen.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-24 block-lilac border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-foreground max-w-3xl leading-[1.1]">
            Wat haal je eruit
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Eén basis, vier concrete resultaten voor je organisatie.
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
                <p className="text-base font-semibold text-foreground mt-2 leading-snug">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
