"use client";

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

export default function SQLFormatterClient({ lang }: Props) {
  const [sqlInput, setSqlInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const formatSQL = (sql: string): { formatted: string; errors: string[] } => {
    if (!sql.trim()) {
      return { formatted: "", errors: [] };
    }

    const errors: string[] = [];

    // Basic SQL validation and formatting
    const formatted = sql
      // Add line breaks after keywords
      .replace(
        /\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|UNION|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/gi,
        "$1\n",
      )
      // Add line breaks after commas in SELECT statements
      .replace(/,(?!\s*SELECT)/g, ",\n")
      // Add line breaks before AND/OR
      .replace(/\b(AND|OR)\b/gi, "\n$1")
      // Indent subqueries
      .split("\n")
      .map((line, index, array) => {
        const trimmed = line.trim();
        if (!trimmed) return "";

        // Basic indentation logic
        let indent = 0;
        const previousLine = array[index - 1]?.trim() || "";

        if (previousLine.match(/\b(SELECT|FROM|WHERE|GROUP BY|HAVING)\b/i)) {
          indent = 2;
        } else if (
          previousLine.match(/\b(JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)\b/i)
        ) {
          indent = 4;
        }

        return " ".repeat(indent) + trimmed;
      })
      .join("\n")
      // Clean up extra spaces
      .replace(/\s+/g, " ")
      .replace(/\n\s+/g, "\n")
      .trim();

    // Basic syntax checks
    const openParens = (sql.match(/\(/g) || []).length;
    const closeParens = (sql.match(/\)/g) || []).length;
    const quotes = (sql.match(/'/g) || []).length;

    if (openParens !== closeParens) {
      errors.push("Mismatched parentheses");
    }

    if (quotes % 2 !== 0) {
      errors.push("Unclosed string quote");
    }

    // Check for common SQL keywords
    const sqlKeywords =
      /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i;
    if (!sqlKeywords.test(sql)) {
      errors.push("No valid SQL keywords found");
    }

    return { formatted, errors };
  };

  const handleFormat = () => {
    const result = formatSQL(sqlInput);
    setFormattedOutput(result.formatted);
    setErrors(result.errors);
    setIsValid(result.errors.length === 0);
  };

  const handleClear = () => {
    setSqlInput("");
    setFormattedOutput("");
    setErrors([]);
    setIsValid(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_error) {
      console.error("Failed to copy text: ", _error);
    }
  };

  const exampleQueries = [
    {
      name: t("sqlFormatter.exampleSimpleSelectName", lang),
      sql: "SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC",
    },
    {
      name: t("sqlFormatter.exampleJoinQueryName", lang),
      sql: "SELECT u.name, p.title FROM users u INNER JOIN posts p ON u.id = p.user_id WHERE u.status = 'active'",
    },
    {
      name: t("sqlFormatter.exampleComplexQueryName", lang),
      sql: "SELECT c.name, COUNT(o.id) as order_count, AVG(o.total) as avg_total FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.created_at >= '2024-01-01' GROUP BY c.id, c.name HAVING COUNT(o.id) > 5 ORDER BY order_count DESC",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {t("sqlFormatter.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("sqlFormatter.description", lang)}
          </p>
        </div>

        <Tabs defaultValue="formatter" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="formatter">
              {t("sqlFormatter.formatterTab", lang)}
            </TabsTrigger>
            <TabsTrigger value="examples">
              {t("sqlFormatter.examplesTab", lang)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formatter" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("sqlFormatter.sqlInputTitle", lang)}</CardTitle>
                  <CardDescription>
                    {t("sqlFormatter.sqlInputDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder={t("sqlFormatter.inputPlaceholder", lang)}
                    value={sqlInput}
                    onChange={(e) => setSqlInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleFormat} className="flex-1">
                      {t("sqlFormatter.formatButton", lang)}
                    </Button>
                    <Button onClick={handleClear} variant="outline">
                      {t("sqlFormatter.clearButton", lang)}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("sqlFormatter.formattedOutputTitle", lang)}
                  </CardTitle>
                  <CardDescription>
                    {t("sqlFormatter.formattedOutputDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isValid === true && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm">
                        {t("sqlFormatter.sqlSyntaxValid", lang)}
                      </p>
                    </div>
                  )}
                  {isValid === false && errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 text-sm font-medium mb-2">
                        {t("sqlFormatter.issuesFound", lang)}
                      </p>
                      <ul className="text-red-700 text-sm space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Textarea
                    value={formattedOutput}
                    readOnly
                    placeholder={t("sqlFormatter.formattedPlaceholder", lang)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  {formattedOutput && (
                    <Button
                      onClick={() => copyToClipboard(formattedOutput)}
                      variant="outline"
                      className="w-full"
                    >
                      {t("sqlFormatter.copyFormattedButton", lang)}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("sqlFormatter.exampleQueriesTitle", lang)}
                </CardTitle>
                <CardDescription>
                  {t("sqlFormatter.exampleQueriesDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exampleQueries.map((example, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{example.name}</h3>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto font-mono">
                        {example.sql}
                      </pre>
                      <Button
                        onClick={() => setSqlInput(example.sql)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        {t("sqlFormatter.useThisQueryButton", lang)}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
