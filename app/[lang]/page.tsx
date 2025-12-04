"use client";

import {
  Code,
  Database,
  FileText,
  Gift,
  Hash,
  Key,
  Link as LinkIcon,
  Palette,
  QrCode,
  Regex,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

const tools = [
  {
    id: "jwt-decoder",
    icon: Key,
    href: "/tool/jwt-decoder",
  },
  {
    id: "url-encoder",
    icon: LinkIcon,
    href: "/tool/url-encoder",
  },
  {
    id: "json-formatter",
    icon: Code,
    href: "/tool/json-formatter",
  },
  {
    id: "hash-generator",
    icon: Hash,
    href: "/tool/hash-generator",
  },
  {
    id: "base64",
    icon: FileText,
    href: "/tool/base64",
  },
  {
    id: "color-palette",
    icon: Palette,
    href: "/tool/color-palette",
  },
  {
    id: "qr-generator",
    icon: QrCode,
    href: "/tool/qr-generator",
  },
  {
    id: "sql-formatter",
    icon: Database,
    href: "/tool/sql-formatter",
  },
  {
    id: "regex-tester",
    icon: Regex,
    href: "/tool/regex-tester",
  },
];

// Helper function to convert hyphen-case to camelCase for translation keys
function getToolTranslationKey(toolId: string): string {
  return toolId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export default function Home() {
  const params = useParams();
  const lang = params.lang as LanguageType;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("home.hero.title", lang)}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {t("home.hero.subtitle", lang)}
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            {t("home.hero.description", lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={`/${lang}/tools`}>
                {t("common.buttons.viewAll", lang)}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${lang}/blog`}>
                {t("common.buttons.learnMore", lang)}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("home.tools.title", lang)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">
                        {t(
                          `tools.list.${getToolTranslationKey(tool.id)}.title`,
                          lang,
                        )}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {t(
                        `tools.list.${getToolTranslationKey(tool.id)}.desc`,
                        lang,
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/${lang}${tool.href}`}>
                        {t("common.buttons.tryNow", lang)}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${lang}/tools`}>
                {t("common.buttons.viewAll", lang)}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("home.about.title", lang)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("home.about.privacy.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.about.privacy.desc", lang)}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("home.about.speed.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.about.speed.desc", lang)}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("home.about.free.title", lang)}
              </h3>
              <p className="text-muted-foreground">
                {t("home.about.free.desc", lang)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
