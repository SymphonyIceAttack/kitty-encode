import type { JWTDecoderModule } from "../../types";

// Deutscher JWT-Decoder-Modul
export const jwtDecoder: JWTDecoderModule = {
  title: "Kostenloser Online JWT-Decoder & Validator",
  description:
    "Dekodieren und validieren Sie JWT-Tokens online kostenlos. Analysieren Sie JWT-Header, Payloads und überprüfen Sie Signaturen.",
  subtitle:
    "Unser JWT-Decoder hilft Entwicklern dabei, JWT-Tokens zu dekodieren, zu validieren und zu analysieren. Perfekt für Authentifizierungs-Debugging und API-Entwicklung.",
  inputText: "JWT Token",
  inputPlaceholder: "Geben Sie hier Ihren JWT-Token ein...",
  decodeButton: "JWT dekodieren",
  loadExampleButton: "Beispiel laden",
  clearButton: "Löschen",
  headerTitle: "Header",
  payloadTitle: "Payload",
  signatureTitle: "Signatur",
  validToken: "Gültiger Token",
  invalidToken: "Ungültiger Token",
  expiredToken: "Abgelaufener Token",
  notExpired: "Nicht abgelaufen",
  copyButton: "Kopieren",
  claims: "Claims",
  expiresAt: "Läuft ab am",
  issuedAt: "Ausgestellt am",
  notBefore: "Nicht vor",
  featuresTitle: "Funktionen",
  decodingFeature: "JWT-Dekodierung",
  decodingDescription:
    "JWT-Tokens in lesbare Header- und Payload-Abschnitte dekodieren",
  validationFeature: "Token-Validierung",
  validationDescription:
    "JWT-Signaturen validieren und Ablaufstatus überprüfen",
  analysisFeature: "Token-Analyse",
  analysisDescription:
    "JWT-Struktur analysieren und Schlüsselinformationen extrahieren",
  faqTitle: "Häufig gestellte Fragen",
  faq: {
    what: {
      question: "Was ist ein JWT?",
      answer:
        "JSON Web Token (JWT) ist ein offener Standard zur sicheren Übertragung von Informationen zwischen Parteien als JSON-Objekt. Es wird häufig für Authentifizierung und Informationsaustausch verwendet.",
    },
    safe: {
      question: "Ist es sicher, den JWT-Decoder zu verwenden?",
      answer:
        "Ja, unser JWT-Decoder funktioniert vollständig in Ihrem Browser. Es werden keine Daten an unsere Server gesendet, wodurch Ihre Tokens privat und sicher bleiben.",
    },
    sections: {
      question: "Was sind die drei Abschnitte eines JWT?",
      answer:
        "Ein JWT besteht aus drei Teilen: Header (Algorithmus und Token-Typ), Payload (Claims und Daten) und Signatur (Verifizierung).",
    },
    verify: {
      question: "Wie kann ich eine JWT-Signatur überprüfen?",
      answer:
        "Um eine JWT-Signatur zu überprüfen, benötigen Sie den geheimen Schlüssel, der zum Signieren des Tokens verwendet wurde. Unser Decoder zeigt die Signatur, kann sie aber ohne den Schlüssel nicht überprüfen.",
    },
    claims: {
      question: "Was sind JWT-Claims?",
      answer:
        "JWT-Claims sind Informationsstücke, die über ein Subjekt behauptet werden. Häufige Claims umfassen 'iss' (Aussteller), 'sub' (Subjekt), 'exp' (Ablauf) und 'iat' (ausgestellt am).",
    },
  },
  valid: "Gültig",
  expired: "Abgelaufen",
  subject: "Subjekt",
  algorithm: "Algorithmus",
  type: "Typ",
  note: "Hinweis",
  noteDescription:
    "Token-Validierung erfordert den geheimen Schlüssel zur Signaturverifizierung",
  faqSectionTitle: "Häufig gestellte Fragen",
};
