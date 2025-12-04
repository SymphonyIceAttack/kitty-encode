import type { Base64Module } from "../../types";

export const base64: Base64Module = {
  title: "Encodeur/Décodeur Base64",
  description:
    "Encodez et décodez les chaînes Base64 en ligne gratuitement. Parfait pour l'encodage de données et le développement d'API.",
  encodeTab: "Encoder",
  decodeTab: "Décoder",
  encodeTitle: "Encoder en Base64",
  encodeDescription: "Convertir le texte brut en encodage Base64",
  decodeTitle: "Décoder depuis Base64",
  decodeDescription: "Convertir Base64 en texte brut",
  inputText: "Texte d'entrée",
  base64Input: "Entrée Base64",
  base64Output: "Sortie Base64",
  decodedText: "Texte décodé",
  placeholderEncode: "Entrez le texte à encoder en Base64...",
  placeholderDecode: "Entrez Base64 à décoder...",
  errorEncode: "Échec de l'encodage en Base64",
  errorDecode: "Échec du décodage depuis Base64",
  copySuccess: "Copié dans le presse-papiers !",
};
