import { notFound } from "next/navigation";

import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { GitHubMark, ArrowUpRight } from "@/icons";

import { getBlogPost, getAllBlogSlugs } from "@/sections/blog/posts";
import { BLOG_POSTS } from "@/sections/blog/blog.data";

// ── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — VLabs Blog`,
    description: post.excerpt,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // adjacent posts for prev/next nav
  const allWithContent = getAllBlogSlugs();
  const idx = allWithContent.indexOf(slug);
  const prevSlug = idx > 0 ? allWithContent[idx - 1] : null;
  const nextSlug = idx < allWithContent.length - 1 ? allWithContent[idx + 1] : null;
  const prevPost = prevSlug ? BLOG_POSTS.find((p) => p.slug === prevSlug) : null;
  const nextPost = nextSlug ? BLOG_POSTS.find((p) => p.slug === nextSlug) : null;

  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />

      {/* subtle grid backdrop matching explore page */}
      <div
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "40px 40px",
          backgroundColor: "#f7f6f4",
          minHeight: "100vh",
        }}
      >
        <main className="mx-auto max-w-[1280px] px-[calc(var(--spacing-base)*4)] min-[921px]:px-[calc(var(--spacing-base)*10)] pt-[calc(var(--spacing-base)*14)] pb-[calc(var(--spacing-base)*20)]">
          <div className="grid grid-cols-1 gap-[calc(var(--spacing-base)*12)] min-[921px]:grid-cols-[minmax(0,1fr)_280px] min-[921px]:items-start">

            {/* ── Main column ─────────────────────────────────────── */}
            <article>
              {/* Tag */}
              <span className="inline-flex items-center gap-[calc(var(--spacing-base)*1.5)] text-[var(--color-blue)] font-[family-name:var(--font-mono),monospace] text-[11px] font-medium tracking-[0.08em] uppercase mb-[calc(var(--spacing-base)*4)]">
                <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-blue)]" />
                {post.tag}
              </span>

              {/* Title */}
              <h1
                className={[
                  "text-[var(--ink)] font-[family-name:var(--font-serif),serif]",
                  "font-light tracking-[-0.03em] leading-[1.15] text-balance m-0 mb-[calc(var(--spacing-base)*6)]",
                ].join(" ")}
                style={{ fontSize: "clamp(2rem, 1.4rem + 2.5vw, 3rem)" }}
              >
                {post.title}
              </h1>

              {/* Author bar */}
              <div className="flex items-center gap-[calc(var(--spacing-base)*3)] mb-[calc(var(--spacing-base)*3)]">
                <img
                  src="https://github.com/FirePheonix.png"
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="rounded-full border border-[rgba(0,0,0,0.08)] shrink-0"
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[14px] font-medium">
                    {post.author.name}
                  </span>
                  <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
                    {post.author.role}
                  </span>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-[calc(var(--spacing-base)*2)] mb-[calc(var(--spacing-base)*8)]">
                <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
                  {formatDate(post.date)}
                </span>
                <span className="block border-l border-[var(--divider)] h-[14px] w-0" />
                <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
                  {post.readTime}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-[rgba(0,0,0,0.08)] mb-[calc(var(--spacing-base)*10)]" />

              {/* Thumbnail hero */}
              {post.thumbnail && (
                <div className="mb-[calc(var(--spacing-base)*10)] rounded-[calc(var(--radius-base)*2)] overflow-hidden border border-[rgba(0,0,0,0.07)]">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full object-cover max-h-[480px]"
                  />
                </div>
              )}

              {/* Content */}
              <div className="bg-white rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)] p-[calc(var(--spacing-base)*8)] min-[921px]:p-[calc(var(--spacing-base)*12)]">
                {post.content}
              </div>

              {/* Prev / Next */}
              {(prevPost || nextPost) && (
                <div className="flex justify-between mt-[calc(var(--spacing-base)*12)] pt-[calc(var(--spacing-base)*6)] border-t border-[rgba(0,0,0,0.08)]">
                  {prevPost ? (
                    <a
                      href={`/blog/${prevPost.slug}`}
                      className="flex flex-col gap-[calc(var(--spacing-base)*1)] no-underline group max-w-[240px]"
                    >
                      <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[11px] tracking-[0.06em] uppercase">← Previous</span>
                      <span className="text-[var(--color-blue)] font-[family-name:var(--font-sans),sans-serif] text-[14px] font-medium group-hover:underline">
                        {prevPost.title}
                      </span>
                    </a>
                  ) : <span />}
                  {nextPost ? (
                    <a
                      href={`/blog/${nextPost.slug}`}
                      className="flex flex-col gap-[calc(var(--spacing-base)*1)] no-underline group max-w-[240px] text-right"
                    >
                      <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[11px] tracking-[0.06em] uppercase">Next →</span>
                      <span className="text-[var(--color-blue)] font-[family-name:var(--font-sans),sans-serif] text-[14px] font-medium group-hover:underline">
                        {nextPost.title}
                      </span>
                    </a>
                  ) : <span />}
                </div>
              )}
            </article>

            {/* ── Sidebar ──────────────────────────────────────────── */}
            <aside className="flex flex-col gap-[calc(var(--spacing-base)*6)] min-[921px]:sticky min-[921px]:top-[calc(64px+calc(var(--spacing-base)*8))]">
              {/* About the author */}
              <div className="bg-white rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)] p-[calc(var(--spacing-base)*5)] flex flex-col gap-[calc(var(--spacing-base)*3)]">
                <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] uppercase m-0">
                  Author
                </p>
                <div className="flex items-center gap-[calc(var(--spacing-base)*3)]">
                  <img
                    src="https://github.com/FirePheonix.png"
                    alt="Shubham Singh"
                    width={44}
                    height={44}
                    className="rounded-full border border-[rgba(0,0,0,0.08)] shrink-0"
                  />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[14px] font-medium">
                      Shubham Singh
                    </span>
                    <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
                      President, Technical Society
                    </span>
                  </div>
                </div>
                <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[13px] leading-[1.6] m-0">
                  Built VLabs from scratch between June and September 2026. Maintains the project as president of the Technical Society of IIIT Sonepat.
                </p>
                <a
                  className={[
                    "inline-flex items-center gap-[calc(var(--spacing-base)*2)] w-fit",
                    "bg-[#1c1c1c] text-white rounded-[calc(var(--radius-base)*2)]",
                    "px-[calc(var(--spacing-base)*3)] py-[calc(var(--spacing-base)*2)]",
                    "no-underline font-[family-name:var(--font-sans),sans-serif] text-[12px] font-medium",
                    "hover:bg-[#333] transition-colors duration-150",
                  ].join(" ")}
                  href="https://github.com/FirePheonix"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitHubMark size={13} />
                  @FirePheonix
                  <ArrowUpRight sizePx={7} />
                </a>
              </div>

              {/* More posts */}
              <div className="bg-white rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)] p-[calc(var(--spacing-base)*5)] flex flex-col gap-[calc(var(--spacing-base)*4)]">
                <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] uppercase m-0">
                  More posts
                </p>
                {BLOG_POSTS.filter((p) => p.slug !== slug)
                  .slice(0, 4)
                  .map((p) => (
                    <a
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="flex flex-col gap-[calc(var(--spacing-base)*1)] no-underline group"
                    >
                      <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium leading-[1.4] group-hover:text-[var(--color-blue)] transition-colors duration-150">
                        {p.title}
                      </span>
                      <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
                        {p.readTime}
                      </span>
                    </a>
                  ))}
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat"
                rel="noopener noreferrer"
                target="_blank"
                className={[
                  "flex items-center justify-between",
                  "bg-white rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)]",
                  "p-[calc(var(--spacing-base)*4)] no-underline",
                  "hover:border-[rgba(0,0,0,0.14)] transition-[border-color] duration-150",
                ].join(" ")}
              >
                <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
                  <GitHubMark size={16} />
                  <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium">
                    Star on GitHub
                  </span>
                </div>
                <ArrowUpRight sizePx={9} />
              </a>
            </aside>

          </div>
        </main>
      </div>

      <Footer />
    </MenuStyleProvider>
  );
}
