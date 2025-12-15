"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function Base64EncoderStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Base64 Encoder & Decoder",
    description: "Free online Base64 encoder and decoder tool",
    url: `${baseUrl}/tools/base64-encoder`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Encode text to Base64",
      "Decode Base64 to text",
      "Real-time conversion",
      "URL-safe Base64",
      "Error handling",
      "Copy to clipboard",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Base64 encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to transmit binary data over systems that can only reliably handle text.",
        },
      },
      {
        "@type": "Question",
        name: "Is this Base64 tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this Base64 encoder and decoder is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I encode and decode Base64 offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Base64 tool works completely offline. All encoding and decoding happens in your browser, so you can use it without an internet connection.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure when using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All Base64 encoding and decoding happens locally in your browser. Your data is never sent to any server, ensuring complete privacy and security.",
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
