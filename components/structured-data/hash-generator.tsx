"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function HashGeneratorStructuredData() {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hash Generator",
    description:
      "Free online hash generator tool for MD5, SHA1, SHA256, SHA512",
    url: "https://devtools.app/tools/hash-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate MD5 hash",
      "Generate SHA1 hash",
      "Generate SHA256 hash",
      "Generate SHA512 hash",
      "Real-time generation",
      "Copy to clipboard",
      "Multiple hash algorithms",
      "Unicode text support",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a hash generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A hash generator is a tool that creates fixed-size hash values from input text using cryptographic hash functions. Common algorithms include MD5, SHA1, SHA256, and SHA512.",
        },
      },
      {
        "@type": "Question",
        name: "Is this hash generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this hash generator is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What hash algorithms are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our hash generator supports MD5, SHA1, SHA256, and SHA512 algorithms. All generation happens locally in your browser using Web Crypto API and crypto-js library.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure when using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All hash generation happens locally in your browser. Your data is never sent to any server, ensuring complete privacy and security.",
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
