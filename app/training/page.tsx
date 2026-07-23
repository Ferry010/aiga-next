import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "AI-Geletterdheid Training voor Teams in Nederland | Certificaat | AIGA",
  description: "Online AI-geletterdheid training voor teams in Nederland. Voldoe aan de EU AI Act. AI Literacy Practitioner certificaat. Selfpaced, 2-3 uur, per seat beschikbaar.",
  alternates: { canonical: "https://aigeletterdheid.academy/training" },
};

export default function TrainingPage() {
  return (
    <>
      <CourseSchema
        name="AI-Geletterdheid voor Teams"
        description="Online AI-geletterdheid training voor Nederlandse organisaties. Voldoe aan EU AI Act Artikel 4 met een digitaal certificaat op naam."
        courseMode="Online"
        courseWorkload="PT3H"
        price="249"
        offerUrl="https://aigeletterdheid.academy/contact"
      />
      <TrainingClient />
    </>
  );
}
