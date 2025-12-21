import type { ContactPage, Organization, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface ContactPageStructuredDataProps {
  lang: LanguageType;
}

export function ContactPageStructuredData({
  lang,
}: ContactPageStructuredDataProps) {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KittyEncode",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: getOrganizationDescription(lang),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/${lang}/contact`,
    },
  };

  const contactPageSchema: WithContext<ContactPage> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: getPageName(lang),
    description: getPageDescription(lang),
    url: `${siteUrl}/${lang}/contact`,
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
          __html: JSON.stringify(contactPageSchema),
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
    en: "Contact KittyEncode",
    zh: "联系 KittyEncode",
    ja: "KittyEncode お問い合わせ",
    fr: "Contacter KittyEncode",
    es: "Contactar KittyEncode",
    ru: "Связаться с KittyEncode",
    de: "KittyEncode kontaktieren",
  };
  return names[lang] || names.en;
}

function getPageDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Get in touch with KittyEncode. We love hearing from developers and are here to help with any questions or suggestions.",
    zh: "联系 KittyEncode。我们喜欢收到开发者的反馈，随时帮助解答任何问题或建议。",
    ja: "KittyEncode へのお問い合わせ。開発者からのフィードバックをお待ちしております。質問やご提案がございましたら、お手伝いいたします。",
    fr: "Contactez KittyEncode. Nous aimons avoir des nouvelles des développeurs et sommes là pour vous aider avec toutes questions ou suggestions.",
    es: "Póngase en contacto con KittyEncode. Nos encanta recibir noticias de desarrolladores y estamos aquí para ayudar con cualquier pregunta o sugerencia.",
    ru: "Свяжитесь с KittyEncode. Мы любим получать отзывы от разработчиков и готовы помочь с любыми вопросами или предложениями.",
    de: "Nehmen Sie Kontakt mit KittyEncode auf. Wir freuen uns von Entwicklern zu hören und sind hier, um bei Fragen oder Anregungen zu helfen.",
  };
  return descriptions[lang] || descriptions.en;
}
