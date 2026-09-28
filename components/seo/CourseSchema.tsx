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
      "Begrijpen wat AI is",
      "Veilig en verantwoord werken met AI",
      "Slim werken met AI",
      "AI toepassen in je werk",
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
