import { type ReactNode } from "react";

import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { DocsSidebar } from "@/sections/docs/DocsSidebar";

export const metadata = {
  title: "Docs — VLabs",
  description:
    "Developer reference for adding components, writing circuit definitions, " +
    "and working with the VLabs lab system.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <div className="bg-[#f7f6f4] min-h-screen">
        <div className="block mx-auto max-w-[1280px] px-[calc(var(--spacing-base)*4)] pt-[calc(var(--spacing-base)*8)] pb-[calc(var(--spacing-base)*20)] md:grid md:gap-[calc(var(--spacing-base)*12)] md:grid-cols-[220px_1fr] md:px-[calc(var(--spacing-base)*10)]">
          <aside className="hidden md:block md:sticky md:top-[calc(64px+calc(var(--spacing-base)*6))] md:self-start md:max-h-[calc(100vh-80px)] md:overflow-y-auto md:pb-[calc(var(--spacing-base)*4)] md:[scrollbar-width:thin] md:[scrollbar-color:rgba(0,0,0,0.12)_transparent] md:[&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar-thumb]:bg-black/[0.12] md:[&::-webkit-scrollbar-thumb]:rounded-sm">
            <DocsSidebar />
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </MenuStyleProvider>
  );
}
