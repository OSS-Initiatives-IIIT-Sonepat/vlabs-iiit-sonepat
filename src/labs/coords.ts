import * as THREE from 'three';

// ════════════════════════════════════════════════════════════════════════════
//  BREADBOARD COORDINATE SYSTEM — single source of truth
//
//  Board lies flat in XZ plane. Top surface at Y = TOP_Y.
//  X = columns (left → right, col 1..COLS).
//  Z = rows    (top edge → bottom edge).
//
//  Z order (top → bottom):
//    rail_top_red  (+)
//    rail_top_blue (-)
//    row a
//    row b
//    row c
//    row d
//    row e      ← top bank end
//    [centre gap]
//    row f      ← bottom bank start
//    row g
//    row h
//    row i
//    row j
//    rail_bot_blue (-)
//    rail_bot_red  (+)
// ════════════════════════════════════════════════════════════════════════════

export const PITCH        = 0.22;    // hole-to-hole spacing (world units)
export const COLS         = 30;      // columns 1..30
export const ROWS         = 5;       // rows per bank (a-e and f-j)
export const BOARD_H      = 0.18;    // board thickness (Y axis)
export const TOP_Y        = BOARD_H / 2;  // Y of top surface

const EDGE_MARGIN   = 0.28;
const RAIL_SPACING  = PITCH;
const RAIL_TO_HOLES = PITCH * 2.2;   // wider gap between power rails and tie-point rows
const GAP_SIZE      = PITCH * 2.8;   // wider DIP centre gap so the channel is clearly visible

// Total board depth: walk the same cursor as Z below
export const BOARD_D =
  EDGE_MARGIN * 2 +
  RAIL_SPACING +        // red rail
  RAIL_SPACING +        // blue rail
  RAIL_TO_HOLES +       // gap
  ROWS * PITCH +        // rows a-e
  GAP_SIZE +            // centre gap
  ROWS * PITCH +        // rows f-j
  RAIL_TO_HOLES +       // gap
  RAIL_SPACING +        // blue rail
  RAIL_SPACING;         // red rail

export const BOARD_W = (COLS - 1) * PITCH + EDGE_MARGIN * 2;

// ── Row Z lookup table ────────────────────────────────────────────────────────
export const Z: Record<string, number> = {};
let cur = -(BOARD_D / 2) + EDGE_MARGIN;

Z['rail_top_red']  = cur; cur += RAIL_SPACING;
Z['rail_top_blue'] = cur; cur += RAIL_SPACING;
cur += RAIL_TO_HOLES;
Z['a'] = cur; cur += PITCH;
Z['b'] = cur; cur += PITCH;
Z['c'] = cur; cur += PITCH;
Z['d'] = cur; cur += PITCH;
Z['e'] = cur; cur += PITCH;
cur += GAP_SIZE;
Z['f'] = cur; cur += PITCH;
Z['g'] = cur; cur += PITCH;
Z['h'] = cur; cur += PITCH;
Z['i'] = cur; cur += PITCH;
Z['j'] = cur; cur += PITCH;
cur += RAIL_TO_HOLES;
Z['rail_bot_blue'] = cur; cur += RAIL_SPACING;
Z['rail_bot_red']  = cur;

// ── Helpers ───────────────────────────────────────────────────────────────────
export function colToX(col: number): number {
  return -(((COLS - 1) / 2) * PITCH) + (col - 1) * PITCH;
}

/** Exact world position of the top of any tie-point hole. */
export function hole(col: number, row: string): THREE.Vector3 {
  const z = Z[row.toLowerCase()];
  if (z === undefined) throw new Error(`Unknown row: "${row}"`);
  return new THREE.Vector3(colToX(col), TOP_Y, z);
}

/** Exact world position of a power-rail hole. */
export function railHole(
  col: number,
  rail: 'top_red' | 'top_blue' | 'bot_red' | 'bot_blue',
): THREE.Vector3 {
  return new THREE.Vector3(colToX(col), TOP_Y, Z[`rail_${rail}`]);
}
