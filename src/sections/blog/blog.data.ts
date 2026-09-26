export type BlogPostRecord = {
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; role: string };
  tag: string;
  slug: string;
  readTime: string;
  featured?: boolean;
  thumbnail?: string;
};

export const BLOG_POSTS: readonly BlogPostRecord[] = [
  {
    title: "Building 3D ECE labs from scratch with Three.js and Next.js",
    excerpt:
      "How we designed an interactive breadboard renderer that lets students drag, drop, and wire components in a browser — no plugins, no installs.",
    date: "2026-09-20",
    author: { name: "Shubham Singh", role: "Founder" },
    tag: "Engineering",
    slug: "building-3d-ece-labs",
    readTime: "8 min read",
    featured: true,
    thumbnail: "/blog/01-building-ece-labs/thumbnail.png",
  },
  {
    title: "Why open-source education tools matter more than ever",
    excerpt:
      "Labs are expensive, hardware is fragile, and not every student gets equal access. Virtual labs close that gap — here is why we chose to build in the open.",
    date: "2026-09-14",
    author: { name: "Shubham Singh", role: "Founder" },
    tag: "Open Source",
    slug: "why-open-source-education",
    readTime: "5 min read",
    thumbnail: "/blog/03-why-open-source/thumbnail.svg",
  },
  {
    title: "From Lunaria to Tailwind: migrating a design system",
    excerpt:
      "We inherited a Linaria-based CSS-in-JS setup and moved the entire codebase to Tailwind CSS v4. Here is what went well, what broke, and what we learned.",
    date: "2026-08-28",
    author: { name: "Shubham Singh", role: "Founder" },
    tag: "Design",
    slug: "lunaria-to-tailwind",
    readTime: "7 min read",
    thumbnail: "/blog/02-lunaria-to-tailwind/thumbnail.svg",
  },
  {
    title: "Designing interactive procedure steps for circuit experiments",
    excerpt:
      "Every lab follows a strict aim–theory–apparatus–procedure–observation–conclusion flow. Here is how we made each step interactive, verifiable, and wired to a live 3D scene.",
    date: "2026-08-18",
    author: { name: "Shubham Singh", role: "Founder" },
    tag: "Product",
    slug: "interactive-procedure-steps",
    readTime: "6 min read",
    thumbnail: "/blog/04-interactive-procedure-steps/thumbnail.svg",
  },
];
