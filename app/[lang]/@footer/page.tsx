"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

// Helper function to convert hyphen-case to camelCase for translation keys
function getToolTranslationKey(toolId: string): string {
  return toolId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export default function FooterSlot() {
  const params = useParams();
  const lang = params.lang as LanguageType;

  return (
    <footer className="border-t py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="text-2xl font-bold mb-4 block">
              DevTools
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("home.hero.description", lang)}
            </p>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {t("common.nav.tools", lang)}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/tool/jwt-decoder`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t(
                    `tools.list.${getToolTranslationKey("jwt-decoder")}.title`,
                    lang,
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/tool/url-encoder`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t(
                    `tools.list.${getToolTranslationKey("url-encoder")}.title`,
                    lang,
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/tool/json-formatter`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t(
                    `tools.list.${getToolTranslationKey("json-formatter")}.title`,
                    lang,
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/blog`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("common.nav.blog", lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("common.nav.about", lang)}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", lang)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t("footer.privacy", lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
