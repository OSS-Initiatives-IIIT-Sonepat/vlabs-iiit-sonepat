import { styled } from '@linaria/react';
import { type ReactNode } from 'react';

import {
  color,
  DURATION,
  EASING,
  FONT_WEIGHT,
  fontFamily,
  radius,
  semanticColor,
  spacing,
  typeRampDeclarations,
} from '@/tokens';

// ── Prose container ───────────────────────────────────────────────────────
// Applies typography to all child elements in a doc page.

export const Prose = styled.div`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  max-width: 72ch;

  /* ── Headings ─────────────────────────────────────────────────────── */
  h1 {
    ${typeRampDeclarations('headingLg')}
    font-family: ${fontFamily('serif')};
    font-weight: ${FONT_WEIGHT.light};
    letter-spacing: -0.03em;
    line-height: 1.18;
    margin-bottom: ${spacing(4)};
  }

  h2 {
    ${typeRampDeclarations('headingMd')}
    font-family: ${fontFamily('sans')};
    font-weight: ${FONT_WEIGHT.medium};
    letter-spacing: -0.03em;
    margin-top: ${spacing(10)};
    margin-bottom: ${spacing(3)};
    padding-bottom: ${spacing(2)};
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }

  h3 {
    ${typeRampDeclarations('headingSm')}
    font-family: ${fontFamily('sans')};
    font-weight: ${FONT_WEIGHT.medium};
    letter-spacing: -0.02em;
    margin-top: ${spacing(6)};
    margin-bottom: ${spacing(2)};
  }

  /* ── Body text ────────────────────────────────────────────────────── */
  p {
    ${typeRampDeclarations('bodyMd')}
    color: ${semanticColor.inkMuted};
    line-height: 1.7;
    margin-bottom: ${spacing(4)};
  }

  /* ── Lists ────────────────────────────────────────────────────────── */
  ul, ol {
    ${typeRampDeclarations('bodyMd')}
    color: ${semanticColor.inkMuted};
    line-height: 1.7;
    margin-bottom: ${spacing(4)};
    padding-left: ${spacing(5)};
  }

  li {
    margin-bottom: ${spacing(1)};
  }

  /* ── Code ─────────────────────────────────────────────────────────── */
  code {
    background-color: rgba(0,0,0,0.055);
    border-radius: ${radius(1)};
    font-family: ${fontFamily('mono')};
    font-size: 0.875em;
    padding: 0.15em 0.4em;
  }

  pre {
    background-color: #1a1918;
    border-radius: ${radius(2)};
    color: #e8e4dc;
    font-family: ${fontFamily('mono')};
    font-size: 13px;
    line-height: 1.65;
    margin-bottom: ${spacing(6)};
    overflow-x: auto;
    padding: ${spacing(5)};

    code {
      background: none;
      border-radius: 0;
      color: inherit;
      font-size: inherit;
      padding: 0;
    }
  }

  /* ── Horizontal rule ──────────────────────────────────────────────── */
  hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.07);
    margin: ${spacing(8)} 0;
  }

  /* ── Blockquote ───────────────────────────────────────────────────── */
  blockquote {
    border-left: 3px solid ${color('blue')};
    color: ${semanticColor.inkMuted};
    font-style: italic;
    margin: ${spacing(4)} 0;
    padding-left: ${spacing(4)};
  }

  /* ── Strong / em ──────────────────────────────────────────────────── */
  strong { color: ${semanticColor.ink}; font-weight: ${FONT_WEIGHT.medium}; }
  em     { font-style: italic; }

  /* ── Tables ───────────────────────────────────────────────────────── */
  table {
    border-collapse: collapse;
    font-size: 14px;
    margin-bottom: ${spacing(6)};
    width: 100%;
  }

  th {
    background-color: rgba(0,0,0,0.03);
    border-bottom: 1px solid rgba(0,0,0,0.10);
    color: ${semanticColor.ink};
    font-weight: ${FONT_WEIGHT.medium};
    padding: ${spacing(2)} ${spacing(3)};
    text-align: left;
  }

  td {
    border-bottom: 1px solid rgba(0,0,0,0.06);
    color: ${semanticColor.inkMuted};
    padding: ${spacing(2)} ${spacing(3)};
    vertical-align: top;
  }

  tr:last-child td { border-bottom: none; }
`;

// ── Eyebrow label (small category tag above the page title) ──────────────
export const DocEyebrow = styled.p`
  color: ${color('blue')};
  font-family: ${fontFamily('sans')};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT.medium};
  letter-spacing: 0.10em;
  margin-bottom: ${spacing(2)};
  text-transform: uppercase;
`;

// ── Callout box ───────────────────────────────────────────────────────────
export const Callout = styled.div<{ $tone?: 'info' | 'warn' | 'tip' }>`
  background-color: ${({ $tone }) =>
    $tone === 'warn' ? 'rgba(221,96,0,0.07)' :
    $tone === 'tip'  ? 'rgba(34,168,74,0.07)' :
    'rgba(25,97,237,0.07)'};
  border-left: 3px solid ${({ $tone }) =>
    $tone === 'warn' ? '#dd6000' :
    $tone === 'tip'  ? '#22a84a' :
    color('blue')};
  border-radius: 0 ${radius(1)} ${radius(1)} 0;
  font-family: ${fontFamily('sans')};
  font-size: 14px;
  line-height: 1.65;
  margin-bottom: ${spacing(5)};
  padding: ${spacing(3)} ${spacing(4)};

  strong {
    color: ${({ $tone }) =>
      $tone === 'warn' ? '#dd6000' :
      $tone === 'tip'  ? '#22a84a' :
      color('blue')};
    display: block;
    font-weight: ${FONT_WEIGHT.medium};
    margin-bottom: ${spacing(1)};
  }

  p {
    color: ${semanticColor.inkMuted};
    font-size: 14px;
    margin: 0;
  }
`;

// ── Step badge (numbered inline step) ────────────────────────────────────
export const StepBadge = styled.span`
  align-items: center;
  background-color: ${color('blue')};
  border-radius: 50%;
  color: #fff;
  display: inline-flex;
  flex-shrink: 0;
  font-family: ${fontFamily('mono')};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT.medium};
  height: 20px;
  justify-content: center;
  margin-right: ${spacing(2)};
  width: 20px;
`;

// ── File path chip ────────────────────────────────────────────────────────
export const FilePath = styled.code`
  && {
    background-color: rgba(0,0,0,0.055);
    border-radius: ${radius(1)};
    font-family: ${fontFamily('mono')};
    font-size: 13px;
    padding: 0.2em 0.5em;
  }
`;

// ── Type pill ─────────────────────────────────────────────────────────────
export const TypePill = styled.span`
  background-color: rgba(25,97,237,0.10);
  border-radius: ${radius(1)};
  color: ${color('blue')};
  font-family: ${fontFamily('mono')};
  font-size: 12px;
  padding: 0.15em 0.45em;
`;

// ── Section nav links (prev / next page) ─────────────────────────────────
export const DocNav = styled.div`
  border-top: 1px solid rgba(0,0,0,0.07);
  display: flex;
  gap: ${spacing(4)};
  justify-content: space-between;
  margin-top: ${spacing(12)};
  padding-top: ${spacing(6)};
`;

export const DocNavLink = styled.a`
  color: ${color('blue')};
  font-family: ${fontFamily('sans')};
  font-size: 14px;
  font-weight: ${FONT_WEIGHT.medium};
  text-decoration: none;
  transition: opacity ${DURATION.sm} ${EASING.standard};

  &:hover { opacity: 0.7; }
  &[data-dir='prev']::before { content: '← '; }
  &[data-dir='next']::after  { content: ' →'; }
`;
