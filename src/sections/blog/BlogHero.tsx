"use client";

import { useTranslations } from "next-intl";
import {
  Body,
  Eyebrow,
  Heading,
  HeadingPair,
  SectionIntro,
  SectionShell,
  SectionStack,
} from "@/ui";

import { BlogCard, BlogFeaturedCard } from "./BlogCard";
import { useBlogPostsData } from "./hooks/use-blog-posts-data";

export function BlogHero() {
  const t = useTranslations("blog");
  const posts = useBlogPostsData();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero section */}
      <SectionShell scheme="light" rhythm="hero">
        <SectionStack>
          <SectionIntro>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <HeadingPair>
              <div className="md:max-w-[921px]">
                <Heading as="h1" size="lg" weight="light">
                  {t("hero.heading")}
                </Heading>
              </div>
              <div className="md:max-w-[571px]">
                <Body muted size="sm">
                  {t("hero.description")}
                </Body>
              </div>
            </HeadingPair>
          </SectionIntro>

          {/* Featured post */}
          {featured && <BlogFeaturedCard post={featured} />}
        </SectionStack>
      </SectionShell>

      {/* Posts grid */}
      <SectionShell scheme="muted">
        <SectionStack>
          <SectionIntro>
            <Eyebrow>{t("allPosts")}</Eyebrow>
          </SectionIntro>
          <div className="grid grid-cols-1 gap-[calc(var(--spacing-base)*5)] min-[768px]:grid-cols-2 min-[1281px]:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </SectionStack>
      </SectionShell>
    </>
  );
}
