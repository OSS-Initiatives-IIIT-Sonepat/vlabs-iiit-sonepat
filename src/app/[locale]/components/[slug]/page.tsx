import { notFound } from "next/navigation";
import { COMPONENTS_DATA } from "@/sections/components/components.data";
import { ComponentShowcase } from "@/sections/components/ComponentShowcase";

// ── Static params — pre-render a page for every registered component ──────
export function generateStaticParams() {
  return Object.keys(COMPONENTS_DATA).map((slug) => ({ slug }));
}

// ── Dynamic metadata ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = COMPONENTS_DATA[slug];
  if (!data) return {};
  return {
    title: `${data.name} — VLabs Components`,
    description: data.tagline,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function ComponentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = COMPONENTS_DATA[slug];

  if (!data) {
    notFound();
  }

  return <ComponentShowcase data={data} />;
}
