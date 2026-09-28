import type { Metadata } from "next";
import MasterclassClient from "@/components/MasterclassClient";
import CourseSchema from "@/components/seo/CourseSchema";
import { MASTERCLASS_FAQ, faqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "AI-masterclass voor directie en MT: wie bepaalt de grens? | AIGA",
  description:
    "Live masterclass van twee uur voor directie en management over verantwoord AI-gebruik, governance en verantwoordelijkheid. €495 ex btw per persoon, gratis als je 50+ plekken in de teamtraining in één keer boekt.",
  alternates: { canonical: "https://aigeletterdheid.academy/masterclass" },
};

export default function MasterclassPage() {
  return (
    <>
      <CourseSchema
        name="AI-masterclass voor directie en management"
        description="Live masterclass van twee uur over verantwoord AI-gebruik, governance en verantwoordelijkheid voor directie en management. Op locatie of online."
        courseMode="Blended"
        courseWorkload="PT2H"
        price="495"
        offerUrl="https://aigeletterdheid.academy/masterclass"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(MASTERCLASS_FAQ)) }} />
      <MasterclassClient />
    </>
  );
}
