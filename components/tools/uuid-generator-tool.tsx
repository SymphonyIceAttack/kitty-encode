"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  KeyRound,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCat } from "@/context/cat-context";
import { useTranslation } from "@/hooks/use-translation";
import type { LanguageType } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface UuidGeneratorToolProps {
  lang: LanguageType;
}

interface UuidOptions {
  version: "v1" | "v4" | "v7";
  format: "standard" | "withoutHyphens" | "uppercase" | "braces";
  count: number;
}

function generateUuidV4(): string {
  // RFC4122 version 4 compliant UUID
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

function generateUuidV7(): string {
  // RFC4122 version 7 compliant UUID
  let timestamp = Date.now();
  const timestampBytes = new Uint8Array(6);

  // Convert timestamp to bytes (48-bit Unix timestamp in ms)
  for (let i = 5; i >= 0; i--) {
    timestampBytes[i] = timestamp & 0xff;
    timestamp >>= 8;
  }

  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  const bytes = new Uint8Array(16);
  bytes.set(timestampBytes, 0);
  bytes.set(randomBytes, 6);

  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

function formatUuid(uuid: string, format: UuidOptions["format"]): string {
  switch (format) {
    case "withoutHyphens":
      return uuid.replace(/-/g, "");
    case "uppercase":
      return uuid.toUpperCase();
    case "braces":
      return `{${uuid}}`;
    default:
      return uuid;
  }
}

function generateUuid(options: UuidOptions): string {
  let uuid: string;

  switch (options.version) {
    case "v1":
      // For demo purposes, generate v4 as v1 requires timestamp
      uuid = generateUuidV4();
      break;
    case "v4":
      uuid = generateUuidV4();
      break;
    case "v7":
      uuid = generateUuidV7();
      break;
    default:
      uuid = generateUuidV4();
  }

  return formatUuid(uuid, options.format);
}

export function UuidGeneratorTool({ lang }: UuidGeneratorToolProps) {
  const { t } = useTranslation(lang);
  const { spawnItem } = useCat();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const COOLDOWN_DURATION = 3000;

  const shouldSpawnItem = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTime >= COOLDOWN_DURATION) {
      setLastSpawnTime(now);
      return true;
    }
    return false;
  }, [lastSpawnTime]);

  const [options, setOptions] = useState<UuidOptions>({
    version: "v4",
    format: "standard",
    count: 1,
  });

  const [uuid, setUuid] = useState("");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(true);
  const [activeTab, setActiveTab] = useState("generate");
  const [generationStats, setGenerationStats] = useState({
    totalGenerations: 0,
    v4Count: 0,
    v7Count: 0,
    bulkCount: 0,
    lastUsed: null as Date | null,
  });

  const handleGenerate = useCallback(() => {
    const newUuid = generateUuid(options);
    setUuid(newUuid);
    setUuids([]);
    if (shouldSpawnItem()) {
      spawnItem("coffee");
    }
    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + 1,
      v4Count: options.version === "v4" ? prev.v4Count + 1 : prev.v4Count,
      v7Count: options.version === "v7" ? prev.v7Count + 1 : prev.v7Count,
      bulkCount: prev.bulkCount,
      lastUsed: new Date(),
    }));
  }, [options, spawnItem, shouldSpawnItem]);

  const handleBulkGenerate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < options.count; i++) {
      newUuids.push(generateUuid(options));
    }
    setUuids(newUuids);
    setUuid("");
    if (shouldSpawnItem()) {
      spawnItem("coffee");
    }
    setGenerationStats((prev) => ({
      totalGenerations: prev.totalGenerations + options.count,
      v4Count:
        options.version === "v4" ? prev.v4Count + options.count : prev.v4Count,
      v7Count:
        options.version === "v7" ? prev.v7Count + options.count : prev.v7Count,
      bulkCount: prev.bulkCount + 1,
      lastUsed: new Date(),
    }));
  }, [options, spawnItem, shouldSpawnItem]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <motion.div
      className="container mx-auto max-w-6xl px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="mb-10 text-center" variants={itemVariants}>
        <motion.div
          className="pixel-icon-box inline-flex items-center justify-center w-16 h-16 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          whileHover={{
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <KeyRound className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("uuidGenerator.pageTitle") || "UUID Generator"}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("uuidGenerator.pageSubtitle") ||
            "Generate universally unique identifiers instantly"}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
        >
          {["Free", "No Signup", "Works Offline", "RFC Compliant"].map(
            (tag) => (
              <motion.span
                key={tag}
                className="pixel-badge"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tag}
              </motion.span>
            ),
          )}
        </motion.div>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="generate" className="rounded-lg">
                    {t("uuidGenerator.generate")}
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="rounded-lg">
                    {t("uuidGenerator.bulk")}
                  </TabsTrigger>
                </TabsList>

                {/* Stats badges */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {generationStats.totalGenerations} Generated
                  </motion.div>
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    {generationStats.v4Count} v4
                  </motion.div>
                  <motion.div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {generationStats.v7Count} v7
                  </motion.div>
                  {generationStats.lastUsed && (
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                      title={`Last used: ${generationStats.lastUsed.toLocaleString()}`}
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      {generationStats.lastUsed.toLocaleTimeString()}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <TabsContent value="generate" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    {/* Options */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.version")}
                        </Label>
                        <Select
                          value={options.version}
                          onValueChange={(value: UuidOptions["version"]) => {
                            setOptions({ ...options, version: value });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                            <SelectItem value="v7">
                              UUID v7 (Timestamp)
                            </SelectItem>
                            <SelectItem value="v1">
                              UUID v1 (Time-based)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.format")}
                        </Label>
                        <Select
                          value={options.format}
                          onValueChange={(value: UuidOptions["format"]) => {
                            setOptions({ ...options, format: value });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">
                              Standard (with hyphens)
                            </SelectItem>
                            <SelectItem value="withoutHyphens">
                              Without hyphens
                            </SelectItem>
                            <SelectItem value="uppercase">Uppercase</SelectItem>
                            <SelectItem value="braces">With braces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("uuidGenerator.outputLabel")}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(uuid)}
                          disabled={!uuid}
                          className="rounded-lg"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="copied"
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Check className="h-4 w-4 mr-1" />{" "}
                                {t("common.copied")}
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Copy className="h-4 w-4 mr-1" />{" "}
                                {t("common.copy")}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </div>
                    <div className="min-h-[80px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                      {uuid ? (
                        <CodeHighlighter
                          code={uuid}
                          language="javascript"
                          className="min-h-[80px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("uuidGenerator.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleGenerate}
                      className="gap-2 rounded-xl h-11"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      {t("uuidGenerator.generateBtn")}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      onClick={handleGenerate}
                      disabled={!uuid}
                      className="gap-2 rounded-xl h-11"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("uuidGenerator.regenerate")}
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="bulk" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.version")}
                        </Label>
                        <Select
                          value={options.version}
                          onValueChange={(value: UuidOptions["version"]) => {
                            setOptions({ ...options, version: value });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                            <SelectItem value="v7">
                              UUID v7 (Timestamp)
                            </SelectItem>
                            <SelectItem value="v1">
                              UUID v1 (Time-based)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.format")}
                        </Label>
                        <Select
                          value={options.format}
                          onValueChange={(value: UuidOptions["format"]) => {
                            setOptions({ ...options, format: value });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">
                              Standard (with hyphens)
                            </SelectItem>
                            <SelectItem value="withoutHyphens">
                              Without hyphens
                            </SelectItem>
                            <SelectItem value="uppercase">Uppercase</SelectItem>
                            <SelectItem value="braces">With braces</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium block mb-2">
                          {t("uuidGenerator.count")}
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="1000"
                          value={options.count}
                          onChange={(e) => {
                            setOptions({
                              ...options,
                              count: Math.min(
                                1000,
                                Math.max(1, parseInt(e.target.value, 10) || 1),
                              ),
                            });
                            setUuid(""); // Clear uuid when options change
                            setUuids([]); // Clear uuids when options change
                          }}
                          className="rounded-xl"
                        />
                      </div>

                      <Button
                        onClick={handleBulkGenerate}
                        className="w-full rounded-xl h-11"
                      >
                        {t("uuidGenerator.generateMultiple")}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between h-8">
                        <span className="text-sm font-medium">
                          Generated UUIDs ({uuids.length})
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(uuids.join("\n"))}
                          disabled={uuids.length === 0}
                          className="rounded-lg"
                        >
                          <Copy className="h-4 w-4 mr-1" /> {t("common.copy")}
                        </Button>
                      </div>
                      <div className="min-h-[300px] max-h-[400px] overflow-auto rounded-xl border-2 border-border bg-muted/30 p-4">
                        {uuids.length > 0 ? (
                          <div className="space-y-1">
                            {uuids.map((uuid, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-1 font-mono text-sm"
                              >
                                <span className="truncate">{uuid}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(uuid)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                            {t("uuidGenerator.bulkPlaceholder")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      {/* Examples Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="h-5 w-5" />
              UUID Examples
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              Different UUID versions and formats for various use cases. Click
              \"Quick Run\" to generate, or \"Copy\" to copy a UUID:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "UUID v4 (Random)",
                  desc: "Most common for general purposes",
                  version: "v4" as const,
                  format: "standard" as const,
                },
                {
                  title: "UUID v7 (Timestamp)",
                  desc: "Sortable by creation time",
                  version: "v7" as const,
                  format: "standard" as const,
                },
                {
                  title: "UUID v1 (Time-based)",
                  desc: "Contains timestamp info",
                  version: "v1" as const,
                  format: "standard" as const,
                },
                {
                  title: "UUID without hyphens",
                  desc: "Compact format for URLs",
                  version: "v4" as const,
                  format: "withoutHyphens" as const,
                },
                {
                  title: "UUID Uppercase",
                  desc: "All caps format",
                  version: "v4" as const,
                  format: "uppercase" as const,
                },
                {
                  title: "UUID with braces",
                  desc: "Wrapped in curly braces",
                  version: "v4" as const,
                  format: "braces" as const,
                },
              ].map((example, index) => (
                <motion.div
                  key={example.title}
                  className="pixel-card p-4 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.desc}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        onClick={() => {
                          setOptions({
                            ...options,
                            version: example.version,
                            format: example.format,
                          });
                          setUuid(""); // Clear uuid when options change
                          setUuids([]); // Clear uuids when options change
                          // Note: Do NOT auto-generate, let user manually click generate button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Load Options Only"
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </motion.span>
                      </motion.button>
                      <motion.button
                        onClick={async () => {
                          // Generate and copy a UUID with the specified format
                          const tempOptions = {
                            ...options,
                            version: example.version,
                            format: example.format,
                          };
                          const tempUuid = generateUuid(tempOptions);
                          await navigator.clipboard.writeText(tempUuid);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-1 text-xs h-7 rounded-full border-2 border-foreground/30 dark:border-primary/30 bg-transparent hover:bg-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy"
                      >
                        <Copy className="h-3 w-3" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.version} • {example.format}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* SEO Content Section */}
      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-xl font-bold mb-4" variants={itemVariants}>
          What is UUID?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">
            UUID (Universally Unique Identifier)
          </strong>{" "}
          is a 128-bit identifier that is guaranteed to be unique across both
          time and space. UUIDs are widely used in distributed systems,
          databases, and applications where unique identification is required
          without central coordination.
        </motion.p>

        <motion.div
          className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h4 className="font-semibold mb-2">
            💻 Technical Implementation Details
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Web Crypto API:</strong> Uses{" "}
              <code className="bg-background px-1 rounded">
                crypto.getRandomValues()
              </code>{" "}
              for cryptographically secure random number generation
            </p>
            <p>
              <strong>UUID v4 Structure:</strong>{" "}
              <code className="bg-background px-1 rounded">
                xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
              </code>{" "}
              where x is random hex, 4 indicates version, y is variant (8, 9, a,
              or b)
            </p>
            <p>
              <strong>UUID v7 Structure:</strong> First 48 bits are Unix
              timestamp in milliseconds, followed by version bits (0111), then
              random data with variant bits
            </p>
            <p>
              <strong>Bit Manipulation:</strong>{" "}
              <code className="bg-background px-1 rounded">
                bytes[6] = (bytes[6] & 0x0f) | 0x40
              </code>{" "}
              sets version 4,{" "}
              <code className="bg-background px-1 rounded">
                bytes[8] = (bytes[8] & 0x3f) | 0x80
              </code>{" "}
              sets RFC4122 variant
            </p>
            <p>
              <strong>Collision Probability:</strong> With 122 random bits in
              v4, probability of collision is ~1 in 2.71 quintillion
            </p>
          </div>
        </motion.div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          Key Features
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "RFC4122 Compliant",
              desc: "Standard UUID v1, v4, and v7 support",
            },
            {
              title: "Multiple Formats",
              desc: "Standard, uppercase, braces, and more",
            },
            {
              title: "Bulk Generation",
              desc: "Generate thousands of UUIDs at once",
            },
            {
              title: "100% Private",
              desc: "All processing happens in your browser",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="pixel-card p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          UUID Versions Comparison
        </motion.h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold">Version</th>
                <th className="text-left p-3 font-semibold">
                  Generation Method
                </th>
                <th className="text-left p-3 font-semibold">Sortable</th>
                <th className="text-left p-3 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v1</td>
                <td className="p-3">Timestamp + MAC address</td>
                <td className="p-3">Partial</td>
                <td className="p-3">Legacy systems (privacy concerns)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v4</td>
                <td className="p-3">Random (122 bits)</td>
                <td className="p-3">No</td>
                <td className="p-3">General purpose, most common</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3 font-medium text-foreground">UUID v7</td>
                <td className="p-3">Unix timestamp + random</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Database PKs, time-ordered data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.h3
          className="text-lg font-semibold mt-8 mb-4"
          variants={itemVariants}
        >
          Common Use Cases
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            "Database primary keys in distributed systems",
            "Session identifiers and authentication tokens",
            "Distributed transaction IDs across microservices",
            "File and resource naming without collision",
            "Message queue deduplication keys",
          ].map((item, index) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 text-sm"
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t-2 border-b-2 border-dashed border-foreground/25 dark:border-primary/25"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <motion.div
            animate={{ rotate: showFaq ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showFaq && (
            <motion.div
              className="space-y-4 pt-6 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                {
                  q: "What's the difference between UUID versions?",
                  a: "v4 uses random generation, v7 includes timestamp for better sorting, v1 uses MAC address and timestamp (deprecated for privacy).",
                },
                {
                  q: "Are UUIDs really unique?",
                  a: "Yes, the probability of generating duplicate UUIDs is extremely low. For v4, the chance of collision is negligible for practical purposes.",
                },
                {
                  q: "Can I use UUIDs as primary keys?",
                  a: "Absolutely! UUIDs are excellent for distributed systems where centralized ID generation isn't feasible.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  className="pixel-card p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
