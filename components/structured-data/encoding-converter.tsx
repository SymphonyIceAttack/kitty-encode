import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface EncodingConverterStructuredDataProps {
  lang: LanguageType;
}

export function EncodingConverterStructuredData({
  lang,
}: EncodingConverterStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/encoding-converter`,
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
    en: "Encoding Converter",
    zh: "编码转换器",
    ja: "エンコーディングコンバーター",
    fr: "Convertisseur d'encodage",
    es: "Conversor de codificación",
    ru: "Конвертер кодировок",
    de: "Encoding-Konverter",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online encoding converter tool. Convert between Base64, URL encoding, Hex, and more. Works offline in your browser with real-time conversion.",
    zh: "免费的在线编码转换工具。在 Base64、URL 编码、Hex 等之间转换。浏览器离线工作，支持实时转换。",
    ja: " 無料のオンライン エンコーディング コンバーター。Base64、URL エンコーディング、Hex などを相互に変換。ブラウザオフライン動作、リアルタイム変換対応。",
    fr: "Convertisseur d'encodage en ligne gratuit. Convertissez entre Base64, encodage URL, Hex et plus. Fonctionne hors ligne dans votre navigateur avec conversion en temps réel.",
    es: "Conversor de codificación en línea gratis. Convierte entre Base64, codificación URL, Hex y más. Funciona sin conexión en tu navegador con conversión en tiempo real.",
    ru: "Бесплатный онлайн конвертер кодировок. Конвертируйте между Base64, URL-кодировкой, Hex и другими. Работает офлайн в браузере с преобразованием в реальном времени.",
    de: "Kostenloser Online-Encoding-Konverter. Konvertieren Sie zwischen Base64, URL-Encoding, Hex und mehr. Funktioniert offline in Ihrem Browser mit Echtzeitkonvertierung.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Base64 encoding/decoding",
      "URL encoding/decoding",
      "Hex encoding",
      "HTML entity encoding",
      "Real-time conversion",
      "Works offline",
    ],
    zh: [
      "Base64 编码/解码",
      "URL 编码/解码",
      "Hex 编码",
      "HTML 实体编码",
      "实时转换",
      "离线工作",
    ],
    ja: [
      "Base64 エンコーディング/デコーディング",
      "URL エンコーディング/デコーディング",
      "Hex エンコーディング",
      "HTML エンティティ エンコーディング",
      "リアルタイム変換",
      "オフライン動作",
    ],
    fr: [
      "Encodage/décodage Base64",
      "Encodage/décodage URL",
      "Encodage Hex",
      "Encodage d'entités HTML",
      "Conversion en temps réel",
      "Fonctionne hors ligne",
    ],
    es: [
      "Codificación/descodificación Base64",
      "Codificación/descodificación URL",
      "Codificación Hex",
      "Codificación de entidades HTML",
      "Conversión en tiempo real",
      "Funciona sin conexión",
    ],
    ru: [
      "Кодирование/декодирование Base64",
      "Кодирование/декодирование URL",
      "Hex кодирование",
      "HTML-сущность кодирование",
      "Преобразование в реальном времени",
      "Работает офлайн",
    ],
    de: [
      "Base64-Kodierung/Dekodierung",
      "URL-Kodierung/Dekodierung",
      "Hex-Kodierung",
      "HTML-Entitäts-Kodierung",
      "Echtzeitkonvertierung",
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
        name: "What is encoding conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Encoding conversion transforms data from one format to another so it can be properly transmitted or stored. Common encodings include Base64, URL encoding, and Hex.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use Base64 encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Base64 when you need to transmit binary data over systems that only handle text, such as embedding images in HTML/CSS, or storing binary data in JSON files.",
        },
      },
      {
        "@type": "Question",
        name: "What is URL encoding used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL encoding (percent-encoding) is used to encode special characters in URLs so they can be safely transmitted. It's essential when URLs contain spaces, non-ASCII characters, or special symbols.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all encoding and decoding happens locally in your browser. Your data is never sent to any server, ensuring complete privacy and security.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是编码转换？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "编码转换将数据从一种格式转换为另一种格式，以便正确传输或存储。常见的编码包括 Base64、URL 编码和 Hex。",
        },
      },
      {
        "@type": "Question",
        name: "什么时候应该使用 Base64 编码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "当您需要通过只处理文本的系统传输二进制数据时使用 Base64。",
        },
      },
      {
        "@type": "Question",
        name: "URL 编码有什么用？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL 编码用于对 URL 中的特殊字符进行编码，以便安全传输。",
        },
      },
      {
        "@type": "Question",
        name: "这个工具安全吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，所有编码和解码都在浏览器本地进行，确保完全的隐私和安全。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "エンコーディング変換とは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "エンコーディング変換は、データを適切に送信または保存するために、ある形式から別の形式に変換します。",
        },
      },
      {
        "@type": "Question",
        name: "Base64 エンコーディングはいつ使用すればよいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "テキストのみを処理するシステムでバイナリデータを転送する必要がある場合に使用します。",
        },
      },
      {
        "@type": "Question",
        name: "URL エンコーディングは何に使用されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL の特殊文字をエンコードして安全に送信するために使用されます。",
        },
      },
      {
        "@type": "Question",
        name: "このツールは安全ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、すべてのエンコーディングとデコーディングはブラウザ内でローカルに行われ、完全なプライバシーとセキュリティが確保されます。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que la conversion d'encodage ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La conversion d'encodage transforme les données d'un format à un autre afin qu'elles puissent être correctement transmises ou stockées.",
        },
      },
      {
        "@type": "Question",
        name: "Quand dois-je utiliser l'encodage Base64 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Utilisez Base64 lorsque vous devez transmettre des données binaires sur des systèmes qui ne gèrent que le texte.",
        },
      },
      {
        "@type": "Question",
        name: "À quoi sert l'encodage URL ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'encodage URL est utilisé pour encoder les caractères spéciaux dans les URLs afin qu'ils puissent être transmis en toute sécurité.",
        },
      },
      {
        "@type": "Question",
        name: "Cet outil est-il sécurisé ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, tout l'encodage et le décodage se fait localement dans votre navigateur, garantissant une confidentialité et une sécurité complètes.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es la conversión de codificación?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La conversión de codificación transforma datos de un formato a otro para que puedan transmitirse o almacenarse correctamente.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo debo usar la codificación Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Base64 cuando necesite transmitir datos binarios sobre sistemas que solo manejan texto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Para qué se usa la codificación URL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La codificación URL se usa para codificar caracteres especiales en las URLs para que puedan transmitirse de manera segura.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es segura esta herramienta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, toda la codificación y decodificación ocurre localmente en su navegador, lo que garantiza privacidad y seguridad completas.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое преобразование кодировки?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Преобразование кодировки преобразует данные из одного формата в другой, чтобы они могли быть правильно переданы или сохранены.",
        },
      },
      {
        "@type": "Question",
        name: "Когда следует использовать кодировку Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Используйте Base64, когда вам нужно передать двоичные данные через системы, которые обрабатывают только текст.",
        },
      },
      {
        "@type": "Question",
        name: "Для чего используется URL-кодировка?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL-кодировка используется для кодирования специальных символов в URL, чтобы их можно было безопасно передавать.",
        },
      },
      {
        "@type": "Question",
        name: "Этот инструмент безопасен?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, все кодирование и декодирование происходит локально в вашем браузере, что обеспечивает полную конфиденциальность и безопасность.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist Encoding-Konvertierung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Encoding-Konvertierung transformiert Daten von einem Format in ein anderes, damit sie korrekt übertragen oder gespeichert werden können.",
        },
      },
      {
        "@type": "Question",
        name: "Wann sollte ich Base64-Kodierung verwenden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Verwenden Sie Base64, wenn Sie Binärdaten über Systeme übertragen müssen, die nur Text verarbeiten.",
        },
      },
      {
        "@type": "Question",
        name: "Wofür wird URL-Encoding verwendet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "URL-Encoding wird verwendet, um Sonderzeichen in URLs zu kodieren, damit sie sicher übertragen werden können.",
        },
      },
      {
        "@type": "Question",
        name: "Ist dieses Tool sicher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, alle Kodierung und Dekodierung erfolgt lokal in Ihrem Browser, was vollständige Privatsphäre und Sicherheit gewährleistet.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
