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

export default async function KenniscentrumPage() {
  const supabase = createServerClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, category, url, image_url, content, slug, labels, published_date, read_time_minutes")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const articleList = articles || [];

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
