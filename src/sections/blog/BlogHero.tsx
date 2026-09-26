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
import { BLOG_POSTS } from "./blog.data";

export function BlogHero() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      {/* Hero section */}
      <SectionShell scheme="light" rhythm="hero">
        <SectionStack>
          <SectionIntro>
            <Eyebrow>Blog.</Eyebrow>
            <HeadingPair>
              <div className="md:max-w-[921px]">
                <Heading as="h1" size="lg" weight="light">
                  Stories, updates, and engineering notes
                </Heading>
              </div>
              <div className="md:max-w-[571px]">
                <Body muted size="sm">
                  Behind-the-scenes looks at how we build VLabs — from 3D
                  rendering and circuit simulation to open-source community and
                  education.
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
            <Eyebrow>All posts.</Eyebrow>
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
