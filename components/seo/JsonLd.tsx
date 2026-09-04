import React from "react";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Terrain Business Solutions",
    url: "https://terrainbusiness.com",
    logo: "https://terrainbusiness.com/images/logo/Terrain%20Vertical%20White.png",
    description:
      "A design-driven technology and digital solutions company based in Dubai, UAE.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.linkedin.com/company/terrainbusiness",
      "https://twitter.com/terrainbiz",
      "https://www.instagram.com/terrainbusiness",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@terrainbusiness.com",
      telephone: "+971524145668",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
