import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import Base64EncoderClient from "./Base64EncoderClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("base64.metadata.title", lang);
  const description = t("base64.metadata.description", lang);
  const keywords = t("base64.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/base64`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function Base64EncoderPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const base64FAQ = [
    {
      question: t("faq.base64.secure.question", lang),
      answer: t("faq.base64.secure.answer", lang),
    },
    {
      question: t("faq.base64.encoding.question", lang),
      answer: t("faq.base64.encoding.answer", lang),
    },
    {
      question: t("faq.base64.decode.question", lang),
      answer: t("faq.base64.decode.answer", lang),
    },
    {
      question: t("faq.base64.urlsafe.question", lang),
      answer: t("faq.base64.urlsafe.answer", lang),
    },
    {
      question: t("faq.base64.binary.question", lang),
      answer: t("faq.base64.binary.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(base64FAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Base64EncoderClient lang={lang} />
    </>
  );
}
