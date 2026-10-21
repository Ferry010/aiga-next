import type { Metadata } from "next";
import AanbevelenClient from "@/components/AanbevelenClient";

export const metadata: Metadata = {
  title: "Aanbevelen: €25 per plek voor elke organisatie die je inbrengt | AIGA",
  description:
    "Ken je een organisatie die AI gebruikt zonder training? Breng ze in bij AIGA. Jij krijgt €25 per plek, vanaf 50 plekken 10% van de factuur. Zij krijgen een gratis webinar of workshop.",
  alternates: { canonical: "https://aigeletterdheid.academy/aanbevelen" },
};

export default function AanbevelenPage() {
  return <AanbevelenClient />;
}
