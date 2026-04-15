import type { Metadata } from "next";
import AiBeleidstemplateClient from "@/components/AiBeleidstemplateClient";

export const metadata: Metadata = {
  title: "AI-beleid Template | AIGA",
  description:
    "Kant-en-klaar AI-beleidstemplate op basis van de EU AI Act. Pas aan voor jouw organisatie.",
  alternates: { canonical: "/tools/downloads/ai-beleid-opstellen" },
};

export default function AiBeleidstemplateDocumentPage() {
  return <AiBeleidstemplateClient />;
}
