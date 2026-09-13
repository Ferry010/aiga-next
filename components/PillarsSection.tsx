import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const pillars = [
  {
    tag: "Responsible AI",
    body: "Medewerkers begrijpen de belangrijkste risico's.",
  },
  {
    tag: "AI productivity",
    body: "Ze weten hoe ze goede toepassingen herkennen en betere resultaten krijgen.",
  },
  {
    tag: "AI governance",
    body: "De organisatie creëert één gemeenschappelijke basis voor verantwoord gebruik.",
  },
  {
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
          {pillars.map((p) => (
            <StaggerItem key={p.tag}>
              <div className="bg-background border border-border rounded-2xl p-7 h-full hover:border-neon-purple/40 neon-glow transition-all duration-300 flex flex-col">
                <span className="text-xs font-mono uppercase tracking-wider neon-text">{p.tag}</span>
                <p className="text-lg font-semibold text-foreground mt-2 leading-snug">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
