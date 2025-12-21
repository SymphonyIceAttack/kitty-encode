import type { Organization, WebPage, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface DisclaimerPageStructuredDataProps {
  lang: LanguageType;
}

export function DisclaimerPageStructuredData({
  lang,
}: DisclaimerPageStructuredDataProps) {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: getOrganizationDescription(lang),
  };

  const disclaimerPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/disclaimer`,
    about: organizationSchema,
    datePublished: "2024-01-01",
    dateModified: "2024-12-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(disclaimerPageSchema),
        }}
      />
    </>
  );
}

function getOrganizationDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online developer tools for JSON, Base64, Hash, UUID and more. Privacy-first, offline-capable tools for developers worldwide.",
    zh: "免费的在线开发者工具，包括 JSON、Base64、Hash、UUID 等。面向全球开发者的隐私优先、离线可用工具。",
    ja: "JSON、Base64、Hash、UUID などのための無料オンライン開発者ツール。プライバシー優先、世界中の開発者向けのオフライン対応ツール。",
    fr: "Outils de développement en ligne gratuits pour JSON, Base64, Hash, UUID et plus. Outils respectueux de la confidentialité et fonctionnant hors ligne pour les développeurs du monde entier.",
    es: "Herramientas de desarrollo en línea gratuitas para JSON, Base64, Hash, UUID y más. Herramientas privadas y compatibles sin conexión para desarrolladores de todo el mundo.",
    ru: "Бесплатные онлайн-инструменты разработчика для JSON, Base64, Hash, UUID и других. Инструменты с приоритетом конфиденциальности и офлайн-работой для разработчиков по всему миру.",
    de: "Kostenlose Online-Entwicklertools für JSON, Base64, Hash, UUID und mehr. Datenschutzorientierte, offline-fähige Tools für Entwickler weltweit.",
  };
  return descriptions[lang] || descriptions.en;
}

function getPageName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "Disclaimer - KittyEncode",
    zh: "免责声明 - KittyEncode",
    ja: "免責事項 - KittyEncode",
    fr: "Avis de non-responsabilité - KittyEncode",
    es: "Descargo de responsabilidad - KittyEncode",
    ru: "Отказ от ответственности - KittyEncode",
    de: "Haftungsausschluss - KittyEncode",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Important disclaimer and limitations of liability for our free online developer tools and services.",
    zh: "关于我们免费在线开发者工具和服务的重要免责声明和责任限制。",
    ja: "私たちの無料オンライン開発者ツールとサービスに関する重要な免責事項と責任の制限。",
    fr: "Avis de non-responsabilité important et limitations de responsabilité pour nos outils et services de développement en ligne gratuits.",
    es: "Descargo de responsabilidad importante y limitaciones de responsabilidad para nuestras herramientas y servicios de desarrollo en línea gratuitos.",
    ru: "Важная оговорка и ограничения ответственности для наших бесплатных онлайн-инструментов и услуг разработчика.",
    de: "Wichtiger Haftungsausschluss und Haftungsbeschränkungen für unsere kostenlosen Online-Entwicklertools und -dienste.",
  };
  return descriptions[lang] || descriptions.en;
}
