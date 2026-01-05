import type { Metadata } from "next";
import { Md5GuideContent } from "@/components/blog/guides/md5-guide-content";
import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";
import { Md5GuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "MD5 Hashing: Security Analysis and Engineering Guide - KittyEncode",
  description:
    "Comprehensive guide to MD5 hashing: understand Merkle-Damgård construction, collision attacks, and appropriate use cases for non-cryptographic checksums in modern software development.",
  keywords:
    "md5, md5 hash, cryptographic hash, data integrity, checksum, merkle-damgard, collision attack, hash algorithm, file verification",
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
    canonical: `${siteUrl}/en/blog/md5-guide`,
    languages: {
      en: `${siteUrl}/en/blog/md5-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/md5-guide`,
    title: "MD5 Hashing: Security Analysis and Engineering Guide - KittyEncode",
    description:
      "Comprehensive guide to MD5 hashing: understand Merkle-Damgård construction, collision attacks, and appropriate use cases.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/md5-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "MD5 Hashing Engineering Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "MD5 Hashing: Security Analysis and Engineering Guide",
    description:
      "Comprehensive guide to MD5 hashing: understand Merkle-Damgård construction, collision attacks, and appropriate use cases.",
    images: [`${siteUrl}/images/blog/md5-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function Md5GuidePage() {
  return (
    <>
      <Md5GuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(Md5GuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="MD5 Hashing Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <Md5GuideContent />
      </div>
    </>
  );
}
