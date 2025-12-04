import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import ColorPaletteClient from "./ColorPaletteClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("colorPalette.metadata.title", lang);
  const description = t("colorPalette.metadata.description", lang);
  const keywords = t("colorPalette.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/color-palette`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function ColorPalettePage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const colorPaletteFAQ = [
    {
      question: t("faq.colorPalette.secure.question", lang),
      answer: t("faq.colorPalette.secure.answer", lang),
    },
    {
      question: t("faq.colorPalette.algorithm.question", lang),
      answer: t("faq.colorPalette.algorithm.answer", lang),
    },
    {
      question: t("faq.colorPalette.harmony.question", lang),
      answer: t("faq.colorPalette.harmony.answer", lang),
    },
    {
      question: t("faq.colorPalette.export.question", lang),
      answer: t("faq.colorPalette.export.answer", lang),
    },
    {
      question: t("faq.colorPalette.accessibility.question", lang),
      answer: t("faq.colorPalette.accessibility.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(colorPaletteFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <ColorPaletteClient lang={lang} />
    </>
  );
}
