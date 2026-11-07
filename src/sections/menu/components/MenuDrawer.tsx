"use client";

import { Drawer } from "@base-ui/react/drawer";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

import { locales } from "@/i18n/config";
import { type Scheme } from "@/tokens";
import { Button, ExternalArrow, ExternalLink, VerticalDivider } from "@/ui";

import { MENU } from "../data/menu";
import { type MenuNavItem } from "../types/menu-nav-item";
import { type MenuSocialLink } from "../types/menu-social-link";

/* ─── Shared class strings ─────────────────────────────────────────────────── */

const drawerItemClassName = [
  "block w-full cursor-pointer border-none bg-none p-0",
  "font-mono text-[calc(var(--font-base)*8)] font-light",
  "leading-[38px] tracking-[0] text-start uppercase no-underline",
  "text-[var(--ink)]",
  "focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-1",
].join(" ");

const drawerChildClassName = [
  "flex items-center gap-[8px]",
  "font-mono text-[calc(var(--font-base)*4)] font-medium",
  "uppercase no-underline",
  "text-[var(--ink-muted)]",
  "focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-1",
].join(" ");

/* ─── Component ────────────────────────────────────────────────────────────── */

export type MenuDrawerProps = {
  navItems: readonly MenuNavItem[];
  scheme: Scheme;
  socialLinks: readonly MenuSocialLink[];
};

export function MenuDrawer({ navItems, scheme, socialLinks }: MenuDrawerProps) {
  const pathname = usePathname();
  const [isGroupExpanded, setIsGroupExpanded] = useState(false);
  const landingFonts =
    pathname === "/" || locales.some((locale) => pathname === `/${locale}`)
      ? "landing-fonts"
      : "";

  return (
    <Drawer.Portal>
      <Drawer.Popup
        aria-label="Navigation menu"
        className={`fixed inset-x-0 top-0 grid grid-rows-[1fr_auto_auto] h-dvh w-screen overflow-y-auto bg-[var(--surface)] px-[28px] pt-[88px] pb-[16px] z-[90] opacity-100 transition-[opacity,transform] duration-[200ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-2 data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-2 ${landingFonts}`}
        data-scheme={scheme}
      >
        {/* DrawerNav */}
        <nav
          aria-label="Primary"
          className="grid w-full grid-cols-1 content-center [&>*+*]:mt-[32px]"
        >
          {navItems.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && (
                <span
                  aria-hidden
                  className="block h-px w-full"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, var(--ink-muted) 0, var(--ink-muted) 1px, transparent 2px, transparent 4px)",
                  }}
                />
              )}
              {item.children === undefined ? (
                <Drawer.Close
                  nativeButton={false}
                  render={
                    <a
                      href={item.href ?? "/"}
                      className={drawerItemClassName}
                    />
                  }
                >
                  {item.label}
                </Drawer.Close>
              ) : (
                <div>
                  <button
                    className={`${drawerItemClassName} flex items-center justify-between gap-[8px] [&>svg]:transition-transform [&>svg]:duration-[0.24s] [&>svg]:ease-standard`}
                    data-expanded={isGroupExpanded ? "" : undefined}
                    onClick={() => setIsGroupExpanded((previous) => !previous)}
                    type="button"
                  >
                    {item.label}
                    <IconChevronDown
                      className={isGroupExpanded ? "rotate-180" : ""}
                      size={20}
                      stroke={1.6}
                    />
                  </button>
                  {isGroupExpanded && (
                    <div className="grid pt-[20px] [&>*+*]:mt-[20px]">
                      {item.children.map((child) =>
                        child.external === true ? (
                          <ExternalLink
                            className={drawerChildClassName}
                            href={child.href}
                            key={child.href}
                          >
                            {child.label}
                            <ExternalArrow />
                          </ExternalLink>
                        ) : (
                          <Drawer.Close
                            key={child.href}
                            nativeButton={false}
                            render={
                              <a
                                className={drawerChildClassName}
                                href={child.href}
                              />
                            }
                          >
                            {child.label}
                          </Drawer.Close>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </nav>

        {/* SocialRow */}
        <div className="grid auto-cols-auto grid-flow-col items-center justify-center gap-x-[24px]">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Fragment key={link.href}>
                {index > 0 && <VerticalDivider aria-hidden />}
                <ExternalLink
                  aria-label={link.ariaLabel}
                  className="grid auto-cols-auto grid-flow-col items-center gap-x-[12px] font-sans text-[calc(var(--font-base)*3)] font-medium leading-[14px] text-[var(--ink)] no-underline whitespace-nowrap focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-1"
                  href={link.href}
                >
                  <IconComponent aria-hidden size={16} />
                  <ExternalArrow />
                </ExternalLink>
              </Fragment>
            );
          })}
        </div>
      </Drawer.Popup>
    </Drawer.Portal>
  );
}
