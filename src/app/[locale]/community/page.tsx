import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { CommunitySections } from "@/sections/community";

export const metadata = {
  title: "Community — VLabs",
  description:
    "VLabs is a libre, open-source virtual ECE laboratory built by the Technical Society " +
    "of IIIT Sonepat. Learn about the project, its origins, and how to contribute.",
};

export default function CommunityPage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <main>
        <CommunitySections />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}
