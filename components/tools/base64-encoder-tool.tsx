"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Key,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

interface Base64EncoderToolProps {
  lang: LanguageType;
}

interface ExampleData {
  titleKey: string;
  data: string;
}

const exampleData: ExampleData[] = [
  {
    titleKey: "base64Encoder.examples.simpleText",
    data: "Hello World!",
  },
  {
    titleKey: "base64Encoder.examples.chineseText",
    data: "你好世界！这是一个中文测试。",
  },
  {
    titleKey: "base64Encoder.examples.urlData",
    data: "https://example.com/path?param=value&other=data",
  },
  {
    titleKey: "base64Encoder.examples.jsonData",
    data: '{"name":"John Doe","email":"john@example.com","active":true}',
  },
];

export function Base64EncoderTool({ lang }: Base64EncoderToolProps) {
  const { t } = useTranslation(lang);
  const { spawnItem } = useCat();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const COOLDOWN_DURATION = 3000; // 3秒冷却时间

  const shouldSpawnItem = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTime >= COOLDOWN_DURATION) {
      setLastSpawnTime(now);
      return true;
    }
    return false;
  }, [lastSpawnTime]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [showFaq, setShowFaq] = useState(true); // 默认展开FAQ
  const [conversionStats, setConversionStats] = useState({
    totalConversions: 0,
    encodeCount: 0,
    decodeCount: 0,
    lastUsed: null as Date | null,
  });

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const encodeBase64 = useCallback(
    (text: string) => {
      try {
        setError(null);
        const encoded = btoa(
          encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16)),
          ),
        );
        setOutput(encoded);
        // 成功编码时生成书本物品，只有在冷却时间结束后才生成
        if (text.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.encoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const decodeBase64 = useCallback(
    (base64: string) => {
      try {
        setError(null);
        const trimmed = base64.replace(/\s/g, "");
        const decoded = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(trimmed),
              (c: string) =>
                `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`,
            )
            .join(""),
        );
        setOutput(decoded);
        // 成功解码时生成书本物品，只有在冷却时间结束后才生成
        if (base64.trim() && shouldSpawnItem()) {
          spawnItem("book");
        }
      } catch {
        setError(t("base64Encoder.error.decoding"));
        setOutput("");
      }
    },
    [t, spawnItem, shouldSpawnItem],
  );

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    if (mode === "encode") {
      encodeBase64(input);
    } else {
      decodeBase64(input);
    }

    // 更新统计信息
    setConversionStats((prev) => ({
      totalConversions: prev.totalConversions + 1,
      encodeCount: mode === "encode" ? prev.encodeCount + 1 : prev.encodeCount,
      decodeCount: mode === "decode" ? prev.decodeCount + 1 : prev.decodeCount,
      lastUsed: new Date(),
    }));

    // Clear the needs update flag after successful conversion
    setNeedsUpdate(false);
  }, [input, mode, encodeBase64, decodeBase64]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const loadExample = useCallback(
    (data: string) => {
      setInput(data);
      setError(null);
      setActiveTab("convert");

      // Only mark as needing update if the input is different from current input and we have existing output
      if (output && data !== input) {
        setNeedsUpdate(true);
      }

      setTimeout(() => {
        toolSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
    [output, input],
  );

  const switchMode = useCallback(() => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    setOutput(input);
    setError(null);
  }, [mode, input, output]);

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
          <Key className="h-8 w-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("base64Encoder.pageTitle")}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("base64Encoder.pageSubtitle")}
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
          {["Free", "No Signup", "Works Offline", "Privacy First"].map(
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

      <motion.section
        className="mb-12"
        variants={itemVariants}
        ref={toolSectionRef}
      >
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-4 rounded-xl">
                <TabsTrigger value="convert" className="rounded-lg">
                  {t("common.convert")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={mode === "encode" ? "default" : "outline"}
                        onClick={() => setMode("encode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.encode")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant={mode === "decode" ? "default" : "outline"}
                        onClick={() => setMode("decode")}
                        className="gap-2 rounded-xl h-11"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                        {t("base64Encoder.decode")}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="outline"
                        onClick={switchMode}
                        className="gap-2 rounded-xl h-11"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t("base64Encoder.swap")}
                      </Button>
                    </motion.div>
                  </div>

                  {/* Usage Analysis Tags - 右侧 */}
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
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {conversionStats.totalConversions} Total
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {conversionStats.encodeCount} Encodes
                    </motion.div>
                    <motion.div
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {conversionStats.decodeCount} Decodes
                    </motion.div>
                    {conversionStats.lastUsed && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        title={`Last used: ${conversionStats.lastUsed.toLocaleString()}`}
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        {conversionStats.lastUsed.toLocaleTimeString()}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <label
                        htmlFor="base64-input"
                        className="text-sm font-medium"
                      >
                        {mode === "encode"
                          ? t("base64Encoder.inputLabel")
                          : t("base64Encoder.inputLabelBase64")}
                      </label>
                    </div>
                    <Textarea
                      placeholder={
                        mode === "encode"
                          ? t("base64Encoder.inputPlaceholder")
                          : t("base64Encoder.inputPlaceholderBase64")
                      }
                      className="min-h-[300px] font-mono text-sm rounded-xl"
                      value={input}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setInput(newValue);

                        // Mark as needing update if input changes and we have output
                        if (newValue !== input && output) {
                          setNeedsUpdate(true);
                        }

                        // Clear error when input changes
                        setError(null);
                      }}
                    />
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  >
                    <div className="flex items-center justify-between h-8">
                      <span className="text-sm font-medium">
                        {t("common.output")}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          disabled={!output}
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
                    <div
                      className={`
                      min-h-[300px] rounded-xl border-2 overflow-hidden transition-all duration-300
                      ${
                        needsUpdate
                          ? "border-amber-300 bg-amber-50/30 dark:border-amber-600/30 dark:bg-amber-950/20"
                          : "border-foreground/20 bg-muted/30"
                      }
                    `}
                    >
                      {output ? (
                        <div>
                          {needsUpdate && (
                            <div className="flex items-center gap-2 p-3 bg-amber-100/80 dark:bg-amber-900/20 border-b border-amber-300 dark:border-amber-600/30">
                              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              <span className="text-sm text-amber-800 dark:text-amber-200">
                                {t("common.needsUpdate")}
                              </span>
                            </div>
                          )}
                          <CodeHighlighter
                            code={output}
                            language="javascript"
                            className={`min-h-[300px] max-h-[400px] ${needsUpdate ? "opacity-90" : ""}`}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
                          {t("base64Encoder.outputPlaceholder")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleConvert}
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
                      {mode === "encode"
                        ? t("base64Encoder.encodeBtn")
                        : t("base64Encoder.decodeBtn")}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      className="rounded-xl bg-transparent h-11"
                      onClick={() => {
                        setInput("");
                        setOutput("");
                        setError(null);
                      }}
                    >
                      {t("common.clear")}
                    </Button>
                  </motion.div>
                </motion.div>
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
              {t("base64Encoder.examples")}
            </motion.h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("base64Encoder.examplesHint")} Click on any example to load it
              into the input field, or use "Quick Run" to automatically
              encode/decode:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {exampleData.map((example, index) => (
                <motion.div
                  key={example.titleKey}
                  className="pixel-card p-4 space-y-3 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => loadExample(example.data)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold flex-1">
                      {t(example.titleKey)}
                    </h4>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          loadExample(example.data);
                          // Note: Do NOT auto-convert, let user manually click convert button
                        }}
                        className="pixel-btn px-3 py-1 text-xs h-7"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Load Example Only"
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
                        onClick={async (e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          await navigator.clipboard.writeText(example.data);
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
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/30 p-2 rounded border">
                    {example.data}
                  </p>
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
          What is Base64 Encoding?
        </motion.h2>
        <motion.p
          className="text-muted-foreground leading-relaxed mb-6"
          variants={itemVariants}
        >
          <strong className="text-foreground">Base64 encoding</strong> is a
          binary-to-text encoding scheme that converts binary data into ASCII
          string format. It's widely used for encoding binary data that needs to
          be stored and transferred over media designed to deal with textual
          data. Our free online Base64 encoder/decoder tool handles text and
          binary data conversion instantly.
        </motion.p>

        <motion.div
          className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h4 className="font-semibold mb-2">🔧 Technical Implementation</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our Base64 encoder uses JavaScript's built-in{" "}
            <code className="bg-background px-1 rounded">btoa()</code> and
            <code className="bg-background px-1 rounded">atob()</code> functions
            with proper Unicode handling via
            <code className="bg-background px-1 rounded">
              encodeURIComponent()
            </code>{" "}
            for international characters. The algorithm maps every 3 bytes of
            binary data to 4 Base64 characters using a 64-character alphabet
            (A-Z, a-z, 0-9, +, /) with padding (=) for incomplete byte groups.
          </p>
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
              title: "Text & Binary",
              desc: "Encode/decode both text strings and binary files",
            },
            {
              title: "URL Safe",
              desc: "Generate URL-safe Base64 encoding variants",
            },
            {
              title: "File Support",
              desc: "Upload and encode image and document files",
            },
            {
              title: "100% Private",
              desc: "All processing happens locally in your browser",
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
          Common Use Cases
        </motion.h3>
        <motion.ul
          className="text-muted-foreground space-y-2"
          variants={containerVariants}
        >
          {[
            "Embedding images in HTML and CSS files",
            "Encoding data for email and text transmission",
            "Storing binary data in databases",
            "API authentication and token handling",
            "Data serialization for web applications",
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

        <motion.div
          className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50"
          variants={itemVariants}
        >
          <h4 className="font-semibold mb-2">
            💻 Technical Implementation Details
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Data URI Scheme:</strong>{" "}
              <code>data:image/png;base64,iVBORw0KGgo...</code> - Used for
              embedding images directly in HTML/CSS
            </p>
            <p>
              <strong>Email Attachments:</strong> binary MIME encoding for
              attachments in email systems (SMTP)
            </p>
            <p>
              <strong>Database Storage:</strong> Converting BLOBs to TEXT
              columns while preserving binary integrity
            </p>
            <p>
              <strong>JWT Tokens:</strong> Payload section in JSON Web Tokens
              for API authentication
            </p>
            <p>
              <strong>API Responses:</strong> Serializing complex objects for
              JSON API responses
            </p>
          </div>
        </motion.div>

        {/* Real-World Scenarios */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            Real-World Scenarios
          </motion.h3>

          {/* Scenario 1 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Email Attachment Replacement
            </h4>
            <p className="text-muted-foreground mb-4">
              Developer needs to include a small icon in an email but wants to
              avoid attachment limitations.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">📧 Problem:</div>
                <div className="mb-3">
                  Email server blocks attachments or recipient has size
                  limitations
                </div>
                <div className="text-muted-foreground mb-2">
                  🔧 Base64 Solution:
                </div>
                <div className="mb-3">
                  Convert small icon (logo.png) to Base64 and embed in HTML
                  email
                </div>
                <div className="text-green-600 text-xs">
                  &lt;img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
                  /&gt;
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Email displays the icon without requiring
              external file attachments.
            </p>
          </motion.div>

          {/* Scenario 2 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              API Authentication Token
            </h4>
            <p className="text-muted-foreground mb-4">
              Mobile app developer needs to encode user credentials for Basic
              Authentication in API requests.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  🔐 User Credentials:
                </div>
                <div className="mb-3 font-mono">username: password123</div>
                <div className="text-muted-foreground mb-2">
                  🔑 Base64 Encoded:
                </div>
                <div className="mb-3 font-mono text-green-600">
                  dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
                <div className="text-muted-foreground mb-2">
                  📡 API Request Header:
                </div>
                <div className="text-xs text-muted-foreground">
                  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Credentials are safely encoded for HTTP
              Basic Authentication.
            </p>
          </motion.div>

          {/* Scenario 3 */}
          <motion.div
            className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              JSON Data with Binary Content
            </h4>
            <p className="text-muted-foreground mb-4">
              Backend developer needs to store a small PDF file in a JSON
              database field.
            </p>
            <div className="bg-background p-4 rounded-lg border">
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  📄 Binary Data:
                </div>
                <div className="mb-3">
                  document.pdf (45 KB) - binary format not JSON-compatible
                </div>
                <div className="text-muted-foreground mb-2">
                  🔄 Base64 Encoding:
                </div>
                <div className="mb-3 font-mono text-green-600">
                  JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4K...
                </div>
                <div className="text-muted-foreground mb-2">
                  💾 JSON Storage:
                </div>
                <div className="text-xs text-muted-foreground">
                  {
                    '{id: 1, document: "JVBERi0xLjQK...", filename: "document.pdf"}'
                  }
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Result:</strong> Binary PDF content is now stored as text
              in the JSON database field.
            </p>
          </motion.div>
        </motion.section>

        {/* Step-by-Step Guide */}
        <motion.section
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-xl font-bold mb-6" variants={itemVariants}>
            How to Use Base64 Encoding
          </motion.h3>

          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                step: "1",
                title: "Choose Encode or Decode",
                desc: "Select 'Encode' to convert text/binary to Base64, or 'Decode' to convert Base64 back to original format.",
              },
              {
                step: "2",
                title: "Enter Your Data",
                desc: "Type text or upload a file (images, documents) that you want to encode or decode.",
              },
              {
                step: "3",
                title: "Generate Result",
                desc: "Click the convert button to instantly see the Base64 encoded or decoded result.",
              },
              {
                step: "4",
                title: "Copy & Implement",
                desc: "Copy the result for use in your applications, APIs, email templates, or data storage.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="flex items-start gap-4 p-4 bg-muted/10 rounded-lg"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.section>

      {/* Usage Limits & Best Practices */}
      <motion.section className="mb-12" variants={itemVariants}>
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <motion.h3
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-5 w-5" />
              Usage Limits & Best Practices
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-amber-600">
                  ⚠️ Limitations
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Increases data size by ~33% (4 chars per 3 bytes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Not suitable for large files (use binary protocols
                      instead)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Not encryption - easily reversible, don't use for
                      sensitive data
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Browser memory limits for very large inputs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">
                  ✅ Best Practices
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Use for small binary data (images, files &lt; 10MB)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Combine with compression (gzip) for efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use URL-safe Base64 (+/-) for web applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Always validate Base64 input before decoding</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                🔒 Security Note
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Base64 is NOT encryption. It provides no security or privacy.
                Only use for data format conversion, never for protecting
                sensitive information. For encryption, use proper cryptographic
                algorithms like AES.
              </p>
            </div>
          </CardContent>
        </Card>
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
                  q: "What is Base64 encoding?",
                  a: "Base64 is a binary-to-text encoding scheme that converts binary data into ASCII string format. It's commonly used to embed image files or other binary data in text-based formats like JSON, XML, or HTML.",
                },
                {
                  q: "When should I use Base64 encoding?",
                  a: "Use Base64 when you need to include binary data in text-based formats, send data through systems that only support text, or store binary data in databases that aren't designed for binary storage.",
                },
                {
                  q: "Is Base64 encryption?",
                  a: "No, Base64 is not encryption or security measure. It's simply an encoding scheme that makes binary data text-safe. The encoded data can be easily decoded back to its original form.",
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
