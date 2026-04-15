import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const alt = "AIGA Kenniscentrum artikel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  let title = "Kenniscentrum";
  let category = "Artikel";

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: article } = await supabase
      .from("articles")
      .select("title, category")
      .eq("slug", params.slug)
      .single();

    if (article) {
      title = article.title;
      category = article.category || "Artikel";
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            borderRadius: "12px",
            padding: "8px 20px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
            letterSpacing: "0.05em",
          }}
        >
          {category.toUpperCase()}
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "950px",
            marginBottom: "32px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#7c3aed",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          AI Geletterdheid Academy
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            color: "#52525b",
            fontSize: "18px",
          }}
        >
          aigeletterdheid.academy/kenniscentrum
        </div>
      </div>
    ),
    { ...size }
  );
}
