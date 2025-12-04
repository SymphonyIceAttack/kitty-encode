"use client";

import { AlertCircle, CheckCircle, Code, Copy, FileText } from "lucide-react";
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

interface ValidationResult {
  isValid: boolean;
  error?: string;
  formatted?: string;
  minified?: string;
}

export default function JSONFormatterClient({ lang }: Props) {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [minifiedOutput, setMinifiedOutput] = useState("");
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const validateAndFormatJSON = (input: string): ValidationResult => {
    if (!input.trim()) {
      return { isValid: true, formatted: "", minified: "" };
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      const minified = JSON.stringify(parsed);

      return {
        isValid: true,
        formatted,
        minified,
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : "Invalid JSON",
      };
    }
  };

  const handleFormat = () => {
    const result = validateAndFormatJSON(jsonInput);
    setValidationResult(result);

    if (result.isValid && result.formatted) {
      setFormattedOutput(result.formatted);
      setMinifiedOutput(result.minified || "");
    } else {
      setFormattedOutput("");
      setMinifiedOutput("");
    }
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

  const exampleJSON = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "isActive": true,
  "hobbies": ["reading", "swimming", "coding"],
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {t("jsonFormatter.title", lang)}
      </h1>

      <div className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          {t("jsonFormatter.description", lang)}
        </p>
        <p className="text-muted-foreground">
          {t("jsonFormatter.subtitle", lang)}
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("jsonFormatter.inputText", lang)}</CardTitle>
            <CardDescription>
              {t("jsonFormatter.inputPlaceholder", lang)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder={t("jsonFormatter.inputPlaceholder", lang)}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleFormat} className="flex-1 sm:flex-none">
                {t("jsonFormatter.formatButton", lang)}
              </Button>
              <Button
                variant="outline"
                onClick={() => setJsonInput(exampleJSON)}
                className="flex-1 sm:flex-none"
              >
                {t("jsonFormatter.loadExampleButton", lang)}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setJsonInput("");
                  setFormattedOutput("");
                  setMinifiedOutput("");
                  setValidationResult(null);
                }}
                className="flex-1 sm:flex-none"
              >
                {t("jsonFormatter.clearButton", lang)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {validationResult && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {t("jsonFormatter.validJson", lang)}
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    {t("jsonFormatter.invalidJson", lang)}
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {validationResult.isValid ? (
                <p className="text-green-600">
                  {t("jsonFormatter.validMessage", lang)}
                </p>
              ) : (
                <p className="text-red-600">{validationResult.error}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {formattedOutput && (
        <div className="mb-8">
          <Tabs defaultValue="formatted" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="formatted"
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                {t("jsonFormatter.formattedTab", lang)}
              </TabsTrigger>
              <TabsTrigger value="minified" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t("jsonFormatter.minifiedTab", lang)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="formatted" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("jsonFormatter.formattedTitle", lang)}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(formattedOutput, "formatted")
                      }
                    >
                      {copied === "formatted" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {t("jsonFormatter.formattedDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{formattedOutput}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="minified" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {t("jsonFormatter.minifiedTitle", lang)}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(minifiedOutput, "minified")
                      }
                    >
                      {copied === "minified" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {t("jsonFormatter.minifiedDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{minifiedOutput}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("jsonFormatter.featuresTitle", lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                {t("jsonFormatter.validationFeature", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("jsonFormatter.validationDescription", lang)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                {t("jsonFormatter.formattingFeature", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("jsonFormatter.formattingDescription", lang)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                {t("jsonFormatter.minificationFeature", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("jsonFormatter.minificationDescription", lang)}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {t("jsonFormatter.bestPracticesTitle", lang)}
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("jsonFormatter.namingConventionsTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {t("jsonFormatter.namingConventionsDescription", lang)}
              </p>
              <pre className="text-xs bg-muted p-2 rounded">
                {`// Good: camelCase
{"userName": "john", "userAge": 30}

// Also good: snake_case
{"user_name": "john", "user_age": 30}`}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("jsonFormatter.validateBeforeSendingTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("jsonFormatter.validateBeforeSendingDescription", lang)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("jsonFormatter.dataTypesTitle", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {t("jsonFormatter.dataTypesDescription", lang)}
              </p>
              <pre className="text-xs bg-muted p-2 rounded">
                {`{
  "name": "John",        // string
  "age": 30,            // number
  "active": true,       // boolean
  "hobbies": [],        // array
  "address": {},        // object
  "middleName": null    // null
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
