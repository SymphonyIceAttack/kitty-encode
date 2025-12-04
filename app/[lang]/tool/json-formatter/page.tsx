import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import JSONFormatterClient from "./JSONFormatterClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("jsonFormatter.metadata.title", lang);
  const description = t("jsonFormatter.metadata.description", lang);
  const keywords = t("jsonFormatter.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/json-formatter`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function JSONFormatterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const jsonFAQ = [
    {
      question: t("faq.json.secure.question", lang),
      answer: t("faq.json.secure.answer", lang),
    },
    {
      question: t("faq.json.format.question", lang),
      answer: t("faq.json.format.answer", lang),
    },
    {
      question: t("faq.json.minify.question", lang),
      answer: t("faq.json.minify.answer", lang),
    },
    {
      question: t("faq.json.validate.question", lang),
      answer: t("faq.json.validate.answer", lang),
    },
    {
      question: t("faq.json.large.question", lang),
      answer: t("faq.json.large.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(jsonFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <JSONFormatterClient lang={lang} />
    </>
  );
}
