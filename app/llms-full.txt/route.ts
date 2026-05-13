import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function GET() {
  const supabase = createServerClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, category, meta_description, content, updated_at, published_date, read_time_minutes")
    .eq("published", true)
    .not("slug", "is", null)
    .order("updated_at", { ascending: false, nullsFirst: false })
    .limit(20);

  const lines: string[] = [
    "# AI Geletterdheid Academy (AIGA) — Volledige kennisbasis",
    "",
    "> AIGA helpt Nederlandse organisaties voldoen aan de EU AI Act via gecertificeerde online AI-geletterdheid training voor teams en in-company masterclasses voor directie en management.",
    "",
    "Opgericht door Ferry Hoes (AI-expert, winnaar Anti-Discriminatie AI-Hackathon Nederlandse Overheid 2020), onderdeel van Brand Humanizing Institute.",
    "",
    "---",
    "",
    "## Kenniscentrum artikelen",
    "",
  ];

  for (const article of articles ?? []) {
    const url = `https://aigeletterdheid.academy/kenniscentrum/${article.slug}`;
    const date = article.updated_at ?? article.published_date ?? "";
    const readTime = article.read_time_minutes ? `${article.read_time_minutes} min lezen` : "";

    lines.push(`### ${article.title}`);
    lines.push(`URL: ${url}`);
    if (date) lines.push(`Datum: ${date.slice(0, 10)}`);
    if (article.category) lines.push(`Categorie: ${article.category}`);
    if (readTime) lines.push(`Leestijd: ${readTime}`);
    lines.push("");

    if (article.meta_description) {
      lines.push(article.meta_description);
      lines.push("");
    }

    if (article.content) {
      const plain = stripHtml(article.content);
      const excerpt = plain.length > 1200 ? plain.slice(0, 1200) + "…" : plain;
      lines.push(excerpt);
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
