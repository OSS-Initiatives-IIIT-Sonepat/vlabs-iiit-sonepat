"use client";

import { useTranslations } from "next-intl";
import { type BlogPostRecord } from "../blog.data";

export function useBlogPostsData(): BlogPostRecord[] {
  const t = useTranslations("blog.posts");

  return [
    {
      title: t("building3dLabs.title"),
      excerpt: t("building3dLabs.excerpt"),
      date: "2026-09-20",
      author: {
        name: "Shubham Singh",
        role: t("building3dLabs.author.role"),
        imageUrl: "https://github.com/FirePheonix.png",
        github: "FirePheonix",
        bio: t("building3dLabs.author.bio"),
      },
      tag: t("building3dLabs.tag"),
      slug: "building-3d-ece-labs",
      readTime: t("building3dLabs.readTime"),
      featured: true,
      thumbnail: "/blog/01-building-ece-labs/thumbnail.png",
    },
    {
      title: t("whyOpenSource.title"),
      excerpt: t("whyOpenSource.excerpt"),
      date: "2026-09-14",
      author: {
        name: "Shubham Singh",
        role: t("whyOpenSource.author.role"),
        imageUrl: "https://github.com/FirePheonix.png",
        github: "FirePheonix",
        bio: t("whyOpenSource.author.bio"),
      },
      tag: t("whyOpenSource.tag"),
      slug: "why-open-source-education",
      readTime: t("whyOpenSource.readTime"),
      thumbnail: "/blog/03-why-open-source/thumbnail.svg",
    },
    {
      title: t("lunariaToTailwind.title"),
      excerpt: t("lunariaToTailwind.excerpt"),
      date: "2026-08-28",
      author: {
        name: "Shubham Singh",
        role: t("lunariaToTailwind.author.role"),
        imageUrl: "https://github.com/FirePheonix.png",
        github: "FirePheonix",
        bio: t("lunariaToTailwind.author.bio"),
      },
      tag: t("lunariaToTailwind.tag"),
      slug: "lunaria-to-tailwind",
      readTime: t("lunariaToTailwind.readTime"),
      thumbnail: "/blog/02-lunaria-to-tailwind/thumbnail.svg",
    },
    {
      title: t("interactiveProcedure.title"),
      excerpt: t("interactiveProcedure.excerpt"),
      date: "2026-08-18",
      author: {
        name: "Shubham Singh",
        role: t("interactiveProcedure.author.role"),
        imageUrl: "https://github.com/FirePheonix.png",
        github: "FirePheonix",
        bio: t("interactiveProcedure.author.bio"),
      },
      tag: t("interactiveProcedure.tag"),
      slug: "interactive-procedure-steps",
      readTime: t("interactiveProcedure.readTime"),
      thumbnail: "/blog/04-interactive-procedure-steps/thumbnail.svg",
    },
    {
      title: t("searchOptimisation.title"),
      excerpt: t("searchOptimisation.excerpt"),
      date: "2026-10-01",
      author: {
        name: "Shivanshu Mangal",
        role: t("searchOptimisation.author.role"),
        imageUrl: "https://github.com/shivanshumangal007-dev.png",
        github: "shivanshumangal007-dev",
        bio: t("searchOptimisation.author.bio"),
      },
      tag: t("searchOptimisation.tag"),
      slug: "search-box-optimisation",
      readTime: t("searchOptimisation.readTime"),
      thumbnail: "/blog/05-search-optimisation/thumbnail.svg",
    },
  ];
}
