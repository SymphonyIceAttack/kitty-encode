export type LanguageType = "en" | "zh" | "fr" | "es" | "ru" | "de";

export interface PageProps {
  params: { lang: LanguageType };
}

// Common module types
export interface CommonModule {
  nav: {
    home: string;
    tools: string;
    blog: string;
    about: string;
    contact: string;
  };
  common: {
    language: string;
    theme: string;
    loading: string;
    error: string;
    success: string;
    clear: string;
    copy: string;
    encode: string;
    decode: string;
  };
  buttons: {
    getStarted: string;
    learnMore: string;
    tryNow: string;
    viewAll: string;
    copy: string;
    clear: string;
    format: string;
    minify: string;
    validate: string;
    switchTheme: string;
    switchLanguage: string;
    encodeToBase64: string;
    decodeToText: string;
  };
}

// Home module types
export interface HomeModule {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  tools: {
    title: string;
  };
  about: {
    title: string;
    privacy: {
      title: string;
      desc: string;
    };
    speed: {
      title: string;
      desc: string;
    };
    free: {
      title: string;
      desc: string;
    };
  };
}

// Tools module types
export interface ToolsModule {
  list: {
    jwtDecoder: { title: string; desc: string };
    urlEncoder: { title: string; desc: string };
    jsonFormatter: { title: string; desc: string };
    hashGenerator: { title: string; desc: string };
    base64: { title: string; desc: string };
    colorPalette: { title: string; desc: string };
    qrGenerator: { title: string; desc: string };
    sqlFormatter: { title: string; desc: string };
    regexTester: { title: string; desc: string };
  };
}

// URL Encoder module types
export interface URLEncoderModule {
  title: string;
  description: string;
  subtitle: string;
  tabs: {
    encode: string;
    decode: string;
  };
  encode: {
    title: string;
    description: string;
    inputText: string;
    placeholder: string;
    button: string;
    result: string;
  };
  decode: {
    title: string;
    description: string;
    inputText: string;
    placeholder: string;
    button: string;
    result: string;
  };
  howToUse: {
    title: string;
    steps: {
      chooseMode: { title: string; description: string };
      enterText: { title: string; description: string };
      getResults: { title: string; description: string };
    };
  };
  encodingVsDecoding: {
    title: string;
    encoding: { title: string; description: string };
    decoding: { title: string; description: string };
  };
  commonExamples: {
    title: string;
    columns: {
      character: string;
      encoded: string;
      description: string;
    };
    examples: {
      space: { char: string; encoded: string; description: string };
      ampersand: { char: string; encoded: string; description: string };
      question: { char: string; encoded: string; description: string };
      hash: { char: string; encoded: string; description: string };
      plus: { char: string; encoded: string; description: string };
      chinese: { char: string; encoded: string; description: string };
    };
  };
  faq: {
    title: string;
    url: {
      secure: {
        question: string;
        answer: string;
      };
      why: {
        question: string;
        answer: string;
      };
      chinese: {
        question: string;
        answer: string;
      };
      api: {
        question: string;
        answer: string;
      };
      difference: {
        question: string;
        answer: string;
      };
    };
    qr: {
      what: {
        question: string;
        answer: string;
      };
      types: {
        question: string;
        answer: string;
      };
      secure: {
        question: string;
        answer: string;
      };
      custom: {
        question: string;
        answer: string;
      };
      benefits: {
        question: string;
        answer: string;
      };
    };
    base64: {
      secure: {
        question: string;
        answer: string;
      };
      encoding: {
        question: string;
        answer: string;
      };
      decode: {
        question: string;
        answer: string;
      };
      urlsafe: {
        question: string;
        answer: string;
      };
      binary: {
        question: string;
        answer: string;
      };
    };
    regex: {
      what: {
        question: string;
        answer: string;
      };
      common: {
        question: string;
        answer: string;
      };
      flags: {
        question: string;
        answer: string;
      };
      test: {
        question: string;
        answer: string;
      };
      performance: {
        question: string;
        answer: string;
      };
    };
    colorPalette: {
      secure: {
        question: string;
        answer: string;
      };
      algorithm: {
        question: string;
        answer: string;
      };
      harmony: {
        question: string;
        answer: string;
      };
      export: {
        question: string;
        answer: string;
      };
      accessibility: {
        question: string;
        answer: string;
      };
    };
    hash: {
      secure: {
        question: string;
        answer: string;
      };
      algorithms: {
        question: string;
        answer: string;
      };
      reversible: {
        question: string;
        answer: string;
      };
      collision: {
        question: string;
        answer: string;
      };
      passwords: {
        question: string;
        answer: string;
      };
    };
    json: {
      secure: {
        question: string;
        answer: string;
      };
      format: {
        question: string;
        answer: string;
      };
      minify: {
        question: string;
        answer: string;
      };
      validate: {
        question: string;
        answer: string;
      };
      large: {
        question: string;
        answer: string;
      };
    };
    sql: {
      format: {
        question: string;
        answer: string;
      };
      dialects: {
        question: string;
        answer: string;
      };
      customize: {
        question: string;
        answer: string;
      };
      validate: {
        question: string;
        answer: string;
      };
      performance: {
        question: string;
        answer: string;
      };
    };
  };
  relatedTools: {
    title: string;
    jwtDecoder: { title: string; description: string };
    jsonFormatter: { title: string; description: string };
    base64Encoder: { title: string; description: string };
  };
  ui: {
    tryButton: string;
    clearButton: string;
    errorEncode: string;
    errorDecode: string;
    copySuccess: string;
  };
}

// Additional modules for other tools
export interface SQLFormatterModule {
  title: string;
  description: string;
  subtitle: string;
  inputText: string;
  inputPlaceholder: string;
  formatButton: string;
  clearButton: string;
  formatterTab: string;
  examplesTab: string;
  sqlInputTitle: string;
  sqlInputDescription: string;
  formattedOutputTitle: string;
  formattedOutputDescription: string;
  sqlSyntaxValid: string;
  issuesFound: string;
  formattedPlaceholder: string;
  copyFormattedButton: string;
  exampleQueriesTitle: string;
  exampleQueriesDescription: string;
  exampleSimpleSelectName: string;
  exampleJoinQueryName: string;
  exampleComplexQueryName: string;
  useThisQueryButton: string;
}

export interface JWTDecoderModule {
  title: string;
  description: string;
  subtitle: string;
  inputText: string;
  inputPlaceholder: string;
  decodeButton: string;
  loadExampleButton: string;
  clearButton: string;
  headerTitle: string;
  payloadTitle: string;
  signatureTitle: string;
  validToken: string;
  invalidToken: string;
  expiredToken: string;
  notExpired: string;
  copyButton: string;
  claims: string;
  expiresAt: string;
  issuedAt: string;
  notBefore: string;
  featuresTitle: string;
  decodingFeature: string;
  decodingDescription: string;
  validationFeature: string;
  validationDescription: string;
  analysisFeature: string;
  analysisDescription: string;
  faqTitle: string;
  faq: {
    what: { question: string; answer: string };
    safe: { question: string; answer: string };
    sections: { question: string; answer: string };
    verify: { question: string; answer: string };
    claims: { question: string; answer: string };
  };
  valid: string;
  expired: string;
  subject: string;
  algorithm: string;
  type: string;
  note: string;
  noteDescription: string;
  faqSectionTitle: string;
}

export interface JSONFormatterModule {
  title: string;
  description: string;
  subtitle: string;
  inputText: string;
  inputPlaceholder: string;
  formatButton: string;
  loadExampleButton: string;
  clearButton: string;
  validationTitle: string;
  validJson: string;
  invalidJson: string;
  validMessage: string;
  formattedTab: string;
  minifiedTab: string;
  formattedTitle: string;
  formattedDescription: string;
  minifiedTitle: string;
  minifiedDescription: string;
  featuresTitle: string;
  validationFeature: string;
  validationDescription: string;
  formattingFeature: string;
  formattingDescription: string;
  minificationFeature: string;
  minificationDescription: string;
  bestPracticesTitle: string;
  namingConventionsTitle: string;
  namingConventionsDescription: string;
  validateBeforeSendingTitle: string;
  validateBeforeSendingDescription: string;
  dataTypesTitle: string;
  dataTypesDescription: string;
}

export interface HashGeneratorModule {
  title: string;
  description: string;
  subtitle: string;
  privacy: string;
  inputText: string;
  placeholder: string;
  generateButton: string;
  clearButton: string;
  generatedHashes: string;
  generating: string;
  hashResult: string;
  failedToGenerate: string;
  quickExamples: string;
  comparisonTable: string;
  algorithm: string;
  bitLength: string;
  securityLevel: string;
  useCase: string;
  weak: string;
  deprecated: string;
  strong: string;
  veryStrong: string;
  maximum: string;
  legacyChecksums: string;
  legacySignatures: string;
  generalPurpose: string;
  highSecurity: string;
  maxSecurity: string;
}

export interface Base64Module {
  title: string;
  description: string;
  encodeTab: string;
  decodeTab: string;
  encodeTitle: string;
  encodeDescription: string;
  decodeTitle: string;
  decodeDescription: string;
  inputText: string;
  base64Input: string;
  base64Output: string;
  decodedText: string;
  placeholderEncode: string;
  placeholderDecode: string;
  errorEncode: string;
  errorDecode: string;
  copySuccess: string;
}

export interface ColorPaletteModule {
  title: string;
  description: string;
  randomTab: string;
  complementaryTab: string;
  generateNewPalette: string;
  exportJson: string;
  generatedPalette: string;
  clickToCopy: string;
  complementaryScheme: string;
  oppositeColors: string;
  generateComplementary: string;
  copyHex: string;
  copyRgb: string;
  copied: string;
}

export interface QRGeneratorModule {
  title: string;
  description: string;
  textTab: string;
  urlTab: string;
  emailTab: string;
  phoneTab: string;
  wifiTab: string;
  textTitle: string;
  textDescription: string;
  textLabel: string;
  textPlaceholder: string;
  generateTextButton: string;
  urlTitle: string;
  urlDescription: string;
  urlLabel: string;
  urlPlaceholder: string;
  generateUrlButton: string;
  emailTitle: string;
  emailDescription: string;
  emailLabel: string;
  emailPlaceholder: string;
  generateEmailButton: string;
  phoneTitle: string;
  phoneDescription: string;
  phoneLabel: string;
  phonePlaceholder: string;
  generatePhoneButton: string;
  wifiTitle: string;
  wifiDescription: string;
  wifiSsidLabel: string;
  wifiPasswordLabel: string;
  wifiSecurityLabel: string;
  wifiSsidPlaceholder: string;
  wifiPasswordPlaceholder: string;
  generateWifiButton: string;
  downloadButton: string;
  noQrCode: string;
  generatedQrCode: string;
  scanToAccess: string;
}

export interface RegexTesterModule {
  title: string;
  description: string;
  subtitle: string;
  regexTesterTab: string;
  examplesTab: string;
  regexTitle: string;
  regexDescription: string;
  patternLabel: string;
  patternPlaceholder: string;
  flagsLabel: string;
  globalFlag: string;
  caseInsensitiveFlag: string;
  multilineFlag: string;
  dotAllFlag: string;
  unicodeFlag: string;
  stickyFlag: string;
  testTextLabel: string;
  testTextPlaceholder: string;
  testButton: string;
  replaceButton: string;
  clearButton: string;
  matchesTitle: string;
  matchesDescription: string;
  matchLabel: string;
  positionLabel: string;
  groupsLabel: string;
  noMatchesMessage: string;
  highlightedResultsTitle: string;
  highlightedResultsDescription: string;
  replaceResultTitle: string;
  replaceResultDescription: string;
  examplePatternsTitle: string;
  examplePatternsDescription: string;
  useThisPatternButton: string;
  emailExampleName: string;
  emailExampleDescription: string;
  urlExampleName: string;
  urlExampleDescription: string;
  phoneExampleName: string;
  phoneExampleDescription: string;
  ipv4ExampleName: string;
  ipv4ExampleDescription: string;
  dateExampleName: string;
  dateExampleDescription: string;
  errorEmptyPattern: string;
  errorInvalidPattern: string;
  errorEmptyReplacement: string;
  patternError: string;
}

// Footer module types
export interface FooterModule {
  copyright: string;
  builtWith: string;
  privacy: string;
}

// Metadata module types
export interface MetadataModule {
  site: {
    title: string;
    description: string;
    keywords: string;
  };
  tools: {
    urlEncoder: { title: string; description: string; keywords: string };
    sqlFormatter: { title: string; description: string; keywords: string };
    jwtDecoder: { title: string; description: string; keywords: string };
    jsonFormatter: { title: string; description: string; keywords: string };
    hashGenerator: { title: string; description: string; keywords: string };
    base64: { title: string; description: string; keywords: string };
    colorPalette: { title: string; description: string; keywords: string };
    qrGenerator: { title: string; description: string; keywords: string };
    regexTester: { title: string; description: string; keywords: string };
  };
}

// Complete translation type
export interface Translations {
  common: CommonModule;
  home: HomeModule;
  tools: ToolsModule;
  urlEncoder: URLEncoderModule;
  sqlFormatter: SQLFormatterModule;
  jwtDecoder: JWTDecoderModule;
  jsonFormatter: JSONFormatterModule;
  hashGenerator: HashGeneratorModule;
  base64: Base64Module;
  colorPalette: ColorPaletteModule;
  qrGenerator: QRGeneratorModule;
  regexTester: RegexTesterModule;
  footer: FooterModule;
  metadata: MetadataModule;
}
