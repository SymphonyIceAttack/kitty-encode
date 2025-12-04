import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";
import "../globals.css";
import { ThemeInitializer } from "@/components/theme-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as LanguageType;

  // Validate that the incoming `lang` parameter is valid
  const supportedLocales: LanguageType[] = ["en", "zh", "fr", "es", "ru", "de"];
  if (!supportedLocales.includes(language)) {
    notFound();
  }

  return {
    title: t("metadata.title", language),
    description: t("metadata.description", language),
    keywords: t("metadata.keywords", language),
    openGraph: {
      title: t("metadata.title", language),
      description: t("metadata.description", language),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title", language),
      description: t("metadata.description", language),
    },
    alternates: {
      languages: supportedLocales.reduce(
        (acc, locale) => {
          acc[locale] = `/${locale}`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
  navbar,
  footer,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // Validate that the incoming `lang` parameter is valid
  const supportedLocales: LanguageType[] = ["en", "zh", "fr", "es", "ru", "de"];
  if (!supportedLocales.includes(lang as LanguageType)) {
    notFound();
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        {navbar}
        {children}
        {footer}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
