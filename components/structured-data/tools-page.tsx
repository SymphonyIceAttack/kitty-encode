import type { CollectionPage, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface ToolsPageStructuredDataProps {
  lang: LanguageType;
}

export function ToolsPageStructuredData({
  lang,
}: ToolsPageStructuredDataProps) {
  const collectionPageSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/tools`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: getToolList(lang),
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

function getPageName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Developer Tools - URL Encoder, Base64, Hash, UUID and More",
    zh: "开发者工具 - URL 编码、Base64、哈希、UUID 等",
    ja: "開発者ツール - URL エンコーダー、Base64、ハッシュ、UUID など",
    fr: "Outils de développement - Encodeur URL, Base64, Hash, UUID et plus",
    es: "Herramientas de desarrollo - Codificador URL, Base64, Hash, UUID y más",
    ru: "Инструменты разработчика - URL-кодировщик, Base64, Hash, UUID и другие",
    de: "Entwicklertools - URL-Encoder, Base64, Hash, UUID und mehr",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Collection of free online developer tools including URL encoder/decoder, Base64 encoder, MD5 generator, UUID generator, password generator, and encoding converter.",
    zh: "免费的在线开发者工具集合，包括 URL 编码解码器、Base64 编码器、MD5 生成器、UUID 生成器、密码生成器和编码转换器。",
    ja: "URL エンコーダー/デコーダー、Base64 エンコーダー、MD5 ジェネレーター、UUID ジェネレーター、パスワード ジェネレーター、エンコーディング コンバーターを含む、無料のオンライン開発者ツールのコレクション。",
    fr: "Collection d'outils de développement en ligne gratuits, notamment l'encodeur/décodeur URL, l'encodeur Base64, le générateur MD5, le générateur UUID, le générateur de mots de passe et le convertisseur d'encodage.",
    es: "Colección de herramientas de desarrollo en línea gratuitas que incluyen codificador/descodificador URL, codificador Base64, generador MD5, generador UUID, generador de contraseñas y convertidor de codificación.",
    ru: "Коллекция бесплатных онлайн-инструментов разработчика, включающая URL-кодировщик/декодировщик, кодировщик Base64, генератор MD5, генератор UUID, генератор паролей и конвертер кодировок.",
    de: "Sammlung kostenloser Online-Entwicklertools, einschließlich URL-Encoder/Dekoder, Base64-Encoder, MD5-Generator, UUID-Generator, Passwort-Generator und Kodierungskonverter.",
  };
  return descriptions[lang] || descriptions.en;
}

interface ToolItem {
  "@type": "WebApplication";
  position: number;
  name: string;
  url: string;
  applicationCategory: string;
  description: string;
}

function getToolList(lang: LanguageType): ToolItem[] {
  const tools: Record<LanguageType, ToolItem[]> = {
    en: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "URL Encoder / Decoder",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Free online URL encoder and decoder tool",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Base64 Encoder / Decoder",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Free online Base64 encoder and decoder tool",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "MD5 Hash Generator",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Free online MD5 hash generator tool",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "Encoding Converter",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description: "Free online character encoding converter tool",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "UUID Generator",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Free online UUID generator tool",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "Password Generator",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Free online password generator tool",
      },
    ],
    zh: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "URL 编码解码器",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线 URL 编码解码工具",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Base64 编码解码器",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线 Base64 编码解码工具",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "MD5 哈希生成器",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线 MD5 哈希生成工具",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "编码转换器",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线字符编码转换工具",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "UUID 生成器",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线 UUID 生成工具",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "密码生成器",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "免费的在线密码生成工具",
      },
    ],
    ja: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "URL エンコーダー/デコーダー",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          " 無料のオンライン URL エンコーダーおよびデコーダー ツール",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Base64 エンコーダー/デコーダー",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          " 無料のオンライン Base64 エンコーダーおよびデコーダー ツール",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "MD5 ハッシュ ジェネレーター",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: " 無料のオンライン MD5 ハッシュ ジェネレーター ツール",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "エンコーディング コンバーター",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description:
          " 無料のオンライン キャラクター エンコーディング コンバーター ツール",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "UUID ジェネレーター",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: " 無料のオンライン UUID ジェネレーター ツール",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "パスワード ジェネレーター",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: " 無料のパスワード ジェネレーター ツール",
      },
    ],
    fr: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "Encodeur/Décodeur URL",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Outil d'encodage et de décodage URL en ligne gratuit",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Encodeur/Décodeur Base64",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Outil d'encodage et de décodage Base64 en ligne gratuit",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "Générateur de hash MD5",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Outil de génération de hash MD5 en ligne gratuit",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "Convertisseur d'encodage",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description:
          "Outil de conversion d'encodage de caractères en ligne gratuit",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "Générateur UUID",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Outil de génération UUID en ligne gratuit",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "Générateur de mots de passe",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Outil de génération de mots de passe en ligne gratuit",
      },
    ],
    es: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "Codificador/Decodificador URL",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          "Herramienta de codificación y decodificación de URL en línea gratis",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Codificador/Decodificador Base64",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          "Herramienta de codificación y decodificación Base64 en línea gratis",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "Generador MD5",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Herramienta de generación de hash MD5 en línea gratis",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "Convertidor de codificación",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description:
          "Herramienta de conversión de codificación de caracteres en línea gratis",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "Generador UUID",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Herramienta de generación UUID en línea gratis",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "Generador de contraseñas",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Herramienta de generación de contraseñas en línea gratis",
      },
    ],
    ru: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "URL-кодировщик/декодировщик",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          "Бесплатный онлайн-инструмент для кодирования и декодирования URL",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Base64-кодировщик/декодировщик",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description:
          "Бесплатный онлайн-инструмент для кодирования и декодирования Base64",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "Генератор MD5",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Бесплатный онлайн-инструмент для генерации MD5-хешей",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "Конвертер кодировок",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description:
          "Бесплатный онлайн-инструмент для конвертации символьных кодировок",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "Генератор UUID",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Бесплатный онлайн-инструмент для генерации UUID",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "Генератор паролей",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Бесплатный онлайн-инструмент для генерации паролей",
      },
    ],
    de: [
      {
        "@type": "WebApplication",
        position: 1,
        name: "URL-Encoder/Dekoder",
        url: `${siteUrl}/${lang}/tools/url-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-URL-Encoder- und -Decoder-Tool",
      },
      {
        "@type": "WebApplication",
        position: 2,
        name: "Base64-Encoder/Dekoder",
        url: `${siteUrl}/${lang}/tools/base64-encoder`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-Base64-Encoder- und -Decoder-Tool",
      },
      {
        "@type": "WebApplication",
        position: 3,
        name: "MD5-Hash-Generator",
        url: `${siteUrl}/${lang}/tools/md5-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-MD5-Hash-Generator-Tool",
      },
      {
        "@type": "WebApplication",
        position: 4,
        name: "Kodierungskonverter",
        url: `${siteUrl}/${lang}/tools/encoding-converter`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-Zeichenkodierung-Konverter-Tool",
      },
      {
        "@type": "WebApplication",
        position: 5,
        name: "UUID-Generator",
        url: `${siteUrl}/${lang}/tools/uuid-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-UUID-Generator-Tool",
      },
      {
        "@type": "WebApplication",
        position: 6,
        name: "Passwort-Generator",
        url: `${siteUrl}/${lang}/tools/password-generator`,
        applicationCategory: "DeveloperApplication",
        description: "Kostenloses Online-Passwort-Generator-Tool",
      },
    ],
  };

  return tools[lang] || tools.en;
}
