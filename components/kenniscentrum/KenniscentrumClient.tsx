'use client';
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import SectionLabel from "@/components/SectionLabel";
import { Badge } from "@/components/ui/badge";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import DefinitionBlock from "@/components/DefinitionBlock";

interface TopicFilter {
  label: string;
  slug: string;
  match: (a: Article) => boolean;
}

const ciMatch = (haystack: string[], needles: string[]) =>
  needles.some((n) => haystack.some((h) => h.toLowerCase() === n.toLowerCase()));

const topicFilters: TopicFilter[] = [
  { label: "Alle", slug: "alle", match: () => true },
  {
    label: "EU AI Act",
    slug: "eu-ai-act",
    match: (a) =>
      a.category === "Wetten en regels" ||
      ciMatch(a.labels || [], ["EU AI Act", "Artikel 4", "Artikel 99", "Wetgeving", "Boetes"]),
  },
  {
    label: "AI-geletterdheid",
    slug: "ai-geletterdheid",
    match: (a) =>
      a.category === "AI-geletterdheid uitgelegd" ||
      ciMatch(a.labels || [], ["AI geletterdheid", "AI training", "AI Geletterdheid"]),
  },
  {
    label: "Compliance & governance",
    slug: "compliance-governance",
    match: (a) =>
      ciMatch(a.labels || [], ["Compliance", "Governance", "AI-beleid", "Bestuursverantwoordelijkheid"]),
  },
  {
    label: "Sectoren & praktijk",
    slug: "sectoren-praktijk",
    match: (a) =>
      a.category === "Praktijk en sectoren" ||
      ciMatch(a.labels || [], ["HR", "IT", "CIO", "Onderwijs", "Zorg", "Overheid", "MKB"]),
  },
  {
    label: "Tools & vaardigheden",
    slug: "tools-vaardigheden",
    match: (a) =>
      a.category === "Tools en vaardigheden" ||
      ciMatch(a.labels || [], ["Shadow AI", "Prompt engineering", "AI-tools"]),
  },
  {
    label: "Actueel",
    slug: "actueel",
    match: (a) => a.category === "Actueel",
  },
];

interface Article {
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
  labels: string[];
  published_date: string | null;
  read_time_minutes: number | null;
  updated_at: string | null;
  meta_description?: string | null;
}

interface Props {
  articles: Article[];
  featuredSlug?: string;
}

export default function KenniscentrumClient({ articles, featuredSlug }: Props) {
  const [activeTopic, setActiveTopic] = useState<string>("alle");

  const featured = articles.find((a) => a.slug === featuredSlug && a.content);
  const activeFilter = topicFilters.find((f) => f.slug === activeTopic) || topicFilters[0];
  const filteredArticles = articles.filter((a) => a !== featured).filter(activeFilter.match);

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={[{ label: "Home", href: "/" }, { label: "Kenniscentrum" }]} />

      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="KENNISCENTRUM" />
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight mt-4">
              Wat je team over AI moet weten.<br />
              <span className="text-primary">Voordat er iets misgaat.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Artikelen, uitleg en achtergronden over de AI Act, AI op de werkvloer en verantwoord AI-gebruik. Geschreven door Ferry Hoes.
            </p>
          </AnimatedSection>

          <DefinitionBlock
            term="Wat is AI-geletterdheid?"
            definition="AI-geletterdheid is dat medewerkers begrijpen wat AI is, waar het misgaat en hoe ze het veilig en verantwoord inzetten in hun eigen werk. Artikel 4 van de EU AI Act vraagt organisaties sinds februari 2025 om de AI-geletterdheid te ondersteunen van iedereen die met AI werkt."
          />
        </div>
      </section>

      {featured && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <Link
                href={`/kenniscentrum/${featured.slug}`}
                className="press group grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_20px_50px_-30px_hsl(256_56%_33%/0.35)] transition-shadow hover:shadow-[0_30px_60px_-30px_hsl(256_56%_33%/0.45)]"
              >
                <div className="aspect-video overflow-hidden bg-muted lg:aspect-auto">
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
                    {featured.title}
                  </h2>
                  {featured.meta_description && (
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{featured.meta_description}</p>
                  )}
                  <p className="mt-4 text-muted-foreground">
                    De basis die elke medewerker nodig heeft, met links naar alle verdiepende artikelen.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-primary">
                    Lees het artikel{featured.read_time_minutes ? `, ${featured.read_time_minutes} min` : ""}{" "}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="pb-8" id="artikelen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionLabel text="ARTIKELEN & BLOGS" />
          </AnimatedSection>
          <div className="flex flex-wrap gap-2 mt-4">
            {topicFilters.map((filter) => (
              <button
                key={filter.slug}
                id={filter.slug !== "alle" ? filter.slug : undefined}
                onClick={() => setActiveTopic(filter.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTopic === filter.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const isImported = !!(article.content && article.slug);
              const CardContentEl = (
                <>
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      {(article.labels || []).map((label) => (
                        <Badge key={label} variant="outline" className="text-xs text-muted-foreground">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                      <span>Ferry Hoes</span>
                      <div className="flex items-center gap-3">
                        {article.published_date && (
                          <span>{new Date(article.published_date).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}</span>
                        )}
                        {article.read_time_minutes && (
                          <span>{article.read_time_minutes} min</span>
                        )}
                        {!isImported && <ExternalLink size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </div>
                    </div>
                  </div>
                </>
              );

              return (
                <div key={article.id}>
                  {isImported ? (
                    <Link
                      href={`/kenniscentrum/${article.slug}`}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                    >
                      {CardContentEl}
                    </Link>
                  ) : (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 neon-glow transition-all duration-300 flex flex-col h-full"
                    >
                      {CardContentEl}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
