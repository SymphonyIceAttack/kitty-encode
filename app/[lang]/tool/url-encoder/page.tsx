import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import URLEncoderClient from "./URLEncoderClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("urlEncoder.metadata.title", lang);
  const description = t("urlEncoder.metadata.description", lang);
  const keywords = t("urlEncoder.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/url-encoder`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function URLEncoderPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const urlFAQ = [
    {
      question: t("faq.url.secure.question", lang),
      answer: t("faq.url.secure.answer", lang),
    },
    {
      question: t("faq.url.why.question", lang),
      answer: t("faq.url.why.answer", lang),
    },
    {
      question: t("faq.url.chinese.question", lang),
      answer: t("faq.url.chinese.answer", lang),
    },
    {
      question: t("faq.url.api.question", lang),
      answer: t("faq.url.api.answer", lang),
    },
    {
      question: t("faq.url.difference.question", lang),
      answer: t("faq.url.difference.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(urlFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <URLEncoderClient lang={lang} />
    </>
  );
}
