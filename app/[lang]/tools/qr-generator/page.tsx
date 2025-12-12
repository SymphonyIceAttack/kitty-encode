import type { Metadata } from "next";
import { QrGeneratorStructuredData } from "@/components/structured-data/qr-generator";
import { QrGeneratorTool } from "@/components/tools/qr-generator-tool";
import type { LanguageType } from "@/lib/translations";
import { generateHreflangLinks } from "@/lib/translations";

// 多语言元数据
const metadataConfig = {
  en: {
    title: "QR Code Generator Online - Free QR Code Maker Tool",
    description:
      "Free online QR code generator. Create custom QR codes for text, URLs, contact info, and more. Download as PNG or SVG. Fast, secure, and works offline.",
    keywords: [
      "QR code generator",
      "QR code maker",
      "generate QR code",
      "QR code online",
      "QR code creator",
      "QR code tool",
      "free QR code",
      "QR code generator online",
      "custom QR code",
      "QR code download",
    ],
    openGraph: {
      title: "QR Code Generator - Free Online QR Code Maker",
      description:
        "Create custom QR codes for text, URLs, contact info and more. Free, fast, and works offline.",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  zh: {
    title: "二维码生成器 - 在线免费二维码制作工具",
    description:
      "免费的在线二维码生成器。为文本、URL、联系信息等创建自定义二维码。下载为 PNG 或 SVG。快速、安全，浏览器离线工作。",
    keywords: [
      "二维码生成器",
      "二维码制作",
      "生成二维码",
      "在线二维码",
      "二维码创建器",
      "二维码工具",
      "免费二维码",
      "二维码生成器在线",
      "自定义二维码",
      "二维码下载",
    ],
    openGraph: {
      title: "二维码生成器 - 免费在线二维码制作工具",
      description:
        "为文本、URL、联系信息等创建自定义二维码。免费、快速、离线工作。",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  ja: {
    title: "QRコードジェネレーター - 無料オンラインQRコード作成ツール",
    description:
      "無料のオンラインQRコードジェネレーター。テキスト、URL、連絡先情報などのカスタムQRコードを作成。PNGまたはSVGとしてダウンロード。高速、安全、ブラウザでオフライン動作。",
    keywords: [
      "QRコードジェネレーター",
      "QRコードメーカー",
      "QRコード生成",
      "オンラインQRコード",
      "QRコード作成者",
      "QRコードツール",
      "無料QRコード",
      "QRコードジェネレーター オンライン",
      "カスタムQRコード",
      "QRコードダウンロード",
    ],
    openGraph: {
      title: "QRコードジェネレーター - 無料オンラインQRコード作成ツール",
      description:
        "テキスト、URL、連絡先情報などのカスタムQRコードを作成。無料、高速、オフライン動作。",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  fr: {
    title:
      "Générateur de QR Code - Outil de création de QR Code en ligne gratuit",
    description:
      "Générateur de QR code en ligne gratuit. Créez des QR codes personnalisés pour texte, URL, informations de contact et plus. Téléchargez en PNG ou SVG. Rapide, sécurisé, fonctionne hors ligne.",
    keywords: [
      "générateur de QR code",
      "créateur de QR code",
      "générer QR code",
      "QR code en ligne",
      "créateur de QR code",
      "outil QR code",
      "QR code gratuit",
      "générateur QR code en ligne",
      "QR code personnalisé",
      "télécharger QR code",
    ],
    openGraph: {
      title: "Générateur de QR Code - Outil de création de QR Code gratuit",
      description:
        "Créez des QR codes personnalisés pour texte, URL, informations de contact et plus. Gratuit, rapide, fonctionne hors ligne.",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  es: {
    title:
      "Generador de Código QR - Herramienta de creación de códigos QR en línea gratis",
    description:
      "Generador de códigos QR en línea gratis. Crea códigos QR personalizados para texto, URLs, información de contacto y más. Descarga como PNG o SVG. Rápido, seguro, funciona sin conexión.",
    keywords: [
      "generador de código QR",
      "creador de código QR",
      "generar código QR",
      "código QR en línea",
      "creador de código QR",
      "herramienta código QR",
      "código QR gratis",
      "generador código QR en línea",
      "código QR personalizado",
      "descargar código QR",
    ],
    openGraph: {
      title:
        "Generador de Código QR - Herramienta de creación de códigos QR gratis",
      description:
        "Crea códigos QR personalizados para texto, URLs, información de contacto y más. Gratis, rápido, funciona sin conexión.",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  ru: {
    title: "Генератор QR-кодов - Онлайн инструмент создания QR-кодов бесплатно",
    description:
      "Бесплатный онлайн генератор QR-кодов. Создавайте пользовательские QR-коды для текста, URL, контактной информации и многого другого. Скачивайте в формате PNG или SVG. Быстро, безопасно, работает офлайн.",
    keywords: [
      "генератор QR-кодов",
      "создатель QR-кодов",
      "генерировать QR-код",
      "QR-код онлайн",
      "создатель QR-кода",
      "инструмент QR-код",
      "бесплатный QR-код",
      "генератор QR-кодов онлайн",
      "пользовательский QR-код",
      "скачать QR-код",
    ],
    openGraph: {
      title: "Генератор QR-кодов - Бесплатный онлайн инструмент",
      description:
        "Создавайте пользовательские QR-коды для текста, URL, контактной информации и многого другого. Бесплатно, быстро, офлайн.",
      url: "https://devtools.app/tools/qr-generator",
      type: "website",
    },
  },
  de: {
    title: "QR-Code Generator - Kostenloser Online QR-Code Erstellungs-Tool",
    description:
      "Kostenloser Online QR-Code Generator. Erstellen Sie benutzerdefinierte QR-Codes für Text, URLs, Kontaktinformationen und mehr. Als PNG oder SVG herunterladen. Schnell, sicher, funktioniert offline in Ihrem Browser.",
    keywords: [
      "QR-Code Generator",
      "QR-Code Ersteller",
      "QR-Code generieren",
      "QR-Code online",
      "QR-Code Creator",
      "QR-Code Tool",
      "kostenloser QR-Code",
      "QR-Code Generator online",
      "benutzerdefinierter QR-Code",
      "QR-Code herunterladen",
    ],
    openGraph: {
      title: "QR-Code Generator - Kostenloses Online QR-Code Erstellungs-Tool",
      description:
        "Erstellen Sie benutzerdefinierte QR-Codes für Text, URLs, Kontaktinformationen und mehr. Kostenlos, schnell, offline.",
      url: "https://devtools.app/tools/qr-generator",
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

  const hreflangLinks = generateHreflangLinks("/tools/qr-generator");

  return {
    title: langData.title,
    description: langData.description,
    keywords: langData.keywords,
    openGraph: langData.openGraph,
    alternates: {
      canonical: "https://devtools.app/tools/qr-generator",
      languages: hreflangLinks,
    },
  };
}

export default async function QrGeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <QrGeneratorStructuredData />
      <QrGeneratorTool lang={lang as LanguageType} />
    </>
  );
}
