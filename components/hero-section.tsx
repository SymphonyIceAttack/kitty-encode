"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

interface HeroSectionProps {
  lang: LanguageType;
}

export function HeroSection({ lang }: HeroSectionProps) {
  const { t } = useTranslation(lang);

  const stats = [
    { value: "20+", labelKey: "hero.stats.tools" },
    { value: "100%", labelKey: "hero.stats.privacy" },
    { value: "0", labelKey: "hero.stats.data" },
    { value: "∞", labelKey: "hero.stats.limit" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-24 md:py-32">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>{t("hero.badge")}</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.title1")}{" "}
          <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
            {t("hero.title2")}
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg text-muted-foreground md:text-xl">
          {t("hero.description")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-[160px]">
            <Link href={`/${lang}/tools`}>
              {t("hero.viewAllTools")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[160px] bg-transparent"
          >
            <Link href={`/${lang}/blog`}>{t("hero.learnMore")}</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
