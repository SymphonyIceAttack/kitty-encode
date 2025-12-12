"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function QrGeneratorStructuredData() {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Generator",
    description: "Free online QR code generator tool",
    url: "https://devtools.app/tools/qr-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate QR codes for text",
      "Generate QR codes for URLs",
      "Generate QR codes for contact info",
      "Customizable size and colors",
      "Download as PNG",
      "Error correction levels",
      "Multiple data types support",
      "Real-time preview",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a QR code generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A QR code generator is a tool that creates QR codes from text, URLs, contact information, or other data. QR codes are two-dimensional barcodes that can be scanned by smartphones and other devices to quickly access information.",
        },
      },
      {
        "@type": "Question",
        name: "Is this QR code generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this QR code generator is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What types of data can I create QR codes for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can create QR codes for text, URLs, email addresses, phone numbers, SMS messages, WiFi credentials, contact information (vCard), and many other types of data.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the appearance of my QR codes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can customize the size, colors (foreground and background), error correction level, and margin of your QR codes. You can also download them as PNG images.",
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
