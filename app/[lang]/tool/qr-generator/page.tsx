import type { Metadata } from "next";
import Script from "next/script";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import { generateFAQSchema } from "@/lib/utils";
import QRCodeClient from "./QRCodeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = t("qrGenerator.metadata.title", lang);
  const description = t("qrGenerator.metadata.description", lang);
  const keywords = t("qrGenerator.metadata.keywords", lang);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${lang}/tool/qr-generator`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function QRCodePage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;

  const qrCodeFAQ = [
    {
      question: t("faq.qr.what.question", lang),
      answer: t("faq.qr.what.answer", lang),
    },
    {
      question: t("faq.qr.types.question", lang),
      answer: t("faq.qr.types.answer", lang),
    },
    {
      question: t("faq.qr.secure.question", lang),
      answer: t("faq.qr.secure.answer", lang),
    },
    {
      question: t("faq.qr.custom.question", lang),
      answer: t("faq.qr.custom.answer", lang),
    },
    {
      question: t("faq.qr.benefits.question", lang),
      answer: t("faq.qr.benefits.answer", lang),
    },
  ];

  const faqSchema = generateFAQSchema(qrCodeFAQ, lang);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <QRCodeClient lang={lang} />
    </>
  );
}
