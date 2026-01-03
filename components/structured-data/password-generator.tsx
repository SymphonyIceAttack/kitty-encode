import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface PasswordGeneratorStructuredDataProps {
  lang: LanguageType;
}

export function PasswordGeneratorStructuredData({
  lang,
}: PasswordGeneratorStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/password-generator`,
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
    en: "Password Generator",
    zh: "密码生成器",
    ja: "パスワード生成器",
    fr: "Générateur de mots de passe",
    es: "Generador de contraseñas",
    ru: "Генератор паролей",
    de: "Passwort-Generator",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online password generator tool. Create strong, secure passwords instantly with customizable length and character options. Works offline in your browser.",
    zh: "免费的在线密码生成器。立即创建强密码，支持自定义长度和字符选项。浏览器离线工作，安全可靠。",
    ja: " 無料のパスワード生成器。カスタマイズ可能な長さと文字オプションで強力で安全なパスワードを即座に作成。ブラウザオフライン動作。",
    fr: "Générateur de mots de passe en ligne gratuit. Créez des mots de passe forts et sécurisés instantanément avec des options de longueur et de caractères personnalisables. Fonctionne hors ligne dans votre navigateur.",
    es: "Generador de contraseñas en línea gratis. Crea contraseñas seguras y fuertes instantáneamente con opciones personalizables de longitud y caracteres. Funciona sin conexión en tu navegador.",
    ru: "Бесплатный онлайн генератор паролей. Мгновенно создавайте надёжные безопасные пароли с настраиваемой длиной и параметрами символов. Работает офлайн в браузере.",
    de: "Kostenloser Online-Passwort-Generator. Erstellen Sie sofort sichere, starke Passwörter mit anpassbaren Längen- und Zeichenoptionen. Funktioniert offline in Ihrem Browser.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Customizable password length",
      "Include/exclude character types",
      "Strong entropy generation",
      "Copy to clipboard",
      "Works offline",
      "No data transmission",
    ],
    zh: [
      "自定义密码长度",
      "包含/排除字符类型",
      "强熵生成",
      "复制到剪贴板",
      "离线工作",
      "不传输数据",
    ],
    ja: [
      "カスタマイズ可能なパスワード長",
      "文字種類の含める/除外",
      "強力なエントロピー生成",
      "クリップボードにコピー",
      "オフライン動作",
      "データ送信なし",
    ],
    fr: [
      "Longueur de mot de passe personnalisable",
      "Inclure/exclure les types de caractères",
      "Génération d'entropie forte",
      "Copier dans le presse-papiers",
      "Fonctionne hors ligne",
      "Aucune transmission de données",
    ],
    es: [
      "Longitud de contraseña personalizable",
      "Incluir/excluir tipos de caracteres",
      "Generación de entropía fuerte",
      "Copiar al portapapeles",
      "Funciona sin conexión",
      "Sin transmisión de datos",
    ],
    ru: [
      "Настраиваемая длина пароля",
      "Включение/исключение типов символов",
      "Генерация сильной энтропии",
      "Копировать в буфер обмена",
      "Работает офлайн",
      "Без передачи данных",
    ],
    de: [
      "Anpassbare Passwortlänge",
      "Zeichentypen ein-/ausschließen",
      "Starke Entropie-Generierung",
      "In die Zwischenablage kopieren",
      "Offline-Betrieb",
      "Keine Datenübertragung",
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
        name: "What makes a strong password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A strong password should be long (12+ characters), use a mix of character types (uppercase, lowercase, numbers, symbols), and not contain personal information or common words.",
        },
      },
      {
        "@type": "Question",
        name: "How secure are the passwords generated here?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our password generator uses cryptographically secure random number generators. The entropy is high enough that even with massive computing power, it would take millions of years to brute force.",
        },
      },
      {
        "@type": "Question",
        name: "Are my generated passwords stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all password generation happens locally in your browser. Your passwords are never sent to any server or stored anywhere. Once you close the page, they are gone forever.",
        },
      },
      {
        "@type": "Question",
        name: "What is password entropy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Password entropy measures the unpredictability of a password, measured in bits. Higher entropy means harder to crack. A random 12-character password has approximately 77 bits of entropy.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么使密码强大？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "强密码应该足够长（12个字符以上），使用混合字符类型（大写、小写、数字、符号），且不包含个人信息或常见单词。",
        },
      },
      {
        "@type": "Question",
        name: "这里生成的密码有多安全？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我们的密码生成器使用加密安全的随机数生成器。熵值足够高，即使使用巨大的计算能力，也需要数百万年才能暴力破解。",
        },
      },
      {
        "@type": "Question",
        name: "我生成的密码会被存储吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "不会，所有密码生成都在浏览器本地进行。您的密码永远不会发送到任何服务器或存储在任何地方。",
        },
      },
      {
        "@type": "Question",
        name: "什么是密码熵？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "密码熵衡量密码的不可预测性，以位为单位。熵越高越难破解。随机12字符密码约有77位熵。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "強力なパスワードとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "強力なパスワードは長く（12文字以上）、文字種の混合（大文字、小文字、数字、記号）を使用し、個人情報や一般的な単語を含まない必要があります。",
        },
      },
      {
        "@type": "Question",
        name: "ここで生成されるパスワードはどの程度安全ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "私たちのパスワード生成者は暗号的に安全な乱数生成器を使用します。エントロピーは十分に高く、膨大な計算能力を使用しても、数百万年かけてブルートフォースする必要があります。",
        },
      },
      {
        "@type": "Question",
        name: "生成されたパスワードは保存されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いいえ、すべてのパスワード生成はブラウザ内でローカルに行われます。パスワードはサーバーには送信されず、どこにも保存されません。",
        },
      },
      {
        "@type": "Question",
        name: "パスワードエントロピーとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "パスワードエントロピーは、パスワードの予測不能性をビット単位で測定します。エントロピーが高いほど、解読が困難になります。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce qui fait un mot de passe fort ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un mot de passe fort doit être long (12+ caractères), utiliser un mélange de types de caractères (majuscules, minuscules, chiffres, symboles) et ne pas contenir d'informations personnelles ou de mots courants.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la sécurité des mots de passe générés ici ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre générateur de mots de passe utilise des générateurs de nombres aléatoires cryptographiquement sécurisés. L'entropie est suffisamment élevée pour que même avec une puissance de calcul massive, il faudrait des millions d'années pour les forcer.",
        },
      },
      {
        "@type": "Question",
        name: "Mes mots de passe générés sont-ils stockés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, toute la génération de mots de passe se fait localement dans votre navigateur. Vos mots de passe ne sont jamais envoyés à un serveur ou stockés n'importe où.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce que l'entropie du mot de passe ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'entropie du mot de passe mesure l'imprévisibilité d'un mot de passe, mesurée en bits. Plus l'entropie est élevée, plus il est difficile à craquer.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué hace que una contraseña sea fuerte?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Una contraseña fuerte debe ser larga (12+ caracteres), usar una mezcla de tipos de caracteres (mayúsculas, minúsculas, números, símbolos) y no contener información personal o palabras comunes.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tan seguras son las contraseñas generadas aquí?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nuestro generador de contraseñas usa generadores de números aleatorios criptográficamente seguros. La entropía es lo suficientemente alta como para que incluso con una enorme potencia de cómputo, tomaría millones de años para fuerza bruta.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se almacenan mis contraseñas generadas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, toda la generación de contraseñas ocurre localmente en su navegador. Sus contraseñas nunca se envían a ningún servidor ni se almacenan en ningún lugar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es la entropía de contraseña?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La entropía de contraseña mide la impredictibilidad de una contraseña, medida en bits. Mayor entropía significa más difícil de crackear.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что делает пароль надёжным?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Надёжный пароль должен быть длинным (12+ символов), использовать смесь типов символов (заглавные, строчные, цифры, символы) и не содержать личную информацию или распространённые слова.",
        },
      },
      {
        "@type": "Question",
        name: "Насколько безопасны сгенерированные здесь пароли?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Наш генератор паролей использует криптографически безопасные генераторы случайных чисел. Энтропия достаточно высока, что даже при огромной вычислительной мощности потребуются миллионы лет для взлома.",
        },
      },
      {
        "@type": "Question",
        name: "Сохраняются ли мои сгенерированные пароли?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет, вся генерация паролей происходит локально в вашем браузере. Ваши пароли никогда не отправляются на какой-либо сервер и не сохраняются.",
        },
      },
      {
        "@type": "Question",
        name: "Что такое энтропия пароля?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Энтропия пароля измеряет непредсказуемость пароля в битах. Более высокая энтропия означает более сложный для взлома.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was macht ein starkes Passwort aus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ein starkes Passwort sollte lang sein (12+ Zeichen), eine Mischung aus Zeichentypen (Großbuchstaben, Kleinbuchstaben, Zahlen, Symbole) verwenden und keine persönlichen Informationen oder gängige Wörter enthalten.",
        },
      },
      {
        "@type": "Question",
        name: "Wie sicher sind die hier generierten Passwörter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unser Passwort-Generator verwendet kryptografisch sichere Zufallszahlengeneratoren. Die Entropie ist hoch genug, dass selbst mit enormer Rechenleistung Millionen von Jahren benötigt würden, um es zu brute-forcen.",
        },
      },
      {
        "@type": "Question",
        name: "Werden meine generierten Passwörter gespeichert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein, alle Passwortgenerierung erfolgt lokal in Ihrem Browser. Ihre Passwörter werden niemals an einen Server gesendet oder irgendwo gespeichert.",
        },
      },
      {
        "@type": "Question",
        name: "Was ist Passwort-Entropie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Passwort-Entropie misst die Unvorhersehbarkeit eines Passworts, gemessen in Bits. Höhere Entropie bedeutet schwerer zu knacken.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
