import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import HashGeneratorClient from "./HashGeneratorClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("hashGenerator.metadata.title", lang);
  const description = t("hashGenerator.metadata.description", lang);
  const keywords = t("hashGenerator.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/hash-generator`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function HashGeneratorPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const hashFAQ = [
    {
      question: t("faq.hash.secure.question", lang),
      answer: t("faq.hash.secure.answer", lang),
    },
    {
      question: t("faq.hash.algorithms.question", lang),
      answer: t("faq.hash.algorithms.answer", lang),
    },
    {
      question: t("faq.hash.reversible.question", lang),
      answer: t("faq.hash.reversible.answer", lang),
    },
    {
      question: t("faq.hash.collision.question", lang),
      answer: t("faq.hash.collision.answer", lang),
    },
    {
      question: t("faq.hash.passwords.question", lang),
      answer: t("faq.hash.passwords.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(hashFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <HashGeneratorClient lang={lang} />
    </>
  );
}
