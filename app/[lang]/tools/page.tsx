import { ToolsPageStructuredData } from "@/components/structured-data/tools-page";
import { ToolsPageClient } from "@/components/tools/tools-page-client";
import type { LanguageType } from "@/lib/translations";

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: LanguageType }>;
}) {
  const { lang } = await params;
  return (
    <>
      <ToolsPageStructuredData />
      <ToolsPageClient lang={lang as LanguageType} />
    </>
  );
}
