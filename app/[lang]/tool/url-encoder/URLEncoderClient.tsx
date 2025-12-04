"use client";

import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  FileText,
  Key,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface Props {
  lang: LanguageType;
}

export default function URLEncoderClient({ lang }: Props) {
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const encodeURL = (text: string): string => {
    try {
      return encodeURIComponent(text);
    } catch (_error) {
      return t("urlEncoder.errorEncode", lang);
    }
  };

  const decodeURL = (text: string): string => {
    try {
      return decodeURIComponent(text);
    } catch (_error) {
      return t("urlEncoder.errorDecode", lang);
    }
  };

  const handleEncode = () => {
    if (!encodeInput.trim()) {
      setEncodeOutput("");
      return;
    }
    setEncodeOutput(encodeURL(encodeInput));
  };

  const handleDecode = () => {
    if (!decodeInput.trim()) {
      setDecodeOutput("");
      return;
    }
    setDecodeOutput(decodeURL(decodeInput));
  };

  const copyToClipboard = async (
    text: string,
    _type: string,
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(t("urlEncoder.copySuccess", lang));
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const faqData = [
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* SEO Optimized H1 */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {t("urlEncoder.title", lang)}
      </h1>

      {/* Introduction */}
      <div className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          {t("urlEncoder.subtitle", lang)}
        </p>
        <p className="text-muted-foreground">
          {t("urlEncoder.description", lang)}
        </p>
      </div>

      {/* Tool Section */}
      <div className="mb-12">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              {t("urlEncoder.tabs.encode", lang)}
            </TabsTrigger>
            <TabsTrigger value="decode" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              {t("urlEncoder.tabs.decode", lang)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("urlEncoder.encode.title", lang)}</CardTitle>
                <CardDescription>
                  {t("urlEncoder.encode.description", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label
                    htmlFor="encode-input"
                    className="text-sm font-medium mb-2 block"
                  >
                    {t("urlEncoder.encode.inputText", lang)}
                  </label>
                  <Textarea
                    id="encode-input"
                    placeholder={t("urlEncoder.encode.placeholder", lang)}
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEncode} className="flex-1">
                    {t("urlEncoder.encodeButton", lang)}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEncodeInput("");
                      setEncodeOutput("");
                    }}
                    className="px-3"
                  >
                    {t("urlEncoder.clearButton", lang)}
                  </Button>
                </div>
                {encodeOutput && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="encode-output"
                        className="text-sm font-medium"
                      >
                        {t("urlEncoder.encodedResult", lang)}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(encodeOutput, "encode")}
                        className="h-6 px-2"
                      >
                        {copied === "encode" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre
                      id="encode-output"
                      className="text-xs bg-muted p-3 rounded-md overflow-x-auto"
                    >
                      {encodeOutput}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("urlEncoder.decodeTitle", lang)}</CardTitle>
                <CardDescription>
                  {t("urlEncoder.decodeDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label
                    htmlFor="decode-input"
                    className="text-sm font-medium mb-2 block"
                  >
                    {t("urlEncoder.encodedUrl", lang)}
                  </label>
                  <Textarea
                    id="decode-input"
                    placeholder={t("urlEncoder.inputPlaceholderDecode", lang)}
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDecode} className="flex-1">
                    {t("urlEncoder.decodeButton", lang)}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDecodeInput("");
                      setDecodeOutput("");
                    }}
                    className="px-3"
                  >
                    {t("urlEncoder.clearButton", lang)}
                  </Button>
                </div>
                {decodeOutput && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="decode-output"
                        className="text-sm font-medium"
                      >
                        {t("urlEncoder.decodedResult", lang)}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(decodeOutput, "decode")}
                        className="h-6 px-2"
                      >
                        {copied === "decode" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre
                      id="decode-output"
                      className="text-xs bg-muted p-3 rounded-md overflow-x-auto"
                    >
                      {decodeOutput}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* How to Use Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("urlEncoder.howToUseTitle", lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("urlEncoder.chooseModeTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("urlEncoder.chooseModeDescription", lang)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("urlEncoder.enterTextTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("urlEncoder.enterTextDescription", lang)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("urlEncoder.getResultsTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("urlEncoder.getResultsDescription", lang)}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* URL Encoding vs Decoding Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("urlEncoder.encodingVsDecodingTitle", lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                {t("urlEncoder.urlEncodingTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {t("urlEncoder.urlEncodingDescription", lang)}
              </p>
              <div className="space-y-2">
                <div>
                  <code className="text-xs bg-muted p-1 rounded block">
                    Input: Hello World! & ? # @
                  </code>
                </div>
                <div>
                  <code className="text-xs bg-muted p-1 rounded block">
                    Output: Hello%20World%21%20%26%20%3F%20%23%20%40
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                {t("urlEncoder.urlDecodingTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {t("urlEncoder.urlDecodingDescription", lang)}
              </p>
              <div className="space-y-2">
                <div>
                  <code className="text-xs bg-muted p-1 rounded block">
                    Input: Hello%20World%21%20%26%20%3F%20%23%20%40
                  </code>
                </div>
                <div>
                  <code className="text-xs bg-muted p-1 rounded block">
                    Output: Hello World! & ? # @
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Examples Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("urlEncoder.commonExamplesTitle", lang)}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left">
                  {t("urlEncoder.characterColumn", lang)}
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  {t("urlEncoder.urlEncodedColumn", lang)}
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  {t("urlEncoder.descriptionColumn", lang)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code> </code>
                  {t("urlEncoder.spaceCharacter", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.spaceEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.spaceDescription", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code>&</code>
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.ampersandEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.ampersandDescription", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code>?</code>
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.questionEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.questionDescription", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code>#</code>
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.hashEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.hashDescription", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code>+</code>
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.plusEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.plusDescription", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.chineseCharacter", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  <code>{t("urlEncoder.chineseEncoded", lang)}</code>
                </td>
                <td className="border border-border px-4 py-2">
                  {t("urlEncoder.chineseDescription", lang)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("urlEncoder.faqTitle", lang)}
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              {expandedFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("urlEncoder.relatedToolsTitle", lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Key className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {t("urlEncoder.jwtDecoderToolTitle", lang)}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("urlEncoder.jwtDecoderToolDescription", lang)}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/jwt-decoder`}>
                  {t("urlEncoder.tryButton", lang)} JWT Decoder
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {t("urlEncoder.jsonFormatterToolTitle", lang)}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("urlEncoder.jsonFormatterToolDescription", lang)}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/json-formatter`}>
                  {t("urlEncoder.tryButton", lang)} JSON Formatter
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {t("urlEncoder.base64EncoderToolTitle", lang)}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t("urlEncoder.base64EncoderToolDescription", lang)}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/base64`}>
                  {t("urlEncoder.tryButton", lang)} Base64 Encoder
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* JSON-LD Schema Markup for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
