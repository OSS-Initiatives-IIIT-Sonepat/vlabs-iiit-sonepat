import { MenuStyleProvider } from '@/platform/menu-style';
import { FeatureCards } from '@/sections/feature-cards';
import { Helped } from '@/sections/helped';
import { HomeHero } from '@/sections/home-hero';
import { Menu } from '@/sections/menu';
import { Testimonials } from '@/sections/testimonials';
import { ThreeCards } from '@/sections/three-cards';
import { Footer } from '@/sections/footer';

export default function HomePage() {
  return (
    <MenuStyleProvider>
      <Menu scheme="muted" />
      <main>
        <HomeHero />
        <ThreeCards />
        <FeatureCards />
        <Helped />
        <Testimonials />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}

