import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://aigeletterdheid.academy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/masterclass`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/kenniscentrum`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gereedheidscan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/over-aiga`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/speakers-academy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Tools
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/boetecalculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/ai-risicoscan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/downloads`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/downloads/ai-act-compliance-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/downloads/ai-beleid-opstellen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // SEO landing pages
    { url: `${BASE_URL}/ai-geletterdheid-nederland`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ai-training-voor-bedrijven`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ai-act-compliance-nederland`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ai-cursus-medewerkers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ai-tools-onder-de-ai-act`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/ai-use-case-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ai-act-deadlines`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Kenniscentrum static
    { url: `${BASE_URL}/kenniscentrum/ai-begrippen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/kenniscentrum/eu-ai-act-in-1-a4`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Legal
    { url: `${BASE_URL}/privacyverklaring`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/licentie`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic article routes from Supabase
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, published_date")
      .eq("published", true);

    if (articles) {
      articleRoutes = articles.map((article) => ({
        url: `${BASE_URL}/kenniscentrum/${article.slug}`,
        lastModified: article.published_date ? new Date(article.published_date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap: failed to fetch articles", e);
  }

  return [...staticRoutes, ...articleRoutes];
}
