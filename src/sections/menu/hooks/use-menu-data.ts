"use client";

import { useTranslations } from "next-intl";
import { IconBulb, IconCode } from "@tabler/icons-react";

import { DiscordMark, GitHubMark } from "@/icons";
import { SITE_URLS } from "@/platform/site-urls";

import { type MenuNavItem } from "../types/menu-nav-item";
import { type MenuSocialLink } from "../types/menu-social-link";

export function useMenuData() {
  const t = useTranslations("menu");
  const tCommon = useTranslations("common");

  const navItems: MenuNavItem[] = [
    { href: "/", label: t("nav.home") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/community", label: t("nav.community") },
    {
      label: t("nav.resources"),
      children: [
        {
          label: t("resources.userGuide"),
          description: t("resources.userGuideDesc"),
          href: SITE_URLS.docsUserGuide,
          external: true,
          icon: IconCode,
          preview: {
            image: "/images/menu/user-guide.webp",
            imageAlt: t("resources.userGuideAlt"),
            imagePosition: "center",
            title: t("resources.userGuideTitle"),
            description: t("resources.userGuidePreview"),
          },
        },
        {
          label: t("resources.developers"),
          description: t("resources.developersDesc"),
          href: SITE_URLS.docsDevelopers,
          external: true,
          icon: IconCode,
          preview: {
            image: "/images/menu/developers.webp",
            imageAlt: t("resources.developersAlt"),
            imagePosition: "center",
            imageScale: 1.6,
            title: t("resources.developersTitle"),
            description: t("resources.developersPreview"),
          },
        },
      ],
    },
  ];

  const socialLinks: MenuSocialLink[] = [
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
  ];

  return {
    appUrl: SITE_URLS.appWelcome,
    navItems,
    socialLinks,
    getStartedLabel: tCommon("buttons.getStarted"),
  };
}
