import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "Teamtraining: geef je hele team dezelfde AI-basis | AIGA",
  description: "De online training van AIGA leert je hele team generatieve AI veilig, kritisch en effectief gebruiken. Uitrollen naar iedereen, een paar uur per persoon. Jij bouwt niets.",
  alternates: { canonical: "https://aigeletterdheid.academy/training" },
};

export default function TrainingPage() {
  return (
    <>
      <CourseSchema
        name="AI-Geletterdheid voor Teams"
        description="Online AI-training die je hele team generatieve AI veilig, kritisch en effectief leert gebruiken. Met een toets en een deelnamebewijs op naam."
        courseMode="Online"
        courseWorkload="PT2H"
        price="249"
        offerUrl="https://aigeletterdheid.academy/training"
      />
      <TrainingClient />
    </>
  );
}
