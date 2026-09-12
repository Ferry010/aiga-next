import type { Metadata } from "next";
import MasterclassClient from "@/components/MasterclassClient";
import CourseSchema from "@/components/seo/CourseSchema";

export const metadata: Metadata = {
  title: "AI Act Masterclass voor Leidinggevenden | In-company | AIGA",
  description: "Je mensen gebruiken AI, als directie ben jij verantwoordelijk voor hoe. Besloten in-company masterclass voor management: grip op AI-risico's, governance en de EU AI Act. Door Ferry Hoes. Gratis bij 50+ seats.",
  alternates: { canonical: "https://aigeletterdheid.academy/masterclass" },
};

export default function MasterclassPage() {
  return (
    <>
      <CourseSchema
        name="AI Geletterdheid Masterclass voor Leidinggevenden"
        description="Besloten in-company masterclass over AI Act compliance en verantwoord AI-leiderschap voor directie en management in Nederlandse organisaties."
        courseMode="Onsite"
        courseWorkload="PT2H"
        price="495"
        offerUrl="https://aigeletterdheid.academy/contact"
      />
      <MasterclassClient />
    </>
  );
}
