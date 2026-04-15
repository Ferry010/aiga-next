import type { Metadata } from "next";
import ComplianceChecklistClient from "@/components/ComplianceChecklistClient";

export const metadata: Metadata = {
  title: "AI Act Compliance Checklist | AIGA",
  description:
    "Stap-voor-stap compliance checklist voor deployers op basis van EU AI Act Verordening 2024/1689.",
  alternates: { canonical: "/tools/downloads/ai-act-compliance-checklist" },
};

export default function ComplianceChecklistPage() {
  return <ComplianceChecklistClient />;
}
