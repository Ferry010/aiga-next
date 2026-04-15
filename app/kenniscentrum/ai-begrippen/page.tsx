import type { Metadata } from "next";
import AiBegrippenClient from "@/components/AiBegrippenClient";

export const metadata: Metadata = {
  title: "AI Begrippen: Glossarium EU AI Act",
  description:
    "Alle belangrijke begrippen uit de EU AI Act helder uitgelegd. Van hoog-risico AI tot conformiteitsbeoordeling — in gewone taal.",
  alternates: { canonical: "/kenniscentrum/ai-begrippen" },
};

export default function AiBegrippenPage() {
  return <AiBegrippenClient />;
}
