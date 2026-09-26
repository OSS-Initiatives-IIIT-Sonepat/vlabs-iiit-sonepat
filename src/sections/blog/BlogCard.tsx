import { ArrowUpRight } from "@/icons";

import { type BlogPostRecord } from "./blog.data";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Featured card (large, top of page) ──────────────────────────────────────
export function BlogFeaturedCard({ post }: { post: BlogPostRecord }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={[
        "group grid grid-cols-1 gap-[calc(var(--spacing-base)*6)]",
        "min-[921px]:grid-cols-2 min-[921px]:gap-[calc(var(--spacing-base)*10)]",
        "bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)]",
        "border border-[rgba(0,0,0,0.06)]",
        "p-[calc(var(--spacing-base)*5)]",
        "no-underline text-inherit",
        "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      {/* Image placeholder */}
      <div className="bg-[#eeecea] rounded-[calc(var(--radius-base)*2)] h-[240px] min-[921px]:h-[320px] w-full flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3 text-[#b0aea8]">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="font-[family-name:var(--font-mono),monospace] text-[11px] tracking-[0.06em] uppercase">
            Featured
          </span>
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col justify-between gap-[calc(var(--spacing-base)*4)]">
        <div className="flex flex-col gap-[calc(var(--spacing-base)*3)]">
          {/* Tag */}
          <span className="inline-flex w-fit items-center gap-[calc(var(--spacing-base)*1.5)] text-[var(--color-blue)] font-[family-name:var(--font-mono),monospace] text-[11px] font-medium tracking-[0.08em] uppercase">
            <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-blue)]" />
            {post.tag}
          </span>

          {/* Title */}
          <h2
            className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] font-medium tracking-[-0.03em] m-0"
            style={{
              fontSize: "clamp(1.5rem, 1.2rem + 1.3vw, 2rem)",
              lineHeight: "1.2",
            }}
          >
            {post.title}
          </h2>

          <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-base leading-[1.6] m-0 max-w-[48ch]">
            {post.excerpt}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
            <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium">
              {post.author.name}
            </span>
            <span className="block border-l border-[var(--divider)] h-[14px] w-0" />
            <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
              {formatDate(post.date)}
            </span>
            <span className="block border-l border-[var(--divider)] h-[14px] w-0" />
            <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
              {post.readTime}
            </span>
          </div>
          <span className="text-[var(--ink-subtle)] group-hover:text-[var(--color-blue)] transition-colors duration-200">
            <ArrowUpRight sizePx={10} />
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Standard card ───────────────────────────────────────────────────────────
export function BlogCard({ post }: { post: BlogPostRecord }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={[
        "group flex flex-col gap-[calc(var(--spacing-base)*4)]",
        "bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)]",
        "border border-[rgba(0,0,0,0.06)]",
        "p-[calc(var(--spacing-base)*4)]",
        "no-underline text-inherit h-full",
        "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      {/* Image placeholder */}
      <div className="bg-[#eeecea] rounded-[calc(var(--radius-base)*2)] h-[180px] w-full flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-2 text-[#b0aea8]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
      </div>

      {/* Tag */}
      <span className="inline-flex w-fit items-center gap-[calc(var(--spacing-base)*1.5)] text-[var(--color-blue)] font-[family-name:var(--font-mono),monospace] text-[11px] font-medium tracking-[0.08em] uppercase">
        <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-blue)]" />
        {post.tag}
      </span>

      {/* Title */}
      <h3
        className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] font-medium tracking-[-0.02em] m-0"
        style={{
          fontSize: "clamp(1.125rem, 0.9415rem + 0.753vw, 1.375rem)",
          lineHeight: "clamp(1.5rem, 1.3165rem + 0.753vw, 1.75rem)",
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[15px] leading-[1.6] m-0 flex-1">
        {post.excerpt}
      </p>

      {/* Divider */}
      <div
        className="border-t border-dotted border-[var(--divider)] h-0 w-full"
        aria-hidden
      />

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
          <span className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium">
            {post.author.name}
          </span>
          <span className="block border-l border-[var(--divider)] h-[14px] w-0" />
          <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[13px]">
            {formatDate(post.date)}
          </span>
        </div>
        <span className="text-[var(--ink-subtle)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
          {post.readTime}
        </span>
      </div>
    </a>
  );
}
