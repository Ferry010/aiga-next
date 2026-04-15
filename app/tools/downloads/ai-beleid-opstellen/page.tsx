import type { Metadata } from "next";
import BeleidstemplateLandingClient from "@/components/BeleidstemplateLandingClient";

export const metadata: Metadata = {
  title: "AI Beleid Opstellen: Gratis Template voor EU AI Act Compliance | AIGA",
  description:
    "Download een gratis, invulbaar AI-beleidstemplate. Voldoe aan de documentatie-eisen van de EU AI Act met een kant-en-klaar organisatiebeleid voor verantwoord AI-gebruik.",
  alternates: { canonical: "/tools/downloads/ai-beleid-opstellen" },
};

export default function BeleidstemplateLandingPage() {
  return <BeleidstemplateLandingClient />;
}
