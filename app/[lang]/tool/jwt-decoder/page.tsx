import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import JWTDecoderClient from "./JWTDecoderClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("jwtDecoder.metadata.title", lang);
  const description = t("jwtDecoder.metadata.description", lang);
  const keywords = t("jwtDecoder.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/jwt-decoder`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function JWTDecoderPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const jwtFAQ = [
    {
      question: t("jwtDecoder.faq.what.question", lang),
      answer: t("jwtDecoder.faq.what.answer", lang),
    },
    {
      question: t("jwtDecoder.faq.safe.question", lang),
      answer: t("jwtDecoder.faq.safe.answer", lang),
    },
    {
      question: t("jwtDecoder.faq.sections.question", lang),
      answer: t("jwtDecoder.faq.sections.answer", lang),
    },
    {
      question: t("jwtDecoder.faq.verify.question", lang),
      answer: t("jwtDecoder.faq.verify.answer", lang),
    },
    {
      question: t("jwtDecoder.faq.claims.question", lang),
      answer: t("jwtDecoder.faq.claims.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(jwtFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <JWTDecoderClient lang={lang} />
    </>
  );
}
