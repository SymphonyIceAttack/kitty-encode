import type { URLEncoderModule } from "../../types";

// Módulo de codificador/decodificador de URL en español
export const urlEncoder: URLEncoderModule = {
  title:
    "Codificador/Decodificador de URL en Línea Gratuito - Codificar URL Instantáneamente",
  description:
    "Codifica y decodifica URLs en línea gratis. Perfecto para desarrollo de API y programación web.",
  subtitle:
    "Nuestro codificador/decodificador de URL gratuito en línea ayuda a los desarrolladores a codificar y decodificar safely las URLs para desarrollo web, integración de API y transmisión de datos. Perfecto para manejar caracteres especiales y texto no-ASCII.",
  tabs: {
    encode: "Codificador URL",
    decode: "Decodificador URL",
  },
  encode: {
    title: "Codificar URL",
    description:
      "Convertir texto plano a formato URL codificado (codificación por porcentaje)",
    inputText: "Texto de entrada",
    placeholder: "Ingrese texto para codificar (ej: Hello World! & ? # @)",
    button: "Codificar a Formato URL",
    result: "Resultado Codificado",
  },
  decode: {
    title: "Decodificar URL",
    description: "Convertir formato URL codificado de vuelta a texto plano",
    inputText: "URL codificada",
    placeholder: "Ingrese texto URL codificado (ej: Hello%20World%21)",
    button: "Decodificar a Texto Plano",
    result: "Resultado Decodificado",
  },
  howToUse: {
    title: "Cómo usar nuestro codificador de URL",
    steps: {
      chooseMode: {
        title: "1. Elegir Modo",
        description:
          'Seleccione "Codificador URL" para codificar texto plano, o "Decodificador URL" para decodificar cadenas codificadas por porcentaje.',
      },
      enterText: {
        title: "2. Ingrese su Texto",
        description:
          "Pegue o escriba el texto que quiere codificar/decodificar. Funciona con cualquier texto, caracteres especiales y Unicode.",
      },
      getResults: {
        title: "3. Obtener Resultados Instantáneos",
        description:
          "Haga clic en el botón codificar/decodificar para obtener su resultado. Copie con un clic para fácil uso en sus proyectos.",
      },
    },
  },
  encodingVsDecoding: {
    title: "Codificación URL vs Decodificación URL",
    encoding: {
      title: "Codificación URL",
      description:
        "Convierte caracteres especiales en un formato que puede ser transmitido safely por Internet.",
    },
    decoding: {
      title: "Decodificación URL",
      description:
        "Convierte cadenas codificadas por porcentaje de vuelta a su formato legible original.",
    },
  },
  commonExamples: {
    title: "Ejemplos Comunes de Codificación URL",
    columns: {
      character: "Carácter",
      encoded: "URL Codificado",
      description: "Descripción",
    },
    examples: {
      space: {
        char: "espacio",
        encoded: "%20",
        description: "Reemplaza espacios en el texto",
      },
      ampersand: {
        char: "&",
        encoded: "%26",
        description: "Separa parámetros de URL",
      },
      question: {
        char: "?",
        encoded: "%3F",
        description: "Inicia cadena de consulta",
      },
      hash: {
        char: "#",
        encoded: "%23",
        description: "Identificador de fragmento URL",
      },
      plus: {
        char: "+",
        encoded: "%2B",
        description: "Signo más en URLs",
      },
      chinese: {
        char: "中文",
        encoded: "%E4%B8%AD%E6%96%87",
        description: "Caracteres no-ASCII",
      },
    },
  },
  faq: {
    title: "Preguntas Frecuentes",
    url: {
      secure: {
        question: "¿Es segura la codificación de URL?",
        answer:
          "Sí, la codificación de URL es completamente segura. Solo convierte caracteres especiales en un formato estándar que puede transmitirse de forma segura por Internet. No se almacenan ni procesan datos en nuestros servidores.",
      },
      why: {
        question: "¿Por qué necesito codificación de URL?",
        answer:
          "La codificación de URL es necesaria cuando desea incluir caracteres especiales, espacios o texto no-ASCII en las URLs. Garantiza que los navegadores web y servidores puedan interpretar correctamente la URL sin errores.",
      },
      chinese: {
        question: "¿Puedo codificar caracteres chinos?",
        answer:
          "¡Sí! Nuestro codificador de URL puede manejar caracteres chinos y otros textos Unicode. Se codificarán correctamente para asegurar que funcionen correctamente en las URLs.",
      },
      api: {
        question: "¿Puedo usarlo para desarrollo de APIs?",
        answer:
          "¡Absolutamente! La codificación de URL es esencial para el desarrollo de APIs, especialmente al enviar datos a través de solicitudes GET o incluir parámetros en URLs.",
      },
      difference: {
        question: "¿Cuál es la diferencia entre codificar y decodificar?",
        answer:
          "La codificación convierte texto plano a formato codificado de URL (como 'Hello World' a 'Hello%20World'), mientras que la decodificación convierte texto codificado de URL de vuelta a texto plano.",
      },
    },
  },
  relatedTools: {
    title: "Herramientas Relacionadas",
    jwtDecoder: {
      title: "Decodificador JWT",
      description: "Decodificar y validar tokens JWT en línea",
    },
    jsonFormatter: {
      title: "Formateador JSON",
      description: "Formatear y validar datos JSON",
    },
    base64Encoder: {
      title: "Codificador Base64",
      description: "Codificar y decodificar cadenas Base64",
    },
  },
  ui: {
    tryButton: "Probar Ahora",
    clearButton: "Limpiar",
    errorEncode: "Error al codificar texto",
    errorDecode: "Error al decodificar URL",
    copySuccess: "¡Copiado al portapapeles!",
  },
};
