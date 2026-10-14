import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";

import { ExploreHero } from "@/sections/explore/ExploreHero";
import { SemesterAccordion } from "@/sections/explore/SemesterAccordion";
import {
  EXPLORE_SEMESTERS,
  FEATURED_SUBJECT,
} from "@/sections/explore/explore.data";

export const metadata = {
  title: "Explore — VLabs",
  description:
    "Browse every circuit, component, and lab organised by semester. " +
    "Interact with live 3D breadboard scenes and follow step-by-step tutorials.",
};

// Very-light square grid backdrop — same visual language as the page in the
// design reference (faint ruled lines on a near-white surface).
const GRID_STYLE = {
  backgroundImage: [
    "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "40px 40px",
  backgroundColor: "#f7f6f4",
  minHeight: "100vh",
} as const;

export default function ExplorePage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <div style={GRID_STYLE}>
        <main>
          <ExploreHero featured={FEATURED_SUBJECT} />
          <SemesterAccordion semesters={EXPLORE_SEMESTERS} />
        </main>
      </div>
      <Footer />
    </MenuStyleProvider>
  );
}
