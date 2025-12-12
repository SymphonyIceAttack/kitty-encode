import { Footer } from "@/components/layout/footer-client";

export default async function FooterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <Footer lang={lang} />;
}
