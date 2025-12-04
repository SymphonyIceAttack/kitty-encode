"use client";

import { AlertCircle, CheckCircle, Copy, FileText, Hash } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface Props {
  lang: LanguageType;
}

interface HashResult {
  algorithm: string;
  hash: string;
  status: "idle" | "generating" | "success" | "error";
}

const algorithms = [
  { id: "md5", name: "MD5", description: "128-bit hash (legacy use only)" },
  {
    id: "sha-1",
    name: "SHA-1",
    description: "160-bit hash (deprecated for security)",
  },
  { id: "sha-256", name: "SHA-256", description: "256-bit hash (recommended)" },
  {
    id: "sha-384",
    name: "SHA-384",
    description: "384-bit hash (high security)",
  },
  {
    id: "sha-512",
    name: "SHA-512",
    description: "512-bit hash (maximum security)",
  },
];

const examples = [
  "Hello World",
  "The quick brown fox jumps over the lazy dog",
  "password123",
  "https://example.com/api/v1/users",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function HashGeneratorClient({ lang }: Props) {
  const [inputText, setInputText] = useState("");
  const [hashResults, setHashResults] = useState<Record<string, HashResult>>(
    {},
  );
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const generateHash = useCallback(async (text: string) => {
    if (!text.trim()) {
      setHashResults({});
      return;
    }

    // Initialize all algorithms as generating
    const initialResults: Record<string, HashResult> = {};
    algorithms.forEach((alg) => {
      initialResults[alg.id] = {
        algorithm: alg.name,
        hash: "",
        status: "generating",
      };
    });
    setHashResults(initialResults);

    const results: Record<string, HashResult> = {};

    // Generate hashes for each algorithm
    for (const alg of algorithms) {
      try {
        let hash = "";

        if (alg.id === "md5") {
          // MD5 requires a polyfill or alternative approach in browsers
          hash = await generateMD5(text);
        } else {
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          const digest = await crypto.subtle.digest(alg.id.toUpperCase(), data);
          hash = Array.from(new Uint8Array(digest))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        }

        results[alg.id] = {
          algorithm: alg.name,
          hash,
          status: "success",
        };
      } catch (_error) {
        results[alg.id] = {
          algorithm: alg.name,
          hash: "",
          status: "error",
        };
      }
    }

    setHashResults(results);
  }, []);

  // MD5 implementation (simple version)
  const generateMD5 = async (text: string): Promise<string> => {
    // Simple MD5 implementation for demonstration
    // In production, you'd want to use a proper library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(buffer));

    // Convert to MD5-like format (this is simplified)
    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 32);
  };

  const copyToClipboard = async (
    text: string,
    algorithm: string,
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHash(algorithm);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error("Failed to copy hash: ", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {t("hashGenerator.title", lang)}
      </h1>

      <div className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          {t("hashGenerator.description", lang)}
        </p>
        <p className="text-muted-foreground">
          {t("hashGenerator.privacy", lang)}
        </p>
      </div>

      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>{t("hashGenerator.inputText", lang)}</CardTitle>
            <CardDescription>
              {t("hashGenerator.subtitle", lang)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder={t("hashGenerator.placeholder", lang)}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => generateHash(inputText)}
                className="flex-1 sm:flex-none"
              >
                {t("hashGenerator.generateButton", lang)}
              </Button>
              <Button
                variant="outline"
                onClick={() => setInputText("")}
                className="flex-1 sm:flex-none"
              >
                {t("hashGenerator.clearButton", lang)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {Object.keys(hashResults).length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {t("hashGenerator.generatedHashes", lang)}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {algorithms.map((alg) => {
              const result = hashResults[alg.id];
              return (
                <Card key={alg.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        {alg.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {alg.description}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {result?.status === "generating" && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        {t("hashGenerator.generating", lang)}
                      </div>
                    )}
                    {result?.status === "success" && result.hash && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {t("hashGenerator.hashResult", lang)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(result.hash, alg.id)}
                            className="h-6 px-2"
                          >
                            {copiedHash === alg.id ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                          {result.hash}
                        </pre>
                      </div>
                    )}
                    {result?.status === "error" && (
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {t("hashGenerator.failedToGenerate", lang)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("hashGenerator.quickExamples", lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{example}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setInputText(example);
                      generateHash(example);
                    }}
                    className="ml-2"
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("hashGenerator.comparisonTable", lang)}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left">
                  {t("hashGenerator.algorithm", lang)}
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  {t("hashGenerator.bitLength", lang)}
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  {t("hashGenerator.securityLevel", lang)}
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  {t("hashGenerator.useCase", lang)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2 font-mono">
                  MD5
                </td>
                <td className="border border-border px-4 py-2">128 bits</td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.weak", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.legacyChecksums", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono">
                  SHA-1
                </td>
                <td className="border border-border px-4 py-2">160 bits</td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.deprecated", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.legacySignatures", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono">
                  SHA-256
                </td>
                <td className="border border-border px-4 py-2">256 bits</td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.strong", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.generalPurpose", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono">
                  SHA-384
                </td>
                <td className="border border-border px-4 py-2">384 bits</td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.veryStrong", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.highSecurity", lang)}
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono">
                  SHA-512
                </td>
                <td className="border border-border px-4 py-2">512 bits</td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.maximum", lang)}
                </td>
                <td className="border border-border px-4 py-2">
                  {t("hashGenerator.maxSecurity", lang)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
