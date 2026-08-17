'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { styled } from '@linaria/react';
import { useRouter } from 'next/navigation';

import {
  color,
  DURATION,
  EASING,
  fontFamily,
  FONT_WEIGHT,
  fontSize,
  radius,
  semanticColor,
  spacing,
  Z_INDEX,
  REDUCED_MOTION,
} from '@/tokens';
import { ALL_SUBJECTS, type ExploreSubjectCard } from '@/sections/explore/explore.data';

// ─── Search logic ─────────────────────────────────────────────────────────────
function searchSubjects(query: string): ExploreSubjectCard[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_SUBJECTS.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.circuitId.toLowerCase().includes(q)
    );
  }).slice(0, 6);
}

// ─── Slanted input shell ──────────────────────────────────────────────────────
// Matches the brand's button geometry: rounded left cap, beveled-slant right cap.
// We build the same shape with clip-path + an SVG overlay for the right bevel.

const SEARCH_H = 32; // matches Button size="small" height
const BEVEL_W = 15;  // same as ButtonShape RIGHT_CAP_WIDTH

const SearchWrap = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

// The input field itself — no native border, the SVG shape provides it.
// Padding-right must accommodate the bevel cap.
const SearchInput = styled.input`
  --stroke: ${color('black-20')};

  background: transparent;
  border: none;
  border-radius: 0;
  caret-color: ${semanticColor.ink};
  color: ${semanticColor.ink};
  font-family: ${fontFamily('mono')};
  font-size: ${fontSize(3)};
  font-weight: ${FONT_WEIGHT.medium};
  height: ${SEARCH_H}px;
  letter-spacing: 0;
  outline: none;
  padding: 0 ${spacing(3)} 0 ${spacing(8)};
  text-transform: uppercase;
  width: 200px;
  transition: width ${DURATION.md} ${EASING.standard};

  &::placeholder {
    color: ${semanticColor.inkSubtle};
    font-weight: ${FONT_WEIGHT.regular};
  }

  ${REDUCED_MOTION} {
    transition: none;
  }
`;

// Absolute SVG that draws the full slant-shape border around the input.
// Left: rounded cap. Right: beveled slant (identical to ButtonShape right cap).
const ShapeBorder = styled.svg`
  inset: 0;
  pointer-events: none;
  position: absolute;
`;

// Search icon — sits inside the left cap area
const SearchIconWrap = styled.span`
  align-items: center;
  color: ${semanticColor.inkMuted};
  display: flex;
  flex-shrink: 0;
  left: ${spacing(2.5)};
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

// ─── Results overlay ──────────────────────────────────────────────────────────
const Overlay = styled.div`
  background: ${semanticColor.surface};
  border: 1px solid ${semanticColor.line};
  border-radius: ${radius(3)};
  box-shadow:
    0 4px 6px rgba(0,0,0,0.04),
    0 10px 40px rgba(0,0,0,0.10);
  left: 0;
  min-width: 320px;
  overflow: hidden;
  position: absolute;
  top: calc(100% + 8px);
  z-index: ${Z_INDEX.modal};
`;

const ResultItem = styled.button`
  align-items: flex-start;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${spacing(0.5)};
  padding: ${spacing(3)} ${spacing(4)};
  text-align: left;
  transition: background ${DURATION.xs} ease;
  width: 100%;

  &:hover,
  &[data-active] {
    background: ${color('black-5')};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${semanticColor.line};
  }
`;

const ResultTitle = styled.span`
  color: ${semanticColor.ink};
  font-family: ${fontFamily('sans')};
  font-size: 0.8125rem;
  font-weight: ${FONT_WEIGHT.medium};
  line-height: 1.3;
`;

const ResultMeta = styled.span`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 0.75rem;
  line-height: 1.3;
`;

const EmptyState = styled.div`
  color: ${semanticColor.inkMuted};
  font-family: ${fontFamily('sans')};
  font-size: 0.8125rem;
  padding: ${spacing(4)};
  text-align: center;
`;

// ─── Slant shape paths (same math as ButtonShape) ────────────────────────────
// The SVG fills the exact bounding box of the input. Left cap: rounded 4px.
// Right cap: beveled slant matching the site's button language.
function buildShapePaths(w: number, h: number) {
  const taperH = 15.477;
  const taperTopOffset = 4;
  const straight = Math.max(h - taperTopOffset - taperH, 0);
  const bw = BEVEL_W;

  // Stroke path: left rounded cap + middle top/bottom + right bevel
  const stroke = [
    `M4 0.5`,
    `H${w - bw}`,
    // right bevel cap stroke
    `h${bw - 4} a3.5 3.5 0 0 1 3.5 3.5`,
    `v${straight}`,
    `a5.5 5.5 0 0 1 -1.416 3.684`,
    // bottom of bevel descends to bottom-left of cap
    `l-8.547 9.477`,
    `a5.5 5.5 0 0 1 -4.084 1.816`,
    `H4`,
    // left rounded cap stroke (bottom arc back to start)
    `a3.5 3.5 0 0 1 -3.5 -3.5`,
    `V4`,
    `a3.5 3.5 0 0 1 3.5 -3.5`,
    `Z`,
  ].join(' ');

  return stroke;
}

// ─── SearchIcon SVG (magnifying glass) ───────────────────────────────────────
function SearchIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9.5 9.5L12.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function MenuSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchSubjects(query);
  const showOverlay = open && query.trim().length > 0;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setActiveIdx(-1);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Keyboard: Escape closes, arrows navigate, Enter navigates
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        setActiveIdx(-1);
        inputRef.current?.blur();
        return;
      }
      if (!showOverlay) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        const hit = results[activeIdx];
        navigate(hit);
      }
    },
    [showOverlay, results, activeIdx],
  );

  function navigate(card: ExploreSubjectCard) {
    setOpen(false);
    setQuery('');
    setActiveIdx(-1);
    router.push(card.labRoute ?? '/explore');
  }

  // Inline dimensions for the SVG shape border
  const inputW = 200;
  const shapePath = buildShapePaths(inputW, SEARCH_H);

  return (
    <SearchWrap ref={wrapRef}>
      <SearchIconWrap>
        <SearchIcon />
      </SearchIconWrap>

      <SearchInput
        ref={inputRef}
        aria-autocomplete="list"
        aria-controls={showOverlay ? 'search-results' : undefined}
        aria-expanded={showOverlay}
        aria-label="Search circuits, labs and components"
        autoComplete="off"
        onBlur={() => {
          // slight delay so click on result fires first
          setTimeout(() => {
            if (!wrapRef.current?.contains(document.activeElement)) {
              setOpen(false);
            }
          }, 120);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIdx(-1);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="SEARCH"
        role="combobox"
        spellCheck={false}
        value={query}
      />

      {/* Slanted border shape — SVG absolutely positioned over the input */}
      <ShapeBorder
        fill="none"
        height={SEARCH_H}
        viewBox={`0 0 ${inputW} ${SEARCH_H}`}
        width={inputW}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={shapePath}
          stroke={color('black-20')}
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </ShapeBorder>

      {/* Results dropdown */}
      {showOverlay && (
        <Overlay
          id="search-results"
          role="listbox"
        >
          {results.length === 0 ? (
            <EmptyState>No results for &ldquo;{query}&rdquo;</EmptyState>
          ) : (
            results.map((card, i) => (
              <ResultItem
                data-active={i === activeIdx ? '' : undefined}
                key={card.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(card);
                }}
                onMouseEnter={() => setActiveIdx(i)}
                role="option"
                aria-selected={i === activeIdx}
              >
                <ResultTitle>{card.title}</ResultTitle>
                <ResultMeta>
                  {card.category} · {card.tags.slice(0, 3).join(', ')}
                </ResultMeta>
              </ResultItem>
            ))
          )}
        </Overlay>
      )}
    </SearchWrap>
  );
}
