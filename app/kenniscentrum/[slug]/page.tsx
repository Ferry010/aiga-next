import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ArticleDetailClient from "@/components/kenniscentrum/ArticleDetailClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, meta_description, seo_keywords, image_url, published_date, updated_at")
    .eq("slug", params.slug)
    .single();

  if (!article) return { title: "Artikel niet gevonden" };

  return {
    title: article.title,
    description: article.meta_description || undefined,
    keywords: article.seo_keywords || undefined,
    openGraph: {
      title: article.title,
      description: article.meta_description || undefined,
      images: article.image_url ? [{ url: article.image_url, width: 1200, height: 630 }] : undefined,
      type: "article",
      publishedTime: article.published_date || undefined,
      modifiedTime: article.updated_at || undefined,
    },
    alternates: { canonical: `https://aigeletterdheid.academy/kenniscentrum/${params.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient();

  const [{ data: article }, { data: allArticles }] = await Promise.all([
    supabase.from("articles").select("*").eq("slug", params.slug).single(),
    supabase
      .from("articles")
      .select("id, title, slug, category, image_url, sort_order")
      .eq("published", true)
      .not("slug", "is", null)
      .order("sort_order"),
  ]);

  if (!article) notFound();

  const currentIndex = (allArticles || []).findIndex((a) => a.slug === params.slug);
  const prevArticle = currentIndex > 0 ? (allArticles![currentIndex - 1] as { title: string; slug: string | null; category: string; image_url: string }) : null;
  const nextArticle =
    currentIndex < (allArticles?.length || 0) - 1
      ? (allArticles![currentIndex + 1] as { title: string; slug: string | null; category: string; image_url: string })
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    image: article.image_url,
    datePublished: article.published_date,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: "Ferry Hoes", url: "https://ferryhoes.com" },
    publisher: { "@type": "Organization", name: "AIGA", url: "https://aigeletterdheid.academy" },
    url: `https://aigeletterdheid.academy/kenniscentrum/${params.slug}`,
    inLanguage: "nl",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aigeletterdheid.academy" },
      { "@type": "ListItem", position: 2, name: "Kenniscentrum", item: "https://aigeletterdheid.academy/kenniscentrum" },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ArticleDetailClient article={article} prevArticle={prevArticle} nextArticle={nextArticle} />
    </>
  );
}
