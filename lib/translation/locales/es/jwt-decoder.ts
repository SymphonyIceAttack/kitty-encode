import type { JWTDecoderModule } from "../../types";

// Módulo de decodificador JWT en español
export const jwtDecoder: JWTDecoderModule = {
  title: "Decodificador y Validador JWT en Línea Gratuito",
  description:
    "Decodifica y valida tokens JWT en línea gratis. Analiza encabezados JWT, cargas útiles y verifica firmas.",
  subtitle:
    "Nuestro decodificador JWT ayuda a los desarrolladores a decodificar, validar y analizar tokens JWT. Perfecto para depuración de autenticación y desarrollo de API.",
  inputText: "Token JWT",
  inputPlaceholder: "Ingrese su token JWT aquí...",
  decodeButton: "Decodificar JWT",
  loadExampleButton: "Cargar Ejemplo",
  clearButton: "Limpiar",
  headerTitle: "Encabezado",
  payloadTitle: "Carga Útil",
  signatureTitle: "Firma",
  validToken: "Token Válido",
  invalidToken: "Token Inválido",
  expiredToken: "Token Expirado",
  notExpired: "No Expirado",
  copyButton: "Copiar",
  claims: "Reclamaciones",
  expiresAt: "Expira A",
  issuedAt: "Emitido A",
  notBefore: "No Antes De",
  featuresTitle: "Características",
  decodingFeature: "Decodificación JWT",
  decodingDescription:
    "Decodificar tokens JWT en secciones legibles de encabezado y carga útil",
  validationFeature: "Validación de Token",
  validationDescription: "Validar firmas JWT y verificar estado de expiración",
  analysisFeature: "Análisis de Token",
  analysisDescription: "Analizar estructura JWT y extraer información clave",
  faqTitle: "Preguntas Frecuentes",
  faq: {
    what: {
      question: "¿Qué es un JWT?",
      answer:
        "JSON Web Token (JWT) es un estándar abierto para transmitir información de forma segura entre partes como un objeto JSON. Se usa comúnmente para autenticación e intercambio de información.",
    },
    safe: {
      question: "¿Es seguro usar el decodificador JWT?",
      answer:
        "Sí, nuestro decodificador JWT funciona completamente en su navegador. No se envían datos a nuestros servidores, asegurando que sus tokens permanezcan privados y seguros.",
    },
    sections: {
      question: "¿Cuáles son las tres secciones de un JWT?",
      answer:
        "Un JWT consta de tres partes: Encabezado (algoritmo y tipo de token), Carga útil (reclamaciones y datos) y Firma (verificación).",
    },
    verify: {
      question: "¿Cómo puedo verificar una firma JWT?",
      answer:
        "Para verificar una firma JWT, necesita la clave secreta usada para firmar el token. Nuestro decodificador muestra la firma pero no puede verificarla sin el secreto.",
    },
    claims: {
      question: "¿Qué son las reclamaciones JWT?",
      answer:
        "Las reclamaciones JWT son fragmentos de información afirmados sobre un tema. Las reclamaciones comunes incluyen 'iss' (emisor), 'sub' (sujeto), 'exp' (expiración) y 'iat' (emitido a).",
    },
  },
  valid: "Válido",
  expired: "Expirado",
  subject: "Sujeto",
  algorithm: "Algoritmo",
  type: "Tipo",
  note: "Nota",
  noteDescription:
    "La validación del token requiere la clave secreta para verificación de firma",
  faqSectionTitle: "Preguntas Frecuentes",
};
