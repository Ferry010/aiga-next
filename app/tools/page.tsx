import type { Metadata } from "next";
import ToolsClient from "@/components/ToolsClient";

export const metadata: Metadata = {
  title: "Tools & Scans | AI Act Compliance | AIGA",
  description:
    "Praktische tools om jouw AI Act compliance te beoordelen. Risicoscan, boetecalculator, checklists en templates — gratis te gebruiken.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
