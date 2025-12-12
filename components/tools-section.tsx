"use client";

import {
  ArrowRight,
  Clock,
  Code,
  FileJson,
  FileText,
  Hash,
  KeyRound,
  Palette,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const tools = [
  {
    titleKey: "toolsSection.jsonFormatter.title",
    descriptionKey: "toolsSection.jsonFormatter.description",
    icon: FileJson,
    href: "/tools/json-formatter",
    color: "text-yellow-500",
  },
  {
    titleKey: "toolsSection.base64.title",
    descriptionKey: "toolsSection.base64.description",
    icon: Code,
    href: "/tools/base64",
    color: "text-blue-500",
  },
  {
    titleKey: "toolsSection.hash.title",
    descriptionKey: "toolsSection.hash.description",
    icon: Hash,
    href: "/tools/hash",
    color: "text-purple-500",
  },
  {
    titleKey: "toolsSection.uuid.title",
    descriptionKey: "toolsSection.uuid.description",
    icon: KeyRound,
    href: "/tools/uuid",
    color: "text-green-500",
  },
  {
    titleKey: "toolsSection.color.title",
    descriptionKey: "toolsSection.color.description",
    icon: Palette,
    href: "/tools/color",
    color: "text-pink-500",
  },
  {
    titleKey: "toolsSection.qrcode.title",
    descriptionKey: "toolsSection.qrcode.description",
    icon: QrCode,
    href: "/tools/qrcode",
    color: "text-orange-500",
  },
  {
    titleKey: "toolsSection.markdown.title",
    descriptionKey: "toolsSection.markdown.description",
    icon: FileText,
    href: "/tools/markdown",
    color: "text-cyan-500",
  },
  {
    titleKey: "toolsSection.timestamp.title",
    descriptionKey: "toolsSection.timestamp.description",
    icon: Clock,
    href: "/tools/timestamp",
    color: "text-red-500",
  },
];

interface ToolsSectionProps {
  lang: LanguageType;
}

export function ToolsSection({ lang }: ToolsSectionProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="border-t border-border bg-card/50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {t("toolsSection.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("toolsSection.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${lang}/tools`}>
              {t("toolsSection.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.titleKey} href={`/${lang}${tool.href}`}>
                <Card className="group h-full transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5">
                  <CardHeader>
                    <div
                      className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${tool.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {t(tool.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {t(tool.descriptionKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
