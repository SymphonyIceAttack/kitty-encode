import type { Organization, WebPage, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface TermsPageStructuredDataProps {
  lang: LanguageType;
}

export function TermsPageStructuredData({
  lang,
}: TermsPageStructuredDataProps) {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: getOrganizationDescription(lang),
  };

  const termsPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/terms`,
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
          __html: JSON.stringify(termsPageSchema),
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
    en: "Terms of Service - KittyEncode",
    zh: "服务条款 - KittyEncode",
    ja: "利用規約 - KittyEncode",
    fr: "Conditions d'utilisation - KittyEncode",
    es: "Términos de servicio - KittyEncode",
    ru: "Условия использования - KittyEncode",
    de: "Nutzungsbedingungen - KittyEncode",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Terms of service for our free online developer tools. Simple, fair terms for using our developer utilities.",
    zh: "我们免费在线开发者工具的服务条款。使用我们的开发者工具的简单、公平条款。",
    ja: "私たちの無料オンライン開発者ツールの利用規約。開発者向けツールの使用に関するシンプルかつ公平な条件。",
    fr: "Conditions d'utilisation de nos outils de développement en ligne gratuits. Des conditions simples et équitables pour utiliser nos utilitaires de développement.",
    es: "Términos de servicio para nuestras herramientas de desarrollo en línea gratuitas. Términos simples y justos para usar nuestras utilidades de desarrollo.",
    ru: "Условия использования наших бесплатных онлайн-инструментов разработчика. Простые, справедливые условия использования наших инструментов разработки.",
    de: "Nutzungsbedingungen für unsere kostenlosen Online-Entwicklertools. Einfache, faire Bedingungen für die Nutzung unserer Entwicklertools.",
  };
  return descriptions[lang] || descriptions.en;
}
