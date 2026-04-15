import type { Metadata } from "next";
import OverAigaClient from "@/components/OverAigaClient";

export const metadata: Metadata = {
  title: "Over AIGA | AI Geletterdheid Academy Nederland | Ferry Hoes",
  description: "AIGA helpt Nederlandse organisaties met AI-geletterdheid en EU AI Act compliance. Opgericht door Ferry Hoes, AI-expert en keynote spreker.",
  alternates: { canonical: "https://aigeletterdheid.academy/over-aiga" },
};

export default function OverAigaPage() {
  return <OverAigaClient />;
}
