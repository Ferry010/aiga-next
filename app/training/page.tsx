import type { Metadata } from "next";
import TrainingClient from "@/components/TrainingClient";
import CourseSchema from "@/components/seo/CourseSchema";
import { TRAINING_FAQ, faqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Teamtraining AI: weet iedereen wat er niet in ChatGPT mag? | AIGA",
  description:
    "Online AI-training voor je hele team: vier modules, tussentijdse toetsen, digitaal eindexamen en certificaat van deelname. €249 ex btw per persoon, binnen 2 werkdagen live.",
  alternates: { canonical: "https://aigeletterdheid.academy/training" },
};

export default function TrainingPage() {
  return (
    <>
      <CourseSchema
        name="AI-Geletterdheid voor Teams"
        description="Online AI-training in vier modules die je hele team leert AI veilig, verantwoord en slim te gebruiken. Met tussentijdse toetsen, een digitaal eindexamen en een certificaat van deelname."
        courseMode="Online"
        courseWorkload="PT2H"
        price="249"
        offerUrl="https://aigeletterdheid.academy/training"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(TRAINING_FAQ)) }} />
      <TrainingClient />
    </>
  );
}
