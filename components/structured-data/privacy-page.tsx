import type { Organization, WebPage, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface PrivacyPageStructuredDataProps {
  lang: LanguageType;
}

export function PrivacyPageStructuredData({
  lang,
}: PrivacyPageStructuredDataProps) {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: getOrganizationDescription(lang),
  };

  const privacyPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/privacy`,
    about: organizationSchema,
    datePublished: "2024-01-01",
    dateModified: "2025-12-20",
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
          __html: JSON.stringify(privacyPageSchema),
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
    en: "Privacy Policy - KittyEncode",
    zh: "隐私政策 - KittyEncode",
    ja: "プライバシーポリシー - KittyEncode",
    fr: "Politique de confidentialité - KittyEncode",
    es: "Política de privacidad - KittyEncode",
    ru: "Политика конфиденциальности - KittyEncode",
    de: "Datenschutzrichtlinie - KittyEncode",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Our privacy policy explains how we protect your privacy. We don't collect, store, or track any personal information.",
    zh: "我们的隐私政策说明了我们如何保护您的隐私。我们不收集、存储或跟踪任何个人信息。",
    ja: "私たちのプライバシーポリシーは、プライバシー保護の方法を説明します。個人情報の収集、保管、追跡は行いません。",
    fr: "Notre politique de confidentialité explique comment nous protégeons votre vie privée. Nous ne collectons, ne stockons ni ne suivons aucune information personnelle.",
    es: "Nuestra política de privacidad explica cómo protegemos su privacidad. No recopilamos, almacenamos ni rastreamos información personal.",
    ru: "Наша политика конфиденциальности объясняет, как мы защищаем вашу конфиденциальность. Мы не собираем, не храним и не отслеживаем личную информацию.",
    de: "Unsere Datenschutzrichtlinie erklärt, wie wir Ihre Privatsphäre schützen. Wir sammeln, speichern oder verfolgen keine persönlichen Informationen.",
  };
  return descriptions[lang] || descriptions.en;
}
