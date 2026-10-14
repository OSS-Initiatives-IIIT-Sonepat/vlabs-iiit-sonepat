import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { BlogHero } from "@/sections/blog";

export const metadata = {
  title: "Blog — VLabs",
  description:
    "Stories, updates, and engineering notes from the VLabs Team. " +
    "Behind-the-scenes looks at 3D rendering, circuit simulation, and open-source education.",
};

export default function BlogPage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <main>
        <BlogHero />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}
