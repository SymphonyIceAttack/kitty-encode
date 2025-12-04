"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { LanguageType } from "@/lib/translation";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  // 更新当前语言显示
  useEffect(() => {
    const match = pathname.match(/^\/(en|zh|fr|es|ru|de)/);
    const locale = (match ? match[1] : "en") as LanguageType;
    const lang = languages.find((l) => l.code === locale) || languages[0];
    setCurrentLang(lang);
  }, [pathname]);

  const changeLanguage = (lang: LanguageType) => {
    // 切换到新语言的路径
    const currentPath = pathname.replace(/^\/(en|zh|fr|es|ru|de)/, "") || "/";
    const newPath = `/${lang}${currentPath}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
        className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-md hover:bg-accent transition-colors text-sm"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-2 z-10"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => changeLanguage(language.code as LanguageType)}
              className={`w-full text-left px-4 py-2 hover:bg-accent transition-colors flex items-center gap-3 ${
                language.code === currentLang.code
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              role="option"
              aria-selected={language.code === currentLang.code}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
