"use client";

import { Drawer } from "@base-ui/react/drawer";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useCallback, useState } from "react";

import { VLabsLogo } from "@/icons";
import { MENU_STYLE_BACKGROUND_VAR, useMenuStyle } from "@/platform/menu-style";
import { type Scheme } from "@/tokens";
import { Button, Container, IconButton } from "@/ui";

import { MenuDrawer } from "./components/MenuDrawer";
import { MenuNav } from "./components/MenuNav";
import { CommandPalette } from "./components/MenuSearch";
import { MenuSocial } from "./components/MenuSocial";
import { MENU } from "./data/menu";
import { CloseDrawerOnDesktopEffect } from "./effect-components/CloseDrawerOnDesktopEffect";
import { ScrollStateEffect } from "./effect-components/ScrollStateEffect";

export type MenuProps = {
  scheme?: Scheme;
};

export function Menu({ scheme = "light" }: MenuProps) {
  const { activeScheme, override } = useMenuStyle();
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
        className="sticky top-0 w-full z-[200] transition-[background-color,box-shadow,color] duration-md ease-gentle data-[elevated]:shadow-header data-[pinned]:transition-[box-shadow] data-[pinned]:duration-[0.2s] data-[pinned]:ease-gentle"
        data-elevated={
          isElevated && !override.suppressElevation ? "" : undefined
        }
        data-pinned={override.scheme !== undefined ? "" : undefined}
        data-scheme={resolvedScheme}
        style={{
          backgroundColor: `var(${MENU_STYLE_BACKGROUND_VAR}, var(--surface))`,
          color: "var(--ink)",
        }}
      >
        <Container>
          <div className="flex min-h-[64px] items-center justify-between gap-5">
            <Drawer.Close
              nativeButton={false}
              render={
                <a
                  aria-label="Home"
                  href="/"
                  className="grid no-underline focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-1"
                />
              }
            >
              <VLabsLogo sizePx={52} />
            </Drawer.Close>
            <MenuNav items={MENU.navItems} />
            <div className="hidden md:block">
              <CommandPalette />
            </div>
            <MenuSocial links={MENU.socialLinks} />
            <div className="hidden items-center gap-4 md:flex">
              <Button href={MENU.appUrl} label="Get started" size="small" />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Button href={MENU.appUrl} label="Get started" />
              <IconButton
                ariaLabel={isDrawerOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsDrawerOpen((previous) => !previous)}
              >
                {isDrawerOpen ? (
                  <IconX size={16} stroke={1.6} />
                ) : (
                  <IconMenu2 size={16} stroke={1.6} />
                )}
              </IconButton>
            </div>
          </div>
        </Container>
      </header>
      <MenuDrawer
        scheme={resolvedScheme}
        navItems={MENU.navItems}
        socialLinks={MENU.socialLinks}
      />
    </Drawer.Root>
  );
}
