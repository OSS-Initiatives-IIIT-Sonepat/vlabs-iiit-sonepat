"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment } from "react";

import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";
import { VerticalDivider } from "@/ui";

import { type MenuNavItem } from "../types/menu-nav-item";
import { MenuDropdown } from "./MenuDropdown";

/**
 * Shared base classes for nav links and triggers.
 *
 * Complex pseudo-element and data-attribute styles that can't be expressed with
 * pure Tailwind utilities are handled via inline styles or the style prop.
 */
const navItemClassName = [
  "cursor-pointer border-none bg-none p-0",
  "font-mono text-[calc(var(--font-base)*3)] font-medium",
  "tracking-[0] uppercase no-underline relative",
  "text-[var(--ink)] transition-colors duration-[0.2s] ease-gentle",
  "hover:text-[var(--color-blue)]",
  "data-[active]:text-[var(--color-blue)]",
  "focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-1",
].join(" ");

export type MenuNavProps = {
  items: readonly MenuNavItem[];
};

export function MenuNav({ items }: MenuNavProps) {
  const pathname = usePathname();
  const landingFonts =
    pathname === "/" || locales.some((locale) => pathname === `/${locale}`)
      ? "landing-fonts"
      : "";

  return (
    <NavigationMenu.Root aria-label="Primary">
      {/* NavList */}
      <NavigationMenu.List className="hidden list-none p-0 md:grid md:auto-cols-auto md:grid-flow-col md:items-center md:gap-x-[32px]">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <VerticalDivider aria-hidden />}
            <NavigationMenu.Item>
              {item.children === undefined ? (
                <NavigationMenu.Link
                  className={navItemClassName}
                  data-active={pathname === item.href ? "" : undefined}
                  render={<a href={item.href ?? "/"} />}
                >
                  {item.label}
                </NavigationMenu.Link>
              ) : (
                <>
                  <NavigationMenu.Trigger
                    className={`${navItemClassName} inline-flex items-center gap-x-[4px] data-[popup-open]:text-[var(--color-blue)]`}
                  >
                    {item.label}
                    <NavigationMenu.Icon className="inline-flex shrink-0 transition-transform duration-[0.24s] ease-standard [[data-popup-open]>&]:rotate-180 [&>svg]:block">
                      <IconChevronDown size={12} stroke={2} />
                    </NavigationMenu.Icon>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <MenuDropdown items={item.children} />
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          </Fragment>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          align="start"
          className={`origin-[var(--transform-origin)] z-[300] ${landingFonts}`}
          sideOffset={16}
        >
          <NavigationMenu.Popup className="bg-[var(--surface)] border border-[var(--line)] rounded-[calc(var(--radius-base)*3)] shadow-popup opacity-100 overflow-hidden transition-[opacity,transform] duration-[0.2s,0.24s] ease-[ease,cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-1 data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-1">
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
