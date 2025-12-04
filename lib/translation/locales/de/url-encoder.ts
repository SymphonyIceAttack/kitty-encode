import type { URLEncoderModule } from "../../types";

// Deutscher URL-Encoder/Decoder-Modul
export const urlEncoder: URLEncoderModule = {
  title: "Kostenloser Online URL-Encoder/Decoder - URLs sofort kodieren",
  description:
    "Kodieren und dekodieren Sie URLs online kostenlos. Perfekt für API-Entwicklung und Web-Programmierung.",
  subtitle:
    "Unser kostenloser Online URL-Encoder/Decoder hilft Entwicklern, URLs sicher zu kodieren und zu dekodieren für Web-Entwicklung, API-Integration und Datenübertragung. Perfekt für die Behandlung von Sonderzeichen und Nicht-ASCII-Text.",
  tabs: {
    encode: "URL-Encoder",
    decode: "URL-Decoder",
  },
  encode: {
    title: "URL kodieren",
    description:
      "Klartext in URL-kodiertes Format umwandeln (Prozent-Kodierung)",
    inputText: "Eingabetext",
    placeholder: "Text zum Kodieren eingeben (z.B.: Hello World! & ? # @)",
    button: "In URL-Format kodieren",
    result: "Kodiertes Ergebnis",
  },
  decode: {
    title: "URL dekodieren",
    description: "URL-kodiertes Format zurück in Klartext umwandeln",
    inputText: "Kodierte URL",
    placeholder: "URL-kodierten Text eingeben (z.B.: Hello%20World%21)",
    button: "In Klartext dekodieren",
    result: "Dekodiertes Ergebnis",
  },
  howToUse: {
    title: "Wie Sie unseren URL-Encoder verwenden",
    steps: {
      chooseMode: {
        title: "1. Modus wählen",
        description:
          'Wählen Sie "URL-Encoder" zum Kodieren von Klartext oder "URL-Decoder" zum Dekodieren prozent-kodierter Zeichenfolgen.',
      },
      enterText: {
        title: "2. Ihren Text eingeben",
        description:
          "Fügen Sie ein oder geben Sie den Text ein, den Sie kodieren/dekodieren möchten. Funktioniert mit beliebigem Text, Sonderzeichen und Unicode.",
      },
      getResults: {
        title: "3. Sofortige Ergebnisse erhalten",
        description:
          "Klicken Sie auf die Kodieren/Dekodieren-Button, um Ihr Ergebnis zu erhalten. Mit einem Klick kopieren für einfache Verwendung in Ihren Projekten.",
      },
    },
  },
  encodingVsDecoding: {
    title: "URL-Kodierung vs URL-Dekodierung",
    encoding: {
      title: "URL-Kodierung",
      description:
        "Konvertiert Sonderzeichen in ein Format, das sicher über das Internet übertragen werden kann.",
    },
    decoding: {
      title: "URL-Dekodierung",
      description:
        "Konvertiert prozent-kodierte Zeichenfolgen zurück in ihr ursprüngliches lesbares Format.",
    },
  },
  commonExamples: {
    title: "Häufige URL-Kodierungsbeispiele",
    columns: {
      character: "Zeichen",
      encoded: "URL-kodiert",
      description: "Beschreibung",
    },
    examples: {
      space: {
        char: "Leerzeichen",
        encoded: "%20",
        description: "Ersetzt Leerzeichen im Text",
      },
      ampersand: {
        char: "&",
        encoded: "%26",
        description: "Trennt URL-Parameter",
      },
      question: {
        char: "?",
        encoded: "%3F",
        description: "Startet Abfrage-Zeichenfolge",
      },
      hash: {
        char: "#",
        encoded: "%23",
        description: "URL-Fragment-Kennung",
      },
      plus: {
        char: "+",
        encoded: "%2B",
        description: "Plus-Zeichen in URLs",
      },
      chinese: {
        char: "中文",
        encoded: "%E4%B8%AD%E6%96%87",
        description: "Nicht-ASCII-Zeichen",
      },
    },
  },
  faq: {
    title: "Häufig gestellte Fragen",
    url: {
      secure: {
        question: "Ist URL-Kodierung sicher?",
        answer:
          "Ja, URL-Kodierung ist vollständig sicher. Sie konvertiert nur Sonderzeichen in ein Standardformat, das sicher über das Internet übertragen werden kann. Es werden keine Daten auf unseren Servern gespeichert oder verarbeitet.",
      },
      why: {
        question: "Warum brauche ich URL-Kodierung?",
        answer:
          "URL-Kodierung ist notwendig, wenn Sie Sonderzeichen, Leerzeichen oder nicht-ASCII-Text in URLs einfügen möchten. Es stellt sicher, dass Webbrowser und Server die URL korrekt interpretieren können, ohne Fehler zu verursachen.",
      },
      chinese: {
        question: "Kann ich chinesische Zeichen kodieren?",
        answer:
          "Ja, unser URL-Encoder kann chinesische Zeichen und anderen Unicode-Text verarbeiten. Sie werden korrekt kodiert, um sicherzustellen, dass sie in URLs korrekt funktionieren.",
      },
      api: {
        question: "Kann ich dies für die API-Entwicklung verwenden?",
        answer:
          "Absolut! URL-Kodierung ist für die API-Entwicklung unerlässlich, besonders beim Senden von Daten über GET-Anfragen oder beim Einbeziehen von Parametern in URLs.",
      },
      difference: {
        question: "Was ist der Unterschied zwischen Kodierung und Dekodierung?",
        answer:
          "Kodierung konvertiert einfachen Text in URL-kodiertes Format (wie 'Hello World' zu 'Hello%20World'), während Dekodierung URL-kodierten Text zurück in einfachen Text konvertiert.",
      },
    },
  },
  relatedTools: {
    title: "Verwandte Tools",
    jwtDecoder: {
      title: "JWT-Decoder",
      description: "JWT-Tokens online dekodieren und validieren",
    },
    jsonFormatter: {
      title: "JSON-Formatierer",
      description: "JSON-Daten formatieren und validieren",
    },
    base64Encoder: {
      title: "Base64-Encoder",
      description: "Base64-Zeichenfolgen kodieren und dekodieren",
    },
  },
  ui: {
    tryButton: "Jetzt ausprobieren",
    clearButton: "Löschen",
    errorEncode: "Fehler beim Kodieren des Textes",
    errorDecode: "Fehler beim Dekodieren der URL",
    copySuccess: "In die Zwischenablage kopiert!",
  },
};
