// 翻译类型定义
export type LanguageType = "en" | "zh" | "fr" | "es" | "ru" | "de" | "ja";

// 支持的语言列表
export const supportedLocales: LanguageType[] = [
  "en",
  "zh",
  "fr",
  "es",
  "ru",
  "de",
  "ja",
];

// 语言显示名称
export const languageNames: Record<LanguageType, string> = {
  en: "English",
  zh: "中文",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
  ja: "日本語",
};

export type TranslationValue = string;

export interface LanguageTranslations {
  [key: string]: TranslationValue;
}

export interface Translations {
  [key: string]: LanguageTranslations;
}

import { siteUrl } from "@/lib/config";
import { translations_de } from "./de";
// 导入各语言翻译文件（从新的模块化结构）
import { translations_en } from "./en";
import { translations_es } from "./es";
import { translations_fr } from "./fr";
import { translations_ja } from "./ja";
import { translations_ru } from "./ru";
import { translations_zh } from "./zh";

// 统一的翻译对象
export const translations: Record<LanguageType, LanguageTranslations> = {
  en: translations_en,
  zh: translations_zh,
  fr: translations_fr,
  es: translations_es,
  ru: translations_ru,
  de: translations_de,
  ja: translations_ja,
};

// 翻译函数
export function t(key: string, lang: LanguageType): string {
  const langTranslations = translations[lang];
  return langTranslations?.[key] || key;
}

// 生成 hreflang 链接的辅助函数
export function generateHreflangLinks(
  basePath: string,
): Record<LanguageType, string> {
  return supportedLocales.reduce(
    (acc, locale) => {
      acc[locale] = `${siteUrl}/${locale}${basePath}`;
      return acc;
    },
    {} as Record<LanguageType, string>,
  );
}
