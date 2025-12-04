import { de } from "./locales/de/index";
import { en } from "./locales/en/index";
import { es } from "./locales/es/index";
import { fr } from "./locales/fr/index";
import { ru } from "./locales/ru/index";
import { zh } from "./locales/zh/index";
import type { LanguageType, Translations } from "./types";

// Export all translations
export { en, zh, fr, es, ru, de };

// Export types
export type { LanguageType, Translations };

// Available languages
export const availableLanguages: LanguageType[] = [
  "en",
  "zh",
  "fr",
  "es",
  "ru",
  "de",
];

// Translation function
export function getTranslations(lang: LanguageType): Translations {
  switch (lang) {
    case "en":
      return en;
    case "zh":
      return zh;
    case "fr":
      return fr;
    case "es":
      return es;
    case "ru":
      return ru;
    case "de":
      return de;
    default:
      return en; // Fallback to English for unimplemented languages
  }
}

// Helper functions
export function isValidLanguage(lang: string): lang is LanguageType {
  return availableLanguages.includes(lang as LanguageType);
}

export function getLanguageName(lang: LanguageType): string {
  const names = {
    en: "English",
    zh: "中文",
    fr: "Français",
    es: "Español",
    ru: "Русский",
    de: "Deutsch",
  };
  return names[lang];
}

// Flattened key mappings for URL Encoder
const urlEncoderKeyMap: Record<string, string> = {
  "urlEncoder.howToUseTitle": "urlEncoder.howToUse.title",
  "urlEncoder.encodingVsDecodingTitle": "urlEncoder.encodingVsDecoding.title",
  "urlEncoder.urlEncodingTitle": "urlEncoder.encodingVsDecoding.encoding.title",
  "urlEncoder.urlDecodingTitle": "urlEncoder.encodingVsDecoding.decoding.title",
  "urlEncoder.urlEncodingDescription":
    "urlEncoder.encodingVsDecoding.encoding.description",
  "urlEncoder.urlDecodingDescription":
    "urlEncoder.encodingVsDecoding.decoding.description",
  "urlEncoder.chooseModeTitle": "urlEncoder.howToUse.steps.chooseMode.title",
  "urlEncoder.chooseModeDescription":
    "urlEncoder.howToUse.steps.chooseMode.description",
  "urlEncoder.enterTextTitle": "urlEncoder.howToUse.steps.enterText.title",
  "urlEncoder.enterTextDescription":
    "urlEncoder.howToUse.steps.enterText.description",
  "urlEncoder.getResultsTitle": "urlEncoder.howToUse.steps.getResults.title",
  "urlEncoder.getResultsDescription":
    "urlEncoder.howToUse.steps.getResults.description",
  "urlEncoder.commonExamplesTitle": "urlEncoder.commonExamples.title",
  "urlEncoder.characterColumn": "urlEncoder.commonExamples.columns.character",
  "urlEncoder.urlEncodedColumn": "urlEncoder.commonExamples.columns.encoded",
  "urlEncoder.descriptionColumn":
    "urlEncoder.commonExamples.columns.description",
  "urlEncoder.spaceCharacter": "urlEncoder.commonExamples.examples.space.char",
  "urlEncoder.spaceEncoded": "urlEncoder.commonExamples.examples.space.encoded",
  "urlEncoder.spaceDescription":
    "urlEncoder.commonExamples.examples.space.description",
  "urlEncoder.ampersandEncoded":
    "urlEncoder.commonExamples.examples.ampersand.encoded",
  "urlEncoder.ampersandDescription":
    "urlEncoder.commonExamples.examples.ampersand.description",
  "urlEncoder.questionEncoded":
    "urlEncoder.commonExamples.examples.question.encoded",
  "urlEncoder.questionDescription":
    "urlEncoder.commonExamples.examples.question.description",
  "urlEncoder.hashEncoded": "urlEncoder.commonExamples.examples.hash.encoded",
  "urlEncoder.hashDescription":
    "urlEncoder.commonExamples.examples.hash.description",
  "urlEncoder.plusEncoded": "urlEncoder.commonExamples.examples.plus.encoded",
  "urlEncoder.plusDescription":
    "urlEncoder.commonExamples.examples.plus.description",
  "urlEncoder.chineseCharacter":
    "urlEncoder.commonExamples.examples.chinese.char",
  "urlEncoder.chineseEncoded":
    "urlEncoder.commonExamples.examples.chinese.encoded",
  "urlEncoder.chineseDescription":
    "urlEncoder.commonExamples.examples.chinese.description",
  "urlEncoder.faqTitle": "urlEncoder.faq.title",
  "urlEncoder.relatedToolsTitle": "urlEncoder.relatedTools.title",
  "urlEncoder.jwtDecoderToolTitle": "urlEncoder.relatedTools.jwtDecoder.title",
  "urlEncoder.jwtDecoderToolDescription":
    "urlEncoder.relatedTools.jwtDecoder.description",
  "urlEncoder.jsonFormatterToolTitle":
    "urlEncoder.relatedTools.jsonFormatter.title",
  "urlEncoder.jsonFormatterToolDescription":
    "urlEncoder.relatedTools.jsonFormatter.description",
  "urlEncoder.base64EncoderToolTitle":
    "urlEncoder.relatedTools.base64Encoder.title",
  "urlEncoder.base64EncoderToolDescription":
    "urlEncoder.relatedTools.base64Encoder.description",
  // URL Encoder specific mappings
  "urlEncoder.encodeButton": "urlEncoder.encode.button",
  "urlEncoder.decodeButton": "urlEncoder.decode.button",
  "urlEncoder.clearButton": "urlEncoder.ui.clearButton",
  "urlEncoder.tryButton": "urlEncoder.ui.tryButton",
  "urlEncoder.encodedResult": "urlEncoder.encode.result",
  "urlEncoder.decodedResult": "urlEncoder.decode.result",
  "urlEncoder.decodeTitle": "urlEncoder.decode.title",
  "urlEncoder.decodeDescription": "urlEncoder.decode.description",
  "urlEncoder.inputText": "urlEncoder.encode.inputText",
  "urlEncoder.encodedUrl": "urlEncoder.decode.inputText",
  "urlEncoder.inputPlaceholderDecode": "urlEncoder.decode.placeholder",
  "urlEncoder.errorEncode": "urlEncoder.ui.errorEncode",
  "urlEncoder.errorDecode": "urlEncoder.ui.errorDecode",
  "urlEncoder.copySuccess": "urlEncoder.ui.copySuccess",
  // JWT Decoder specific mappings
  "jwtDecoder.faqTitle": "jwtDecoder.faqTitle",
  "jwtDecoder.faqSectionTitle": "jwtDecoder.faqSectionTitle",
  // Base64 specific mappings
  "base64.title": "base64.title",
  "base64.errorEncode": "base64.errorEncode",
  "base64.errorDecode": "base64.errorDecode",
  // QR Generator specific mappings
  "qrGenerator.title": "qrGenerator.title",
  // Regex Tester specific mappings
  "regexTester.title": "regexTester.title",
  "regexTester.errorEmptyPattern": "regexTester.errorEmptyPattern",
  "regexTester.errorInvalidPattern": "regexTester.errorInvalidPattern",
  "regexTester.errorEmptyReplacement": "regexTester.errorEmptyReplacement",
  // Color Palette specific mappings
  "colorPalette.title": "colorPalette.title",
  // Hash Generator specific mappings
  "hashGenerator.title": "hashGenerator.title",
  // JSON Formatter specific mappings
  "jsonFormatter.title": "jsonFormatter.title",
  // SQL Formatter specific mappings
  "sqlFormatter.title": "sqlFormatter.title",
  "sqlFormatter.exampleSimpleSelectName":
    "sqlFormatter.exampleSimpleSelectName",
  "sqlFormatter.exampleJoinQueryName": "sqlFormatter.exampleJoinQueryName",
  "sqlFormatter.exampleComplexQueryName":
    "sqlFormatter.exampleComplexQueryName",
  // Site metadata mappings
  "metadata.title": "metadata.site.title",
  "metadata.description": "metadata.site.description",
  "metadata.keywords": "metadata.site.keywords",
  // Tool-specific metadata mappings
  "jsonFormatter.metadata.title": "metadata.tools.jsonFormatter.title",
  "jsonFormatter.metadata.description":
    "metadata.tools.jsonFormatter.description",
  "jsonFormatter.metadata.keywords": "metadata.tools.jsonFormatter.keywords",
  "qrGenerator.metadata.title": "metadata.tools.qrGenerator.title",
  "qrGenerator.metadata.description": "metadata.tools.qrGenerator.description",
  "qrGenerator.metadata.keywords": "metadata.tools.qrGenerator.keywords",
  "base64.metadata.title": "metadata.tools.base64.title",
  "base64.metadata.description": "metadata.tools.base64.description",
  "base64.metadata.keywords": "metadata.tools.base64.keywords",
  "regexTester.metadata.title": "metadata.tools.regexTester.title",
  "regexTester.metadata.description": "metadata.tools.regexTester.description",
  "regexTester.metadata.keywords": "metadata.tools.regexTester.keywords",
  "colorPalette.metadata.title": "metadata.tools.colorPalette.title",
  "colorPalette.metadata.description":
    "metadata.tools.colorPalette.description",
  "colorPalette.metadata.keywords": "metadata.tools.colorPalette.keywords",
  "hashGenerator.metadata.title": "metadata.tools.hashGenerator.title",
  "hashGenerator.metadata.description":
    "metadata.tools.hashGenerator.description",
  "hashGenerator.metadata.keywords": "metadata.tools.hashGenerator.keywords",
  "jwtDecoder.metadata.title": "metadata.tools.jwtDecoder.title",
  "jwtDecoder.metadata.description": "metadata.tools.jwtDecoder.description",
  "jwtDecoder.metadata.keywords": "metadata.tools.jwtDecoder.keywords",
  "sqlFormatter.metadata.title": "metadata.tools.sqlFormatter.title",
  "sqlFormatter.metadata.description":
    "metadata.tools.sqlFormatter.description",
  "sqlFormatter.metadata.keywords": "metadata.tools.sqlFormatter.keywords",
  "urlEncoder.metadata.title": "metadata.tools.urlEncoder.title",
  "urlEncoder.metadata.description": "metadata.tools.urlEncoder.description",
  "urlEncoder.metadata.keywords": "metadata.tools.urlEncoder.keywords",
  // FAQ mappings
  "faq.url.secure.question": "urlEncoder.faq.url.secure.question",
  "faq.url.secure.answer": "urlEncoder.faq.url.secure.answer",
  "faq.url.why.question": "urlEncoder.faq.url.why.question",
  "faq.url.why.answer": "urlEncoder.faq.url.why.answer",
  "faq.url.chinese.question": "urlEncoder.faq.url.chinese.question",
  "faq.url.chinese.answer": "urlEncoder.faq.url.chinese.answer",
  "faq.url.api.question": "urlEncoder.faq.url.api.question",
  "faq.url.api.answer": "urlEncoder.faq.url.api.answer",
  "faq.url.difference.question": "urlEncoder.faq.url.difference.question",
  "faq.url.difference.answer": "urlEncoder.faq.url.difference.answer",
  // QR Generator FAQ mappings
  "faq.qr.what.question": "urlEncoder.faq.qr.what.question",
  "faq.qr.what.answer": "urlEncoder.faq.qr.what.answer",
  "faq.qr.types.question": "urlEncoder.faq.qr.types.question",
  "faq.qr.types.answer": "urlEncoder.faq.qr.types.answer",
  "faq.qr.secure.question": "urlEncoder.faq.qr.secure.question",
  "faq.qr.secure.answer": "urlEncoder.faq.qr.secure.answer",
  "faq.qr.custom.question": "urlEncoder.faq.qr.custom.question",
  "faq.qr.custom.answer": "urlEncoder.faq.qr.custom.answer",
  "faq.qr.benefits.question": "urlEncoder.faq.qr.benefits.question",
  "faq.qr.benefits.answer": "urlEncoder.faq.qr.benefits.answer",
  // Base64 FAQ mappings
  "faq.base64.secure.question": "urlEncoder.faq.base64.secure.question",
  "faq.base64.secure.answer": "urlEncoder.faq.base64.secure.answer",
  "faq.base64.encoding.question": "urlEncoder.faq.base64.encoding.question",
  "faq.base64.encoding.answer": "urlEncoder.faq.base64.encoding.answer",
  "faq.base64.decode.question": "urlEncoder.faq.base64.decode.question",
  "faq.base64.decode.answer": "urlEncoder.faq.base64.decode.answer",
  "faq.base64.urlsafe.question": "urlEncoder.faq.base64.urlsafe.question",
  "faq.base64.urlsafe.answer": "urlEncoder.faq.base64.urlsafe.answer",
  "faq.base64.binary.question": "urlEncoder.faq.base64.binary.question",
  "faq.base64.binary.answer": "urlEncoder.faq.base64.binary.answer",
  // Regex Tester FAQ mappings
  "faq.regex.what.question": "urlEncoder.faq.regex.what.question",
  "faq.regex.what.answer": "urlEncoder.faq.regex.what.answer",
  "faq.regex.common.question": "urlEncoder.faq.regex.common.question",
  "faq.regex.common.answer": "urlEncoder.faq.regex.common.answer",
  "faq.regex.flags.question": "urlEncoder.faq.regex.flags.question",
  "faq.regex.flags.answer": "urlEncoder.faq.regex.flags.answer",
  "faq.regex.test.question": "urlEncoder.faq.regex.test.question",
  "faq.regex.test.answer": "urlEncoder.faq.regex.test.answer",
  "faq.regex.performance.question": "urlEncoder.faq.regex.performance.question",
  "faq.regex.performance.answer": "urlEncoder.faq.regex.performance.answer",
  // Color Palette FAQ mappings
  "faq.colorPalette.secure.question":
    "urlEncoder.faq.colorPalette.secure.question",
  "faq.colorPalette.secure.answer": "urlEncoder.faq.colorPalette.secure.answer",
  "faq.colorPalette.algorithm.question":
    "urlEncoder.faq.colorPalette.algorithm.question",
  "faq.colorPalette.algorithm.answer":
    "urlEncoder.faq.colorPalette.algorithm.answer",
  "faq.colorPalette.harmony.question":
    "urlEncoder.faq.colorPalette.harmony.question",
  "faq.colorPalette.harmony.answer":
    "urlEncoder.faq.colorPalette.harmony.answer",
  "faq.colorPalette.export.question":
    "urlEncoder.faq.colorPalette.export.question",
  "faq.colorPalette.export.answer": "urlEncoder.faq.colorPalette.export.answer",
  "faq.colorPalette.accessibility.question":
    "urlEncoder.faq.colorPalette.accessibility.question",
  "faq.colorPalette.accessibility.answer":
    "urlEncoder.faq.colorPalette.accessibility.answer",
  // Hash Generator FAQ mappings
  "faq.hash.secure.question": "urlEncoder.faq.hash.secure.question",
  "faq.hash.secure.answer": "urlEncoder.faq.hash.secure.answer",
  "faq.hash.algorithms.question": "urlEncoder.faq.hash.algorithms.question",
  "faq.hash.algorithms.answer": "urlEncoder.faq.hash.algorithms.answer",
  "faq.hash.reversible.question": "urlEncoder.faq.hash.reversible.question",
  "faq.hash.reversible.answer": "urlEncoder.faq.hash.reversible.answer",
  "faq.hash.collision.question": "urlEncoder.faq.hash.collision.question",
  "faq.hash.collision.answer": "urlEncoder.faq.hash.collision.answer",
  "faq.hash.passwords.question": "urlEncoder.faq.hash.passwords.question",
  "faq.hash.passwords.answer": "urlEncoder.faq.hash.passwords.answer",
  // JSON Formatter FAQ mappings
  "faq.json.secure.question": "urlEncoder.faq.json.secure.question",
  "faq.json.secure.answer": "urlEncoder.faq.json.secure.answer",
  "faq.json.format.question": "urlEncoder.faq.json.format.question",
  "faq.json.format.answer": "urlEncoder.faq.json.format.answer",
  "faq.json.minify.question": "urlEncoder.faq.json.minify.question",
  "faq.json.minify.answer": "urlEncoder.faq.json.minify.answer",
  "faq.json.validate.question": "urlEncoder.faq.json.validate.question",
  "faq.json.validate.answer": "urlEncoder.faq.json.validate.answer",
  "faq.json.large.question": "urlEncoder.faq.json.large.question",
  "faq.json.large.answer": "urlEncoder.faq.json.large.answer",
  // SQL Formatter FAQ mappings
  "faq.sql.format.question": "urlEncoder.faq.sql.format.question",
  "faq.sql.format.answer": "urlEncoder.faq.sql.format.answer",
  "faq.sql.dialects.question": "urlEncoder.faq.sql.dialects.question",
  "faq.sql.dialects.answer": "urlEncoder.faq.sql.dialects.answer",
  "faq.sql.customize.question": "urlEncoder.faq.sql.customize.question",
  "faq.sql.customize.answer": "urlEncoder.faq.sql.customize.answer",
  "faq.sql.validate.question": "urlEncoder.faq.sql.validate.question",
  "faq.sql.validate.answer": "urlEncoder.faq.sql.validate.answer",
  "faq.sql.performance.question": "urlEncoder.faq.sql.performance.question",
  "faq.sql.performance.answer": "urlEncoder.faq.sql.performance.answer",
};

// Legacy t() function for backward compatibility
export function t(key: string, lang: LanguageType): string {
  // Map flattened keys to nested structure
  const mappedKey = urlEncoderKeyMap[key] || key;
  const translations = getTranslations(lang);
  const keys = mappedKey.split(".");
  let value: unknown = translations;

  try {
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found
        value = en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return original key if not found
          }
        }
        break;
      }
    }

    if (typeof value === "string") {
      return value;
    }

    // If it's an object, try to find a title or name property
    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if ("title" in obj && typeof obj.title === "string")
        return String(obj.title);
      if ("name" in obj && typeof obj.name === "string")
        return String(obj.name);
      if ("desc" in obj && typeof obj.desc === "string")
        return String(obj.desc);
      if ("description" in obj && typeof obj.description === "string")
        return String(obj.description);
    }

    return key; // Return original key if value is not a string
  } catch {
    return key;
  }
}
