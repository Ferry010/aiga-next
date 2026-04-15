import type { Metadata } from "next";
import AiRisicoscanClient from "@/components/AiRisicoscanClient";

export const metadata: Metadata = {
  title: "AI Risicoscan | Welke AI-tools gebruikt jouw organisatie? | AIGA",
  description:
    "Selecteer de AI-tools die jouw organisatie gebruikt en krijg direct een risicoprofiel per tool en een compliance-overzicht onder de EU AI Act.",
  alternates: { canonical: "/tools/ai-risicoscan" },
};

export default function AiRisicoscanPage() {
  return <AiRisicoscanClient />;
}
