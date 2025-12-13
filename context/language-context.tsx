"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { LanguageType } from "@/lib/translations";

interface LanguageContextType {
  lang: LanguageType;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: LanguageType;
}) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
