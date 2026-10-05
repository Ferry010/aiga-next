import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Panel from "@/components/Panel";
import LeadForm from "@/components/LeadForm";
import AskUs from "@/components/AskUs";
import { TIERS, eur } from "@/lib/pricing";

// Shared building blocks for the content and landing pages, so every page
// opens, reads and closes the same way as /training and /shadow-ai.

export const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

type Cta = { href: string; label: string };

export function PageHero({
  crumb,
  title,
  accent,
  intro,
  primary,
  secondary,
  aside,
}: {
  crumb: string;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  primary?: Cta;
  secondary?: Cta;
  aside?: ReactNode;
}) {
  return (
    <>
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <section className="pt-6 pb-14 sm:pt-10 sm:pb-20">
        <div className={`${container} ${aside ? "grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center" : ""}`}>
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl">
              {title}
              {accent && <span className="neon-text block mt-2">{accent}</span>}
            </h1>
            {intro && <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">{intro}</p>}
            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {primary && (
                  <Link href={primary.href} className="btn-neon inline-flex items-center justify-center px-7 py-3.5 text-[0.9375rem] font-semibold">
                    {primary.label}
                  </Link>
                )}
                {secondary && (
                  <Link href={secondary.href} className="text-[0.9375rem] font-semibold text-primary hover:underline">
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </AnimatedSection>
          {aside && <AnimatedSection delay={0.1}>{aside}</AnimatedSection>}
        </div>
      </section>
    </>
  );
}

/** Body copy block in the left-title / right-text rhythm */
export function TextSection({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="pb-16 sm:pb-24">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-16`}>
        <AnimatedSection>
          <h2 className="text-[1.75rem] sm:text-[2.4rem] font-display font-bold text-foreground leading-[1.1] tracking-tight">{title}</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">{children}</div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** A list of short points with a purple rule on top, two or three across */
export function PointGrid({ items, cols = 2 }: { items: { title: string; body: ReactNode }[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid grid-cols-1 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-x-10 gap-y-8`}>
      {items.map((p) => (
        <div key={p.title} className="border-t-2 border-primary pt-5">
          <h3 className="text-xl font-display font-bold text-foreground leading-snug">{p.title}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

/** The closing block: the offerte form, with the people to call beside it */
export function OfferteBlock({ title, intro, source }: { title: ReactNode; intro?: ReactNode; source: string }) {
  return (
    <div className="pb-10">
      <Panel tone="tint" id="offerte">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground leading-[1.08] tracking-tight">{title}</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {intro ?? "Laat je gegevens achter. Binnen één werkdag belt een van ons je. Geen verplichtingen."}
            </p>
            <AskUs className="mt-8" />
            <p className="mt-6 text-muted-foreground">
              Nog niet zeker of het bij jullie speelt?{" "}
              <Link href="/gereedheidscan" className="text-primary font-semibold hover:underline">Doe de gratis AI-risicocheck</Link>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_50px_-28px_hsl(256_56%_33%/0.35)]">
              <LeadForm source={source} />
            </div>
          </AnimatedSection>
        </div>
      </Panel>
    </div>
  );
}

/** The three price tiers, light version for content pages */
export function PriceTiers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {TIERS.map((t) => (
        <div key={t.id} className="rounded-2xl border border-border bg-white px-5 py-5">
          <p className="text-sm text-muted-foreground">{t.range}</p>
          <p className="mt-1 text-3xl font-display font-bold tracking-tight text-foreground">{t.price ? eur(t.price) : "Op maat"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.price ? "ex btw per persoon" : "enterprise-offerte, inclusief masterclass voor je MT"}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Simple bulleted list in the site style */
export function DotList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="border-b border-border">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 border-t border-border py-3 text-lg text-foreground">
          <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
