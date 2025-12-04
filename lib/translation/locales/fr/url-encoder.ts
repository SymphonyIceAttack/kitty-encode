import type { URLEncoderModule } from "../../types";

// Module d'encodeur/décodeur URL en français
export const urlEncoder: URLEncoderModule = {
  title:
    "Encodeur/Décodeur URL en Ligne Gratuit - Encoder les URL Instantanément",
  description:
    "Encodez et décodez les URL en ligne gratuitement. Parfait pour le développement d'API et la programmation Web.",
  subtitle:
    "Notre encodeur/décodeur URL gratuit en ligne aide les développeurs à encoder et décoder safely les URL pour le développement Web, l'intégration d'API et la transmission de données. Parfait pour gérer les caractères spéciaux et le texte non-ASCII.",
  tabs: {
    encode: "Encodeur URL",
    decode: "Décodeur URL",
  },
  encode: {
    title: "Encoder l'URL",
    description:
      "Convertir le texte brut au format URL encodé (encodage pourcentage)",
    inputText: "Texte d'entrée",
    placeholder: "Entrez le texte à encoder (ex: Hello World! & ? # @)",
    button: "Encoder au format URL",
    result: "Résultat encodé",
  },
  decode: {
    title: "Décoder l'URL",
    description: "Convertir le format URL encodé de retour au texte brut",
    inputText: "URL encodée",
    placeholder: "Entrez le texte URL encodé (ex: Hello%20World%21)",
    button: "Décoder en texte brut",
    result: "Résultat décodé",
  },
  howToUse: {
    title: "Comment utiliser notre encodeur URL",
    steps: {
      chooseMode: {
        title: "1. Choisir le mode",
        description:
          'Sélectionnez "Encodeur URL" pour encoder du texte brut, ou "Décodeur URL" pour décoder des chaînes encodées en pourcentage.',
      },
      enterText: {
        title: "2. Entrez votre texte",
        description:
          "Collez ou tapez le texte que vous voulez encoder/décoder. Fonctionne avec n'importe quel texte, caractères spéciaux et Unicode.",
      },
      getResults: {
        title: "3. Obtenir des résultats instantanés",
        description:
          "Cliquez sur le bouton encoder/décoder pour obtenir votre résultat. Copiez en un clic pour une utilisation facile dans vos projets.",
      },
    },
  },
  encodingVsDecoding: {
    title: "Encodage URL vs Décodage URL",
    encoding: {
      title: "Encodage URL",
      description:
        "Convertit les caractères spéciaux en un format qui peut être transmis en toute sécurité sur Internet.",
    },
    decoding: {
      title: "Décodage URL",
      description:
        "Convertit les chaînes encodées en pourcentage de retour à leur format lisible original.",
    },
  },
  commonExamples: {
    title: "Exemples courants d'encodage URL",
    columns: {
      character: "Caractère",
      encoded: "URL Encodé",
      description: "Description",
    },
    examples: {
      space: {
        char: "espace",
        encoded: "%20",
        description: "Remplace les espaces dans le texte",
      },
      ampersand: {
        char: "&",
        encoded: "%26",
        description: "Sépare les paramètres URL",
      },
      question: {
        char: "?",
        encoded: "%3F",
        description: "Démarre la chaîne de requête",
      },
      hash: {
        char: "#",
        encoded: "%23",
        description: "Identifiant de fragment URL",
      },
      plus: {
        char: "+",
        encoded: "%2B",
        description: "Signe plus dans les URL",
      },
      chinese: {
        char: "中文",
        encoded: "%E4%B8%AD%E6%96%87",
        description: "Caractères non-ASCII",
      },
    },
  },
  faq: {
    title: "FAQ",
    url: {
      secure: {
        question: "L'encodage d'URL est-il sécurisé ?",
        answer:
          "Oui, l'encodage d'URL est complètement sûr. Il convertit uniquement les caractères spéciaux dans un format standard qui peut être transmis en toute sécurité sur Internet. Aucune donnée n'est stockée ou traitée sur nos serveurs.",
      },
      why: {
        question: "Pourquoi ai-je besoin de l'encodage d'URL ?",
        answer:
          "L'encodage d'URL est nécessaire lorsque vous souhaitez inclure des caractères spéciaux, des espaces ou du texte non-ASCII dans les URLs. Il garantit que les navigateurs web et les serveurs peuvent interpréter correctement l'URL sans erreurs.",
      },
      chinese: {
        question: "Puis-je encoder des caractères chinois ?",
        answer:
          "Oui, notre encodeur d'URL peut gérer les caractères chinois et autres textes Unicode. Ils seront correctement encodés pour assurer qu'ils fonctionnent correctement dans les URLs.",
      },
      api: {
        question: "Puis-je l'utiliser pour le développement d'API ?",
        answer:
          "Absolument ! L'encodage d'URL est essentiel pour le développement d'API, especially when sending data via GET requests or including parameters in URLs.",
      },
      difference: {
        question: "Quelle est la différence entre l'encodage et le décodage ?",
        answer:
          "L'encodage convertit le texte brut au format encodé d'URL (comme 'Hello World' en 'Hello%20World'), tandis que le décodage convertit le texte encodé d'URL en texte brut.",
      },
    },
    qr: {
      what: {
        question: "Qu'est-ce qu'un code QR ?",
        answer:
          "Un code QR (Quick Response) est un code-barres bidimensionnel qui peut stocker divers types de données, notamment des URLs, du texte, des numéros de téléphone, etc. Il est largement utilisé pour le marketing, les paiements et le partage d'informations.",
      },
      types: {
        question: "Quels types de codes QR puis-je créer ?",
        answer:
          "Vous pouvez créer des codes QR pour du texte, des URLs, des adresses e-mail, des numéros de téléphone, des informations d'identification WiFi, et plus encore. Notre générateur prend en charge plusieurs formats de données pour répondre à différents besoins.",
      },
      secure: {
        question: "Les codes QR sont-ils sécurisés ?",
        answer:
          "Les codes QR sont sécurisés en eux-mêmes, mais vérifiez toujours la source avant de scanner. Évitez de scanner des codes QR provenant de sources inconnues ou suspectes, car ils peuvent potentiellement mener vers des sites web malveillants.",
      },
      custom: {
        question: "Puis-je personnaliser les codes QR ?",
        answer:
          "Oui, vous pouvez personnaliser les codes QR avec différentes couleurs, logos et styles tout en maintenant la lisibilité. Cependant, assurez-vous que le contraste est suffisant pour un scan fiable.",
      },
      benefits: {
        question: "Quels sont les avantages d'utiliser des codes QR ?",
        answer:
          "Les codes QR offrent un transfert de données rapide, une accessibilité hors ligne, une impression rentable et une large compatibilité avec les smartphones et les applications de scan.",
      },
    },
    base64: {
      secure: {
        question: "L'encodage Base64 est-il sécurisé ?",
        answer:
          "Base64 est une méthode d'encodage, pas de chiffrement. Il convertit les données binaires en texte ASCII pour une transmission sûre. Bien que les données encodées semblent obscures, elles peuvent être facilement décodées par n'importe qui.",
      },
      encoding: {
        question: "À quoi sert l'encodage Base64 ?",
        answer:
          "L'encodage Base64 est couramment utilisé pour intégrer des données binaires dans des formats basés sur du texte comme JSON, XML ou e-mail. Il est essentiel pour la transmission de données et le développement d'API.",
      },
      decode: {
        question: "Comment décoder Base64 ?",
        answer:
          "Collez simplement votre chaîne encodée Base64 dans le décodeur et cliquez sur décoder. Les données originales seront affichées dans le champ de sortie.",
      },
      urlsafe: {
        question: "Qu'est-ce que le Base64 sûr pour les URLs ?",
        answer:
          "Le Base64 sûr pour les URLs remplace les caractères + et / par - et _ respectivement, le rendant sûr pour une utilisation dans les URLs sans encodage supplémentaire.",
      },
      binary: {
        question: "Base64 peut-il encoder des fichiers binaires ?",
        answer:
          "Oui, Base64 peut encoder n'importe quelles données binaires, y compris les images, documents et exécutables. Cependant, les fichiers encodés seront environ 33% plus volumineux que l'original.",
      },
    },
    regex: {
      what: {
        question: "Qu'est-ce qu'une expression régulière ?",
        answer:
          "Une expression régulière (regex) est un modèle utilisé pour faire correspondre et manipuler du texte. Elle offre de puissantes capacités de recherche, validation et remplacement de texte.",
      },
      common: {
        question: "Quels sont les modèles regex courants ?",
        answer:
          "Les modèles courants incluent la validation d'e-mail, la correspondance d'URL, le formatage de numéros de téléphone et la validation de dates. Nos exemples montrent l'utilisation pratique des regex.",
      },
      flags: {
        question: "Que signifient les drapeaux regex ?",
        answer:
          "Les drapeaux modifient le comportement des regex : g (global), i (insensible à la casse), m (multiligne), s (dotAll), u (unicode), y (collant). Chaque drapeau affecte la façon dont le modèle correspond au texte.",
      },
      test: {
        question: "Comment tester mon regex ?",
        answer:
          "Entrez votre modèle regex et le texte de test, puis cliquez sur 'Test Regex'. L'outil mettra en surbrillance les correspondances et affichera des résultats détaillés, y compris les positions de correspondance et les groupes.",
      },
      performance: {
        question: "Pourquoi mon regex est-il lent ?",
        answer:
          "Les modèles regex complexes ou mal écrites peuvent causer des problèmes de performance. Évitez les quantificateurs imbriqués et utilisez le regroupement atomique quand possible pour une meilleure performance.",
      },
    },
    colorPalette: {
      secure: {
        question: "Comment fonctionne la génération de palettes de couleurs ?",
        answer:
          "Notre outil utilise des algorithmes de théorie des couleurs pour générer des combinaisons de couleurs harmonieuses. Il analyse les relations de couleurs et génère des palettes qui fonctionnent bien ensemble.",
      },
      algorithm: {
        question: "Quels algorithmes sont utilisés ?",
        answer:
          "Nous utilisons des algorithmes d'harmonie des couleurs éprouvés, y compris les schémas de couleurs complémentaires, analogues et triadiques basés sur la théorie du cercle chromatique.",
      },
      harmony: {
        question: "Qu'est-ce que l'harmonie des couleurs ?",
        answer:
          "L'harmonie des couleurs fait référence à l'arrangement agréable des couleurs. Notre outil crée des palettes où les couleurs se complètent visuellement.",
      },
      export: {
        question: "Comment puis-je utiliser les palettes générées ?",
        answer:
          "Exportez les palettes en tant que JSON, variables CSS, ou copiez les couleurs individuelles. Utilisez-les dans les logiciels de design, sites web, ou tout projet nécessitant une coordination des couleurs.",
      },
      accessibility: {
        question: "Les couleurs sont-elles accessibles ?",
        answer:
          "Bien que nos palettes soient conçues pour l'attrait visuel, testez toujours les ratios de contraste des couleurs pour la conformité d'accessibilité, surtout pour la lisibilité du texte.",
      },
    },
    hash: {
      secure: {
        question: "Les hachages générés sont-ils sécurisés ?",
        answer:
          "La génération de hachage se produit entièrement dans votre navigateur - aucune donnée n'est envoyée à nos serveurs. Cependant, n'utilisez jamais des générateurs de hachage en ligne pour des données sensibles comme les mots de passe.",
      },
      algorithms: {
        question: "Quels algorithmes de hachage sont disponibles ?",
        answer:
          "Nous supportons MD5, SHA-1, SHA-256, SHA-512 et d'autres algorithmes courants. Chacun a différents niveaux de sécurité et cas d'utilisation.",
      },
      reversible: {
        question: "Les hachages peuvent-ils être inversés ?",
        answer:
          "Non, les hachages cryptographiques sont des fonctions à sens unique. Vous ne pouvez pas inverser un hachage pour obtenir l'entrée originale. Ceci est intentionnel pour la sécurité.",
      },
      collision: {
        question: "Qu'est-ce qu'une collision de hachage ?",
        answer:
          "Une collision se produit lorsque deux entrées différentes produisent le même hachage. Les algorithmes modernes comme SHA-256 rendent les collisions extrêmement improbables.",
      },
      passwords: {
        question: "Dois-je hacher les mots de passe avec ces outils ?",
        answer:
          "Non, ne hachez jamais les mots de passe avec des outils en ligne. Utilisez des bibliothèques appropriées de hachage de mots de passe avec sel et algorithmes appropriés comme bcrypt ou Argon2.",
      },
    },
    json: {
      secure: {
        question: "Mes données JSON sont-elles sûres ?",
        answer:
          "Oui, tout le traitement se fait dans votre navigateur. Aucune donnée n'est envoyée à nos serveurs, garantissant une confidentialité et une sécurité complètes pour vos données JSON.",
      },
      format: {
        question: "Comment fonctionne le formatage JSON ?",
        answer:
          "Le formatage JSON ajoute une indentation et des sauts de ligne appropriés pour rendre le code lisible. Il valide également la syntaxe et met en surbrillance toute erreur.",
      },
      minify: {
        question: "Qu'est-ce que la minimisation JSON ?",
        answer:
          "La minimisation supprime les espaces et formats inutiles pour réduire la taille du fichier, améliorant la vitesse de chargement pour les applications web.",
      },
      validate: {
        question: "Comment fonctionne la validation ?",
        answer:
          "Notre validateur vérifie la syntaxe JSON, les types de données et la structure. Il fournit des messages d'erreur détaillés avec numéros de ligne pour un débogage facile.",
      },
      large: {
        question: "Puis-je traiter de gros fichiers JSON ?",
        answer:
          "Oui, notre outil peut gérer efficacement de gros fichiers JSON. Pour des fichiers extrêmement volumineux, envisagez d'utiliser des outils locaux ou des éditeurs de code pour de meilleures performances.",
      },
    },
    sql: {
      format: {
        question: "Comment fonctionne le formatage SQL ?",
        answer:
          "Le formatage SQL ajoute une indentation, des sauts de ligne et un espacement appropriés pour rendre les requêtes lisibles. Il comprend également une validation de syntaxe de base.",
      },
      dialects: {
        question: "Quels dialectes SQL sont supportés ?",
        answer:
          "Notre formatiseur fonctionne avec la syntaxe SQL standard utilisée par MySQL, PostgreSQL, SQLite et autres bases de données principales. Les fonctionnalités spécifiques aux dialectes peuvent ne pas être entièrement supportées.",
      },
      customize: {
        question: "Puis-je personnaliser le formatage ?",
        answer:
          "Le formatiseur utilise des règles cohérentes pour l'indentation et l'espacement. Bien que les options de personnalisation soient limitées, la sortie suit les meilleures pratiques SQL.",
      },
      validate: {
        question: "À quel point la validation est-elle approfondie ?",
        answer:
          "La validation comprend des vérifications de syntaxe de base comme la correspondance des parenthèses, la gestion des guillemets et la reconnaissance des mots-clés. La validation complexe nécessite des parseurs spécifiques à la base de données.",
      },
      performance: {
        question:
          "Le formatage peut-il améliorer les performances de requête ?",
        answer:
          "Le formatage améliore la lisibilité mais n'affecte pas la vitesse d'exécution de la requête. Les performances dépendent de l'optimisation de la base de données, des index et de la structure de la requête.",
      },
    },
  },
  relatedTools: {
    title: "Outils connexes",
    jwtDecoder: {
      title: "Décodeur JWT",
      description: "Décoder et valider les jetons JWT en ligne",
    },
    jsonFormatter: {
      title: "Formateur JSON",
      description: "Formater et valider les données JSON",
    },
    base64Encoder: {
      title: "Encodeur Base64",
      description: "Encoder et décoder les chaînes Base64",
    },
  },
  ui: {
    tryButton: "Essayer maintenant",
    clearButton: "Effacer",
    errorEncode: "Échec de l'encodage du texte",
    errorDecode: "Échec du décodage de l'URL",
    copySuccess: "Copié dans le presse-papiers !",
  },
};
