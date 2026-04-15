import type { Metadata } from "next";
import BoetecalculatorClient from "@/components/BoetecalculatorClient";

export const metadata: Metadata = {
  title: "Boetecalculator EU AI Act | Wat kost niet-compliance jouw organisatie? | AIGA",
  description:
    "Bereken in 2 minuten hoeveel boete jouw organisatie riskeert onder de EU AI Act. Gratis calculator op basis van Artikel 99 — voor MKB en grote bedrijven.",
  alternates: { canonical: "/tools/boetecalculator" },
};

export default function BoetecalculatorPage() {
  return <BoetecalculatorClient />;
}
