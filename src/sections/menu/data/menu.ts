import {
  IconBulb,
  IconCode,
} from '@tabler/icons-react';

import { DiscordMark, GitHubMark } from '@/icons';
import { SITE_URLS } from '@/platform/site-urls';

import { type MenuNavItem } from '../types/menu-nav-item';
import { type MenuSocialLink } from '../types/menu-social-link';

export const MENU: {
  appUrl: string;
  navItems: readonly MenuNavItem[];
  socialLinks: readonly MenuSocialLink[];
} = {
  appUrl: SITE_URLS.appWelcome,
  navItems: [
    { href: '/', label: 'Home' },
    {
      label: 'Resources',
      children: [
        {
          label: 'User Guide',
          description: 'Learn how to use Twenty',
          href: SITE_URLS.docsUserGuide,
          external: true,
          icon: IconCode,
          preview: {
            image: '/images/menu/user-guide.webp',
            imageAlt: 'Twenty user guide preview',
            imagePosition: 'center',
            title: 'Master every corner of Twenty',
            description: 'Step-by-step guides and playbooks to help your team get the most out of their workspace.',
          },
        },
        {
          label: 'Developers',
          description: 'Create apps on Twenty',
          href: SITE_URLS.docsDevelopers,
          external: true,
          icon: IconCode,
          preview: {
            image: '/images/menu/developers.webp',
            imageAlt: 'Blue developer illustration with branching arrows',
            imagePosition: 'center',
            imageScale: 1.6,
            title: 'Build on an open platform',
            description: 'APIs, SDKs and webhooks to extend Twenty and ship apps on top of your CRM data.',
          },
        },
      ],
    },
  ],
  socialLinks: [
    {
      ariaLabel: 'GitHub (opens in new tab)',
      href: SITE_URLS.github,
      icon: GitHubMark,
      showInDesktop: true,
      statKey: 'githubStars',
    },
    {
      ariaLabel: 'Discord (opens in new tab)',
      href: SITE_URLS.discord,
      icon: DiscordMark,
      showInDesktop: true,
      statKey: 'discordMembers',
    },
  ],
};
