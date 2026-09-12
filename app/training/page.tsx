import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "AI-Geletterdheid Training voor Teams in Nederland | Certificaat | AIGA",
  description: "Je mensen gebruiken AI al. Train je hele team op de risico's: welke data eruit blijft, shadow AI, en veilig én nuttig gebruik. Online, selfpaced, met examen en certificaat. Kant-en-klaar.",
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
