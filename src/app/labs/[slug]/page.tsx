import { notFound } from 'next/navigation';
import { ALL_CONTENTS } from '@/labs/content/index';
import { ALL_CIRCUITS }  from '@/labs/circuits/index';
import { LabPage }       from '@/labs/LabPage';

// ── Static params — pre-render a page for every registered experiment ──────
export function generateStaticParams() {
  return Object.keys(ALL_CONTENTS).map((slug) => ({ slug }));
}

// ── Dynamic metadata from circuit + content ────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = ALL_CONTENTS[slug];
  if (!content) return {};
  return {
    title: `${content.title} — VLabs`,
    description: ALL_CIRCUITS.find((c) => c.id === slug)?.description ?? content.title,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function LabSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = ALL_CONTENTS[slug];
  if (!content) notFound();
  return <LabPage content={content} />;
}
