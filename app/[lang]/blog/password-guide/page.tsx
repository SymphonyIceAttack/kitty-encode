import type { Metadata } from "next";
import { PasswordGuideContent } from "@/components/blog/guides/password-guide-content";
import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";
import { PasswordGuideBreadcrumbSchema } from "@/components/structured-data/breadcrumbs";
import { ArticleBreadcrumbNav } from "@/components/ui/breadcrumb";
import { siteUrl } from "@/lib/config";

// Generate static params for English only

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: "Password Security: Entropy, Salting, and KDFs - KittyEncode",
  description:
    "Master password security with our comprehensive guide. Learn about entropy calculation, salting to prevent rainbow table attacks, and key derivation functions like Argon2 and bcrypt for modern authentication systems.",
  keywords:
    "password security, password entropy, salting, kdf, argon2, bcrypt, key derivation, rainbow table, password hashing, nist guidelines, credential security",
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
    canonical: `${siteUrl}/en/blog/password-guide`,
    languages: {
      en: `${siteUrl}/en/blog/password-guide`,
    },
  },
  openGraph: {
    type: "article",
    locale: "en",
    url: `${siteUrl}/en/blog/password-guide`,
    title: "Password Security: Entropy, Salting, and KDFs - KittyEncode",
    description:
      "Master password security: entropy, salting, and key derivation functions like Argon2 and bcrypt.",
    siteName: "KittyEncode",
    images: [
      {
        url: `${siteUrl}/images/blog/password-guide-pixel.jpeg`,
        width: 1200,
        height: 630,
        alt: "Password Security Guide",
      },
    ],
  } as const,
  twitter: {
    card: "summary_large_image",
    title: "Password Security: Entropy, Salting, and KDFs",
    description:
      "Master password security: entropy, salting, and key derivation functions like Argon2 and bcrypt.",
    images: [`${siteUrl}/images/blog/password-guide-pixel.jpeg`],
    creator: "@kittyencode",
  },
  other: {
    "og:site_name": "KittyEncode",
    "og:type": "article",
  },
};

export default async function PasswordGuidePage() {
  return (
    <>
      <PasswordGuideStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PasswordGuideBreadcrumbSchema()),
        }}
      />
      <div className="container mx-auto max-w-4xl px-4 pt-8">
        <ArticleBreadcrumbNav title="Password Security Guide" />
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        <PasswordGuideContent />
      </div>
    </>
  );
}
