import * as THREE from "three";
import { BOARD_W, BOARD_D, PITCH, TOP_Y } from "@/labs/coords";

// ── Bench layout ──────────────────────────────────────────────────────────
// Instruments (power supplies, meters, generators, oscilloscopes) stand behind
// the breadboard on the bench surface (y = -TOP_Y), laid out in a clean row
// across the back edge.

/** How many instrument slots fit across the back of the bench. */
export const BENCH_SLOTS = 8;

/** Uniform scale applied to legacy instrument models when needed. */
export const BENCH_SCALE = 0.52;

/** Extra gap (world units) between adjacent instrument slots. */
const SLOT_GAP = PITCH * 2.2;

/** Distance from the board's centre to the instrument row behind it. */
export const BENCH_BACK = BOARD_D / 2 + 1.15;

/** Bench tabletop Y coordinate (flush with bottom of the breadboard). */
export const BENCH_Y = -TOP_Y;

export type BenchPlacement = {
  /** World position for the instrument's wrapper group (on the bench surface). */
  position: THREE.Vector3;
  /** Uniform scale for the instrument's wrapper group. */
  scale: number;
  /** Sign of the slot's X offset (-1 left of centre, +1 right). */
  xSign: -1 | 1;
};

/**
 * Place the instrument in `slot` (0-based) across the back of the bench.
 * Slot 0 is the far left, BENCH_SLOTS-1 the far right. The row spans wider
 * than the board so adjacent instruments keep clear of each other.
 */
export function benchPlacement(slot: number): BenchPlacement {
  const clamped = Math.max(0, Math.min(BENCH_SLOTS - 1, slot));
  const span = BOARD_W + SLOT_GAP * (BENCH_SLOTS - 1);
  const step = BENCH_SLOTS > 1 ? span / (BENCH_SLOTS - 1) : 0;
  const x = -span / 2 + clamped * step;

  return {
    position: new THREE.Vector3(x, BENCH_Y, -BENCH_BACK),
    scale: BENCH_SCALE,
    xSign: x < 0 ? -1 : 1,
  };
}
