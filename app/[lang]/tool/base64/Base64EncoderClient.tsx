"use client";

import { CheckCircle, Copy } from "lucide-react";
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

export default function Base64EncoderClient({ lang }: Props) {
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const encodeBase64 = (text: string): string => {
    try {
      return btoa(text);
    } catch (_error) {
      return t("base64.errorEncode", lang);
    }
  };

  const decodeBase64 = (text: string): string => {
    try {
      return atob(text);
    } catch (_error) {
      return t("base64.errorDecode", lang);
    }
  };

  const handleEncode = () => {
    const result = encodeBase64(encodeInput);
    setEncodeOutput(result);
  };

  const handleDecode = () => {
    const result = decodeBase64(decodeInput);
    setDecodeOutput(result);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (_error) {
      console.error("Failed to copy text: ", _error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t("base64.title", lang)}</h1>
          <p className="text-xl text-muted-foreground">
            {t("base64.description", lang)}
          </p>
        </div>

        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">
              {t("base64.encodeTab", lang)}
            </TabsTrigger>
            <TabsTrigger value="decode">
              {t("base64.decodeTab", lang)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("base64.encodeTitle", lang)}</CardTitle>
                <CardDescription>
                  {t("base64.encodeDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="encode-input" className="text-sm font-medium">
                    {t("base64.inputText", lang)}
                  </label>
                  <Textarea
                    id="encode-input"
                    placeholder={t("base64.placeholderEncode", lang)}
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleEncode} className="flex-1">
                    {t("common.buttons.encodeToBase64", lang)}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEncodeInput("");
                      setEncodeOutput("");
                    }}
                  >
                    {t("common.buttons.clear", lang)}
                  </Button>
                </div>

                {encodeOutput && (
                  <div>
                    <label
                      htmlFor="encode-output"
                      className="text-sm font-medium"
                    >
                      {t("base64.base64Output", lang)}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="encode-output"
                        value={encodeOutput}
                        readOnly
                        className="min-h-[120px] pr-10"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(encodeOutput, "encode")}
                      >
                        {copied === "encode" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("base64.decodeTitle", lang)}</CardTitle>
                <CardDescription>
                  {t("base64.decodeDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="decode-input" className="text-sm font-medium">
                    {t("base64.base64Input", lang)}
                  </label>
                  <Textarea
                    id="decode-input"
                    placeholder={t("base64.placeholderDecode", lang)}
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleDecode} className="flex-1">
                    {t("common.buttons.decodeToText", lang)}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDecodeInput("");
                      setDecodeOutput("");
                    }}
                  >
                    {t("common.buttons.clear", lang)}
                  </Button>
                </div>

                {decodeOutput && (
                  <div>
                    <label
                      htmlFor="decode-output"
                      className="text-sm font-medium"
                    >
                      {t("base64.decodedText", lang)}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="decode-output"
                        value={decodeOutput}
                        readOnly
                        className="min-h-[120px] pr-10"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(decodeOutput, "decode")}
                      >
                        {copied === "decode" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
