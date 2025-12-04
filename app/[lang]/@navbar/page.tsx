"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

export default function NavbarSlot() {
  const params = useParams();
  const lang = params.lang as LanguageType;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-2xl font-bold">
          DevTools
        </Link>
        <div className="flex items-center space-x-3">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("common.nav.home", lang)}
            </Link>
            <Link
              href={`/${lang}/tools`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("common.nav.tools", lang)}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("common.nav.blog", lang)}
            </Link>
          </nav>

          {/* Separator */}
          <div className="w-px h-6 bg-border hidden md:block"></div>

          {/* Settings Controls */}
          <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-2 py-1.5">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-border"></div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href={`/${lang}`}
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("common.nav.home", lang)}
              </Link>
              <Link
                href={`/${lang}/tools`}
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("common.nav.tools", lang)}
              </Link>
              <Link
                href={`/${lang}/blog`}
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("common.nav.blog", lang)}
              </Link>
            </nav>

            {/* Mobile Settings */}
            <div className="flex items-center justify-center space-x-2 bg-muted/50 rounded-lg px-2 py-2">
              <LanguageSwitcher />
              <div className="w-px h-6 bg-border"></div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
