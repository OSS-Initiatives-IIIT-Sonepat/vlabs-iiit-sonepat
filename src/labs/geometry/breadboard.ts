import * as THREE from 'three';
import { PITCH, BOARD_H, COLS, TOP_Y, Z, colToX } from '../coords';
import { M } from './materials';
import { solidBox, textLabel } from './primitives';

// ── BREADBOARD ─────────────────────────────────────────────────────────────
// board()       — full 30-col board, placed at world origin (board centre = 0,0,0)
// standalone()  — 10-col slice, centred for display cards
//
// Config: cols = number of columns to render (default COLS=30)

export function buildBreadboard(cols = COLS): THREE.Group {
  const root = new THREE.Group();
  const BW   = (cols - 1) * PITCH + 0.44;
  const BD   = Math.abs(Z['rail_bot_red'] - Z['rail_top_red']) + 0.44;
  const LIFT = 0.002;

  // Board body — polygonOffset pushes it behind holes
  root.add(solidBox(BW, BOARD_H, BD, M.cream()));

  // Power rail coloured stripes (sit on top surface)
  const stripeH = 0.010;
  const stripeW = BW - 0.14;
  for (const [key, mat] of [
    ['rail_top_red',  M.red()],
    ['rail_top_blue', M.blue()],
    ['rail_bot_red',  M.red()],
    ['rail_bot_blue', M.blue()],
  ] as [string, THREE.Material][]) {
    const s = solidBox(stripeW, stripeH, 0.055, mat);
    s.position.set(0, TOP_Y + stripeH / 2, Z[key]);
    root.add(s);
  }

  // Centre gap marker
  const gapZ = (Z['e'] + Z['f']) / 2;
  const gapD = Z['f'] - Z['e'] - PITCH;
  if (gapD > 0) {
    const gap = solidBox(stripeW, stripeH, gapD, M.gray());
    gap.position.set(0, TOP_Y + stripeH / 2, gapZ);
    root.add(gap);
  }

  // Tie-point holes — dark boxes recessed into the board surface
  const HS = PITCH * 0.62, HD = BOARD_H * 0.72;
  const hg = new THREE.BoxGeometry(HS, HD, HS);
  const hm = M.hole();

  for (let c = 1; c <= cols; c++) {
    const x = colToX(c);
    for (const row of ['a','b','c','d','e','f','g','h','i','j']) {
      const z = Z[row];
      const mesh = new THREE.Mesh(hg, hm);
      mesh.position.set(x, TOP_Y - HD / 2 + LIFT, z);
      root.add(mesh);
    }
  }

  // Power-rail holes
  const rHS = PITCH * 0.55, rHD = BOARD_H * 0.65;
  const rhg = new THREE.BoxGeometry(rHS, rHD, rHS);
  for (const rKey of ['rail_top_red','rail_top_blue','rail_bot_red','rail_bot_blue']) {
    for (let c = 1; c <= cols; c++) {
      const rh = new THREE.Mesh(rhg, M.hole());
      rh.position.set(colToX(c), TOP_Y - rHD / 2 + LIFT, Z[rKey]);
      root.add(rh);
    }
  }

  return root;
}

// Standalone: 10-col slice centred at origin
export function buildBreadboardStandalone(): THREE.Group {
  // Build a mini board without hole coords (self-contained local positions)
  const root  = new THREE.Group();
  const P     = PITCH;
  const C     = 10;
  const BW    = (C - 1) * P + 0.44;
  const BD    = Math.abs(Z['rail_bot_red'] - Z['rail_top_red']) + 0.44;
  const LIFT  = 0.002;

  root.add(solidBox(BW, BOARD_H, BD, M.cream()));

  const stripeH = 0.010, stripeW = BW - 0.14;
  for (const [key, mat] of [
    ['rail_top_red', M.red()], ['rail_top_blue', M.blue()],
    ['rail_bot_red', M.red()], ['rail_bot_blue', M.blue()],
  ] as [string, THREE.Material][]) {
    const s = solidBox(stripeW, stripeH, 0.055, mat);
    s.position.set(0, TOP_Y + stripeH / 2, Z[key]);
    root.add(s);
  }

  const gapZ = (Z['e'] + Z['f']) / 2;
  const gapD = Z['f'] - Z['e'] - P;
  if (gapD > 0) {
    const gap = solidBox(stripeW, stripeH, gapD, M.gray());
    gap.position.set(0, TOP_Y + stripeH / 2, gapZ);
    root.add(gap);
  }

  const HS = P * 0.62, HD = BOARD_H * 0.72;
  const hg = new THREE.BoxGeometry(HS, HD, HS);
  const startX = -((C - 1) / 2) * P;
  for (let c = 0; c < C; c++) {
    const x = startX + c * P;
    for (const row of ['a','b','c','d','e','f','g','h','i','j']) {
      const mesh = new THREE.Mesh(hg, M.hole());
      mesh.position.set(x, TOP_Y - HD / 2 + LIFT, Z[row]);
      root.add(mesh);
    }
  }

  // Centre vertically
  root.position.y = -TOP_Y;
  return root;
}
