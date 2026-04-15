'use client';
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/BreadcrumbNav";

interface Article {
  id: string;
  title: string;
  category: string;
  url: string;
  image_url: string;
  content: string | null;
  slug: string | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  published_date: string | null;
  read_time_minutes: number | null;
  meta_description: string | null;
  seo_keywords: string | null;
  h1_override: string | null;
}

interface AdjacentArticle {
  title: string;
  slug: string | null;
  category: string;
  image_url: string;
}

interface Props {
  article: Article;
  prevArticle: AdjacentArticle | null;
  nextArticle: AdjacentArticle | null;
}

const FERRY_BIO = "Ferry Hoes is veelgevraagd spreker en trainer op het gebied van AI-geletterdheid. Hij staat meermaals per maand op het podium voor organisaties zoals a.s.r., VodafoneZiggo en verschillende ministeries. In 2020 won hij de Anti-Discriminatie AI-Hackathon van de Nederlandse overheid.";

function stripLeadingTitle(content: string, title: string): string {
  const titleNorm = title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  return content.replace(/^\s*#\s+\*{0,2}([^*\n]+)\*{0,2}\s*\n*/m, (match, heading) => {
    const headingNorm = heading.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    if (headingNorm === titleNorm || titleNorm.includes(headingNorm) || headingNorm.includes(titleNorm)) return "";
    return match;
  });
}

function extractH2Headings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/\*\*/g, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
    headings.push({ id, text });
  }
  return headings;
}

export default function ArticleDetailClient({ article, prevArticle, nextArticle }: Props) {
  const router = useRouter();

  const handleInternalLinkClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href && (href.startsWith("/kenniscentrum") || href.startsWith("/training") || href.startsWith("/masterclass") || href.startsWith("/faq") || href.startsWith("/over-aiga") || href.startsWith("/contact") || href.startsWith("/gereedheidscan") || href.startsWith("/tools"))) {
      e.preventDefault();
      router.push(href);
    }
  }, [router]);

  const articleContent = useMemo(() => {
    if (!article?.content) return "Geen content beschikbaar.";
    return stripLeadingTitle(article.content, article.title);
  }, [article]);

  const wordCount = useMemo(() => articleContent.split(/\s+/).length, [articleContent]);
  const readingTime = article?.read_time_minutes || Math.max(1, Math.ceil(wordCount / 200));
  const headings = useMemo(() => extractH2Headings(articleContent), [articleContent]);
  const showToc = wordCount >= 600 && headings.length >= 2;

  const publishedDate = article.published_date
    ? article.published_date + "T00:00:00Z"
    : article.created_at ? new Date(article.created_at).toISOString() : "2025-01-15T00:00:00Z";

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  };

  const isHtmlContent = (text: string) => /^\s*<[a-z][\s\S]*>/i.test(text);

  const displayTitle = article.h1_override || article.title;

  return (
    <div className="min-h-screen">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Kenniscentrum", href: "/kenniscentrum" },
          { label: displayTitle },
        ]}
      />

      {/* Hero image */}
      {article.image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img
              src={article.image_url}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatedSection>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.read_time_minutes && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> {readingTime} min lezen
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight mb-4">
            {displayTitle}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <img
              src="/assets/ferry-hoes.gif"
              alt="Ferry Hoes"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">Ferry Hoes</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(publishedDate)}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* TOC sidebar */}
          {showToc && (
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Inhoudsopgave</p>
                <ul className="space-y-2">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Article content */}
          <article className="flex-1 min-w-0">
            <div
              className="prose prose-neutral max-w-none"
              onClick={handleInternalLinkClick}
            >
              {isHtmlContent(articleContent) ? (
                <div dangerouslySetInnerHTML={{ __html: articleContent }} />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                  }}
                >
                  {articleContent}
                </ReactMarkdown>
              )}
            </div>

            {/* Sources */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Bronnen</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">EUR-Lex — EU AI Act (Verordening 2024/1689)</a></li>
                <li><a href="https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Rijksoverheid.nl — Kunstmatige Intelligentie</a></li>
              </ul>
            </div>

            {/* Author bio */}
            <div className="mt-10 bg-card border border-border rounded-xl p-6 flex gap-4">
              <img
                src="/assets/ferry-hoes.gif"
                alt="Ferry Hoes"
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="font-semibold text-foreground">Ferry Hoes</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{FERRY_BIO}</p>
              </div>
            </div>
          </article>
        </div>

        {/* Prev/Next navigation */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle?.slug && (
            <Link
              href={`/kenniscentrum/${prevArticle.slug}`}
              className="group flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/40 transition-all"
            >
              <ArrowLeft size={18} className="text-muted-foreground group-hover:text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Vorig artikel</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{prevArticle.title}</p>
              </div>
            </Link>
          )}
          {nextArticle?.slug && (
            <Link
              href={`/kenniscentrum/${nextArticle.slug}`}
              className="group flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/40 transition-all ml-auto sm:ml-0"
            >
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Volgend artikel</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{nextArticle.title}</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary shrink-0" />
            </Link>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-accent border border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">Klaar om je team te certificeren?</h3>
          <p className="text-muted-foreground text-sm mb-6">Bekijk de AI-geletterdheid training of doe eerst de gratis gereedheidscan.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/training" className="btn-neon px-6 py-3 rounded-lg text-sm">Bekijk de training</Link>
            <Link href="/gereedheidscan" className="btn-neon-outline px-6 py-3 rounded-lg text-sm font-semibold">Doe de scan</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
