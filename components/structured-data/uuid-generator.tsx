"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function UuidGeneratorStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UUID Generator",
    description:
      "Free online UUID generator tool. Generate RFC4122 compliant UUID v4, v7, and v1 identifiers instantly.",
    url: `${baseUrl}/tools/uuid-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate UUID v4 (Random)",
      "Generate UUID v7 (Timestamp-based)",
      "Generate UUID v1 (Time-based)",
      "Multiple output formats",
      "Bulk UUID generation",
      "Copy to clipboard",
      "Works offline",
      "RFC4122 compliant",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Universally Unique Identifier) is a 128-bit identifier that is guaranteed to be unique across both time and space. UUIDs are widely used in distributed systems, databases, and applications where unique identification is required without central coordination.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between UUID versions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v4 uses random generation and is the most commonly used. UUID v7 includes a timestamp for better sortability and is recommended for database primary keys. UUID v1 uses MAC address and timestamp but is deprecated for privacy reasons.",
        },
      },
      {
        "@type": "Question",
        name: "Are UUIDs really unique?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the probability of generating duplicate UUIDs is extremely low. For UUID v4, with 122 random bits, the chance of collision is negligible for practical purposes - you would need to generate billions of UUIDs per second for years to have a meaningful collision probability.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use UUIDs as database primary keys?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! UUIDs are excellent for distributed systems where centralized ID generation isn't feasible. UUID v7 is particularly recommended for database primary keys as it includes a timestamp component, making it sortable and improving index performance.",
        },
      },
      {
        "@type": "Question",
        name: "Is this UUID generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this UUID generator is completely free to use. No signup or registration required. All UUID generation happens locally in your browser using the Web Crypto API, ensuring maximum privacy and security.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
