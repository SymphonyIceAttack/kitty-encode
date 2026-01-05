import type { Metadata } from "next";
import { UuidGuideContent } from "@/components/blog/guides/uuid-guide-content";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
import { UuidGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "UUIDs in Distributed Systems: The Engineering Guide - KittyEncode",
  description:
    "Master UUID generation in distributed systems with our comprehensive guide. Compare UUID v4, v7 (RFC 9562), and ULIDs. Learn about database indexing performance, collision probabilities, and entropy requirements.",
  keywords:
    "uuid, uuid v7, rfc 9562, ulid, distributed systems, unique identifier, database indexing, uuid v4, guid, primary key",
  authors: [{ name: "Engineering Team", url: `${siteUrl}/en/about` }],
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
    canonical: `${siteUrl}/en/blog/uuid-guide`,
    languages: {
      en: `${siteUrl}/en/blog/uuid-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/uuid-guide`,
    title: "UUIDs in Distributed Systems: The Engineering Guide - KittyEncode",
    description:
      "Master UUID generation in distributed systems. Compare UUID v4, v7 (RFC 9562), and ULIDs. Learn database indexing and collision probabilities.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/uuid-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "UUID Engineering Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "UUIDs in Distributed Systems: The Engineering Guide",
    description:
      "Master UUID generation in distributed systems. Compare UUID v4, v7 (RFC 9562), and ULIDs.",
    images: [`${siteUrl}/images/blog/uuid-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function UuidGuidePage() {
  return (
    <>
      <UuidGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(UuidGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="UUID Generation Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <UuidGuideContent />
      </div>
    </>
  );
}
