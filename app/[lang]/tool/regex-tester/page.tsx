import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import RegexTesterClient from "./RegexTesterClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("regexTester.metadata.title", lang);
  const description = t("regexTester.metadata.description", lang);
  const keywords = t("regexTester.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/regex-tester`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function RegexTesterPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const regexTesterFAQ = [
    {
      question: t("faq.regex.what.question", lang),
      answer: t("faq.regex.what.answer", lang),
    },
    {
      question: t("faq.regex.common.question", lang),
      answer: t("faq.regex.common.answer", lang),
    },
    {
      question: t("faq.regex.flags.question", lang),
      answer: t("faq.regex.flags.answer", lang),
    },
    {
      question: t("faq.regex.test.question", lang),
      answer: t("faq.regex.test.answer", lang),
    },
    {
      question: t("faq.regex.performance.question", lang),
      answer: t("faq.regex.performance.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(regexTesterFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <RegexTesterClient lang={lang} />
    </>
  );
}
