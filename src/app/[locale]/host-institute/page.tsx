import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { HostInstituteSections } from "@/sections/host-institute";

export const metadata = {
  title: "Host Institute — VLabs",
  description:
    "VLabs is hosted by IIIT Sonepat and was started by its Technical Society as an open-source virtual ECE laboratory initiative.",
};

export default function HostInstitutePage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <main>
        <HostInstituteSections />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}
