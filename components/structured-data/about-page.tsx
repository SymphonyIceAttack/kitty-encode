"use client";

import type { AboutPage, Organization, WithContext } from "schema-dts";

export function AboutPageStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Free online developer tools for JSON, Base64, Hash, UUID and more. Privacy-first, offline-capable tools for developers worldwide.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/contact`,
    },
    sameAs: [baseUrl, `${baseUrl}/about`, `${baseUrl}/contact`],
  };

  const aboutPageSchema: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About KittyEncode",
    description:
      "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide. Privacy-first approach with offline capabilities.",
    url: `${baseUrl}/about`,
    mainEntity: organizationSchema,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
    </>
  );
}
