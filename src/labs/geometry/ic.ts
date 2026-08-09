import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y, Z } from '../coords';
import { M } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── DIP-14 IC ─────────────────────────────────────────────────────────────
// board(startCol, label) — pins go into hole grid, body straddles centre gap
// standalone(label)      — centred at origin for display cards
//
// label: 'XOR' → renders "74HC86" + "XOR" on top face
//        'AND' → renders "74HC08" + "AND" on top face

const PIN_COUNT = 7; // per side

function chipCode(label: string): string {
  if (label === 'XOR')  return '74HC86';
  if (label === 'AND')  return '74HC08';
  if (label === 'OR')   return '74HC32';
  if (label === 'NOT')  return '74HC04';
  if (label === 'NAND') return '74HC00';
  if (label === 'NOR')  return '74HC02';
  return label;
}

// Build the body+pins+labels at given world coordinates
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

  // Pin-1 notch
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.20, PITCH * 0.20, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(pinPositions[0].ex - PITCH * 0.1, TOP_Y + bodyH * 0.7, bodyZ);
  root.add(notch);

  // Pins
  const pinH   = bodyH * 0.5 + BOARD_H * 0.4;
  const pinGeo = new THREE.BoxGeometry(PITCH * 0.18, pinH, PITCH * 0.18);
  for (const p of pinPositions) {
    const pL = new THREE.Mesh(pinGeo, M.silver());
    pL.position.set(p.ex, TOP_Y - pinH / 2 + bodyH * 0.1, p.ez);
    root.add(pL);
    const pR = new THREE.Mesh(pinGeo, M.silver());
    pR.position.set(p.fx, TOP_Y - pinH / 2 + bodyH * 0.1, p.fz);
    root.add(pR);
  }

  // Labels on top face
  if (label) {
    const code = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.88, bodyH * 0.50, { textColor: '#b8c8b0', fontSize: 48 });
    if (codeL) {
      codeL.rotation.x = -Math.PI / 2;
      codeL.position.set(bodyX, TOP_Y + bodyH + 0.002, bodyZ - bodyD * 0.12);
      root.add(codeL);
    }
    const typeL = textLabel(label, bodyW * 0.55, bodyH * 0.32, { textColor: '#7aaa8a', fontSize: 36 });
    if (typeL) {
      typeL.rotation.x = -Math.PI / 2;
      typeL.position.set(bodyX, TOP_Y + bodyH + 0.003, bodyZ + bodyD * 0.22);
      root.add(typeL);
    }
  }

  return root;
}

// Board-placed version: pins go into actual hole grid columns
export function buildDip14(startCol: number, label = ''): THREE.Group {
  const { colToX } = require('../coords');

  const pinPositions = Array.from({ length: PIN_COUNT }, (_, i) => ({
    ex: colToX(startCol + i),
    ez: Z['e'],
    fx: colToX(startCol + i),
    fz: Z['f'],
  }));

  const bodyX = (pinPositions[0].ex + pinPositions[PIN_COUNT - 1].ex) / 2;
  const bodyZ = (Z['e'] + Z['f']) / 2;
  const bodyW = (PIN_COUNT - 1) * PITCH + PITCH * 0.6;
  const bodyD = Z['f'] - Z['e'];
  const bodyH = PITCH * 1.2;

  return buildDipBody(bodyX, bodyZ, bodyW, bodyH, bodyD, pinPositions, label);
}

// Standalone version: centred at origin, no hole grid dependency
export function buildDip14Standalone(label = ''): THREE.Group {
  const P     = PITCH;
  const bodyW = (PIN_COUNT - 1) * P + P * 0.6;
  const bodyH = P * 1.3;
  const bodyD = P * 2.0;
  const bodyX = 0, bodyZ = 0;

  const pinPositions = Array.from({ length: PIN_COUNT }, (_, i) => {
    const x = -((PIN_COUNT - 1) / 2) * P + i * P;
    return { ex: x, ez: -bodyD / 2 - P * 0.14, fx: x, fz: bodyD / 2 + P * 0.14 };
  });

  // Override the position logic for standalone — build manually
  const root = new THREE.Group();

  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  root.add(body);

  // Pin-1 notch
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.22, P * 0.22, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(-bodyW / 2 + P * 0.1, 0, 0);
  root.add(notch);

  // Pins
  const pinGeo = new THREE.BoxGeometry(P * 0.18, P * 0.70, P * 0.18);
  for (let i = 0; i < PIN_COUNT; i++) {
    const x = -((PIN_COUNT - 1) / 2) * P + i * P;
    for (const zSign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(x, -bodyH / 2 - P * 0.25, zSign * (bodyD / 2 + P * 0.14));
      root.add(pin);
    }
  }

  // Labels on top
  if (label) {
    const code = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.88, bodyH * 0.50, { textColor: '#b8c8b0', fontSize: 48 });
    if (codeL) { codeL.rotation.x = -Math.PI / 2; codeL.position.set(0, bodyH / 2 + 0.002, -bodyD * 0.12); root.add(codeL); }
    const typeL = textLabel(label, bodyW * 0.55, bodyH * 0.32, { textColor: '#7aaa8a', fontSize: 36 });
    if (typeL) { typeL.rotation.x = -Math.PI / 2; typeL.position.set(0, bodyH / 2 + 0.003, bodyD * 0.22); root.add(typeL); }
  }

  return root;
}
