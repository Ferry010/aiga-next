import type { Metadata } from "next";
import OverAigaClient from "@/components/OverAigaClient";

export const metadata: Metadata = {
  title: "Over AIGA | Waarom we teams leren veilig met AI te werken",
  description: "AI ging sneller dan de begeleiding. AIGA leert teams wat er wel en niet in een AI-tool mag. Gebouwd en gegeven door AI-spreker Ferry Hoes.",
  alternates: { canonical: "https://aigeletterdheid.academy/over-aiga" },
};

export default function OverAigaPage() {
  return <OverAigaClient />;
}
