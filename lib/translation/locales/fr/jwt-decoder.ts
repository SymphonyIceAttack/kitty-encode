import type { JWTDecoderModule } from "../../types";

// Module de décodeur JWT en français
export const jwtDecoder: JWTDecoderModule = {
  title: "Décodeur et Validateur JWT en Ligne Gratuit",
  description:
    "Décodez et validez les jetons JWT en ligne gratuitement. Analysez les en-têtes JWT, les charges utiles et vérifiez les signatures.",
  subtitle:
    "Notre décodeur JWT aide les développeurs à décoder, valider et analyser les jetons JWT. Parfait pour le débogage d'authentification et le développement d'API.",
  inputText: "Jeton JWT",
  inputPlaceholder: "Entrez votre jeton JWT ici...",
  decodeButton: "Décoder JWT",
  loadExampleButton: "Charger un Exemple",
  clearButton: "Effacer",
  headerTitle: "En-tête",
  payloadTitle: "Charge Utile",
  signatureTitle: "Signature",
  validToken: "Jeton Valide",
  invalidToken: "Jeton Invalide",
  expiredToken: "Jeton Expiré",
  notExpired: "Non Expiré",
  copyButton: "Copier",
  claims: "Revendications",
  expiresAt: "Expire À",
  issuedAt: "Émis À",
  notBefore: "Pas Avant",
  featuresTitle: "Fonctionnalités",
  decodingFeature: "Décodage JWT",
  decodingDescription:
    "Décoder les jetons JWT en sections d'en-tête et de charge utile lisibles",
  validationFeature: "Validation de Jeton",
  validationDescription:
    "Valider les signatures JWT et vérifier le statut d'expiration",
  analysisFeature: "Analyse de Jeton",
  analysisDescription:
    "Analyser la structure JWT et extraire les informations clés",
  faqTitle: "FAQ",
  faq: {
    what: {
      question: "Qu'est-ce qu'un JWT ?",
      answer:
        "JSON Web Token (JWT) est une norme ouverte pour transmettre de manière sécurisée des informations entre les parties sous forme d'objet JSON. Il est couramment utilisé pour l'authentification et l'échange d'informations.",
    },
    safe: {
      question: "Est-il sûr d'utiliser le décodeur JWT ?",
      answer:
        "Oui, notre décodeur JWT fonctionne entièrement dans votre navigateur. Aucune donnée n'est envoyée à nos serveurs, garantissant que vos jetons restent privés et sécurisés.",
    },
    sections: {
      question: "Quelles sont les trois sections d'un JWT ?",
      answer:
        "Un JWT se compose de trois parties : En-tête (algorithme et type de jeton), Charge utile (revendications et données) et Signature (vérification).",
    },
    verify: {
      question: "Comment puis-je vérifier une signature JWT ?",
      answer:
        "Pour vérifier une signature JWT, vous avez besoin de la clé secrète utilisée pour signer le jeton. Notre décodeur montre la signature mais ne peut pas la vérifier sans le secret.",
    },
    claims: {
      question: "Que sont les revendiquations JWT ?",
      answer:
        "Les revendiquations JWT sont des fragments d'informations affirmés sur un sujet. Les revendications courantes incluent 'iss' (émetteur), 'sub' (sujet), 'exp' (expiration) et 'iat' (émis à).",
    },
  },
  valid: "Valide",
  expired: "Expiré",
  subject: "Sujet",
  algorithm: "Algorithme",
  type: "Type",
  note: "Remarque",
  noteDescription:
    "La validation du jeton nécessite la clé secrète pour la vérification de signature",
  faqSectionTitle: "Questions Fréquemment Posées",
};
