import { styled } from '@linaria/react';

import { DiscordMark, GitHubMark, VLabsLogo } from '@/icons';
import {
  color,
  EASING,
  FONT_WEIGHT,
  fontFamily,
  fontSize,
  mediaUp,
  radius,
  spacing,
} from '@/tokens';
import { Container } from '@/ui';

// ── Colours (explicit — no scheme variables) ──────────────────────────────────
const DARK_BG   = '#0f0e0d';
const CARD_BG   = '#ffffff';
const CARD_BORDER = 'rgba(0,0,0,0.08)';
const INK       = '#111110';
const MUTED     = '#6b6a68';
const SUBTLE    = '#a8a7a4';
const RULE      = 'rgba(0,0,0,0.08)';

// ── Outer dark shell ──────────────────────────────────────────────────────────
const FooterRoot = styled.footer`
  background-color: ${DARK_BG};
  width: 100%;
  /* extra top space so the white card has dark sky above it */
  padding-top: ${spacing(20)};
`;

// ── White card (notched top-left corner) ──────────────────────────────────────
// The notch is a CSS clip-path polygon that cuts the top-left corner.
const Card = styled.div`
  background-color: ${CARD_BG};
  border: 1px solid ${CARD_BORDER};
  border-bottom: none;
  /* notch: cut 32px in from left and 32px down from top */
  clip-path: polygon(32px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 32px);
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 ${spacing(6)};
  position: relative;
  width: 100%;

  ${mediaUp('md')} {
    padding: 0 ${spacing(10)};
  }
`;

// SVG notch border accent (draws the diagonal cut line)
const NotchAccent = styled.svg`
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
`;

// ── Card top band: logo + nav ─────────────────────────────────────────────────
const TopBand = styled.div`
  display: grid;
  gap: ${spacing(12)};
  padding-top: ${spacing(12)};
  padding-bottom: ${spacing(10)};
  grid-template-columns: 1fr;

  ${mediaUp('md')} {
    align-items: start;
    gap: ${spacing(8)};
    grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
    padding-top: ${spacing(14)};
    padding-bottom: ${spacing(12)};
  }
`;

// Brand column
const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(5)};
  max-width: 300px;
`;

const Tagline = styled.p`
  color: ${MUTED};
  font-family: ${fontFamily('sans')};
  font-size: 15px;
  line-height: 1.65;
  margin: 0;
`;

const SocialRow = styled.div`
  display: flex;
  gap: ${spacing(2)};
  margin-top: ${spacing(1)};
`;

const SocialLink = styled.a`
  align-items: center;
  border: 1px solid ${RULE};
  border-radius: ${radius(1)};
  color: ${MUTED};
  display: inline-flex;
  height: 36px;
  justify-content: center;
  text-decoration: none;
  transition:
    border-color 0.15s ${EASING.standard},
    color 0.15s ${EASING.standard};
  width: 36px;

  &:hover {
    border-color: rgba(0,0,0,0.20);
    color: ${INK};
  }
`;

// Nav columns
const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(5)};
`;

const NavLabel = styled.p`
  color: ${SUBTLE};
  font-family: ${fontFamily('sans')};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.10em;
  margin: 0;
  text-transform: uppercase;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`;

const NavLink = styled.a`
  color: ${MUTED};
  font-family: ${fontFamily('sans')};
  font-size: 15px;
  text-decoration: none;
  transition: color 0.15s ${EASING.standard};
  width: fit-content;

  &:hover {
    color: ${INK};
  }
`;

// ── Divider ───────────────────────────────────────────────────────────────────
const Rule = styled.div`
  border-top: 1px solid ${RULE};
`;

// ── Bottom band ───────────────────────────────────────────────────────────────
const BottomBand = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing(4)};
  justify-content: space-between;
  padding-bottom: ${spacing(10)};
  padding-top: ${spacing(6)};

  ${mediaUp('md')} {
    flex-direction: row;
    gap: 0;
  }
`;

const Copyright = styled.p`
  color: ${SUBTLE};
  font-family: ${fontFamily('sans')};
  font-size: 13px;
  margin: 0;
`;

const Badge = styled.span`
  align-items: center;
  border: 1px solid ${RULE};
  border-radius: ${radius(5)};
  color: ${SUBTLE};
  display: inline-flex;
  font-family: ${fontFamily('mono')};
  font-size: 11px;
  gap: ${spacing(2)};
  letter-spacing: 0.04em;
  padding: ${spacing(1)} ${spacing(3)};
`;

const Dot = styled.span`
  background: #3a8a4a;
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
  height: 6px;
  width: 6px;
`;

// ── Component ─────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <FooterRoot>
      <Card>
        {/* Notch corner accent line */}
        <NotchAccent
          aria-hidden
          fill="none"
          height="33"
          width="33"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 1 L1 32"
            stroke={RULE}
            strokeWidth="1"
          />
        </NotchAccent>

        <TopBand>
          {/* Brand */}
          <BrandCol>
            <VLabsLogo sizePx={30} />
            <Tagline>
              Virtual ECE labs — explore components,
              build circuits, and learn electronics
              through interactive 3D.
            </Tagline>
            <SocialRow>
              <SocialLink
                aria-label="GitHub"
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHubMark size={16} />
              </SocialLink>
              <SocialLink
                aria-label="Discord"
                href="https://discord.gg/5MaJbxFnm"
                rel="noopener noreferrer"
                target="_blank"
              >
                <DiscordMark size={16} />
              </SocialLink>
            </SocialRow>
          </BrandCol>

          {/* Labs */}
          <NavCol>
            <NavLabel>Labs</NavLabel>
            <NavLinks>
              <NavLink href="/labs/half-adder">Half Adder</NavLink>
              <NavLink href="/labs/half-adder">Full Adder</NavLink>
              <NavLink href="/labs/half-adder">SR Latch</NavLink>
              <NavLink href="/labs/half-adder">Logic Gates</NavLink>
            </NavLinks>
          </NavCol>

          {/* Components */}
          <NavCol>
            <NavLabel>Components</NavLabel>
            <NavLinks>
              <NavLink href="/labs/half-adder">Breadboard</NavLink>
              <NavLink href="/labs/half-adder">Resistors</NavLink>
              <NavLink href="/labs/half-adder">Capacitors</NavLink>
              <NavLink href="/labs/half-adder">LEDs</NavLink>
              <NavLink href="/labs/half-adder">ICs &amp; Gates</NavLink>
            </NavLinks>
          </NavCol>

          {/* Project */}
          <NavCol>
            <NavLabel>Project</NavLabel>
            <NavLinks>
              <NavLink
                href="https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub ↗
              </NavLink>
              <NavLink
                href="https://discord.gg/5MaJbxFnm"
                rel="noopener noreferrer"
                target="_blank"
              >
                Discord ↗
              </NavLink>
              <NavLink href="#">Contributing</NavLink>
              <NavLink href="#">CONTRIBUTING.md</NavLink>
            </NavLinks>
          </NavCol>
        </TopBand>

        <Rule />

        <BottomBand>
          <Copyright>© 2026 vlabs — open source ECE labs</Copyright>
          <Badge><Dot />Open source</Badge>
        </BottomBand>
      </Card>
    </FooterRoot>
  );
}
