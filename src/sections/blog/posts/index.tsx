import { type ReactNode } from "react";
import { BLOG_POSTS, type BlogPostRecord } from "../blog.data";
import { PostBuildingEceLabs } from "./building-3d-ece-labs";

export type BlogPostFull = BlogPostRecord & {
  content: ReactNode;
};

const CONTENT_MAP: Record<string, ReactNode> = {
  "building-3d-ece-labs": <PostBuildingEceLabs />,
};

export function getBlogPost(slug: string): BlogPostFull | null {
  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  if (!meta || !CONTENT_MAP[slug]) return null;
  return { ...meta, content: CONTENT_MAP[slug] };
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.filter((p) => CONTENT_MAP[p.slug] !== undefined).map(
    (p) => p.slug,
  );
}
