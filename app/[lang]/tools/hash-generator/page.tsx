import type { Metadata } from "next";
import { HashGeneratorStructuredData } from "@/components/structured-data/hash-generator";
import { HashGeneratorTool } from "@/components/tools/hash-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "Hash Generator Online - MD5, SHA1, SHA256, SHA512 Hash Tool",
    description:
      "Free online hash generator tool. Generate MD5, SHA1, SHA256, SHA512 hashes from text. Secure, fast, and works offline in your browser.",
    keywords: [
      "hash generator",
      "MD5 generator",
      "SHA1 generator",
      "SHA256 generator",
      "SHA512 generator",
      "hash calculator",
      "text hash",
      "hash online",
      "hash tool",
      "cryptographic hash",
    ],
    openGraph: {
      title: "Hash Generator - Free Online Hash Tool",
      description:
        "Generate MD5, SHA1, SHA256, SHA512 hashes from text. Free, secure, and works offline.",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  zh: {
    title: "哈希生成器 - 在线 MD5、SHA1、SHA256、SHA512 哈希工具",
    description:
      "免费的在线哈希生成器工具。从文本生成 MD5、SHA1、SHA256、SHA512 哈希值。安全、快速，浏览器离线工作。",
    keywords: [
      "哈希生成器",
      "MD5 生成器",
      "SHA1 生成器",
      "SHA256 生成器",
      "SHA512 生成器",
      "哈希计算器",
      "文本哈希",
      "在线哈希",
      "哈希工具",
      "加密哈希",
    ],
    openGraph: {
      title: "哈希生成器 - 免费在线哈希工具",
      description:
        "从文本生成 MD5、SHA1、SHA256、SHA512 哈希值。免费、安全、离线工作。",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  ja: {
    title:
      "ハッシュジェネレーター - オンライン MD5、SHA1、SHA256、SHA512 ハッシュツール",
    description:
      "無料のオンライン ハッシュジェネレーター ツール。テキストから MD5、SHA1、SHA256、SHA512 ハッシュを生成。安全、高速、ブラウザでオフライン動作。",
    keywords: [
      "ハッシュジェネレーター",
      "MD5 ジェネレーター",
      "SHA1 ジェネレーター",
      "SHA256 ジェネレーター",
      "SHA512 ジェネレーター",
      "ハッシュ電卓",
      "テキストハッシュ",
      "オンライン ハッシュ",
      "ハッシュ ツール",
      "暗号ハッシュ",
    ],
    openGraph: {
      title: "ハッシュジェネレーター - 無料オンライン ハッシュツール",
      description:
        "テキストから MD5、SHA1、SHA256、SHA512 ハッシュを生成。無料、安全、オフライン動作。",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  fr: {
    title:
      "Générateur de hash - Outil MD5, SHA1, SHA256, SHA512 en ligne gratuit",
    description:
      "Outil générateur de hash en ligne gratuit. Générez des hash MD5, SHA1, SHA256, SHA512 à partir de texte. Sécurisé, rapide, fonctionne hors ligne dans votre navigateur.",
    keywords: [
      "générateur de hash",
      "générateur MD5",
      "générateur SHA1",
      "générateur SHA256",
      "générateur SHA512",
      "calculateur de hash",
      "hash de texte",
      "hash en ligne",
      "outil hash",
      "hash cryptographique",
    ],
    openGraph: {
      title: "Générateur de hash - Outil hash en ligne gratuit",
      description:
        "Générez des hash MD5, SHA1, SHA256, SHA512 à partir de texte. Gratuit, sécurisé, fonctionne hors ligne.",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  es: {
    title:
      "Generador de hash - Herramienta MD5, SHA1, SHA256, SHA512 en línea gratis",
    description:
      "Herramienta generadora de hash en línea gratis. Genera hash MD5, SHA1, SHA256, SHA512 desde texto. Seguro, rápido, funciona sin conexión en tu navegador.",
    keywords: [
      "generador de hash",
      "generador MD5",
      "generador SHA1",
      "generador SHA256",
      "generador SHA512",
      "calculadora de hash",
      "hash de texto",
      "hash en línea",
      "herramienta hash",
      "hash criptográfico",
    ],
    openGraph: {
      title: "Generador de hash - Herramienta hash en línea gratis",
      description:
        "Genera hash MD5, SHA1, SHA256, SHA512 desde texto. Gratis, seguro, funciona sin conexión.",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  ru: {
    title:
      "Генератор хешей - Онлайн MD5, SHA1, SHA256, SHA512 инструмент бесплатно",
    description:
      "Бесплатный онлайн генератор хешей. Генерируйте хеши MD5, SHA1, SHA256, SHA512 из текста. Безопасно, быстро, работает офлайн в браузере.",
    keywords: [
      "генератор хешей",
      "генератор MD5",
      "генератор SHA1",
      "генератор SHA256",
      "генератор SHA512",
      "калькулятор хешей",
      "хеш текста",
      "хеш онлайн",
      "инструмент хешей",
      "криптографический хеш",
    ],
    openGraph: {
      title: "Генератор хешей - Бесплатный онлайн инструмент",
      description:
        "Генерируйте хеши MD5, SHA1, SHA256, SHA512 из текста. Бесплатно, безопасно, офлайн.",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
  de: {
    title:
      "Hash Generator - Kostenloser Online MD5, SHA1, SHA256, SHA512 Hash Tool",
    description:
      "Kostenloses Online Hash-Generator-Tool. Generieren Sie MD5-, SHA1-, SHA256-, SHA512-Hashes aus Text. Sicher, schnell, funktioniert offline in Ihrem Browser.",
    keywords: [
      "Hash Generator",
      "MD5 Generator",
      "SHA1 Generator",
      "SHA256 Generator",
      "SHA512 Generator",
      "Hash-Rechner",
      "Text-Hash",
      "Hash online",
      "Hash-Tool",
      "kryptographischer Hash",
    ],
    openGraph: {
      title: "Hash Generator - Kostenloses Online Hash-Tool",
      description:
        "Generieren Sie MD5-, SHA1-, SHA256-, SHA512-Hashes aus Text. Kostenlos, sicher, offline.",
      url: "https://devtools.app/tools/hash-generator",
      type: "website",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const langData =
    metadataConfig[lang as keyof typeof metadataConfig] || metadataConfig.en;

  const hreflangLinks = generateHreflangLinks("/tools/hash-generator");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/hash-generator",
      languages: hreflangLinks,
    },
  };
}

export default async function HashGeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <HashGeneratorStructuredData />
      <HashGeneratorTool lang={lang as LanguageType} />
    </>
  );
}
