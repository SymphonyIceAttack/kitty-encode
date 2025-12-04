import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import SQLFormatterClient from "./SQLFormatterClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("sqlFormatter.metadata.title", lang);
  const description = t("sqlFormatter.metadata.description", lang);
  const keywords = t("sqlFormatter.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/sql-formatter`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function SQLFormatterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const sqlFormatterFAQ = [
    {
      question: t("faq.sql.format.question", lang),
      answer: t("faq.sql.format.answer", lang),
    },
    {
      question: t("faq.sql.dialects.question", lang),
      answer: t("faq.sql.dialects.answer", lang),
    },
    {
      question: t("faq.sql.customize.question", lang),
      answer: t("faq.sql.customize.answer", lang),
    },
    {
      question: t("faq.sql.validate.question", lang),
      answer: t("faq.sql.validate.answer", lang),
    },
    {
      question: t("faq.sql.performance.question", lang),
      answer: t("faq.sql.performance.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(sqlFormatterFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <SQLFormatterClient lang={lang} />
    </>
  );
}
