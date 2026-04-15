import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact — AIGA AI Geletterdheid Academy | Offerte Aanvragen",
  description: "Neem contact op voor AI-geletterdheid training, masterclass of offerte. Direct antwoord, geen verplichtingen.",
  alternates: { canonical: "https://aigeletterdheid.academy/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
