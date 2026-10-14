"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import {
  Body,
  Eyebrow,
  Heading,
  HeadingPair,
  Pagination,
  SectionIntro,
  SectionShell,
  SectionStack,
} from "@/ui";
import { IllustrationCard } from "@/sections/three-cards/IllustrationCard";
import { COMPONENTS_DATA } from "@/sections/components/components.data";

export default function ComponentsPage() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const cards = Object.values(COMPONENTS_DATA).map((comp) => ({
    heading: comp.name,
    body: comp.tagline,
    illustration: comp.kind,
    actionHref: `/components/${comp.slug}`,
    attribution: {
      role: "Component",
      company: comp.specs[0]?.value || "Detail",
    },
  }));

  const componentsPerPage = 9;

  const visibleCards = cards.slice(
    page * componentsPerPage,
    (page + 1) * componentsPerPage,
  );

  const totalPages = Math.ceil(cards.length / componentsPerPage);

  const handlePageChange = (
    nextPage: number,
    nextDirection: "left" | "right",
  ) => {
    setDirection(nextDirection);
    setPage(nextPage);
  };

  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />

      <main>
        <SectionShell scheme="light">
          <SectionStack>
            <SectionIntro>
              <Eyebrow>Component Library</Eyebrow>

              <HeadingPair>
                <div className="md:max-w-[921px] [&_[data-accent]]:tracking-[-0.02em]">
                  <Heading as="h1" size="lg" weight="light">
                    Explore all electronics components
                  </Heading>
                </div>

                <div className="md:max-w-[571px]">
                  <Body muted size="sm">
                    Interactive 3D models and detailed specifications for every
                    building block in our virtual laboratory.
                  </Body>
                </div>
              </HeadingPair>
            </SectionIntro>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={page}
                initial={{
                  opacity: 0,
                  x: direction === "right" ? 20 : -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction === "right" ? -20 : 20,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 gap-[calc(var(--spacing-base)*4)] md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleCards.map((card) => (
                  <IllustrationCard card={card} key={card.illustration} />
                ))}
              </motion.div>
            </AnimatePresence>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </SectionStack>
        </SectionShell>
      </main>

      <Footer />
    </MenuStyleProvider>
  );
}
