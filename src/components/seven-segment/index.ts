import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ── 7-SEGMENT DISPLAY — COMMON CATHODE ──────────────────────────────────────
// 0.56" standard 10-pin DIP 7-segment LED display with decimal point.
// Segments: a, b, c, d, e, f, g, and DP.
//
// Mounted form: sits on the breadboard.
// Standalone form: centered at origin for apparatus cards.

export function buildSevenSegmentStandalone(
  digit?: number | string,
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const W = P * 4.2;
  const H = P * 5.8;
  const D = P * 1.8;

  // Outer casing (dark housing)
  const housing = solidBox(W, H, D, M.dark());
  root.add(housing);

  // Front display face plate (slightly recessed/raised)
  const faceW = W * 0.92;
  const faceH = H * 0.92;
  const face = solidBox(faceW, faceH, 0.02, M.hex(0x1a1a20));
  face.position.set(0, 0, D / 2 + 0.01);
  root.add(face);

  // 7-segment geometry layout
  // Scale dimensions for segments
  const segThick = P * 0.22;
  const segHLen = P * 1.25;
  const segVLen = P * 1.25;
  const segZ = D / 2 + 0.025;
  const halfSpanX = P * 0.85;
  const halfSpanY = P * 1.05;

  // Segment colors: default to off-white/cream unlit display appearance
  const segMat = M.cream();
  const segEdge = M.edge();

  function makeSeg(w: number, h: number, x: number, y: number): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, 0.03);
    const mesh = new THREE.Mesh(geo, segMat);
    mesh.position.set(x, y, segZ);
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), segEdge));
    return mesh;
  }

  // a (top horizontal)
  root.add(makeSeg(segHLen, segThick, 0, halfSpanY * 2));
  // b (top right vertical)
  root.add(makeSeg(segThick, segVLen, halfSpanX, halfSpanY));
  // c (bottom right vertical)
  root.add(makeSeg(segThick, segVLen, halfSpanX, -halfSpanY));
  // d (bottom horizontal)
  root.add(makeSeg(segHLen, segThick, 0, -halfSpanY * 2));
  // e (bottom left vertical)
  root.add(makeSeg(segThick, segVLen, -halfSpanX, -halfSpanY));
  // f (top left vertical)
  root.add(makeSeg(segThick, segVLen, -halfSpanX, halfSpanY));
  // g (middle horizontal)
  root.add(makeSeg(segHLen, segThick, 0, 0));

  // DP (decimal point)
  const dpSize = P * 0.25;
  const dpGeo = new THREE.BoxGeometry(dpSize, dpSize, 0.03);
  const dpMesh = new THREE.Mesh(dpGeo, segMat);
  dpMesh.position.set(halfSpanX + P * 0.55, -halfSpanY * 2, segZ);
  dpMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(dpGeo), segEdge));
  root.add(dpMesh);

  // Top / bottom DIP pins (5 on top, 5 on bottom, total 10 pins)
  const pinGeo = new THREE.BoxGeometry(P * 0.15, P * 0.8, P * 0.15);
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * P * 0.75;
    for (const ySign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(x, ySign * (H / 2 + P * 0.25), -D * 0.1);
      root.add(pin);
    }
  }

  // Part markings on side
  const label = textLabel("CC 0.56″ 7-SEG", W * 0.85, P * 0.6, {
    textColor: "#a0a0a0",
    fontSize: 32,
  });
  if (label) {
    label.position.set(0, -H * 0.42, D / 2 + 0.025);
    root.add(label);
  }

  return root;
}

export function buildSevenSegment(
  mountPos?: THREE.Vector3,
  digit?: number | string,
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const pos = mountPos ?? new THREE.Vector3(0, TOP_Y, 0);

  const model = buildSevenSegmentStandalone(digit);
  const H = P * 5.8;
  const leadH = H * 0.2 + BOARD_H * 0.5;

  model.position.set(pos.x, pos.y + leadH + H / 2, pos.z);
  root.add(model);

  return root;
}
