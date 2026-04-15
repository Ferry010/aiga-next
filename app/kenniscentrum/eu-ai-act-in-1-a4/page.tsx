import type { Metadata } from "next";
import EuAiActA4Client from "@/components/EuAiActA4Client";

export const metadata: Metadata = {
  title: "EU AI Act in 1 A4 — Samenvatting | AIGA Academy",
  description:
    "De volledige EU AI Act samengevat op 1 A4. Tijdlijn, risicocategorieën, verplichtingen en boetes — printbaar en deelbaar.",
  alternates: { canonical: "/kenniscentrum/eu-ai-act-in-1-a4" },
};

export default function EuAiActA4Page() {
  return <EuAiActA4Client />;
}
