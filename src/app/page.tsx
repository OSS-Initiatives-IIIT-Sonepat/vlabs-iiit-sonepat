import { MenuStyleProvider } from '@/platform/menu-style';
import { FeatureCards } from '@/sections/feature-cards';
import { Helped } from '@/sections/helped';
import { HomeHero } from '@/sections/home-hero';
import { Menu } from '@/sections/menu';
import { Testimonials } from '@/sections/testimonials';
import { Problem } from '@/sections/problem';
import { ThreeCards } from '@/sections/three-cards';
import { TrustedBy } from '@/sections/trusted-by';
import { Footer } from '@/sections/footer';

export default function HomePage() {
  const communityStats = { githubStars: 24000, discordMembers: 7000 };

  return (
    <MenuStyleProvider>
      <Menu communityStats={communityStats} scheme="muted" />
      <main>
        <HomeHero />
        <TrustedBy />
        <Problem />
        <ThreeCards />
        <FeatureCards />
        <Helped />
        <Testimonials />
      </main>
      <Footer />
    </MenuStyleProvider>
  );
}

