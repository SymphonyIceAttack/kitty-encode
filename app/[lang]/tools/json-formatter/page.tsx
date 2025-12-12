import type { Metadata } from "next";
import { JsonFormatterStructuredData } from "@/components/structured-data/json-formatter";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "JSON Formatter & Validator Online - Free JSON Beautifier Tool",
    description:
      "Free online JSON formatter, validator and beautifier. Format, validate, minify and beautify JSON data instantly. No signup required, works offline in your browser.",
    keywords: [
      "JSON formatter",
      "JSON validator",
      "JSON beautifier",
      "JSON parser",
      "format JSON online",
      "validate JSON",
      "pretty print JSON",
      "JSON minifier",
      "JSON tool",
    ],
    openGraph: {
      title: "JSON Formatter & Validator - Free Online Tool",
      description:
        "Format, validate and beautify JSON data instantly. Free, fast, no signup required.",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  zh: {
    title: "JSON 格式化工具 - 在线 JSON 验证器和美化器",
    description:
      "免费的在线 JSON 格式化、验证和美化工具。立即格式化、验证、压缩和美化 JSON 数据。无需注册，浏览器离线工作。",
    keywords: [
      "JSON 格式化工具",
      "JSON 验证器",
      "JSON 美化器",
      "JSON 解析器",
      "在线格式化 JSON",
      "验证 JSON",
      "JSON 格式化",
      "JSON 压缩工具",
      "JSON 工具",
    ],
    openGraph: {
      title: "JSON 格式化工具 - 免费在线工具",
      description: "立即格式化、验证和美化 JSON 数据。免费、快速、无需注册。",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  ja: {
    title: "JSON フォーマッター - 無料オンライン JSON バリデーター",
    description:
      "無料のオンラインJSON フォーマッター、バリデーター、Beautifier。JSONデータを即座にフォーマット、検証、縮小、美化。サインアップ不要、ブラウザでオフライン動作。",
    keywords: [
      "JSON フォーマッター",
      "JSON バリデーター",
      "JSON Beautifier",
      "JSON パーサー",
      "オンラインJSONフォーマット",
      "JSON 検証",
      "JSON フォーマット",
      "JSON ミニファイア",
      "JSON ツール",
    ],
    openGraph: {
      title: "JSON フォーマッター - 無料オンライン ツール",
      description:
        "JSON データを即座にフォーマット、検証、美化。無料、高速、サインアップ不要。",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  fr: {
    title: "Formateur JSON - Validateur JSON en ligne gratuit",
    description:
      "Formateur, validateur et beautifier JSON en ligne gratuit. Formatez, validez, minifiez et beautifiez les données JSON instantanément. Aucune inscription requise, fonctionne hors ligne dans votre navigateur.",
    keywords: [
      "formateur JSON",
      "validateur JSON",
      "beautifier JSON",
      "parseur JSON",
      "formater JSON en ligne",
      "valider JSON",
      "format JSON",
      "minificateur JSON",
      "outil JSON",
    ],
    openGraph: {
      title: "Formateur JSON - Outil en ligne gratuit",
      description:
        "Formatez, validez et beautifiez les données JSON instantanément. Gratuit, rapide, aucune inscription requise.",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  es: {
    title: "Formateador JSON - Validador JSON en línea gratis",
    description:
      "Formateador, validador y embellecedor JSON en línea gratis. Formatea, valida, minifica y embellece datos JSON al instante. Sin registro requerido, funciona sin conexión en tu navegador.",
    keywords: [
      "formateador JSON",
      "validador JSON",
      "embellecedor JSON",
      "parser JSON",
      "formatear JSON en línea",
      "validar JSON",
      "formato JSON",
      "minificador JSON",
      "herramienta JSON",
    ],
    openGraph: {
      title: "Formateador JSON - Herramienta en línea gratis",
      description:
        "Formatea, valida y embellece datos JSON al instante. Gratis, rápido, sin registro requerido.",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  ru: {
    title: "Форматер JSON - Онлайн валидатор JSON бесплатно",
    description:
      "Бесплатный онлайн форматер, валидатор и beautifier JSON. Форматируйте, валидируйте, минифицируйте иbeautify JSON данные мгновенно. Регистрация не требуется, работает офлайн в браузере.",
    keywords: [
      "форматер JSON",
      "валидатор JSON",
      "beautifier JSON",
      "парсер JSON",
      "форматировать JSON онлайн",
      "валидировать JSON",
      "формат JSON",
      "минификатор JSON",
      "инструмент JSON",
    ],
    openGraph: {
      title: "Форматер JSON - Бесплатный онлайн инструмент",
      description:
        "Форматируйте, валидируйте иbeautify JSON данные мгновенно. Бесплатно, быстро, без регистрации.",
      url: "https://devtools.app/tools/json-formatter",
      type: "website",
    },
  },
  de: {
    title: "JSON Formatierer - Kostenloser Online JSON Validator",
    description:
      "Kostenloser Online JSON Formatierer, Validator und Beautifier. Formatieren, validieren, minifizieren und verschönern Sie JSON-Daten sofort. Keine Registrierung erforderlich, funktioniert offline in Ihrem Browser.",
    keywords: [
      "JSON Formatierer",
      "JSON Validator",
      "JSON Beautifier",
      "JSON Parser",
      "JSON online formatieren",
      "JSON validieren",
      "JSON Format",
      "JSON Minifier",
      "JSON Tool",
    ],
    openGraph: {
      title: "JSON Formatierer - Kostenloses Online Tool",
      description:
        "Formatieren, validieren und verschönern Sie JSON-Daten sofort. Kostenlos, schnell, keine Registrierung erforderlich.",
      url: "https://devtools.app/tools/json-formatter",
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

  const hreflangLinks = generateHreflangLinks("/tools/json-formatter");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/json-formatter",
      languages: hreflangLinks,
    },
  };
}

export default async function JsonFormatterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <JsonFormatterStructuredData />
      <JsonFormatterTool lang={lang as LanguageType} />
    </>
  );
}
