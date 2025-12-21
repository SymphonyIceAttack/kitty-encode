import type { AboutPage, Organization, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface AboutPageStructuredDataProps {
  lang: LanguageType;
}

export function AboutPageStructuredData({
  lang,
}: AboutPageStructuredDataProps) {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: getOrganizationDescription(lang),
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/${lang}/contact`,
    },
    sameAs: [siteUrl, `${siteUrl}/${lang}/about`, `${siteUrl}/${lang}/contact`],
  };

  const aboutPageSchema: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/about`,
    mainEntity: organizationSchema,
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
          __html: JSON.stringify(aboutPageSchema),
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
    en: "About KittyEncode",
    zh: "关于 KittyEncode",
    ja: "KittyEncode について",
    fr: "À propos de KittyEncode",
    es: "Acerca de KittyEncode",
    ru: "О KittyEncode",
    de: "Über KittyEncode",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Learn about our mission to provide free, fast, and reliable online developer tools for developers worldwide. Privacy-first approach with offline capabilities.",
    zh: "了解我们的使命：为全球开发者提供免费、快速、可靠的在线开发者工具。隐私优先的方法，具备离线功能。",
    ja: "世界中の開発者に無料的高速で信頼性の高いオンライン開発者ツールを提供するという私たちの使命について学びましょう。プライバシー優先のアプローチとオフライン機能。",
    fr: "Découvrez notre mission de fournir des outils de développement en ligne gratuits, rapides et fiables pour les développeurs du monde entier. Approche respectueuse de la confidentialité avec capacités hors ligne.",
    es: "Conozca nuestra misión de proporcionar herramientas de desarrollo en línea gratuitas, rápidas y confiables para desarrolladores de todo el mundo. Enfoque de privacidad primero con capacidades sin conexión.",
    ru: "Узнайте о нашей миссии по предоставлению бесплатных, быстрых и надежных онлайн-инструментов разработчика для разработчиков по всему миру. Подход с приоритетом конфиденциальности с возможностью офлайн-работы.",
    de: "Erfahren Sie mehr über unsere Mission, kostenlose, schnelle und zuverlässige Online-Entwicklertools für Entwickler weltweit bereitzustellen. Datenschutzorientierter Ansatz mit Offline-Fähigkeiten.",
  };
  return descriptions[lang] || descriptions.en;
}
