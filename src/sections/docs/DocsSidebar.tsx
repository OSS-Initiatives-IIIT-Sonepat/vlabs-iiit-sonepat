'use client';

import { styled } from '@linaria/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  color,
  DURATION,
  EASING,
  FONT_WEIGHT,
  fontFamily,
  mediaUp,
  radius,
  semanticColor,
  spacing,
} from '@/tokens';

// ── Data ──────────────────────────────────────────────────────────────────

export type DocNavItem = {
  href: string;
  label: string;
};

export type DocNavGroup = {
  label: string;
  items: DocNavItem[];
};

export const DOCS_NAV: DocNavGroup[] = [
  {
    label: 'Getting Started',
    items: [
      { href: '/docs', label: 'Overview' },
      { href: '/docs/quickstart', label: 'Quickstart' },
    ],
  },
  {
    label: 'Adding Components',
    items: [
      { href: '/docs/components', label: 'Component types' },
      { href: '/docs/geometry', label: 'Writing geometry' },
      { href: '/docs/registry', label: 'Registry & renderer' },
    ],
  },
  {
    label: 'Building Circuits',
    items: [
      { href: '/docs/circuits', label: 'Circuit schema' },
      { href: '/docs/pins', label: 'Pin references' },
      { href: '/docs/steps', label: 'Steps & highlighting' },
      { href: '/docs/columns', label: 'Column layout guide' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/docs/types', label: 'TypeScript types' },
      { href: '/docs/constraints', label: 'Constraints & rules' },
    ],
  },
];

// ── Styles ─────────────────────────────────────────────────────────────────

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing(6)};
`;

const GroupLabel = styled.p`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.10em;
  margin-bottom: ${spacing(1)};
  text-transform: uppercase;
`;

const GroupItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  list-style: none;
`;

const NavLinkEl = styled.a<{ $active: boolean }>`
  border-radius: ${radius(1)};
  color: ${({ $active }) => ($active ? color('blue') : semanticColor.ink)};
  display: block;
  font-family: ${fontFamily('sans')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? FONT_WEIGHT.medium : FONT_WEIGHT.regular)};
  padding: ${spacing(1)} ${spacing(2)};
  text-decoration: none;
  transition: background-color ${DURATION.sm} ${EASING.standard},
              color ${DURATION.sm} ${EASING.standard};
  background-color: ${({ $active }) =>
    $active ? `${color('blue')}12` : 'transparent'};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? `${color('blue')}18` : 'rgba(0,0,0,0.04)'};
    color: ${({ $active }) => ($active ? color('blue') : semanticColor.ink)};
  }

  /* Active left-border accent */
  position: relative;

  &::before {
    background-color: ${color('blue')};
    border-radius: 1px;
    content: '';
    height: 60%;
    left: 0;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    position: absolute;
    top: 20%;
    transition: opacity ${DURATION.sm} ${EASING.standard};
    width: 2px;
  }
`;

// ── Component ─────────────────────────────────────────────────────────────

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Nav aria-label="Documentation navigation">
      {DOCS_NAV.map((group) => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          <GroupItems>
            {group.items.map((item) => {
              const active =
                item.href === '/docs'
                  ? pathname === '/docs'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <NavLinkEl
                    as={Link}
                    href={item.href}
                    $active={active}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </NavLinkEl>
                </li>
              );
            })}
          </GroupItems>
        </div>
      ))}
    </Nav>
  );
}
