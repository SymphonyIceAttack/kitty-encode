import type { Metadata } from "next";
import { EncodingConverterGuideContent } from "@/components/blog/guides/encoding-converter-guide-content";
import { EncodingConverterGuideStructuredData } from "@/components/structured-data/blog-post";
import { EncodingConverterGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title:
    "Text Encoding Formats: Hex, Binary, and Base Encodings Guide - KittyEncode",
  description:
    "Master text encoding formats with our comprehensive guide. Understand byte-level mechanics of ASCII, Hex, Binary, and Base64. Learn how these encodings represent the same underlying data in different formats.",
  keywords:
    "hex encoding, binary encoding, base64, text encoding, data serialization, byte-level encoding, hex converter, binary representation, encoding formats, transfer encoding",
  authors: [{ name: "Engineering Team", url: `${siteUrl}/about` }],
  creator: "Engineering Team",
  publisher: "KittyEncode",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${siteUrl}/en/blog/encoding-converter-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-converter-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/encoding-converter-guide`,
    title:
      "Text Encoding Formats: Hex, Binary, and Base Encodings Guide - KittyEncode",
    description:
      "Master text encoding formats. Understand byte-level mechanics of ASCII, Hex, Binary, and Base64.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/encoding-converter-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Text Encoding Formats Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Text Encoding Formats: Hex, Binary, and Base Encodings Guide",
    description:
      "Master text encoding formats. Understand byte-level mechanics of ASCII, Hex, Binary, and Base64.",
    images: [`${siteUrl}/images/blog/encoding-converter-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function EncodingConverterGuidePage() {
  return (
    <>
      <EncodingConverterGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EncodingConverterGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Encoding Converter Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <EncodingConverterGuideContent />
      </div>
    </>
  );
}
