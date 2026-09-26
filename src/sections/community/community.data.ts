// All community page content in one data file — keeps JSX clean.

export const COMMUNITY = {
  // ── Section 1: About the project ─────────────────────────────────────────
  about: {
    eyebrow: "About VLabs.",
    heading: "A libre, open-source virtual ECE laboratory",
    body: "VLabs is a browser-based platform that recreates real electronics lab sessions with interactive 3D breadboard scenes, circuit simulations, and step-by-step procedures — no hardware required.",
    bullets: [
      {
        label: "Raw Three.js under the hood",
        detail:
          "Every component — breadboard, resistor, LED, IC — is built with raw Three.js geometry. No black-box libraries, no proprietary engines.",
      },
      {
        label: "Non-profit and open-sourced",
        detail:
          "VLabs is a non-profit initiative. The entire source code is publicly available on GitHub under a libre license (through December 2026).",
      },
      {
        label: "Student-led, community-driven",
        detail:
          "Built by the Technical Society of IIIT Sonepat, VLabs welcomes contributions from students, educators, and engineers worldwide.",
      },
      {
        label: "All are welcome to contribute",
        detail:
          "Whether you write TypeScript, design UI, author lab content, or just file bug reports — every contribution counts. Check the CONTRIBUTING.md to get started.",
      },
    ],
    links: {
      github:
        "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
      discord: "https://discord.gg/5MaJbxFnm",
      contributing:
        "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat/blob/master/CONTRIBUTING.md",
    },
  },

  // ── Section 2: The story — narrative blog-post style ───────────────────
  // Paragraphs are rendered as rich JSX in CommunitySections.tsx (links,
  // underlines, emphasis). Only scalar metadata lives here.
  story: {
    eyebrow: "The story.",
    heading: "How one summer turned an idea into a platform",
    date: "June — September 2026",
    author: {
      name: "Shubham Singh",
      role: "President, Technical Society of IIIT Sonepat (2026-27)",
      githubHandle: "FirePheonix",
      githubUrl: "https://github.com/FirePheonix",
    },
    ownership:
      "The current President of the Technical Society of IIIT Sonepat owns all rights to this repository. Organisational decisions, roadmap direction, and release authority rest with the sitting president.",
  },

  // ── Section 3: Acknowledgments ───────────────────────────────────────────
  acknowledgments: {
    eyebrow: "Acknowledgments.",
    heading: "Standing on the shoulders of open source",
    body: "VLabs would not exist without the projects and communities that came before it.",
    items: [
      {
        title: "Twenty CRM",
        body: "The initial design codes and component architecture of this repository were taken from Twenty CRM — the leading open-source CRM.",
        note: "All codes were subsequently shifted from Lunaria (CSS-in-JS) to Tailwind CSS v4, and every design was updated to match our own application identity and educational purpose.",
        links: [
          { label: "twenty.com", href: "https://twenty.com/" },
          {
            label: "GitHub repo",
            href: "https://github.com/twentyhq/twenty",
          },
          {
            label: "License",
            href: "https://github.com/twentyhq/twenty?tab=License-1-ov-file",
          },
        ],
      },
      {
        title: "Design system",
        body: "The design system and application identity were built by Shubham Singh and are defined in our Figma workspace. Every colour, token, and layout rule traces back to this single source of truth.",
        links: [
          {
            label: "Figma — Open Source Initiatives",
            href: "https://www.figma.com/design/8OKl25CDzj9DO9b0VCjEVq/Open-Source-Initiatives?node-id=0-1&t=3cuqh6GhRT47vFps-1",
          },
        ],
      },
    ],
    licenseNote:
      "All derived work respects Twenty CRM's official license. See the license file for full legal terms.",
    licenseLink:
      "https://github.com/twentyhq/twenty?tab=License-1-ov-file",
  },

  // ── Section 4: Get involved ──────────────────────────────────────────────
  getInvolved: {
    eyebrow: "Get involved.",
    heading: "Start contributing today",
    cards: [
      {
        icon: "github" as const,
        title: "Browse the code",
        body: "Clone the repo, explore the codebase, and open your first PR.",
        href: "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
        linkLabel: "GitHub",
      },
      {
        icon: "discord" as const,
        title: "Join the conversation",
        body: "Ask questions, share ideas, and connect with other contributors on Discord.",
        href: "https://discord.gg/5MaJbxFnm",
        linkLabel: "Discord",
      },
      {
        icon: "figma" as const,
        title: "Check the design",
        body: "Review our Figma files and suggest improvements to the interface.",
        href: "https://www.figma.com/design/8OKl25CDzj9DO9b0VCjEVq/Open-Source-Initiatives?node-id=0-1&t=3cuqh6GhRT47vFps-1",
        linkLabel: "Figma",
      },
    ],
  },
} as const;
