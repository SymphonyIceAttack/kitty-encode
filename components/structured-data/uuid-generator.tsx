"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface UuidGeneratorStructuredDataProps {
  lang: LanguageType;
}

export function UuidGeneratorStructuredData({
  lang,
}: UuidGeneratorStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/uuid-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: getFeatureList(lang),
  };

  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaqItems(lang),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

function getToolName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "UUID Generator",
    zh: "UUID 生成器",
    ja: "UUID 生成器",
    fr: "Générateur UUID",
    es: "Generador UUID",
    ru: "Генератор UUID",
    de: "UUID-Generator",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online UUID generator tool. Generate version 1, 4, and 5 UUIDs instantly. Secure, fast, and works offline in your browser.",
    zh: "免费的在线 UUID 生成器。立即生成版本 1、4 和 5 的 UUID。安全、快速，浏览器离线工作。",
    ja: " 無料のオンライン UUID 生成器。バージョン 1、4、5 の UUID を即座に生成。安全でブラウザオフライン動作。",
    fr: "Générateur UUID en ligne gratuit. Générez des UUID versions 1, 4 et 5 instantanément. Sécurisé, rapide et fonctionne hors ligne dans votre navigateur.",
    es: "Generador UUID en línea gratis. Genera UUID de versiones 1, 4 y 5 instantáneamente. Seguro, rápido y funciona sin conexión en tu navegador.",
    ru: "Бесплатный онлайн генератор UUID. Мгновенно генерируйте UUID версий 1, 4 и 5. Безопасно, быстро, работает офлайн в браузере.",
    de: "Kostenloser Online-UUID-Generator. Generieren Sie UUIDs der Versionen 1, 4 und 5 sofort. Sicher, schnell und funktioniert offline in Ihrem Browser.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "UUID v1 (timestamp-based)",
      "UUID v4 (random)",
      "UUID v5 (namespace-based)",
      "Batch generation",
      "Copy to clipboard",
      "Works offline",
    ],
    zh: [
      "UUID v1（基于时间戳）",
      "UUID v4（随机）",
      "UUID v5（基于命名空间）",
      "批量生成",
      "复制到剪贴板",
      "离线工作",
    ],
    ja: [
      "UUID v1（タイムスタンプベース）",
      "UUID v4（ランダム）",
      "UUID v5（ネームスペースベース）",
      "バッチ生成",
      "クリップボードにコピー",
      "オフライン動作",
    ],
    fr: [
      "UUID v1 (basé sur l'horodatage)",
      "UUID v4 (aléatoire)",
      "UUID v5 (basé sur l'espace de noms)",
      "Génération en lot",
      "Copier dans le presse-papiers",
      "Fonctionne hors ligne",
    ],
    es: [
      "UUID v1 (basado en marca de tiempo)",
      "UUID v4 (aleatorio)",
      "UUID v5 (basado en espacio de nombres)",
      "Generación por lotes",
      "Copiar al portapapeles",
      "Funciona sin conexión",
    ],
    ru: [
      "UUID v1 (на основе временной метки)",
      "UUID v4 (случайный)",
      "UUID v5 (на основе пространства имен)",
      "Пакетная генерация",
      "Копировать в буфер обмена",
      "Работает офлайн",
    ],
    de: [
      "UUID v1 (zeitstempelbasiert)",
      "UUID v4 (zufällig)",
      "UUID v5 (namespace-basiert)",
      "Stapelgenerierung",
      "In die Zwischenablage kopieren",
      "Offline-Betrieb",
    ],
  };
  return features[lang] || features.en;
}

interface FaqItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

function getFaqItems(lang: LanguageType): FaqItem[] {
  const faqData: Record<LanguageType, FaqItem[]> = {
    en: [
      {
        "@type": "Question",
        name: "What is a UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Universally Unique Identifier) is a 128-bit identifier used to uniquely identify information. It's designed to be globally unique without requiring a central registration authority.",
        },
      },
      {
        "@type": "Question",
        name: "What are the different UUID versions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 is timestamp-based, v4 is randomly generated, v5 is namespace-based using SHA-1 hashing. v4 is most common for general use cases requiring unique identifiers.",
        },
      },
      {
        "@type": "Question",
        name: "Are UUIDs truly unique?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The probability of UUID duplication is extremely low. For v4 (random), you'd need to generate 1 billion UUIDs per second for 85 years to have a 50% chance of a single collision.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use UUIDs as database primary keys?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, UUIDs are commonly used as database primary keys. However, using UUID v4 (random) can cause database indexing performance issues. Consider UUID v7 for better index performance.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是 UUID？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID（通用唯一标识符）是一个 128 位的标识符，用于唯一标识信息。它被设计为全局唯一，无需中央注册机构即可保证唯一性。",
        },
      },
      {
        "@type": "Question",
        name: "UUID 有哪些不同的版本？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 基于时间戳，v4 是随机生成的，v5 是基于命名空间使用 SHA-1 哈希。对于需要唯一标识符的通用场景，v4 最常用。",
        },
      },
      {
        "@type": "Question",
        name: "UUID 真的唯一吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID 重复的概率极低。对于 v4（随机），每秒生成 10 亿个 UUID，需要 85 年才有 50% 的概率发生一次碰撞。",
        },
      },
      {
        "@type": "Question",
        name: "我可以将 UUID 用作数据库主键吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以，UUID 常用作数据库主键。但是使用 UUID v4（随机）可能导致数据库索引性能问题。考虑使用 UUID v7 以获得更好的索引性能。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "UUID とは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID（Universally Unique Identifier）は、情報を一意に識別するために使用される 128 ビット識別子です。中央登録機関を必要とせずにグローバルに一意になるよう設計されています。",
        },
      },
      {
        "@type": "Question",
        name: "UUID にはどのようなバージョンがありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 はタイムスタンプベース、v4 はランダムに生成、v5 は SHA-1 ハッシングを使用したネームスペースベースです。一意の識別子が必要な一般的なユースケースでは v4 が最も一般的です。",
        },
      },
      {
        "@type": "Question",
        name: "UUID は本当に一意ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID の重複確率は極めて低いです。v4（ランダム）の場合、1 秒間に 10 億個の UUID を生成すると、85 年で単一衝突確率が 50% になります。",
        },
      },
      {
        "@type": "Question",
        name: "UUID をデータベースの主キーとして使用できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、UUID はデータベースの主キーとして一般的に使用されます。ただし、UUID v4（ランダム）を使用すると、データベースのインデックスパフォーマンスの問題が発生する可能性があります。より優れたインデックスパフォーマンスを得るには、UUID v7 の使用を検討してください。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce qu'un UUID ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Identifiant Universel Unique) est un identifiant de 128 bits utilisé pour identifier des informations de manière unique. Il est conçu pour être globalement unique sans nécessiter d'autorité d'enregistrement centrale.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les différentes versions d'UUID ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 est basé sur l'horodatage, v4 est généré aléatoirement, v5 est basé sur l'espace de noms utilisant le hachage SHA-1. v4 est le plus courant pour les cas d'utilisation généraux nécessitant des identifiants uniques.",
        },
      },
      {
        "@type": "Question",
        name: "Les UUID sont-ils vraiment uniques ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La probabilité de duplication d'UUID est extrêmement faible. Pour v4 (aléatoire), il faudrait générer 1 milliard d'UUID par seconde pendant 85 ans pour avoir 50% de chance d'une seule collision.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je utiliser des UUID comme clés primaires de base de données ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, les UUID sont couramment utilisés comme clés primaires de base de données. Cependant, l'utilisation d'UUID v4 (aléatoire) peut causer des problèmes de performance d'indexation de base de données. Pensez à UUID v7 pour une meilleure performance d'index.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es un UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Identificador Único Universal) es un identificador de 128 bits utilizado para identificar información de manera única. Está diseñado para ser globalmente único sin requerir una autoridad de registro central.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuáles son las diferentes versiones de UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 está basado en marca de tiempo, v4 se genera aleatoriamente, v5 está basado en espacio de nombres usando hash SHA-1. v4 es el más común para casos de uso general que requieren identificadores únicos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Son los UUID verdaderamente únicos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La probabilidad de duplicación de UUID es extremadamente baja. Para v4 (aleatorio), necesitarías generar 1 mil millones de UUIDs por segundo durante 85 años para tener un 50% de probabilidad de una sola colisión.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo usar UUIDs como claves primarias de base de datos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, los UUID se usan comúnmente como claves primarias de base de datos. Sin embargo, usar UUID v4 (aleatorio) puede causar problemas de rendimiento de indexación de base de datos. Considera UUID v7 para mejor rendimiento de índice.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Universally Unique Identifier) — это 128-битный идентификатор, используемый для уникальной идентификации информации. Он разработан как глобально уникальный без необходимости центрального органа регистрации.",
        },
      },
      {
        "@type": "Question",
        name: "Какие существуют версии UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 основан на временной метке, v4 генерируется случайно, v5 основан на пространстве имен с использованием хеширования SHA-1. v4 наиболее распространён для общих случаев использования, требующих уникальных идентификаторов.",
        },
      },
      {
        "@type": "Question",
        name: "UUID действительно уникальны?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Вероятность дублирования UUID чрезвычайно мала. Для v4 (случайного), нужно генерировать 1 миллиард UUID в секунду в течение 85 лет, чтобы иметь 50% вероятность одной коллизии.",
        },
      },
      {
        "@type": "Question",
        name: "Могу ли я использовать UUID в качестве первичных ключей базы данных?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, UUID обычно используются как первичные ключи базы данных. Однако использование UUID v4 (случайного) может вызвать проблемы с производительностью индексации базы данных. Рассмотрите UUID v7 для лучшей производительности индекса.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist eine UUID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID (Universally Unique Identifier) ist eine 128-Bit-Kennung, die verwendet wird, um Informationen eindeutig zu identifizieren. Sie ist so konzipiert, dass sie global eindeutig ist, ohne eine zentrale Registrierungsstelle zu benötigen.",
        },
      },
      {
        "@type": "Question",
        name: "Welche verschiedenen UUID-Versionen gibt es?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UUID v1 ist zeitstempelbasiert, v4 wird zufällig generiert, v5 ist namespace-basiert unter Verwendung von SHA-1-Hashing. v4 ist am häufigsten für allgemeine Anwendungsfälle, die eindeutige Kennungen erfordern.",
        },
      },
      {
        "@type": "Question",
        name: "Sind UUIDs wirklich eindeutig?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Wahrscheinlichkeit einer UUID-Duplikation ist extrem gering. Für v4 (zufällig) müssten Sie 1 Milliarde UUIDs pro Sekunde für 85 Jahre generieren, um eine 50% ige Chance auf eine einzige Kollision zu haben.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich UUIDs als Datenbank-Primärschlüssel verwenden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, UUIDs werden häufig als Datenbank-Primärschlüssel verwendet. Die Verwendung von UUID v4 (zufällig) kann jedoch zu Problemen mit der Datenbankindexleistung führen. Ziehen Sie UUID v7 für eine bessere Indexleistung in Betracht.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
