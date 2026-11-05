import { IconBuilding, IconCode, IconUsersGroup } from "@tabler/icons-react";

import { DiscordMark, GitHubMark } from "@/icons";
import { SITE_URLS } from "@/platform/site-urls";

import { type MenuNavItem } from "../types/menu-nav-item";
import { type MenuSocialLink } from "../types/menu-social-link";

export const MENU: {
  appUrl: string;
  navItems: readonly MenuNavItem[];
  socialLinks: readonly MenuSocialLink[];
} = {
  appUrl: SITE_URLS.appWelcome,
  navItems: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/community", label: "Community" },
    {
      label: "Resources",
      children: [
        {
          label: "User Guide",
          description: "Learn how to use VLabs",
          href: SITE_URLS.docsUserGuide,
          external: true,
          icon: IconCode,
          preview: {
            image: "/images/menu/user-guide.webp",
            imageAlt: "VLabs user guide preview",
            imagePosition: "center",
            title: "Master every corner of VLabs",
            description:
              "Step-by-step guides and playbooks to help your team get the most out of their workspace.",
          },
        },
        {
          label: "Developers",
          description: "Contribute to VLabs",
          href: SITE_URLS.docsDevelopers,
          external: true,
          icon: IconCode,
          preview: {
            image: "/images/menu/developers.webp",
            imageAlt: "Blue developer illustration with branching arrows",
            imagePosition: "center",
            imageScale: 1.6,
            title: "Build on an open platform",
            description:
              "Explore the source, open issues, and contribute to VLabs on GitHub.",
          },
        },
        {
          label: "Host Institute",
          description: "IIIT Sonepat & Technical Society",
          href: "/host-institute",
          icon: IconBuilding,
          preview: {
            image: "/host-institute.png",
            imageAlt: "Stylised blueprint of the IIIT Sonepat campus",
            imagePosition: "center",
            title: "Where VLabs began",
            description:
              "Started by the Technical Society of IIIT Sonepat as an open-source virtual ECE lab initiative.",
          },
        },
        {
          label: "Participating Institutions",
          description: "Partner with us on modules & labs",
          href: "/participating-institutions",
          icon: IconUsersGroup,
          preview: {
            image: "/participating-institutes.png",
            imageAlt: "Handshake between institutions under campus icons",
            imagePosition: "center",
            title: "Build VLabs with us",
            description:
              "We have been building alone — join us, especially other IIITs, in authoring modules and labs.",
          },
        },
      ],
    },
  ],
  socialLinks: [
    {
      ariaLabel: "GitHub (opens in new tab)",
      href: SITE_URLS.github,
      icon: GitHubMark,
      showInDesktop: true,
    },
    {
      ariaLabel: "Discord (opens in new tab)",
      href: SITE_URLS.discord,
      icon: DiscordMark,
      showInDesktop: true,
    },
  ],
};
