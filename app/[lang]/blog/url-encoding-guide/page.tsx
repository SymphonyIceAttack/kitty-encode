import type { Metadata } from "next";
import { UrlEncodingGuideContent } from "@/components/blog/guides/url-encoding-guide-content";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { UrlEncodingGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "URL Encoding: The RFC 3986 Engineering Reference - KittyEncode",
  description:
    "Master percent-encoding (RFC 3986) with our comprehensive engineering guide. Learn about reserved character sets, UTF-8 byte sequences, and security best practices for URL construction in modern web development.",
  keywords:
    "url encoding, percent encoding, rfc 3986, uri encoding, http, query strings, url parameters, web development, encoding tools, character encoding",
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
    canonical: `${siteUrl}/en/blog/url-encoding-guide`,
    languages: {
      en: `${siteUrl}/en/blog/url-encoding-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/url-encoding-guide`,
    title: "URL Encoding: The RFC 3986 Engineering Reference - KittyEncode",
    description:
      "Master percent-encoding (RFC 3986) with our comprehensive engineering guide. Learn about reserved character sets, UTF-8 byte sequences, and security best practices.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/url-encoding-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "URL Encoding Engineering Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "URL Encoding: The RFC 3986 Engineering Reference",
    description:
      "Master percent-encoding (RFC 3986) with our comprehensive engineering guide. Learn reserved character sets and security best practices.",
    images: [`${siteUrl}/images/blog/url-encoding-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function UrlEncodingGuidePage() {
  return (
    <>
      <UrlEncodingGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(UrlEncodingGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="URL Encoding Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <UrlEncodingGuideContent />
      </div>
    </>
  );
}
