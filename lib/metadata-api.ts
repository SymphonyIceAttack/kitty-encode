import type { Metadata } from "next";
import { siteUrl } from "@/lib/config";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const defaultKeywords = [
  "developer tools",
  "encoding",
  "base64",
  "url encoding",
  "md5",
  "uuid",
  "password generator",
  "security",
  "cryptography",
  "tutorials",
  "guides",
];

function generateKeywords(baseKeywords: string[]): string {
  return [...new Set([...defaultKeywords, ...baseKeywords])].join(", ");
}

function generateTitle(title: string, suffix = true): string {
  return suffix ? `${title} - KittyEncode` : title;
}

export function generateBlogPostMetadata(
  config: SEOConfig,
  lang: string = "en",
): Metadata {
  const canonicalUrl = config.canonical || `${siteUrl}/${lang}/blog`;

  return {
    title: generateTitle(config.title),
    description: config.description,
    keywords: generateKeywords(config.keywords || []),
    authors: config.author
      ? [{ name: config.author, url: `${siteUrl}/about` }]
      : undefined,
    creator: config.author || "KittyEncode",
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
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en/blog`,
        zh: `${siteUrl}/zh/blog`,
        ja: `${siteUrl}/ja/blog`,
        fr: `${siteUrl}/fr/blog`,
        es: `${siteUrl}/es/blog`,
        ru: `${siteUrl}/ru/blog`,
        de: `${siteUrl}/de/blog`,
      },
    },
    openGraph: {
      type: config.type || "article",
      locale: lang,
      url: canonicalUrl,
      title: generateTitle(config.title),
      description: config.description,
      siteName: "KittyEncode",
      images: config.ogImage
        ? [
            {
              url: `${siteUrl}${config.ogImage}`,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ]
        : [],
    } as const,
    twitter: {
      card: "summary_large_image",
      title: generateTitle(config.title),
      description: config.description,
      images: config.ogImage ? [`${siteUrl}${config.ogImage}`] : [],
      creator: "@kittyencode",
    },
    other: {
      "og:site_name": "KittyEncode",
      "og:type": config.type || "article",
    },
  };
}

export function generateBlogPageMetadata(lang: string = "en"): Metadata {
  const localeConfig: Record<string, { title: string; description: string }> = {
    en: {
      title: "Developer Guides & Tutorials",
      description:
        "Master encoding, hashing, and security with in-depth developer guides. Expert tutorials on URL encoding, Base64, MD5, UUID generation, and password security.",
    },
    zh: {
      title: "开发者教程与指南",
      description:
        "通过深入的开发者指南掌握编码、哈希和安全。URL编码、Base64、MD5、UUID生成和密码安全的专家教程。",
    },
    ja: {
      title: "開発者ガイドとチュートリアル",
      description:
        "エンコーディング、ハッシュ、セキュリティを詳細な開発者ガイドでマスターしましょう。URLエンコーディング、Base64、MD5、UUID生成、パスワードセキュリティのチュートリアル。",
    },
    fr: {
      title: "Guides et Tutoriels pour Développeurs",
      description:
        "Maîtrisez l'encodage, le hachage et la sécurité avec des guides approfondis pour développeurs. Tutoriels experts sur l'encodage URL, Base64, MD5, la génération UUID et la sécurité des mots de passe.",
    },
    es: {
      title: "Guías y Tutoriales para Desarrolladores",
      description:
        "Domina la codificación, el hash y la seguridad con guías detalladas para desarrolladores. Tutoriales expertos sobre codificación URL, Base64, MD5, generación UUID y seguridad de contraseñas.",
    },
    ru: {
      title: "Руководства и Учебники для Разработчиков",
      description:
        "Изучайте кодирование, хеширование и безопасность с помощью подробных руководств для разработчиков. Экспертные учебники по URL-кодированию, Base64, MD5, генерации UUID и безопасности паролей.",
    },
    de: {
      title: "Entwicklerhandbücher und Tutorials",
      description:
        "Beherrschen Sie Kodierung, Hashing und Sicherheit mit detaillierten Entwicklerhandbüchern. Experten-Tutorials zu URL-Kodierung, Base64, MD5, UUID-Generierung und Passwortsicherheit.",
    },
  };

  const config = localeConfig[lang] || localeConfig.en;

  return {
    title: generateTitle(config.title),
    description: config.description,
    keywords: generateKeywords([]),
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
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        zh: `${siteUrl}/zh/blog`,
        ja: `${siteUrl}/ja/blog`,
        fr: `${siteUrl}/fr/blog`,
        es: `${siteUrl}/es/blog`,
        ru: `${siteUrl}/ru/blog`,
        de: `${siteUrl}/de/blog`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `${siteUrl}/${lang}/blog`,
      title: generateTitle(config.title),
      description: config.description,
      siteName: "KittyEncode",
      images: [
        {
          url: `${siteUrl}/og-blog.png`,
          width: 1200,
          height: 630,
          alt: "KittyEncode Developer Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: generateTitle(config.title),
      description: config.description,
      images: [`${siteUrl}/og-blog.png`],
      creator: "@kittyencode",
    },
  };
}

export function generateToolPageMetadata(
  toolName: string,
  toolDescription: string,
  lang: string = "en",
): Metadata {
  const localeConfig: Record<string, { title: string }> = {
    en: { title: `${toolName} Generator` },
    zh: { title: `${toolName}生成器` },
    ja: { title: `${toolName}ジェネレーター` },
    fr: { title: `Générateur ${toolName}` },
    es: { title: `Generador de ${toolName}` },
    ru: { title: `Генератор ${toolName}` },
    de: { title: `${toolName}-Generator` },
  };

  const title = localeConfig[lang]?.title || localeConfig.en.title;

  return {
    title: generateTitle(title),
    description: toolDescription,
    keywords: generateKeywords([toolName, "generator", "tool"]),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/tools/${toolName.toLowerCase()}`,
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `${siteUrl}/${lang}/tools/${toolName.toLowerCase()}`,
      title: generateTitle(title),
      description: toolDescription,
      siteName: "KittyEncode",
    },
  };
}
