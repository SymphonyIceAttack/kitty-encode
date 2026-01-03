import type { FAQPage, WebApplication, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";
import type { LanguageType } from "@/lib/translations";

interface Md5GeneratorStructuredDataProps {
  lang: LanguageType;
}

export function Md5GeneratorStructuredData({
  lang,
}: Md5GeneratorStructuredDataProps) {
  const webApplicationSchema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: getToolName(lang),
    description: getToolDescription(lang),
    url: `${siteUrl}/${lang}/tools/md5-generator`,
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
    en: "MD5 Hash Generator",
    zh: "MD5 哈希生成器",
    ja: "MD5 ハッシュ生成器",
    fr: "Générateur de hash MD5",
    es: "Generador de hash MD5",
    ru: "Генератор хеша MD5",
    de: "MD5 Hash-Generator",
  };
  return names[lang] || names.en;
}

function getToolDescription(lang: LanguageType): string {
  const descriptions: Record<LanguageType, string> = {
    en: "Free online MD5 hash generator tool. Generate MD5 checksums from text instantly with support for 32-bit and 16-bit output. Secure and works offline.",
    zh: "免费的在线 MD5 哈希生成器。立即从文本生成 MD5 哈希值，支持 32 位和 16 位输出。安全、快速，浏览器离线工作。",
    ja: " 無料のオンライン MD5 ハッシュ生成器。テキストから MD5 ハッシュを即座に生成、32 ビットおよび 16 ビット出力をサポート。安全でブラウザオフライン動作。",
    fr: "Générateur de hash MD5 en ligne gratuit. Générez des checksums MD5 à partir de texte instantanément avec support de la sortie 32 bits et 16 bits. Sécurisé et fonctionne hors ligne.",
    es: "Generador de hash MD5 en línea gratis. Genera checksums MD5 a partir de texto instantáneamente con soporte para salida de 32 bits y 16 bits. Seguro y funciona sin conexión.",
    ru: "Бесплатный онлайн генератор хеша MD5. Генерируйте контрольные суммы MD5 из текста мгновенно с поддержкой 32-битного и 16-битного вывода. Безопасно и работает офлайн.",
    de: "Kostenloser Online-MD5-Hash-Generator. Generieren Sie MD5-Checksummen aus Text sofort mit Unterstützung für 32-Bit- und 16-Bit-Ausgabe. Sicher und funktioniert offline.",
  };
  return descriptions[lang] || descriptions.en;
}

function getFeatureList(lang: LanguageType): string[] {
  const features: Record<LanguageType, string[]> = {
    en: [
      "Generate MD5 hash from text",
      "MD5 checksum generation",
      "32-bit and 16-bit output",
      "Real-time hash generation",
      "Copy to clipboard",
      "Works offline",
    ],
    zh: [
      "从文本生成 MD5 哈希",
      "MD5 校验和生成",
      "32 位和 16 位输出",
      "实时哈希生成",
      "复制到剪贴板",
      "离线工作",
    ],
    ja: [
      "テキストから MD5 ハッシュを生成",
      "MD5 チェックサム生成",
      "32 ビットおよび 16 ビット出力",
      "リアルタイムハッシュ生成",
      "クリップボードにコピー",
      "オフライン動作",
    ],
    fr: [
      "Générer un hash MD5 à partir de texte",
      "Génération de checksum MD5",
      "Sortie 32 bits et 16 bits",
      "Génération de hash en temps réel",
      "Copier dans le presse-papiers",
      "Fonctionne hors ligne",
    ],
    es: [
      "Generar hash MD5 a partir de texto",
      "Generación de checksum MD5",
      "Salida de 32 bits y 16 bits",
      "Generación de hash en tiempo real",
      "Copiar al portapapeles",
      "Funciona sin conexión",
    ],
    ru: [
      "Генерировать хеш MD5 из текста",
      "Генерация контрольной суммы MD5",
      "32-битный и 16-битный вывод",
      "Генерация хеша в реальном времени",
      "Копировать в буфер обмена",
      "Работает офлайн",
    ],
    de: [
      "MD5-Hash aus Text generieren",
      "MD5-Checksum-Generierung",
      "32-Bit- und 16-Bit-Ausgabe",
      "Echtzeit-Hash-Generierung",
      "In die Zwischenablage kopieren",
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
        name: "What is MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit (16-byte) hash value. It's commonly used for verifying data integrity and creating checksums for files.",
        },
      },
      {
        "@type": "Question",
        name: "Is MD5 secure for passwords?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, MD5 is not considered secure for password hashing due to collision vulnerabilities. It's recommended to use stronger algorithms like SHA-256, bcrypt, or Argon2 for password storage.",
        },
      },
      {
        "@type": "Question",
        name: "What is MD5 used for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 is primarily used for data integrity verification, file checksums, and digital signatures. It's also used in non-security contexts like content-based addressing in distributed systems.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate MD5 hash for files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our MD5 generator can create checksums for files to verify their integrity. Simply select or drag and drop a file, and we'll generate its MD5 hash for comparison.",
        },
      },
    ],
    zh: [
      {
        "@type": "Question",
        name: "什么是 MD5？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5（Message Digest Algorithm 5）是一种加密哈希函数，产生 128 位（16 字节）的哈希值。它通常用于验证数据完整性和创建文件校验和。",
        },
      },
      {
        "@type": "Question",
        name: "MD5 用于密码存储安全吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "不，由于碰撞漏洞，MD5 不被认为是安全的密码哈希方式。建议使用更强的算法如 SHA-256、bcrypt 或 Argon2 来存储密码。",
        },
      },
      {
        "@type": "Question",
        name: "MD5 有什么用？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 主要用于数据完整性验证、文件校验和和数字签名。它也用于非安全场景，如分布式系统中的基于内容的寻址。",
        },
      },
      {
        "@type": "Question",
        name: "我可以为文件生成 MD5 哈希吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，我们的 MD5 生成器可以为文件创建校验和以验证其完整性。只需选择或拖放文件，我们将生成其 MD5 哈希值进行比较。",
        },
      },
    ],
    ja: [
      {
        "@type": "Question",
        name: "MD5 とは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5（Message Digest Algorithm 5）は、128 ビット（16 バイト）のハッシュ値を生成する暗号化ハッシュ関数です。データの整合性を検証し、ファイルのチェックサムを作成するために一般的に使用されます。",
        },
      },
      {
        "@type": "Question",
        name: "MD5 はパスワードに安全ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いいえ、MD5 は衝突の脆弱性があるため、パスワードハッシュには安全とは見なされません。SHA-256、bcrypt、Argon2 などのより強力なアルゴリズムをパスワード保存に使用することをお勧めします。",
        },
      },
      {
        "@type": "Question",
        name: "MD5は何に使用されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 は主にデータの整合性検証、ファイルのチェックサム、デジタル署名に使用されます。分散システムでのコンテンツベースのアドレッシングなど、セキュリティ以外のコンテキストでも使用されます。",
        },
      },
      {
        "@type": "Question",
        name: "ファイルの MD5 ハッシュを生成できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、私たちの MD5 生成器はファイルのチェックサムを作成して整合性を検証できます。ファイルを選択またはドラッグ＆ドロップするだけで、比較用の MD5 ハッシュを生成します。",
        },
      },
    ],
    fr: [
      {
        "@type": "Question",
        name: "Qu'est-ce que MD5 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) est une fonction de hachage cryptographique qui produit une valeur de hachage de 128 bits (16 octets). Il est couramment utilisé pour vérifier l'intégrité des données et créer des checksums pour les fichiers.",
        },
      },
      {
        "@type": "Question",
        name: "MD5 est-il sécurisé pour les mots de passe ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, MD5 n'est pas considéré comme sécurisé pour le hachage de mots de passe en raison des vulnérabilités de collision. Il est recommandé d'utiliser des algorithmes plus puissants comme SHA-256, bcrypt ou Argon2 pour le stockage des mots de passe.",
        },
      },
      {
        "@type": "Question",
        name: "À quoi sert MD5 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 est principalement utilisé pour la vérification de l'intégrité des données, les checksums de fichiers et les signatures numériques. Il est également utilisé dans des contextes non sécurisés comme l'adressage basé sur le contenu dans les systèmes distribués.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je générer un hash MD5 pour des fichiers ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, notre générateur MD5 peut créer des checksums pour les fichiers afin de vérifier leur intégrité. Sélectionnez simplement un fichier et nous générerons son hash MD5 pour comparaison.",
        },
      },
    ],
    es: [
      {
        "@type": "Question",
        name: "¿Qué es MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) es una función de hash criptográfica que produce un valor hash de 128 bits (16 bytes). Se usa comúnmente para verificar la integridad de los datos y crear checksums para archivos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es MD5 seguro para contraseñas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, MD5 no se considera seguro para el hash de contraseñas debido a vulnerabilidades de colisión. Se recomienda usar algoritmos más fuertes como SHA-256, bcrypt o Argon2 para el almacenamiento de contraseñas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Para qué se usa MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 se usa principalmente para verificación de integridad de datos, checksums de archivos y firmas digitales. También se usa en contextos no seguros como direccionamiento basado en contenido en sistemas distribuidos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo generar hash MD5 para archivos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, nuestro generador MD5 puede crear checksums para archivos para verificar su integridad. Simplemente seleccione o arrastre y suelte un archivo y generaremos su hash MD5 para comparación.",
        },
      },
    ],
    ru: [
      {
        "@type": "Question",
        name: "Что такое MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) — это криптографическая хеш-функция, которая производит 128-битное (16-байтовое) значение хеша. Он обычно используется для проверки целостности данных и создания контрольных сумм для файлов.",
        },
      },
      {
        "@type": "Question",
        name: "MD5 безопасен для паролей?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Нет, MD5 не считается безопасным для хеширования паролей из-за уязвимостей к коллизиям. Рекомендуется использовать более надежные алгоритмы, такие как SHA-256, bcrypt или Argon2, для хранения паролей.",
        },
      },
      {
        "@type": "Question",
        name: "Для чего используется MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 в основном используется для проверки целостности данных, контрольных сумм файлов и цифровых подписей. Он также используется в небезопасных контекстах, таких как адресация на основе содержимого в распределенных системах.",
        },
      },
      {
        "@type": "Question",
        name: "Могу ли я сгенерировать хеш MD5 для файлов?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, наш генератор MD5 может создавать контрольные суммы для файлов для проверки их целостности. Просто выберите или перетащите файл, и мы сгенерируем его хеш MD5 для сравнения.",
        },
      },
    ],
    de: [
      {
        "@type": "Question",
        name: "Was ist MD5?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 (Message Digest Algorithm 5) ist eine kryptografische Hash-Funktion, die einen 128-Bit-Hash-Wert erzeugt. Es wird häufig verwendet, um die Datenintegrität zu überprüfen und Prüfsummen für Dateien zu erstellen.",
        },
      },
      {
        "@type": "Question",
        name: "Ist MD5 sicher für Passwörter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein, MD5 gilt aufgrund von Kollisionsschwachstellen nicht als sicher für das Passwort-Hashing. Es wird empfohlen, stärkere Algorithmen wie SHA-256, bcrypt oder Argon2 für die Passwortspeicherung zu verwenden.",
        },
      },
      {
        "@type": "Question",
        name: "Wofür wird MD5 verwendet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MD5 wird hauptsächlich zur Datenintegritätsprüfung, Dateiprüfsummen und digitalen Signaturen verwendet. Es wird auch in nicht sicheren Kontexten wie inhaltsbasierter Adressierung in verteilten Systemen verwendet.",
        },
      },
      {
        "@type": "Question",
        name: "Kann ich MD5-Hashes für Dateien generieren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, unser MD5-Generator kann Prüfsummen für Dateien erstellen, um deren Integrität zu überprüfen. Wählen Sie einfach eine Datei aus oder ziehen Sie sie per Drag & Drop, und wir generieren deren MD5-Hash zum Vergleich.",
        },
      },
    ],
  };

  return faqData[lang] || faqData.en;
}
