import type { Metadata } from "next";
import MasterclassClient from "@/components/MasterclassClient";

export const metadata: Metadata = {
  title: "AI Act Masterclass voor Leidinggevenden | In-company | AIGA",
  description: "Besloten AI Act masterclass voor directie en management in Nederland. Gegeven door AI-expert Ferry Hoes. Op locatie of online. Gratis bij 50+ seats.",
  alternates: { canonical: "https://aigeletterdheid.academy/masterclass" },
};

export default function MasterclassPage() {
  return <MasterclassClient />;
}
