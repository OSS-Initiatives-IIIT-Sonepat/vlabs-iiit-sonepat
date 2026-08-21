import { styled } from '@linaria/react';
import { type ReactNode } from 'react';

import { MenuStyleProvider } from '@/platform/menu-style';
import { Menu } from '@/sections/menu';
import { Footer } from '@/sections/footer';
import { DocsSidebar } from '@/sections/docs/DocsSidebar';
import {
  color,
  fontFamily,
  mediaUp,
  semanticColor,
  spacing,
} from '@/tokens';

export const metadata = {
  title: 'Docs — VLabs',
  description:
    'Developer reference for adding components, writing circuit definitions, ' +
    'and working with the VLabs lab system.',
};

const COMMUNITY_STATS = { githubStars: 24000, discordMembers: 7000 };

// ── Layout shell ─────────────────────────────────────────────────────────

const PageShell = styled.div`
  background-color: #f7f6f4;
  min-height: 100vh;
`;

const DocsGrid = styled.div`
  display: block;
  margin-inline: auto;
  max-width: 1280px;
  padding-inline: ${spacing(4)};
  padding-top: ${spacing(8)};
  padding-bottom: ${spacing(20)};

  ${mediaUp('md')} {
    display: grid;
    gap: ${spacing(12)};
    grid-template-columns: 220px 1fr;
    padding-inline: ${spacing(10)};
  }
`;

// ── Sidebar wrapper (sticky on desktop) ──────────────────────────────────

const SidebarWrapper = styled.aside`
  display: none;

  ${mediaUp('md')} {
    display: block;
    position: sticky;
    top: calc(64px + ${spacing(6)});   /* clear the menu */
    align-self: start;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    padding-bottom: ${spacing(4)};

    /* Subtle scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.12) transparent;
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 2px; }
  }
`;

// ── Divider between sidebar and content ──────────────────────────────────

const SidebarBorder = styled.div`
  display: none;

  ${mediaUp('md')} {
    border-right: 1px solid rgba(0,0,0,0.07);
    display: block;
    grid-column: 1;
    grid-row: 1;
    position: absolute;  /* not in flow — just the visual line */
  }
`;

const ContentArea = styled.main`
  min-width: 0;
`;

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <MenuStyleProvider>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Menu scheme="muted" {...({ communityStats: COMMUNITY_STATS } as any)} />
      <PageShell>
        <DocsGrid>
          <SidebarWrapper>
            <DocsSidebar />
          </SidebarWrapper>
          <ContentArea>{children}</ContentArea>
        </DocsGrid>
      </PageShell>
      <Footer />
    </MenuStyleProvider>
  );
}
