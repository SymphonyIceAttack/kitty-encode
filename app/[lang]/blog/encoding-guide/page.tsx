import type { Metadata } from "next";
import { EncodingGuideContent } from "@/components/blog/guides/encoding-guide-content";
import { EncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { EncodingGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Character Encoding: The UTF-8 Engineering Guide - KittyEncode",
  description:
    "Master character encoding fundamentals with our comprehensive UTF-8 guide. Learn Unicode, byte-level bit layouts, Byte Order Marks (BOM), and how to debug encoding corruption (mojibake) in modern web applications.",
  keywords:
    "utf-8, unicode, character encoding, mojibake, byte order mark, text encoding, character set, utf-16, internationalization, i18n, text serialization",
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
    canonical: `${siteUrl}/en/blog/encoding-guide`,
    languages: {
      en: `${siteUrl}/en/blog/encoding-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/encoding-guide`,
    title: "Character Encoding: The UTF-8 Engineering Guide - KittyEncode",
    description:
      "Master character encoding fundamentals with our comprehensive UTF-8 guide. Learn Unicode and debug mojibake.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/encoding-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Character Encoding Engineering Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Character Encoding: The UTF-8 Engineering Guide",
    description:
      "Master character encoding fundamentals with our comprehensive UTF-8 guide.",
    images: [`${siteUrl}/images/blog/encoding-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function EncodingGuidePage() {
  return (
    <>
      <EncodingGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EncodingGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Character Encoding Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <EncodingGuideContent />
      </div>
    </>
  );
}
