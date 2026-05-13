import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import KenniscentrumClient from "@/components/kenniscentrum/KenniscentrumClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Kenniscentrum AI-Geletterdheid & AI Act | Artikelen | AIGA",
  description: "Artikelen, uitleg en achtergronden over AI-geletterdheid, de EU AI Act en verantwoord AI-gebruik. Geschreven door AI-expert Ferry Hoes.",
  alternates: { canonical: "https://aigeletterdheid.academy/kenniscentrum" },
  openGraph: {
    title: "Kenniscentrum AI-Geletterdheid & AI Act | AIGA",
    description: "Artikelen, uitleg en achtergronden over AI-geletterdheid, de EU AI Act en verantwoord AI-gebruik.",
    url: "https://aigeletterdheid.academy/kenniscentrum",
  },
};

const staticArticles = [
  {
    id: "static-checklist-2026",
    title: "Hoe kies je de juiste AI-geletterdheid training? Een checklist voor 2026.",
    category: "AI-geletterdheid uitgelegd",
    url: "/kenniscentrum/ai-geletterdheid-training-kiezen-checklist-2026",
    image_url: "/assets/artikel-checklist-header.svg",
    content: null,
    slug: "ai-geletterdheid-training-kiezen-checklist-2026",
    labels: ["Checklist", "Buyer's guide", "EU AI Act", "Training kiezen"],
    published_date: "2026-05-13",
    read_time_minutes: 8,
    updated_at: "2026-05-13T00:00:00Z",
  },
  {
    id: "static-landschap-nl",
    title: "Het Nederlandse AI-geletterdheid training landschap: 6 categorieën, en wat ze waard zijn",
    category: "AI-geletterdheid uitgelegd",
    url: "/kenniscentrum/ai-geletterdheid-training-landschap-nederland",
    image_url: "/assets/artikel-landschap-header.svg",
    content: null,
    slug: "ai-geletterdheid-training-landschap-nederland",
    labels: ["Landschap", "Marktoverzicht", "Vergelijking", "Categorieën"],
    published_date: "2026-05-13",
    read_time_minutes: 7,
    updated_at: "2026-05-13T00:00:00Z",
  },
];

export default async function KenniscentrumPage() {
  const supabase = createServerClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, category, url, image_url, content, slug, labels, published_date, read_time_minutes, updated_at")
    .eq("published", true)
    .order("updated_at", { ascending: false, nullsFirst: false });

  const articleList = [
    ...staticArticles,
    ...(articles || []).filter(
      (a) => !staticArticles.some((s) => s.slug === a.slug)
    ),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kenniscentrum AI-Geletterdheid & AI Act",
    description: "Artikelen, uitleg en achtergronden over AI-geletterdheid, de EU AI Act en verantwoord AI-gebruik.",
    url: "https://aigeletterdheid.academy/kenniscentrum",
    inLanguage: "nl",
    publisher: {
      "@type": "EducationalOrganization",
      name: "AIGA — AI Geletterdheid Academy",
      url: "https://aigeletterdheid.academy",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KenniscentrumClient articles={articleList} />
    </>
  );
}
