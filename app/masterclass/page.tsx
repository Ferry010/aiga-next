import type { Metadata } from "next";
import MasterclassClient from "@/components/MasterclassClient";

export const metadata: Metadata = {
  title: "Masterclass voor directie en management | AIGA",
  description: "Een live masterclass voor wie de beslissingen neemt. Over verantwoord AI-gebruik, governance en waar jouw aansprakelijkheid ligt. Door Ferry Hoes.",
  alternates: { canonical: "https://aigeletterdheid.academy/masterclass" },
};

export default function MasterclassPage() {
  return <MasterclassClient />;
}
