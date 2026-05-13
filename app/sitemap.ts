import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

const BASE_URL = "https://aigeletterdheid.academy";

const staticRoutes: Array<{ url: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { url: BASE_URL,                                                         changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE_URL}/training`,                                           changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/masterclass`,                                        changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/kenniscentrum`,                                      changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/gereedheidscan`,                                     changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/faq`,                                                changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-act-deadlines`,                                   changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-act-compliance-nederland`,                        changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-geletterdheid-nederland`,                         changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-training-voor-bedrijven`,                         changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-cursus-medewerkers`,                              changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-tools-onder-de-ai-act`,                          changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/ai-use-case-checker`,                                changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`,                                            changeFrequency: "yearly",  priority: 0.7 },
  { url: `${BASE_URL}/over-aiga`,                                          changeFrequency: "yearly",  priority: 0.6 },
  { url: `${BASE_URL}/speakers-academy`,                                   changeFrequency: "yearly",  priority: 0.5 },
  { url: `${BASE_URL}/tools`,                                              changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/ai-risicoscan`,                               changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/boetecalculator`,                             changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/downloads`,                                    changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/downloads/ai-act-compliance-checklist`,       changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/downloads/ai-beleid-opstellen`,               changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools/downloads/ai-beleid-template`,               changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/kenniscentrum/ai-begrippen`,                                         changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/kenniscentrum/eu-ai-act-in-1-a4`,                                 changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/kenniscentrum/ai-geletterdheid-training-kiezen-checklist-2026`,    changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/kenniscentrum/ai-geletterdheid-training-landschap-nederland`,      changeFrequency: "monthly", priority: 0.8 },
{ url: `${BASE_URL}/privacyverklaring`,                                  changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE_URL}/licentie`,                                           changeFrequency: "yearly",  priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerClient();
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, updated_at, published_date")
      .eq("published", true)
      .not("slug", "is", null);

    if (articles) {
      articleRoutes = articles.map((article) => ({
        url: `${BASE_URL}/kenniscentrum/${article.slug}`,
        lastModified: article.updated_at ?? article.published_date ?? undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap: failed to fetch articles", e);
  }

  return [...staticRoutes, ...articleRoutes];
}
