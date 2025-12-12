"use client";

import { Globe, Lock, Shield, Zap } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const features = [
  {
    icon: Zap,
    titleKey: "featuresSection.fast.title",
    descriptionKey: "featuresSection.fast.description",
  },
  {
    icon: Shield,
    titleKey: "featuresSection.privacy.title",
    descriptionKey: "featuresSection.privacy.description",
  },
  {
    icon: Lock,
    titleKey: "featuresSection.secure.title",
    descriptionKey: "featuresSection.secure.description",
  },
  {
    icon: Globe,
    titleKey: "featuresSection.offline.title",
    descriptionKey: "featuresSection.offline.description",
  },
];

interface FeaturesSectionProps {
  lang: LanguageType;
}

export function FeaturesSection({ lang }: FeaturesSectionProps) {
  const { t } = useTranslation(lang);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("featuresSection.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("featuresSection.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold">{t(feature.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
