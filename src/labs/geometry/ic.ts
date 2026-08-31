import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y, Z, colToX } from '../coords';
import { M } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── DIP-14 IC ─────────────────────────────────────────────────────────────
// board(startCol, label) — pins go into hole grid, body straddles centre gap
// standalone(label)      — centred at origin for display cards
//
// Real 74HC DIP-14 physical layout (top view, notch at left):
//
//   Pin#  Row   Col offset
//   1     e     +0      ← gate 1A / inverter 1A
//   2     e     +1      ← gate 1B (or inverter 1Y)
//   3     e     +2      ← gate 1Y (or inverter 2A)
//   4     e     +3      ← gate 2A (or inverter 2Y)
//   5     e     +4      ← gate 2B (or inverter 3A)
//   6     e     +5      ← gate 2Y (or inverter 3Y)
//   7     e     +6      ← GND
//   8     f     +6      ← gate 3A (mirrored from right side)
//   9     f     +5      ← gate 3B (or inverter 4Y)
//   10    f     +4      ← gate 3Y (or inverter 5A → varies by type)
//   11    f     +3      ← gate 4A
//   12    f     +2      ← gate 4B
//   13    f     +1      ← gate 4Y
//   14    f     +0      ← VCC
//
// We only model pins 1–3 (gate 1) and 7/14 (power) for circuit wiring.
// The visual body fills columns col..col+6, straddling e/f.

const PIN_COUNT = 7; // per side

function chipCode(label: string): string {
  const table: Record<string, string> = {
    XOR:  '74HC86',
    AND:  '74HC08',
    OR:   '74HC32',
    NOT:  '74HC04',
    NAND: '74HC00',
    NOR:  '74HC02',
  };
  return table[label] ?? label;
}

// Build shared body geometry
function buildDipBody(
  bodyX: number,
  bodyZ: number,
  bodyW: number,
  bodyH: number,
  bodyD: number,
  pinPositions: { ex: number; ez: number; fx: number; fz: number }[],
  label: string,
): THREE.Group {
  const root = new THREE.Group();

  // Body
  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  body.position.set(bodyX, TOP_Y + bodyH / 2, bodyZ);
  root.add(body);

  // Pin-1 notch (semicircle indent at left end)
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.20, PITCH * 0.20, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(bodyX - bodyW / 2 + PITCH * 0.25, TOP_Y + bodyH * 0.75, bodyZ);
  root.add(notch);

  // Pins — flat rectangular legs going down into holes
  const pinH   = bodyH * 0.45 + BOARD_H * 0.5;
  const pinGeo = new THREE.BoxGeometry(PITCH * 0.17, pinH, PITCH * 0.17);
  for (const p of pinPositions) {
    const pTop = new THREE.Mesh(pinGeo, M.silver());
    pTop.position.set(p.ex, TOP_Y - pinH / 2 + bodyH * 0.1, p.ez);
    root.add(pTop);
    const pBot = new THREE.Mesh(pinGeo, M.silver());
    pBot.position.set(p.fx, TOP_Y - pinH / 2 + bodyH * 0.1, p.fz);
    root.add(pBot);
  }

  // Labels on top face
  if (label) {
    const code  = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.90, bodyH * 0.52, { textColor: '#b8c8b0', fontSize: 46 });
    if (codeL) {
      codeL.rotation.x = -Math.PI / 2;
      codeL.position.set(bodyX, TOP_Y + bodyH + 0.002, bodyZ - bodyD * 0.12);
      root.add(codeL);
    }
    const typeL = textLabel(label, bodyW * 0.55, bodyH * 0.30, { textColor: '#7aaa8a', fontSize: 34 });
    if (typeL) {
      typeL.rotation.x = -Math.PI / 2;
      typeL.position.set(bodyX, TOP_Y + bodyH + 0.003, bodyZ + bodyD * 0.22);
      root.add(typeL);
    }
  }

  return root;
}

// ── Board-placed DIP-14 ───────────────────────────────────────────────────
// startCol: the column where pin 1 lands (row e).
// Pins 1–7 go in rows e, pins 8–14 go in row f (mirrored: pin 14 at col+0,f).
export function buildDip14(startCol: number, label = ''): THREE.Group {
  const pinPositions = Array.from({ length: PIN_COUNT }, (_, i) => ({
    ex: colToX(startCol + i),   // pin (i+1) — top side, row e
    ez: Z['e'],
    fx: colToX(startCol + i),   // pin (14-i) — bottom side, row f
    fz: Z['f'],
  }));

  const bodyX = (colToX(startCol) + colToX(startCol + PIN_COUNT - 1)) / 2;
  const bodyZ = (Z['e'] + Z['f']) / 2;
  const bodyW = (PIN_COUNT - 1) * PITCH + PITCH * 0.65;
  // Body depth = distance between the two pin rows, slightly narrower than full gap
  const bodyD = Math.abs(Z['f'] - Z['e']) * 0.72;
  const bodyH = PITCH * 1.25;

  return buildDipBody(bodyX, bodyZ, bodyW, bodyH, bodyD, pinPositions, label);
}

// ── Standalone DIP-14 (for display/apparatus scene) ───────────────────────
export function buildDip14Standalone(label = ''): THREE.Group {
  const P     = PITCH;
  const bodyW = (PIN_COUNT - 1) * P + P * 0.65;
  const bodyH = P * 1.30;
  const bodyD = P * 2.20;

  const root = new THREE.Group();

  // Body
  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  root.add(body);

  // Notch
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.22, P * 0.22, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(-bodyW / 2 + P * 0.22, 0, 0);
  root.add(notch);

  // Pins: 7 per side
  const pinGeo = new THREE.BoxGeometry(P * 0.17, P * 0.72, P * 0.17);
  for (let i = 0; i < PIN_COUNT; i++) {
    const x = -((PIN_COUNT - 1) / 2) * P + i * P;
    for (const zSign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(x, -bodyH / 2 - P * 0.26, zSign * (bodyD / 2 + P * 0.12));
      root.add(pin);
    }
  }

  // Labels
  if (label) {
    const code  = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.90, bodyH * 0.52, { textColor: '#b8c8b0', fontSize: 46 });
    if (codeL) {
      codeL.rotation.x = -Math.PI / 2;
      codeL.position.set(0, bodyH / 2 + 0.002, -bodyD * 0.12);
      root.add(codeL);
    }
    const typeL = textLabel(label, bodyW * 0.55, bodyH * 0.30, { textColor: '#7aaa8a', fontSize: 34 });
    if (typeL) {
      typeL.rotation.x = -Math.PI / 2;
      typeL.position.set(0, bodyH / 2 + 0.003, bodyD * 0.22);
      root.add(typeL);
    }
  }

  return root;
}

// ── Pin resolver: IcPin → world Vector3 ──────────────────────────────────
// Used by LabScene.tsx to position wire endpoints at the correct pin hole.
//
// For a DIP-14 placed at startCol:
//   Top bank (row e): pin 1=col+0, pin 2=col+1, ... pin 7=col+6 (GND)
//   Bot bank (row f): pin 14=col+0, pin 13=col+1, ... pin 8=col+6
//
// Gate 1 (quad-gate ICs): 1A=col+0,e  1B=col+1,e  1Y=col+2,e
// Gate 2:                 2A=col+3,e  2B=col+4,e  2Y=col+5,e
// GND:                    col+6,e
// VCC:                    col+0,f
// Gate 4:                 4Y=col+1,f  4B=col+2,f  4A=col+3,f
// Gate 3:                 3Y=col+4,f  3B=col+5,f  3A=col+6,f
//
// Aliases: 'A'='1A', 'B'='1B', 'Y'='1Y'
import { hole } from '../coords';
import type { IcPin } from '../types';

export function resolveIcPin(
  pin: IcPin['pin'],
  startCol: number,
  mountRow: string = 'e',
): THREE.Vector3 | null {
  // Determine the two rows this IC straddles, based on its mountedAt row
  const sideA = mountRow as string;
  const sideB = sideA === 'e' ? 'f' :
                sideA === 'h' ? 'i' :
                sideA === 'd' ? 'g' :
                sideA === 'c' ? 'h' : 'f';

  // Aliases
  const p = pin === 'A' ? '1A' : pin === 'B' ? '1B' : pin === 'Y' ? '1Y' : pin;

  switch (p) {
    // Gate 1 — sideA bank
    case '1A': return hole(startCol + 0, sideA);
    case '1B': return hole(startCol + 1, sideA);
    case '1Y': return hole(startCol + 2, sideA);
    // Gate 2 — sideA bank
    case '2A': return hole(startCol + 3, sideA);
    case '2B': return hole(startCol + 4, sideA);
    case '2Y': return hole(startCol + 5, sideA);
    // GND — sideA bank rightmost
    case 'GND': return hole(startCol + 6, sideA);
    // VCC — sideB bank leftmost
    case 'VCC': return hole(startCol + 0, sideB);
    // Gate 4 — sideB bank (mirrored)
    case '4Y': return hole(startCol + 1, sideB);
    case '4B': return hole(startCol + 2, sideB);
    case '4A': return hole(startCol + 3, sideB);
    // Gate 3 — sideB bank (mirrored)
    case '3Y': return hole(startCol + 4, sideB);
    case '3B': return hole(startCol + 5, sideB);
    case '3A': return hole(startCol + 6, sideB);
    default:
      return null;
  }
}
