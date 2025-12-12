"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Key,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  }),
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
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeTab, setActiveTab] = useState("convert");

  const toolSectionRef = useRef<HTMLDivElement>(null);

  const badges = [
    t("badge.free"),
    t("badge.noSignup"),
    t("badge.offline"),
    t("badge.privacy"),
  ];

  const features = [
    {
      titleKey: "base64Encoder.seo.feature1.title",
      descKey: "base64Encoder.seo.feature1.desc",
    },
    {
      titleKey: "base64Encoder.seo.feature2.title",
      descKey: "base64Encoder.seo.feature2.desc",
    },
    {
      titleKey: "base64Encoder.seo.feature3.title",
      descKey: "base64Encoder.seo.feature3.desc",
    },
    {
      titleKey: "base64Encoder.seo.feature4.title",
      descKey: "base64Encoder.seo.feature4.desc",
    },
  ];

  const faqs = [
    { qKey: "base64Encoder.faq.q1", aKey: "base64Encoder.faq.a1" },
    { qKey: "base64Encoder.faq.q2", aKey: "base64Encoder.faq.a2" },
    { qKey: "base64Encoder.faq.q3", aKey: "base64Encoder.faq.a3" },
    { qKey: "base64Encoder.faq.q4", aKey: "base64Encoder.faq.a4" },
  ];

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
      } catch {
        setError(t("base64Encoder.error.encoding"));
        setOutput("");
      }
    },
    [t],
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
      } catch {
        setError(t("base64Encoder.error.decoding"));
        setOutput("");
      }
    },
    [t],
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
  }, [input, mode, encodeBase64, decodeBase64]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const loadExample = useCallback((data: string) => {
    setInput(data);
    setError(null);
    setActiveTab("convert");
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

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
      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Key className="h-6 w-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("base64Encoder.pageTitle")}
            </h1>
            <p className="text-muted-foreground">
              {t("base64Encoder.pageSubtitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              <Badge variant="secondary" className="rounded-full">
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>
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
                <TabsTrigger value="examples" className="rounded-lg">
                  {t("base64Encoder.examples")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="convert" className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
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
                      onChange={(e) => setInput(e.target.value)}
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
                    <div className="min-h-[300px] rounded-xl border-2 border-border bg-muted/30 overflow-hidden">
                      {output ? (
                        <CodeHighlighter
                          code={output}
                          language="javascript"
                          className="min-h-[300px] max-h-[400px]"
                        />
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground font-mono">
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

              <TabsContent value="examples" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("base64Encoder.examplesHint")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  {exampleData.map((example, index) => (
                    <motion.div
                      key={example.titleKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer hover:border-accent transition-colors rounded-xl"
                        onClick={() => loadExample(example.data)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">
                            {t(example.titleKey)}
                          </CardTitle>
                          <CardDescription className="text-xs font-mono truncate">
                            {example.data}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        className="mb-12 prose prose-neutral dark:prose-invert max-w-none"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4">
          {t("base64Encoder.seo.title")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("base64Encoder.seo.description")}
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">
          {t("base64Encoder.seo.featuresTitle")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-prose">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-muted/30 rounded-xl h-full">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm">{t(feature.titleKey)}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">
          {t("base64Encoder.seo.howToUseTitle")}
        </h3>
        <ol className="text-muted-foreground space-y-2">
          <li>
            <strong>1.</strong> {t("base64Encoder.seo.howToUse1")}
          </li>
          <li>
            <strong>2.</strong> {t("base64Encoder.seo.howToUse2")}
          </li>
          <li>
            <strong>3.</strong> {t("base64Encoder.seo.howToUse3")}
          </li>
        </ol>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <motion.button
          onClick={() => setShowFaq(!showFaq)}
          className="flex items-center justify-between w-full text-left py-4 border-t rounded-xl px-2 hover:bg-muted/30 transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
        >
          <h2 className="text-xl font-semibold">{t("common.faq")}</h2>
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
              className="space-y-4 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.qKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                >
                  <Card className="bg-muted/30 rounded-xl">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{t(faq.qKey)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t(faq.aKey)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}
