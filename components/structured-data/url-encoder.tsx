import type { FAQPage, WebApplication, WebSite, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface UrlEncoderStructuredDataProps {
  lang: LanguageType;
}

export function UrlEncoderStructuredData({
  lang,
}: UrlEncoderStructuredDataProps) {
  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getWebsiteName(lang),
    description: getWebsiteDescription(lang),
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/tools?q={search_term_string}`,
    },
  };

  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/url-encoder`,
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
          __html: JSON.stringify(websiteSchema),
        }}
      />
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

function getWebsiteName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "KittyEncode",
    zh: "KittyEncode",
    ja: "KittyEncode",
    fr: "KittyEncode",
    es: "KittyEncode",
    ru: "KittyEncode",
    de: "KittyEncode",
  };
  return names[lang] || names.en;
}

function getWebsiteDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online developer tools for JSON, Base64, Hash, UUID and more",
    zh: "免费的在线开发者工具，包括 JSON、Base64、Hash、UUID 等",
    ja: "JSON、Base64、Hash、UUID などのための無料オンライン開発者ツール",
    fr: "Outils de développement en ligne gratuits pour JSON, Base64, Hash, UUID et plus",
    es: "Herramientas de desarrollo en línea gratuitas para JSON, Base64, Hash, UUID y más",
    ru: "Бесплатные онлайн-инструменты разработчика для JSON, Base64, Hash, UUID и других",
    de: "Kostenlose Online-Entwicklertools für JSON, Base64, Hash, UUID und mehr",
  };
  return descriptions[lang] || descriptions.en;
}

function getToolName(lang: LanguageType): string {
  const names: Record<LanguageType, string> = {
    en: "URL Encoder / Decoder",
    zh: "URL 编码解码器",
    ja: "URL エンコーダー/デコーダー",
    fr: "Encodeur/Décodeur URL",
    es: "Codificador/Decodificador URL",
    ru: "Кодировщик/Декодировщик URL",
    de: "URL Encoder/Dekoder",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online URL encoder and decoder tool. Encode or decode URLs and query parameters instantly. Secure, fast, and works offline in your browser.",
    zh: "免费的在线 URL 编码解码工具。立即对 URL 和查询参数进行编码或解码。安全、快速，浏览器离线工作。",
    ja: " 無料のオンライン URL エンコーダーおよびデコーダー。URL とクエリパラメータを即座にエンコードまたはデコード。安全で高速、ブラウザでオフライン動作。",
    fr: "Outil d'encodage et de décodage URL en ligne gratuit. Encodez ou décodez instantanément les URL et les paramètres de requête. Sécurisé, rapide, fonctionne hors ligne dans votre navigateur.",
    es: "Herramienta de codificación y decodificación de URL en línea gratis. Codifica o decodifica URL y parámetros de consulta instantáneamente. Seguro, rápido, funciona sin conexión en tu navegador.",
    ru: "Бесплатный онлайн-инструмент для кодирования и декодирования URL. Мгновенно кодируйте или декодируйте URL и параметры запроса. Безопасно, быстро, работает офлайн в браузере.",
    de: "Kostenloses Online-URL-Encoder- und -Decoder-Tool. Kodieren oder dekodieren Sie URLs und Abfrageparameter sofort. Sicher, schnell, funktioniert offline in Ihrem Browser.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "URL Encoding",
      "URL Decoding",
      "Percent Encoding",
      "Query Parameter Encoding",
      "Works Offline",
      "Privacy First",
    ],
    zh: [
      "URL 编码",
      "URL 解码",
      "百分比编码",
      "查询参数编码",
      "离线工作",
      "隐私优先",
    ],
    ja: [
      "URL エンコーディング",
      "URL デコーディング",
      "パーセントエンコーディング",
      "クエリパラメータエンコーディング",
      "オフライン動作",
      "プライバシー優先",
    ],
    fr: [
      "Encodage URL",
      "Décodage URL",
      "Encodage pour cent",
      "Encodage des paramètres de requête",
      "Fonctionne hors ligne",
      "Confidentialité prioritaire",
    ],
    es: [
      "Codificación URL",
      "Decodificación URL",
      "Codificación por porcentaje",
      "Codificación de parámetros de consulta",
      "Funciona sin conexión",
      "Privacidad primero",
    ],
    ru: [
      "URL кодирование",
      "URL декодирование",
      "Процентное кодирование",
      "Кодирование параметров запроса",
      "Работает офлайн",
      "Конфиденциальность в первую очередь",
    ],
    de: [
      "URL-Kodierung",
      "URL-Dekodierung",
      "Prozent-Kodierung",
      "Abfrageparameter-Kodierung",
      "Offline-Betrieb",
      "Datenschutz 우선",
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
        name: "What is URL encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with a '%' followed by two hexadecimal digits representing the character's ASCII code.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use URL encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use URL encoding when your URL contains special characters like spaces, ampersands (&), question marks (?), or non-ASCII characters like Chinese or Japanese text.",
        },
      },
      {
        "@type": "Question",
        name: "Is this URL encoder free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this URL encoder/decoder is completely free to use. No signup required. All processing happens locally in your browser for maximum privacy.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是 URL 编码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL 编码将字符转换为可以通过 Internet 传输的格式。特殊字符被替换为 '%' 后跟两个十六进制数字，表示字符的 ASCII 码。",
        },
      },
      {
        "@type": "Question",
        name: "什么时候应该使用 URL 编码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "当您的 URL 包含特殊字符（如空格、&、?）或非 ASCII 字符（如中文或日文）时，请使用 URL 编码。",
        },
      },
      {
        "@type": "Question",
        name: "这个 URL 编码工具免费使用吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，这个 URL 编码解码工具完全免费使用。无需注册。所有处理都在浏览器本地进行，确保最大隐私。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "URL エンコーディングとは？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL エンコーディングは、キャラクターをインターネット経由で送信できる形式に変換します。特殊文字は '%' に続き、文字の ASCII コードを表す 2 桁の十六進数字に置き換えられます。",
        },
      },
      {
        "@type": "Question",
        name: "いつ URL エンコーディングを使用する必要がありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL にスペース、アンパサンド(&)、疑問符(?)、または中文や日文などの非 ASCII 文字が含まれている場合は、URL エンコーディングを使用してください。",
        },
      },
      {
        "@type": "Question",
        name: "この URL エンコーダーは無料で使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、この URL エンコーダー/デコーダーは完全に無料で使用できます。サインアップは不要です。すべての処理はブラウザ内でローカルに行われ、最大限のプライバシーが確保されます。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que l'encodage URL ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'encodage URL convertit les caractères dans un format qui peut être transmis sur Internet. Les caractères spéciaux sont remplacés par '%' suivi de deux chiffres hexadécimaux représentant le code ASCII du caractère.",
        },
      },
      {
        "@type": "Question",
        name: "Quand dois-je utiliser l'encodage URL ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Utilisez l'encodage URL lorsque votre URL contient des caractères spéciaux comme des espaces, des esperluettes (&), des points d'interrogation (?) ou des caractères non-ASCII comme du texte chinois ou japonais.",
        },
      },
      {
        "@type": "Question",
        name: "Cet encodeur URL est-il gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, cet encodeur/décodeur URL est complètement gratuit. Aucune inscription requise. Tous les traitements se font localement dans votre navigateur pour une confidentialité maximale.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es la codificación URL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La codificación URL convierte caracteres en un formato que puede transmitirse por Internet. Los caracteres especiales se reemplazan con '%' seguido de dos dígitos hexadecimales que representan el código ASCII del carácter.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo debo usar la codificación URL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use la codificación URL cuando su URL contenga caracteres especiales como espacios, ampersands (&), signos de interrogación (?) o caracteres no ASCII como texto chino o japonés.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es gratis usar este codificador URL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, este codificador/descodificador URL es completamente gratis. No se requiere registro. Todo el procesamiento ocurre localmente en su navegador para máxima privacidad.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое URL-кодирование?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL-кодирование преобразует символы в формат, который можно передать через Интернет. Специальные символы заменяются на '%', за которым следуют две шестнадцатеричные цифры, представляющие ASCII-код символа.",
        },
      },
      {
        "@type": "Question",
        name: "Когда следует использовать URL-кодирование?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Используйте URL-кодирование, когда ваш URL содержит специальные символы, такие как пробелы, амперсанды (&), вопросительные знаки (?) или не-ASCII символы, такие как китайский или японский текст.",
        },
      },
      {
        "@type": "Question",
        name: "Этот URL-кодировщик бесплатный?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, этот URL-кодировщик/декодировщик полностью бесплатный. Регистрация не требуется. Вся обработка происходит локально в вашем браузере для максимальной конфиденциальности.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist URL-Kodierung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL-Kodierung konvertiert Zeichen in ein Format, das über das Internet übertragen werden kann. Sonderzeichen werden durch '%' gefolgt von zwei hexadezimalen Ziffern ersetzt, die den ASCII-Code des Zeichens darstellen.",
        },
      },
      {
        "@type": "Question",
        name: "Wann sollte ich URL-Kodierung verwenden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Verwenden Sie URL-Kodierung, wenn Ihre URL Sonderzeichen wie Leerzeichen, Kaufmanns-Und (&), Fragezeichen (?) oder Nicht-ASCII-Zeichen wie chinesischen oder japanischen Text enthält.",
        },
      },
      {
        "@type": "Question",
        name: "Ist dieser URL-Encoder kostenlos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, dieser URL-Encoder/Dekoder ist vollständig kostenlos. Keine Anmeldung erforderlich. Alle Verarbeitungen erfolgen lokal in Ihrem Browser für maximale Privatsphäre.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
