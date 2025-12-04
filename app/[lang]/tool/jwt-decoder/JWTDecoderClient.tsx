"use client";

import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  FileText,
  Key,
  Link as LinkIcon,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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

interface JWTHeader {
  alg: string;
  typ: string;
}

interface JWTPayload {
  [key: string]: unknown;
  exp?: number;
  iat?: number;
  nbf?: number;
}

interface JWTDecoded {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  isValid: boolean;
  error?: string;
}

export default function JWTDecoderClient({ lang }: Props) {
  const [jwtInput, setJwtInput] = useState("");
  const [decodedJWT, setDecodedJWT] = useState<JWTDecoded | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const decodeJWT = (token: string): JWTDecoded => {
    if (!token.trim()) {
      return {
        header: { alg: "", typ: "" },
        payload: {},
        signature: "",
        isValid: false,
        error: "No JWT provided",
      };
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        header: { alg: "", typ: "" },
        payload: {},
        signature: "",
        isValid: false,
        error: "Invalid JWT format. Expected 3 parts separated by dots.",
      };
    }

    try {
      // Decode header
      const header = JSON.parse(
        atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")),
      );

      // Decode payload
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
      );

      // Get signature
      const signature = parts[2];

      return {
        header,
        payload,
        signature,
        isValid: true,
      };
    } catch (error) {
      return {
        header: { alg: "", typ: "" },
        payload: {},
        signature: "",
        isValid: false,
        error: `Failed to decode JWT: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  };

  const handleDecode = () => {
    const result = decodeJWT(jwtInput);
    setDecodedJWT(result);
  };

  const copyToClipboard = async (text: string, type: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const isExpired = (exp?: number): boolean => {
    if (!exp) return false;
    return Date.now() / 1000 > exp;
  };

  const exampleJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzQ0MDM5MDJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const faqData = [
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {t("jwtDecoder.title", lang)}
      </h1>

      <div className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          {t("jwtDecoder.description", lang)}
        </p>
        <p className="text-muted-foreground">
          {t("jwtDecoder.subtitle", lang)}
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("jwtDecoder.inputText", lang)}</CardTitle>
            <CardDescription>
              {t("jwtDecoder.inputPlaceholder", lang)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder={t("jwtDecoder.inputPlaceholder", lang)}
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleDecode} className="flex-1 sm:flex-none">
                {t("jwtDecoder.decodeButton", lang)}
              </Button>
              <Button
                variant="outline"
                onClick={() => setJwtInput(exampleJWT)}
                className="flex-1 sm:flex-none"
              >
                {t("jwtDecoder.loadExampleButton", lang)}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setJwtInput("");
                  setDecodedJWT(null);
                }}
                className="flex-1 sm:flex-none"
              >
                {t("jwtDecoder.clearButton", lang)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {decodedJWT && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {decodedJWT.isValid ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle>{t("jwtDecoder.validToken", lang)}</CardTitle>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <CardTitle>{t("jwtDecoder.invalidToken", lang)}</CardTitle>
                  </>
                )}
              </div>
              {decodedJWT.error && (
                <CardDescription className="text-red-600">
                  {decodedJWT.error}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        </div>
      )}

      {decodedJWT?.isValid && (
        <div className="mb-8">
          <Tabs defaultValue="header" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="header">
                {t("jwtDecoder.headerTitle", lang)}
              </TabsTrigger>
              <TabsTrigger value="payload">
                {t("jwtDecoder.payloadTitle", lang)}
              </TabsTrigger>
              <TabsTrigger value="signature">
                {t("jwtDecoder.signatureTitle", lang)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="header" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t("jwtDecoder.headerTitle", lang)}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(decodedJWT?.header, null, 2),
                          "header",
                        )
                      }
                    >
                      {copied === "header" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {t("jwtDecoder.headerTitle", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{JSON.stringify(decodedJWT?.header, null, 2)}</code>
                  </pre>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Algorithm: {decodedJWT?.header.alg}
                      </Badge>
                      <Badge variant="outline">
                        Type: {decodedJWT?.header.typ}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payload" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t("jwtDecoder.payloadTitle", lang)}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(decodedJWT?.payload, null, 2),
                          "payload",
                        )
                      }
                    >
                      {copied === "payload" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {t("jwtDecoder.payloadTitle", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{JSON.stringify(decodedJWT?.payload, null, 2)}</code>
                  </pre>

                  {/* Standard Claims Analysis */}
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium">Standard Claims Analysis</h4>

                    {decodedJWT?.payload.exp && (
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Expires</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {formatTimestamp(decodedJWT?.payload.exp)}
                          </div>
                          <div
                            className={`text-xs ${isExpired(decodedJWT?.payload.exp) ? "text-red-600" : "text-green-600"}`}
                          >
                            {isExpired(decodedJWT?.payload.exp)
                              ? t("jwtDecoder.expired", lang)
                              : t("jwtDecoder.valid", lang)}
                          </div>
                        </div>
                      </div>
                    )}

                    {decodedJWT?.payload.iat && (
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">
                            {t("jwtDecoder.issuedAt", lang)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {formatTimestamp(decodedJWT?.payload.iat)}
                          </div>
                        </div>
                      </div>
                    )}

                    {decodedJWT?.payload.nbf && (
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span className="font-medium">
                            {t("jwtDecoder.notBefore", lang)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {formatTimestamp(decodedJWT?.payload.nbf)}
                          </div>
                        </div>
                      </div>
                    )}

                    {(decodedJWT?.payload.sub as string | number) && (
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <span className="font-medium">
                            {t("jwtDecoder.subject", lang)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono">
                            {String(decodedJWT?.payload.sub)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signature" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("jwtDecoder.signatureTitle", lang)}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(decodedJWT?.signature, "signature")
                      }
                    >
                      {copied === "signature" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {t("jwtDecoder.signatureTitle", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto break-all">
                    <code>{decodedJWT?.signature}</code>
                  </pre>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{t("jwtDecoder.note", lang)}</strong>{" "}
                      {t("jwtDecoder.noteDescription", lang)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("jwtDecoder.faqSectionTitle", lang)}
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

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More Developer Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <LinkIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">URL Encoder</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Encode and decode URLs with our free online URL encoder/decoder
                tool.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/url-encoder`}>Try URL Encoder</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">JSON Formatter</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Format, validate, and beautify JSON data with syntax
                highlighting.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/json-formatter`}>
                  Try JSON Formatter
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Key className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Hash Generator</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate MD5, SHA-1, SHA-256 and other hash values instantly.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${lang}/tool/hash-generator`}>
                  Try Hash Generator
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
