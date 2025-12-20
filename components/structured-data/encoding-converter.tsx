import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function EncodingConverterStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Character Encoding Converter",
    description:
      "Free online character encoding converter tool. Convert text between UTF-8, GBK, Hex, Binary, and Unicode formats instantly.",
    url: `${baseUrl}/tools/encoding-converter`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "UTF-8 encoding conversion",
      "GBK encoding support",
      "Hexadecimal conversion",
      "Binary encoding",
      "Unicode conversion",
      "Fix garbled text",
      "Encoding detection",
      "Real-time conversion",
      "Works offline",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is character encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Character encoding is a system that maps characters to numerical values. Different encodings like UTF-8, GBK, and ASCII represent characters using different byte sequences, which is why you sometimes see garbled text when the wrong encoding is used.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix garbled text?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Garbled text usually occurs when the wrong encoding is used to read text. Try converting between different encodings (UTF-8, GBK, etc.) to find the correct one. Our converter can help you identify and fix encoding issues.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between UTF-8 and GBK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UTF-8 is a universal encoding that supports all Unicode characters and is the standard for web content. GBK is primarily used for Simplified Chinese characters and is a legacy encoding system. UTF-8 can represent Chinese characters more efficiently.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use hexadecimal encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hexadecimal encoding is useful when you need to represent binary data in a human-readable format. It's commonly used in programming, cryptography, and debugging to visualize byte sequences.",
        },
      },
      {
        "@type": "Question",
        name: "Is this encoding converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this character encoding converter is completely free to use. No signup or registration required. All conversions happen locally in your browser for maximum privacy and security.",
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
