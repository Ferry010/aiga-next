import type { Metadata } from "next";
import ChecklistLandingClient from "@/components/ChecklistLandingClient";

export const metadata: Metadata = {
  title: "AI Act Compliance Checklist: Gratis Download voor Deployers | AIGA",
  description:
    "Download de gratis AI Act Compliance Checklist. 10 secties met alle deployer-verplichtingen uit de EU AI Act, inclusief Artikel 4 en 26. Direct toepasbaar als werkdocument of auditbijlage.",
  alternates: { canonical: "/tools/downloads/ai-act-compliance-checklist" },
};

export default function ChecklistLandingPage() {
  return <ChecklistLandingClient />;
}
