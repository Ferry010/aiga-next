import type { Metadata } from "next";
import AiToolsOverzichtClient from "@/components/AiToolsOverzichtClient";

export const metadata: Metadata = {
  title: "Welke AI-tools vallen onder de EU AI Act? | AIGA",
  description:
    "Overzicht van 49 veelgebruikte AI-tools — met type, standaard categorie en wanneer ze hoog risico worden volgens de EU AI Act.",
  alternates: { canonical: "/ai-tools-onder-de-ai-act" },
};

export default function AiToolsOnderDeAiActPage() {
  return <AiToolsOverzichtClient />;
}
