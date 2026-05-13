interface CourseSchemaProps {
  name: string;
  description: string;
  courseMode: "Online" | "Onsite" | "Blended";
  courseWorkload: string; // ISO 8601 duration e.g. "PT3H"
  price: string;
  offerUrl: string;
}

export default function CourseSchema({
  name,
  description,
  courseMode,
  courseWorkload,
  price,
  offerUrl,
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "AI Geletterdheid Academy",
      sameAs: "https://aigeletterdheid.academy",
    },
    inLanguage: "nl-NL",
    teaches: [
      "AI Act Artikel 4",
      "Verantwoord AI-gebruik",
      "AI-risicoherkenning",
      "Compliance en governance",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode,
      courseWorkload,
      instructor: { "@type": "Person", name: "Ferry Hoes" },
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: offerUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
