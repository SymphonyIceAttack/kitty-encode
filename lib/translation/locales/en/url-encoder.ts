import type { URLEncoderModule } from "../../types";

// English URL Encoder module
export const urlEncoder: URLEncoderModule = {
  title: "Free Online URL Encoder/Decoder - Encode URLs Instantly",
  description:
    "Encode and decode URLs online for free. Perfect for API development and web programming.",
  subtitle:
    "Our free online URL encoder/decoder helps developers safely encode and decode URLs for web development, API integration, and data transmission. Perfect for handling special characters and non-ASCII text.",
  tabs: {
    encode: "URL Encoder",
    decode: "URL Decoder",
  },
  encode: {
    title: "Encode URL",
    description: "Convert plain text to URL-encoded format (percent-encoding)",
    inputText: "Input Text",
    placeholder: "Enter text to encode (e.g., Hello World! & ? # @)",
    button: "Encode to URL Format",
    result: "Encoded Result",
  },
  decode: {
    title: "Decode URL",
    description: "Convert URL-encoded format back to plain text",
    inputText: "Encoded URL",
    placeholder: "Enter URL-encoded text (e.g., Hello%20World%21)",
    button: "Decode to Plain Text",
    result: "Decoded Result",
  },
  howToUse: {
    title: "How to Use Our URL Encoder",
    steps: {
      chooseMode: {
        title: "1. Choose Mode",
        description:
          ' Encoder" to encodeSelect either "URL plain text, or "URL Decoder" to decode percent-encoded strings.',
      },
      enterText: {
        title: "2. Enter Your Text",
        description:
          "Paste or type the text you want to encode/decode. Works with any text, special characters, and Unicode.",
      },
      getResults: {
        title: "3. Get Instant Results",
        description:
          "Click the encode/decode button to get your result. Copy with one click for easy use in your projects.",
      },
    },
  },
  encodingVsDecoding: {
    title: "URL Encoding vs URL Decoding",
    encoding: {
      title: "URL Encoding",
      description:
        "Converts special characters into a format that can be safely transmitted over the internet.",
    },
    decoding: {
      title: "URL Decoding",
      description:
        "Converts percent-encoded strings back to their original readable format.",
    },
  },
  commonExamples: {
    title: "Common URL Encoding Examples",
    columns: {
      character: "Character",
      encoded: "URL Encoded",
      description: "Description",
    },
    examples: {
      space: {
        char: "space",
        encoded: "%20",
        description: "Replaces spaces in text",
      },
      ampersand: {
        char: "&",
        encoded: "%26",
        description: "Separates URL parameters",
      },
      question: {
        char: "?",
        encoded: "%3F",
        description: "Starts query string",
      },
      hash: {
        char: "#",
        encoded: "%23",
        description: "URL fragment identifier",
      },
      plus: {
        char: "+",
        encoded: "%2B",
        description: "Plus sign in URLs",
      },
      chinese: {
        char: "中文",
        encoded: "%E4%B8%AD%E6%96%87",
        description: "Non-ASCII characters",
      },
    },
  },
  faq: {
    title: "FAQ",
    url: {
      secure: {
        question: "Is URL encoding secure?",
        answer:
          "Yes, URL encoding is completely safe. It only converts special characters into a standard format that can be safely transmitted over the internet. No data is stored or processed on our servers.",
      },
      why: {
        question: "Why do I need URL encoding?",
        answer:
          "URL encoding is necessary when you want to include special characters, spaces, or non-ASCII text in URLs. It ensures that web browsers and servers can correctly interpret the URL without errors.",
      },
      chinese: {
        question: "Can I encode Chinese characters?",
        answer:
          "Yes, our URL encoder can handle Chinese characters and other Unicode text. They will be properly encoded to ensure they work correctly in URLs.",
      },
      api: {
        question: "Can I use this for API development?",
        answer:
          "Absolutely! URL encoding is essential for API development, especially when sending data via GET requests or including parameters in URLs.",
      },
      difference: {
        question: "What's the difference between encoding and decoding?",
        answer:
          "Encoding converts plain text to URL-encoded format (like 'Hello World' to 'Hello%20World'), while decoding converts URL-encoded text back to plain text.",
      },
    },
    qr: {
      what: {
        question: "What is a QR code?",
        answer:
          "A QR code (Quick Response code) is a two-dimensional barcode that can store various types of data including URLs, text, phone numbers, and more. It's widely used for marketing, payments, and information sharing.",
      },
      types: {
        question: "What types of QR codes can I create?",
        answer:
          "You can create QR codes for text, URLs, email addresses, phone numbers, WiFi credentials, and more. Our generator supports multiple data formats to meet different needs.",
      },
      secure: {
        question: "Are QR codes secure?",
        answer:
          "QR codes themselves are secure, but always verify the source before scanning. Avoid scanning QR codes from unknown or suspicious sources, as they can potentially lead to malicious websites.",
      },
      custom: {
        question: "Can I customize QR codes?",
        answer:
          "Yes, you can customize QR codes with different colors, logos, and styles while maintaining scannability. However, ensure the contrast is sufficient for reliable scanning.",
      },
      benefits: {
        question: "What are the benefits of using QR codes?",
        answer:
          "QR codes offer quick data transfer, offline accessibility, cost-effective printing, and broad compatibility with smartphones and scanning apps.",
      },
    },
    base64: {
      secure: {
        question: "Is Base64 encoding secure?",
        answer:
          "Base64 is an encoding method, not encryption. It converts binary data to ASCII text for safe transmission. While the encoded data looks obscure, it can be easily decoded by anyone.",
      },
      encoding: {
        question: "What is Base64 encoding used for?",
        answer:
          "Base64 encoding is commonly used for embedding binary data in text-based formats like JSON, XML, or email. It's essential for data transmission and API development.",
      },
      decode: {
        question: "How do I decode Base64?",
        answer:
          "Simply paste your Base64 encoded string into the decoder and click decode. The original data will be displayed in the output field.",
      },
      urlsafe: {
        question: "What is URL-safe Base64?",
        answer:
          "URL-safe Base64 replaces + and / characters with - and _ respectively, making it safe for use in URLs without additional encoding.",
      },
      binary: {
        question: "Can Base64 encode binary files?",
        answer:
          "Yes, Base64 can encode any binary data including images, documents, and executables. However, encoded files will be approximately 33% larger than the original.",
      },
    },
    regex: {
      what: {
        question: "What is a regular expression?",
        answer:
          "A regular expression (regex) is a pattern used to match and manipulate text. It provides powerful text searching, validation, and replacement capabilities.",
      },
      common: {
        question: "What are common regex patterns?",
        answer:
          "Common patterns include email validation, URL matching, phone number formatting, and date validation. Our examples showcase practical regex usage.",
      },
      flags: {
        question: "What do regex flags mean?",
        answer:
          "Flags modify regex behavior: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky). Each flag affects how the pattern matches text.",
      },
      test: {
        question: "How do I test my regex?",
        answer:
          "Enter your regex pattern and test text, then click 'Test Regex'. The tool will highlight matches and show detailed results including match positions and groups.",
      },
      performance: {
        question: "Why is my regex slow?",
        answer:
          "Complex or poorly written regex patterns can cause performance issues. Avoid nested quantifiers and use atomic grouping when possible for better performance.",
      },
    },
    colorPalette: {
      secure: {
        question: "How does color palette generation work?",
        answer:
          "Our tool uses color theory algorithms to generate harmonious color combinations. It analyzes color relationships and generates palettes that work well together.",
      },
      algorithm: {
        question: "What algorithms are used?",
        answer:
          "We use proven color harmony algorithms including complementary, analogous, and triadic color schemes based on color wheel theory.",
      },
      harmony: {
        question: "What is color harmony?",
        answer:
          "Color harmony refers to the pleasing arrangement of colors. Our tool creates palettes where colors complement each other visually.",
      },
      export: {
        question: "How can I use the generated palettes?",
        answer:
          "Export palettes as JSON, CSS variables, or copy individual colors. Use them in design software, websites, or any project requiring color coordination.",
      },
      accessibility: {
        question: "Are the colors accessible?",
        answer:
          "While our palettes are designed for visual appeal, always test color contrast ratios for accessibility compliance, especially for text readability.",
      },
    },
    hash: {
      secure: {
        question: "Are generated hashes secure?",
        answer:
          "Hash generation happens entirely in your browser - no data is sent to our servers. However, never use online hash generators for sensitive data like passwords.",
      },
      algorithms: {
        question: "What hash algorithms are available?",
        answer:
          "We support MD5, SHA-1, SHA-256, SHA-512, and other common algorithms. Each has different security levels and use cases.",
      },
      reversible: {
        question: "Can hashes be reversed?",
        answer:
          "No, cryptographic hashes are one-way functions. You cannot reverse a hash to get the original input. This is by design for security.",
      },
      collision: {
        question: "What is a hash collision?",
        answer:
          "A collision occurs when two different inputs produce the same hash. Modern algorithms like SHA-256 make collisions extremely unlikely.",
      },
      passwords: {
        question: "Should I hash passwords with these tools?",
        answer:
          "No, never hash passwords with online tools. Use proper password hashing libraries with salt and appropriate algorithms like bcrypt or Argon2.",
      },
    },
    json: {
      secure: {
        question: "Is my JSON data secure?",
        answer:
          "Yes, all processing happens in your browser. No data is sent to our servers, ensuring complete privacy and security for your JSON data.",
      },
      format: {
        question: "How does JSON formatting work?",
        answer:
          "JSON formatting adds proper indentation and line breaks to make the code readable. It also validates syntax and highlights any errors.",
      },
      minify: {
        question: "What is JSON minification?",
        answer:
          "Minification removes unnecessary whitespace and formatting to reduce file size, improving loading speed for web applications.",
      },
      validate: {
        question: "How does validation work?",
        answer:
          "Our validator checks JSON syntax, data types, and structure. It provides detailed error messages with line numbers for easy debugging.",
      },
      large: {
        question: "Can I process large JSON files?",
        answer:
          "Yes, our tool can handle large JSON files efficiently. For extremely large files, consider using local tools or code editors for better performance.",
      },
    },
    sql: {
      format: {
        question: "How does SQL formatting work?",
        answer:
          "SQL formatting adds proper indentation, line breaks, and spacing to make queries readable. It also includes basic syntax validation.",
      },
      dialects: {
        question: "Which SQL dialects are supported?",
        answer:
          "Our formatter works with standard SQL syntax used by MySQL, PostgreSQL, SQLite, and other major databases. Dialect-specific features may not be fully supported.",
      },
      customize: {
        question: "Can I customize the formatting?",
        answer:
          "The formatter uses consistent rules for indentation and spacing. While customization options are limited, the output follows SQL best practices.",
      },
      validate: {
        question: "How thorough is the validation?",
        answer:
          "Validation includes basic syntax checks like parentheses matching, quote handling, and keyword recognition. Complex validation requires database-specific parsers.",
      },
      performance: {
        question: "Can formatting improve query performance?",
        answer:
          "Formatting improves readability but doesn't affect query execution speed. Performance depends on database optimization, indexes, and query structure.",
      },
    },
  },
  relatedTools: {
    title: "Related Tools",
    jwtDecoder: {
      title: "JWT Decoder",
      description: "Decode and validate JWT tokens online",
    },
    jsonFormatter: {
      title: "JSON Formatter",
      description: "Format and validate JSON data",
    },
    base64Encoder: {
      title: "Base64 Encoder",
      description: "Encode and decode Base64 strings",
    },
  },
  ui: {
    tryButton: "Try Now",
    clearButton: "Clear",
    errorEncode: "Failed to encode text",
    errorDecode: "Failed to decode URL",
    copySuccess: "Copied to clipboard!",
  },
};
