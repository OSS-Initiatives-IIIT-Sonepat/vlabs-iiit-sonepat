export type BlogPostRecord = {
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; role: string };
  tag: string;
  slug: string;
  readTime: string;
  featured?: boolean;
};

export const BLOG_POSTS: readonly BlogPostRecord[] = [
  {
    title: "Building 3D ECE labs from scratch with Three.js and Next.js",
    excerpt:
      "How we designed an interactive breadboard renderer that lets students drag, drop, and wire components in a browser — no plugins, no installs.",
    date: "2026-09-20",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Engineering",
    slug: "building-3d-ece-labs",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "Why open-source education tools matter more than ever",
    excerpt:
      "Labs are expensive, hardware is fragile, and not every student gets equal access. Virtual labs close that gap — here is why we chose to build in the open.",
    date: "2026-09-14",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Open Source",
    slug: "why-open-source-education",
    readTime: "5 min read",
  },
  {
    title: "Simulating the 8085 microprocessor in the browser",
    excerpt:
      "A deep dive into our fetch-decode-execute emulator: how register files, flag updates, and memory maps work under the hood.",
    date: "2026-09-08",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Engineering",
    slug: "simulating-8085",
    readTime: "10 min read",
  },
  {
    title: "From Lunaria to Tailwind: migrating a design system",
    excerpt:
      "We inherited a Linaria-based CSS-in-JS setup and moved the entire codebase to Tailwind CSS v4. Here is what went well, what broke, and what we learned.",
    date: "2026-08-28",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Design",
    slug: "lunaria-to-tailwind",
    readTime: "7 min read",
  },
  {
    title: "Designing interactive procedure steps for circuit experiments",
    excerpt:
      "Every lab follows a strict aim-theory-apparatus-procedure-observation-conclusion flow. Here is how we made each step interactive and verifiable.",
    date: "2026-08-18",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Product",
    slug: "interactive-procedure-steps",
    readTime: "6 min read",
  },
  {
    title: "Adding cache and ALU simulations to the platform",
    excerpt:
      "Semester 3 brings direct-mapped caches, set-associative caches, ALU operations, and a simple CPU — all running as React components with interactive controls.",
    date: "2026-08-05",
    author: { name: "VLabs Team", role: "Core Contributors" },
    tag: "Engineering",
    slug: "cache-alu-simulations",
    readTime: "9 min read",
  },
];
