// ── Marker position helpers ────────────────────────────────────────────────
// These reproduce the exact same coordinate math as coords.ts but without
// importing Three.js, so they are safe to use in server-rendered content files.
//
// Returns [x, y, z] tuples in the same world space as LabScene uses.

const PITCH        = 0.22;
const COLS         = 30;
const BOARD_H      = 0.18;
export const TOP_Y = BOARD_H / 2;   // 0.09

const EDGE_MARGIN   = PITCH;         // 0.22
const RAIL_SPACING  = PITCH;         // 0.22
const RAIL_TO_HOLES = PITCH * 1.1;   // 0.242

const BOARD_D =
  EDGE_MARGIN * 2 +
  RAIL_SPACING +
  RAIL_SPACING +
  RAIL_TO_HOLES +
  PITCH * 5 +   // rows a-e
  PITCH * 1.5 + // gap
  PITCH * 5 +   // rows f-j
  RAIL_TO_HOLES +
  RAIL_SPACING +
  RAIL_SPACING;

// Build Z lookup exactly as coords.ts does
const Z: Record<string, number> = {};
let _cur = -(BOARD_D / 2) + EDGE_MARGIN;
Z['rail_top_red']  = _cur; _cur += RAIL_SPACING;
Z['rail_top_blue'] = _cur; _cur += RAIL_SPACING;
_cur += RAIL_TO_HOLES;
Z['a'] = _cur; _cur += PITCH;
Z['b'] = _cur; _cur += PITCH;
Z['c'] = _cur; _cur += PITCH;
Z['d'] = _cur; _cur += PITCH;
Z['e'] = _cur; _cur += PITCH;
_cur += PITCH * 1.5;
Z['f'] = _cur; _cur += PITCH;
Z['g'] = _cur; _cur += PITCH;
Z['h'] = _cur; _cur += PITCH;
Z['i'] = _cur; _cur += PITCH;
Z['j'] = _cur; _cur += PITCH;
_cur += RAIL_TO_HOLES;
Z['rail_bot_blue'] = _cur; _cur += RAIL_SPACING;
Z['rail_bot_red']  = _cur;

export function colToX(col: number): number {
  return -(((COLS - 1) / 2) * PITCH) + (col - 1) * PITCH;
}

/** Exact world-space [x, y, z] of a tie-point hole surface. */
export function holePos(col: number, row: string): [number, number, number] {
  const z = Z[row.toLowerCase()];
  if (z === undefined) throw new Error(`Unknown row: "${row}"`);
  return [colToX(col), TOP_Y, z];
}

/** Exact world-space [x, y, z] of a power-rail hole surface. */
export function railPos(
  col: number,
  rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot',
): [number, number, number] {
  const railKey = {
    vcc_top: 'rail_top_red',
    gnd_top: 'rail_top_blue',
    vcc_bot: 'rail_bot_red',
    gnd_bot: 'rail_bot_blue',
  }[rail];
  return [colToX(col), TOP_Y, Z[railKey]];
}

/** Resistor left lead (p1) position. */
export function resistorP1(col: number, row: string): [number, number, number] {
  return holePos(col, row);
}

/** Resistor right lead (p2) position — 3 columns to the right of p1. */
export function resistorP2(col: number, row: string): [number, number, number] {
  return holePos(col + 3, row);
}

/** LED/diode anode position. */
export function ledAnode(col: number, row: string): [number, number, number] {
  return holePos(col, row);
}

/** LED/diode cathode position — 1 column to the right of anode. */
export function ledCathode(col: number, row: string): [number, number, number] {
  return holePos(col + 1, row);
}

/** A marker position hovering ABOVE a hole, ready to be inserted. */
export function aboveHole(
  col: number,
  row: string,
  height = 0.5,
): [number, number, number] {
  const [x, y, z] = holePos(col, row);
  return [x, y + height, z];
}

export function aboveRail(
  col: number,
  rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot',
  height = 0.5,
): [number, number, number] {
  const [x, y, z] = railPos(col, rail);
  return [x, y + height, z];
}
