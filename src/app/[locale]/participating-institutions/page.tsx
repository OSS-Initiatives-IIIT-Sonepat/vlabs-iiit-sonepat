import { MenuStyleProvider } from "@/platform/menu-style";
import { Menu } from "@/sections/menu";
import { Footer } from "@/sections/footer";
import { ParticipatingInstitutionsSections } from "@/sections/participating-institutions";

export const metadata = {
  title: "Participating Institutions — VLabs",
  description:
    "Invite your institute to co-build VLabs modules and labs with IIIT Sonepat’s Technical Society. Apply via form or email technicalsociety@iiitsonepat.ac.in.",
};

export default function ParticipatingInstitutionsPage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <main>
        <ParticipatingInstitutionsSections />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}
