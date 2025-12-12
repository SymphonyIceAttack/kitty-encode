import { Navbar } from "@/components/layout/navbar-client";

export default async function NavbarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <Navbar lang={lang} />;
}
