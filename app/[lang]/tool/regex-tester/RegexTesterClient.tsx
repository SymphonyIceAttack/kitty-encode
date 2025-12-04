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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface Props {
  lang: LanguageType;
}

interface Match {
  match: string;
  index: number;
  groups?: { [key: string]: string };
}

export default function RegexTesterClient({ lang }: Props) {
  const [pattern, setPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [flags, setFlags] = useState({
    g: false, // global
    i: false, // case insensitive
    m: false, // multiline
    s: false, // dot all
    u: false, // unicode
    y: false, // sticky
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replacedText, setReplacedText] = useState("");

  const runTest = () => {
    if (!pattern.trim()) {
      setError(t("regexTester.errorEmptyPattern", lang));
      setMatches([]);
      setError(null);
      return;
    }

    try {
      setError(null);

      const flagString = Object.entries(flags)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join("");

      const regex = new RegExp(pattern, flagString);
      const foundMatches: Match[] = [];

      if (flags.g) {
        // Global search
        let match: RegExpExecArray | null;
        while (true) {
          match = regex.exec(testText);
          if (match === null) break;

          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });

          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        // Single match
        const match = regex.exec(testText);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      }

      setMatches(foundMatches);
    } catch (_err) {
      setError(t("regexTester.errorInvalidPattern", lang));
      setMatches([]);
    }
  };

  const handleReplace = () => {
    if (!pattern.trim()) {
      setError(t("regexTester.errorEmptyReplacement", lang));
      return;
    }

    try {
      setError(null);

      const flagString = Object.entries(flags)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join("");

      const regex = new RegExp(pattern, flagString);
      setReplacedText(testText.replace(regex, "[REPLACED]"));
    } catch (_err) {
      setError(t("regexTester.errorInvalidPattern", lang));
    }
  };

  const clearAll = () => {
    setPattern("");
    setTestText("");
    setMatches([]);
    setError(null);
    setReplacedText("");
    setFlags({
      g: false,
      i: false,
      m: false,
      s: false,
      u: false,
      y: false,
    });
  };

  const examplePatterns = [
    {
      name: t("regexTester.emailExampleName", lang),
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      description: t("regexTester.emailExampleDescription", lang),
    },
    {
      name: t("regexTester.urlExampleName", lang),
      pattern:
        "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
      description: t("regexTester.urlExampleDescription", lang),
    },
    {
      name: t("regexTester.phoneExampleName", lang),
      pattern: "\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})",
      description: t("regexTester.phoneExampleDescription", lang),
    },
    {
      name: t("regexTester.ipv4ExampleName", lang),
      pattern:
        "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      description: t("regexTester.ipv4ExampleDescription", lang),
    },
    {
      name: t("regexTester.dateExampleName", lang),
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      description: t("regexTester.dateExampleDescription", lang),
    },
  ];

  const loadExample = (example: (typeof examplePatterns)[0]) => {
    setPattern(example.pattern);
    setTestText(
      "sample@example.com\nhttps://www.example.com\n123-456-7890\n192.168.1.1\n2024-01-15",
    );
  };

  const highlightMatches = (text: string, matches: Match[]) => {
    if (matches.length === 0) return text;

    let result = "";
    let lastIndex = 0;

    matches.forEach((match, _index) => {
      // Add text before the match
      result += text.slice(lastIndex, match.index);
      // Add highlighted match
      result += `<mark class="bg-yellow-200">${match.match}</mark>`;
      lastIndex = match.index + match.match.length;
    });

    // Add remaining text
    result += text.slice(lastIndex);

    return result;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {t("regexTester.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("regexTester.description", lang)}
          </p>
        </div>

        <Tabs defaultValue="tester" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tester">
              {t("regexTester.regexTesterTab", lang)}
            </TabsTrigger>
            <TabsTrigger value="examples">
              {t("regexTester.examplesTab", lang)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tester" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("regexTester.regexTitle", lang)}</CardTitle>
                <CardDescription>
                  {t("regexTester.regexDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pattern">
                    {t("regexTester.patternLabel", lang)}
                  </Label>
                  <Input
                    id="pattern"
                    placeholder={t("regexTester.patternPlaceholder", lang)}
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label>{t("regexTester.flagsLabel", lang)}</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-g"
                        checked={flags.g}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, g: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-g">
                        {t("regexTester.globalFlag", lang)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-i"
                        checked={flags.i}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, i: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-i">
                        {t("regexTester.caseInsensitiveFlag", lang)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-m"
                        checked={flags.m}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, m: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-m">
                        {t("regexTester.multilineFlag", lang)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-s"
                        checked={flags.s}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, s: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-s">
                        {t("regexTester.dotAllFlag", lang)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-u"
                        checked={flags.u}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, u: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-u">
                        {t("regexTester.unicodeFlag", lang)}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flag-y"
                        checked={flags.y}
                        onCheckedChange={(checked) =>
                          setFlags({ ...flags, y: checked as boolean })
                        }
                      />
                      <Label htmlFor="flag-y">
                        {t("regexTester.stickyFlag", lang)}
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="test-text">
                    {t("regexTester.testTextLabel", lang)}
                  </Label>
                  <Textarea
                    id="test-text"
                    placeholder={t("regexTester.testTextPlaceholder", lang)}
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    className="min-h-[150px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={runTest} className="flex-1">
                    {t("regexTester.testButton", lang)}
                  </Button>
                  <Button onClick={handleReplace} variant="outline">
                    {t("regexTester.replaceButton", lang)}
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    {t("regexTester.clearButton", lang)}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {error && (
              <Card className="border-red-200">
                <CardContent className="pt-6">
                  <p className="text-red-600 text-sm">
                    {t("regexTester.patternError", lang)} {error}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("regexTester.matchesTitle", lang)} ({matches.length})
                  </CardTitle>
                  <CardDescription>
                    {t("regexTester.matchesDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {matches.length > 0 ? (
                    <div className="space-y-2">
                      {matches.map((match, index) => (
                        <div key={index} className="bg-muted p-3 rounded">
                          <div className="font-mono text-sm">
                            <strong>{t("regexTester.matchLabel", lang)}</strong>{" "}
                            "{match.match}"
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t("regexTester.positionLabel", lang)} {match.index}
                          </div>
                          {match.groups &&
                            Object.keys(match.groups).length > 0 && (
                              <div className="text-xs text-muted-foreground mt-1">
                                <strong>
                                  {t("regexTester.groupsLabel", lang)}
                                </strong>{" "}
                                {JSON.stringify(match.groups)}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {t("regexTester.noMatchesMessage", lang)}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("regexTester.highlightedResultsTitle", lang)}
                  </CardTitle>
                  <CardDescription>
                    {t("regexTester.highlightedResultsDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="bg-muted p-3 rounded font-mono text-sm whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatches(testText, matches),
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {replacedText && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("regexTester.replaceResultTitle", lang)}
                  </CardTitle>
                  <CardDescription>
                    {t("regexTester.replaceResultDescription", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={replacedText}
                    readOnly
                    className="font-mono text-sm min-h-[100px]"
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("regexTester.examplePatternsTitle", lang)}
                </CardTitle>
                <CardDescription>
                  {t("regexTester.examplePatternsDescription", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examplePatterns.map((example, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{example.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {example.description}
                      </p>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto font-mono">
                        {example.pattern}
                      </pre>
                      <Button
                        onClick={() => loadExample(example)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        {t("regexTester.useThisPatternButton", lang)}
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
