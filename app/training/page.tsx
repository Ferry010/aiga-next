import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "AI-Geletterdheid Training voor Teams in Nederland | Certificaat | AIGA",
  description: "Maak je team echt goed in AI: slim prompten, veilig werken, meer uit AI halen. Online AI-geletterdheid training, selfpaced, 2-3 uur. Met examen en certificaat. Meteen EU AI Act-proof.",
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
