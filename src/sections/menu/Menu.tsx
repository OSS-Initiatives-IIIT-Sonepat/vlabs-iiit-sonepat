'use client';

import { Drawer } from '@base-ui/react/drawer';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { useCallback, useState } from 'react';

import { VLabsLogo } from '@/icons';
import { MENU_STYLE_BACKGROUND_VAR, useMenuStyle } from '@/platform/menu-style';
import {
  SHADOW,
  DURATION,
  EASING,
  buildSchemeDeclarations,
  color,
  mediaUp,
  MENU_HEIGHT_PX,
  type Scheme,
  semanticColor,
  spacing,
  Z_INDEX,
} from '@/tokens';
import { Button, Container, IconButton } from '@/ui';

import { MenuDrawer } from './components/MenuDrawer';
import { MenuNav } from './components/MenuNav';
import { MenuSocial } from './components/MenuSocial';
import { MENU } from './data/menu';
import { CloseDrawerOnDesktopEffect } from './effect-components/CloseDrawerOnDesktopEffect';
import { ScrollStateEffect } from './effect-components/ScrollStateEffect';

const headerClassName = css`
  background-color: var(${MENU_STYLE_BACKGROUND_VAR}, ${semanticColor.surface});
  color: ${semanticColor.ink};
  position: sticky;
  top: 0;
  transition:
    background-color ${DURATION.md} ${EASING.gentle},
    box-shadow 0.2s ${EASING.gentle},
    color ${DURATION.md} ${EASING.gentle};
  width: 100%;
  z-index: ${Z_INDEX.stickyHeader};

  &[data-scheme='light'] {
    ${buildSchemeDeclarations('light')}
  }

  &[data-scheme='muted'] {
    ${buildSchemeDeclarations('muted')}
  }

  &[data-scheme='dark'] {
    ${buildSchemeDeclarations('dark')}
  }

  &[data-elevated] {
    box-shadow: ${SHADOW.header};
  }

  &[data-pinned] {
    transition: box-shadow 0.2s ${EASING.gentle};
  }
`;

const MenuRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing(5)};
  justify-content: space-between;
  min-height: ${MENU_HEIGHT_PX}px;
`;

const LogoLink = styled.a`
  display: grid;
  text-decoration: none;

  &:focus-visible {
    outline: 1px solid ${color('blue')};
    outline-offset: 1px;
  }
`;

const DesktopActions = styled.div`
  display: none;

  ${mediaUp('md')} {
    align-items: center;
    display: flex;
    gap: ${spacing(2)};
  }
`;

const MobileActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing(2)};

  ${mediaUp('md')} {
    display: none;
  }
`;

export type MenuProps = { scheme?: Scheme;
};

export function Menu({ communityStats, scheme = 'light' }: MenuProps) {  const { activeScheme, override } = useMenuStyle();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);
  const resolvedScheme = override.scheme ?? activeScheme ?? scheme;

  const handleScrollStateChange = useCallback(
    (hasScrolled: boolean, isScrolling: boolean) => {
      setIsElevated(hasScrolled || isScrolling);
    },
    [],
  );

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <CloseDrawerOnDesktopEffect onClose={closeDrawer} />
      <ScrollStateEffect onScrollStateChange={handleScrollStateChange} />
      <header
        className={headerClassName}
        data-elevated={
          isElevated && !override.suppressElevation ? '' : undefined
        }
        data-pinned={override.scheme !== undefined ? '' : undefined}
        data-scheme={resolvedScheme}
      >
        <Container>
          <MenuRow>
            <Drawer.Close
              nativeButton={false}
              render={<LogoLink aria-label="Home" href="/" />}
            >
              <VLabsLogo sizePx={40} />
            </Drawer.Close>
            <MenuNav items={MENU.navItems} />
            <MenuSocial links={MENU.socialLinks} stats={communityStats} />
             <DesktopActions>
                <Button
                  href={MENU.appUrl}
                  label="Get started"
                  size="small"
                />
              </DesktopActions>
             <MobileActions>
               <Button href={MENU.appUrl} label="Get started" />
               <IconButton
                 ariaLabel={
                   isDrawerOpen
                     ? "Close menu"
                     : "Open menu"
                 }
                onClick={() => setIsDrawerOpen((previous) => !previous)}
              >
                {isDrawerOpen ? (
                  <IconX size={16} stroke={1.6} />
                ) : (
                  <IconMenu2 size={16} stroke={1.6} />
                )}
              </IconButton>
            </MobileActions>
          </MenuRow>
        </Container>
      </header>
      <MenuDrawer
        scheme={resolvedScheme}
        navItems={MENU.navItems}
        socialLinks={MENU.socialLinks}
        stats={communityStats}
      />
    </Drawer.Root>
  );
}




