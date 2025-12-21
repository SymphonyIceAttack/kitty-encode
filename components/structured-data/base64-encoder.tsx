"use client";

import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface Base64EncoderStructuredDataProps {
  lang: LanguageType;
}

export function Base64EncoderStructuredData({
  lang,
}: Base64EncoderStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/base64-encoder`,
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
    en: "Base64 Encoder / Decoder",
    zh: "Base64 编码解码器",
    ja: "Base64 エンコーダー/デコーダー",
    fr: "Encodeur/Décodeur Base64",
    es: "Codificador/Decodificador Base64",
    ru: "Кодировщик/Декодировщик Base64",
    de: "Base64 Encoder/Dekoder",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 to text instantly. Secure, fast, and works offline in your browser.",
    zh: "免费的在线 Base64 编码解码器。将文本编码为 Base64 或将 Base64 解码为文本。安全、快速，浏览器离线工作。",
    ja: " 無料のオンライン Base64 エンコーダーおよびデコーダー。テキストを Base64 にエンコードまたは Base64 をテキストにデコード。即座に動作し、ブラウザでオフライン動作。",
    fr: "Encodeur et décodeur Base64 en ligne gratuit. Encodez du texte en Base64 ou décodez Base64 en texte instantanément. Sécurisé, rapide, fonctionne hors ligne dans votre navigateur.",
    es: "Codificador y decodificador Base64 en línea gratis. Codifica texto a Base64 o decodifica Base64 a texto instantáneamente. Seguro, rápido, funciona sin conexión en tu navegador.",
    ru: "Бесплатный онлайн кодировщик и декодировщик Base64. Мгновенно кодируйте текст в Base64 или декодируйте Base64 в текст. Безопасно, быстро, работает офлайн в браузере.",
    de: "Kostenloser Online-Base64-Encoder und -Dekoder. Kodieren Sie Text zu Base64 oder dekodieren Sie Base64 zu Text sofort. Sicher, schnell, funktioniert offline in Ihrem Browser.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Base64 Encoding",
      "Base64 Decoding",
      "URL-safe Base64",
      "MIME support",
      "Works Offline",
      "Privacy First",
    ],
    zh: [
      "Base64 编码",
      "Base64 解码",
      "URL 安全 Base64",
      "MIME 支持",
      "离线工作",
      "隐私优先",
    ],
    ja: [
      "Base64 エンコーディング",
      "Base64 デコーディング",
      "URL セーフ Base64",
      "MIME サポート",
      "オフライン動作",
      "プライバシー優先",
    ],
    fr: [
      "Encodage Base64",
      "Décodage Base64",
      "Base64 URL-sécurisé",
      "Support MIME",
      "Fonctionne hors ligne",
      "Confidentialité prioritaire",
    ],
    es: [
      "Codificación Base64",
      "Decodificación Base64",
      "Base64 seguro para URL",
      "Soporte MIME",
      "Funciona sin conexión",
      "Privacidad primero",
    ],
    ru: [
      "Base64 кодирование",
      "Base64 декодирование",
      "URL-безопасный Base64",
      "Поддержка MIME",
      "Работает офлайн",
      "Конфиденциальность в первую очередь",
    ],
    de: [
      "Base64-Kodierung",
      "Base64-Dekodierung",
      "URL-sicheres Base64",
      "MIME-Unterstützung",
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
        name: "What is Base64 encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to transmit binary data over systems that can only reliably handle text.",
        },
      },
      {
        "@type": "Question",
        name: "Is this Base64 tool free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this Base64 encoder and decoder is completely free to use. No signup or registration required. Your data is processed locally in your browser for maximum privacy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I encode and decode Base64 offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Base64 tool works completely offline. All encoding and decoding happens in your browser, so you can use it without an internet connection.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure when using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All Base64 encoding and decoding happens locally in your browser. Your data is never sent to any server, ensuring complete privacy and security.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是 Base64 编码？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 是一种二进制到文本的编码方案，将二进制数据表示为 ASCII 字符串格式。它通常用于在只能可靠处理文本的系统上传输二进制数据。",
        },
      },
      {
        "@type": "Question",
        name: "这个 Base64 工具免费使用吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，这个 Base64 编码解码工具完全免费使用。无需注册。您的数据在浏览器中本地处理，确保最大隐私。",
        },
      },
      {
        "@type": "Question",
        name: "我可以离线编码和解码 Base64 吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，我们的 Base64 工具完全离线工作。所有编码和解码都在浏览器中进行，无需互联网连接即可使用。",
        },
      },
      {
        "@type": "Question",
        name: "使用此工具时我的数据安全吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "绝对安全。所有 Base64 编码和解码都在浏览器本地进行。您的数据永远不会发送到任何服务器，确保完全的隐私和安全。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "Base64 エンコーディングとは？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 は、バイナリデータを ASCII 文字列形式で表現するバイナリからテキストへのエンコーディングスキームです。テキストのみを確実に処理できるシステムでバイナリデータを転送するために一般的に使用されます。",
        },
      },
      {
        "@type": "Question",
        name: "この Base64 ツールは無料で使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、この Base64 エンコーダーおよびデコーダーは完全に無料で使用できます。サインアップや登録は不要です。データはブラウザ内でローカルに処理され、最大限のプライバシーが確保されます。",
        },
      },
      {
        "@type": "Question",
        name: "オフラインで Base64 をエンコードおよびデコードできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、私たちの Base64 ツールは完全にオフラインで動作します。すべてのエンコーディングとデコーディングはブラウザ内で行われるため、インターネット接続なしで使用できます。",
        },
      },
      {
        "@type": "Question",
        name: "このツールを使用するとデータは安全ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "確かに安全です。すべての Base64 エンコーディングとデコーディングはブラウザ内でローカルに行われます。データがサーバーに送信されることは決してなく、完全なプライバシーとセキュリティが確保されます。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que l'encodage Base64 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 est un schéma d'encodage binaire vers texte qui représente les données binaires dans un format de chaîne ASCII. Il est couramment utilisé pour transmettre des données binaires sur des systèmes qui ne peuvent gérer que du texte de manière fiable.",
        },
      },
      {
        "@type": "Question",
        name: "Cet outil Base64 est-il gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, cet encodeur et décodeur Base64 est completamente gratuit. Aucune inscription n'est requise. Vos données sont traitées localement dans votre navigateur pour une confidentialité maximale.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je encoder et décoder Base64 hors ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, notre outil Base64 fonctionne complètement hors ligne. Tout l'encodage et le décodage se font dans votre navigateur, vous pouvez donc l'utiliser sans connexion Internet.",
        },
      },
      {
        "@type": "Question",
        name: "Mes données sont-elles sécurisées avec cet outil ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolument. Tout l'encodage et le décodage Base64 se font localement dans votre navigateur. Vos données ne sont jamais envoyées à un serveur, garantissant une confidentialité et une sécurité complètes.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es la codificación Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 es un esquema de codificación de binario a texto que representa datos binarios en un formato de cadena ASCII. Se usa comúnmente para transmitir datos binarios sobre sistemas que solo pueden manejar texto de manera confiable.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es gratis usar esta herramienta Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, este codificador y decodificador Base64 es completamente gratis. No se requiere registro. Sus datos se procesan localmente en su navegador para máxima privacidad.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo codificar y decodificar Base64 sin conexión?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, nuestra herramienta Base64 funciona completamente sin conexión. Toda la codificación y decodificación ocurre en su navegador, por lo que puede usarla sin conexión a Internet.",
        },
      },
      {
        "@type": "Question",
        name: "¿Mis datos están seguros al usar esta herramienta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutamente. Toda la codificación y decodificación Base64 ocurre localmente en su navegador. Sus datos nunca se envían a ningún servidor, lo que garantiza privacidad y seguridad completas.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое кодирование Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 — это схема кодирования из двоичного в текст, которая представляет двоичные данные в формате строки ASCII. Он обычно используется для передачи двоичных данных через системы, которые могут надежно обрабатывать только текст.",
        },
      },
      {
        "@type": "Question",
        name: "Этот инструмент Base64 бесплатный?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, этот кодировщик и декодировщик Base64 полностью бесплатный. Регистрация не требуется. Ваши данные обрабатываются локально в браузере для максимальной конфиденциальности.",
        },
      },
      {
        "@type": "Question",
        name: "Могу ли я кодировать и декодировать Base64 офлайн?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, наш инструмент Base64 работает полностью офлайн. Все кодирование и декодирование происходит в вашем браузере, поэтому вы можете использовать его без подключения к Интернету.",
        },
      },
      {
        "@type": "Question",
        name: "Мои данные защищены при использовании этого инструмента?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Абсолютно. Все кодирование и декодирование Base64 происходит локально в вашем браузере. Ваши данные никогда не отправляются на какой-либо сервер, что обеспечивает полную конфиденциальность и безопасность.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist Base64-Kodierung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 ist ein Binär-zu-Text-Kodierungsschema, das Binärdaten in einem ASCII-String-Format darstellt. Es wird häufig verwendet, um Binärdaten über Systeme zu übertragen, die zuverlässig nur Text verarbeiten können.",
        },
      },
      {
        "@type": "Question",
        name: "Ist dieses Base64-Tool kostenlos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, dieser Base64-Encoder und -Dekoder ist vollständig kostenlos. Keine Anmeldung erforderlich. Ihre Daten werden lokal in Ihrem Browser verarbeitet für maximale Privatsphäre.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich Base64 offline codieren und decodieren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, unser Base64-Tool funktioniert vollständig offline. Alle Kodierung und Dekodierung erfolgt in Ihrem Browser, sodass Sie es ohne Internetverbindung verwenden können.",
        },
      },
      {
        "@type": "Question",
        name: "Sind meine Daten bei der Verwendung dieses Tools sicher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolut. Alle Base64-Kodierung und -Dekodierung erfolgt lokal in Ihrem Browser. Ihre Daten werden niemals an einen Server gesendet, was vollständige Privatsphäre und Sicherheit gewährleistet.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
