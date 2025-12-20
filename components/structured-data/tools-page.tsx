import type { CollectionPage, WithContext } from "schema-dts";

export function ToolsPageStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kitty-encode.top";
  const collectionPageSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Developer Tools - URL Encoder, Base64, Hash, UUID and More",
    description:
      "Collection of free online developer tools including URL encoder/decoder, Base64 encoder, MD5 generator, UUID generator, password generator, and encoding converter.",
    url: `${baseUrl}/tools`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "WebApplication",
          position: 1,
          name: "URL Encoder / Decoder",
          url: baseUrl,
          applicationCategory: "DeveloperApplication",
          description: "Free online URL encoder and decoder tool",
        },
        {
          "@type": "WebApplication",
          position: 2,
          name: "Base64 Encoder / Decoder",
          url: `${baseUrl}/tools/base64-encoder`,
          applicationCategory: "DeveloperApplication",
          description: "Free online Base64 encoder and decoder tool",
        },
        {
          "@type": "WebApplication",
          position: 3,
          name: "MD5 Hash Generator",
          url: `${baseUrl}/tools/md5-generator`,
          applicationCategory: "DeveloperApplication",
          description: "Free online MD5 hash generator tool",
        },
        {
          "@type": "WebApplication",
          position: 4,
          name: "Encoding Converter",
          url: `${baseUrl}/tools/encoding-converter`,
          applicationCategory: "DeveloperApplication",
          description: "Free online character encoding converter tool",
        },
        {
          "@type": "WebApplication",
          position: 5,
          name: "UUID Generator",
          url: `${baseUrl}/tools/uuid-generator`,
          applicationCategory: "DeveloperApplication",
          description: "Free online UUID generator tool",
        },
        {
          "@type": "WebApplication",
          position: 6,
          name: "Password Generator",
          url: `${baseUrl}/tools/password-generator`,
          applicationCategory: "DeveloperApplication",
          description: "Free online password generator tool",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(collectionPageSchema),
      }}
    />
  );
}
