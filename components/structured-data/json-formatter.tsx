"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function JsonFormatterStructuredData() {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter & Validator",
    description: "Free online JSON formatter, validator and beautifier tool",
    url: "https://devtools.app/tools/json-formatter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Format JSON",
      "Validate JSON",
      "Minify JSON",
      "Beautify JSON",
      "Syntax highlighting",
      "Error detection",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a JSON formatter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A JSON formatter is a tool that takes raw JSON data and formats it with proper indentation and syntax highlighting, making it easier to read and debug.",
        },
      },
      {
        "@type": "Question",
        name: "Is this JSON formatter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this JSON formatter is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool validate JSON?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our JSON formatter automatically validates your JSON and highlights any syntax errors with detailed error messages to help you fix issues quickly.",
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
