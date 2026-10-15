import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

// The one section layout for the funnel pages: heading on the left (it stays
// in view on desktop while you read), content on the right. No background
// bands or boxes; sections are separated by space alone.

export default function SplitSection({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="text-[1.75rem] sm:text-4xl font-display font-bold text-foreground leading-[1.12] tracking-tight text-balance">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</p>}
        </AnimatedSection>
        <AnimatedSection delay={0.05} className="mt-8">{children}</AnimatedSection>
      </div>
    </section>
  );
}
