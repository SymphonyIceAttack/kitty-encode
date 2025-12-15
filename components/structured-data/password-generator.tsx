"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";

export function PasswordGeneratorStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Password Generator",
    description:
      "Free online password generator tool. Create strong, secure random passwords and API keys with customizable options for maximum security.",
    url: `${baseUrl}/tools/password-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate secure passwords",
      "Customizable password length",
      "Include/exclude character types",
      "API key generation",
      "Cryptographically secure",
      "Copy to clipboard",
      "Works offline",
      "Password strength indicator",
      "No data retention",
    ],
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How secure are the generated passwords?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our password generator uses cryptographically secure random number generation, ensuring that passwords are truly random and unpredictable. The security depends on the length and character variety you choose.",
        },
      },
      {
        "@type": "Question",
        name: "What makes a password strong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Longer passwords with more character variety are exponentially stronger.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these passwords for important accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the passwords generated are cryptographically secure and suitable for any account. However, we recommend using a password manager to store them securely and enable two-factor authentication where possible.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store or track the passwords I generate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we do not store, track, or log any passwords you generate. All password generation happens locally in your browser using the Web Crypto API, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What is the recommended password length?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most purposes, 12-16 characters is sufficient. For highly sensitive accounts, 20+ characters is recommended. The longer the password, the exponentially more secure it becomes.",
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
