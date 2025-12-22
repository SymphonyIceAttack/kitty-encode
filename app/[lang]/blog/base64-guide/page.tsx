import type { Metadata } from "next";
import { Base64GuideContent } from "@/components/blog/guides/base64-guide-content";
import { Base64GuideStructuredData } from "@/components/structured-data/blog-post";
import { Base64GuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Base64 Encoding: The Definitive Engineering Guide - KittyEncode",
  description:
    "Master Base64 encoding with our comprehensive engineering guide. Learn RFC 4648 standards, Base64URL variants, performance optimization, and implementation best practices for modern web development.",
  keywords:
    "base64 encoding, base64url, rfc 4648, data encoding, binary to text, mime, encoding algorithm, web development, data serialization",
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
    canonical: `${siteUrl}/en/blog/base64-guide`,
    languages: {
      en: `${siteUrl}/en/blog/base64-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/base64-guide`,
    title: "Base64 Encoding: The Definitive Engineering Guide - KittyEncode",
    description:
      "Master Base64 encoding with our comprehensive engineering guide. Learn RFC 4648 standards, Base64URL variants, and implementation best practices.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/base64-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Base64 Encoding Engineering Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoding: The Definitive Engineering Guide",
    description:
      "Master Base64 encoding with our comprehensive engineering guide. Learn RFC 4648 standards and implementation best practices.",
    images: [`${siteUrl}/images/blog/base64-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function Base64GuidePage() {
  return (
    <>
      <Base64GuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(Base64GuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Base64 Encoding Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <Base64GuideContent />
      </div>
    </>
  );
}
