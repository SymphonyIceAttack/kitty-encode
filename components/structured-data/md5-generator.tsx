import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function Md5GeneratorStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MD5 Hash Generator",
    description:
      "Free online MD5 hash generator tool. Generate MD5 checksums from text instantly with support for 32-bit and 16-bit output.",
    url: `${baseUrl}/tools/md5-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate MD5 hash from text",
      "MD5 checksum generation",
      "32-bit and 16-bit output",
      "Real-time hash generation",
      "Copy to clipboard",
      "Works offline",
      "File hash verification",
      "Bulk text processing",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit (16-byte) hash value. It's commonly used for verifying data integrity and creating checksums for files.",
        },
      },
      {
        "@type": "Question",
        name: "Is MD5 secure for passwords?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, MD5 is not considered secure for password hashing due to collision vulnerabilities. It's recommended to use stronger algorithms like SHA-256, bcrypt, or Argon2 for password storage.",
        },
      },
      {
        "@type": "Question",
        name: "What is MD5 used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 is primarily used for data integrity verification, file checksums, and digital signatures. It's also used in non-security contexts like content-based addressing in distributed systems.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate MD5 hash for files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our MD5 generator can create checksums for files to verify their integrity. Simply select or drag and drop a file, and we'll generate its MD5 hash for comparison with the original.",
        },
      },
      {
        "@type": "Question",
        name: "Is this MD5 generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this MD5 generator is completely free to use. No signup or registration required. All hashing happens locally in your browser for maximum privacy and security.",
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
