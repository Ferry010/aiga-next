import { createClient } from "@supabase/supabase-js";
import { heroOg, ogSize, ogContentType } from "@/lib/og";

// Share image for an article: its title in the same hero style as the rest of the site
export const alt = "AIGA Kenniscentrum artikel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Kenniscentrum";
  let category = "Artikel";
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data: article } = await supabase.from("articles").select("title, category").eq("slug", slug).single();
    if (article) {
      title = article.title;
      category = article.category || "Artikel";
    }
  } catch {
    // fall back to the defaults
  }
  return heroOg({ title, eyebrow: `Kenniscentrum · ${category}` });
}
