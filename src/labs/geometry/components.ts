import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y } from '../coords';
import { M, WIRE_HEX } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── Resistor colour-band lookup ───────────────────────────────────────────
// 4-band E24/E96 resistor colour code.
// Band 1: first significant digit
// Band 2: second significant digit
// Band 3: multiplier (power of 10)
// Band 4: tolerance (gold = ±5%, silver = ±10%)
//
// Digit colours: 0=black, 1=brown, 2=red, 3=orange, 4=yellow,
//                5=green, 6=blue, 7=violet, 8=grey, 9=white
//
// We compute the correct 4 bands for a given ohm value:
//   330Ω → orange(3) orange(3) brown(×10) gold
//   470Ω → yellow(4) violet(7) brown(×10) gold
//   1kΩ  → brown(1) black(0) red(×100) gold
//   10kΩ → brown(1) black(0) orange(×1k) gold

const BAND_COLOURS: Record<number, () => THREE.Material> = {
  0: M.dark,     // black
  1: () => new THREE.MeshBasicMaterial({ color: 0x8b4513 }), // brown
  2: M.red,
  3: M.orange,
  4: () => new THREE.MeshBasicMaterial({ color: 0xffd700 }), // yellow (distinct from gold)
  5: M.green,
  6: M.blue,
  7: () => new THREE.MeshBasicMaterial({ color: 0x8b008b }), // violet
  8: () => new THREE.MeshBasicMaterial({ color: 0x808080 }), // grey
  9: () => new THREE.MeshBasicMaterial({ color: 0xffffff }), // white
};

function resistorBands(ohms: number): [() => THREE.Material, () => THREE.Material, () => THREE.Material, () => THREE.Material] {
  // Find the best 2-digit mantissa and multiplier
  // e.g. 330 = 33 × 10^1 → d1=3, d2=3, mult=1
  //      470 = 47 × 10^1 → d1=4, d2=7, mult=1
  //      1000= 10 × 10^2 → d1=1, d2=0, mult=2
  let mult = 0;
  let val  = ohms;
  while (val >= 100) { val = Math.round(val / 10); mult++; }

  const d1 = Math.floor(val / 10);
  const d2 = val % 10;

  const b1 = BAND_COLOURS[d1]  ?? M.dark;
  const b2 = BAND_COLOURS[d2]  ?? M.dark;
  const b3 = BAND_COLOURS[mult] ?? M.dark;
  const b4 = M.gold;  // gold = ±5% tolerance

  return [b1, b2, b3, b4];
}

// ── LED ───────────────────────────────────────────────────────────────────
// buildLed: board-placed LED with physics leads
// buildLedStandalone: for display/apparatus, centred at origin
//
// isOn: if true, the dome emits a bright glowing colour (simulated logic HIGH)

function ledHex(color: string): number {
  switch (color) {
    case 'red':    return 0xd63b2a;
    case 'blue':   return 0x2563a8;
    case 'yellow': return 0xdda000;
    default:       return 0x22a84a; // green
  }
}

function ledOnHex(color: string): number {
  switch (color) {
    case 'red':    return 0xff5544;
    case 'blue':   return 0x44aaff;
    case 'yellow': return 0xffe040;
    default:       return 0x44ff66; // green
  }
}

export function buildLed(
  anodePos: THREE.Vector3,
  cathodePos: THREE.Vector3,
  color = 'green',
  isOn = false,
  brightness = 1.0,
): THREE.Group {
  const container = new THREE.Group();
  const cx = (anodePos.x + cathodePos.x) / 2;
  const cz = (anodePos.z + cathodePos.z) / 2;
  const H  = PITCH * 1.2;  // lower dome, closer to board

  // OFF: dark/saturated colour. ON: full bright with emissive glow.
  // MeshStandardMaterial supports `emissive` — the LED actually glows.
  const offHex = ledHex(color);
  const onHex  = ledOnHex(color);

  const ledMat = isOn
    ? new THREE.MeshStandardMaterial({
        color:       onHex,
        emissive:    onHex,
        emissiveIntensity: 1.2 * brightness,
        roughness:   0.15,
        metalness:   0.0,
      })
    : new THREE.MeshStandardMaterial({
        color:     offHex,
        emissive:  0x000000,
        roughness: 0.5,
        metalness: 0.0,
      });

  const body = new THREE.Group();

  // Glow halo — only when ON
  if (isOn) {
    const glowGeo = new THREE.SphereGeometry(PITCH * 0.95, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const glowMat = new THREE.MeshStandardMaterial({
      color:             onHex,
      emissive:          onHex,
      emissiveIntensity: 0.8 * brightness,
      transparent:       true,
      opacity:           0.18 * brightness,
      side:              THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = PITCH * 0.05;
    body.add(glow);
  }

  // Dome
  const domeGeo = new THREE.SphereGeometry(PITCH * 0.7, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55);
  body.add(new THREE.Mesh(domeGeo, ledMat));
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()));

  // Rim
  const rimMat = isOn
    ? new THREE.MeshStandardMaterial({ color: 0xeeeeee, emissive: 0x333333, roughness: 0.3 })
    : M.gray();
  const rim = solidCyl(PITCH * 0.7, PITCH * 0.18, rimMat, 18);
  rim.position.y = -PITCH * 0.2;
  body.add(rim);

  // Cylinder body
  const cyl = solidCyl(PITCH * 0.55, PITCH * 0.8, M.dark(), 14);
  cyl.position.y = -PITCH * 0.7;
  body.add(cyl);

  // Flat cathode mark
  const flat = solidBox(0.04, PITCH * 0.22, PITCH * 0.22, M.dark());
  flat.position.set(PITCH * 0.65, -PITCH * 0.22, 0);
  body.add(flat);

  body.position.set(cx, TOP_Y + H, cz);
  container.add(body);

  // Leads
  const leadH   = H + BOARD_H * 0.6;
  const leadGeo = new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH, 6);
  const aLead   = new THREE.Mesh(leadGeo, M.gold());
  aLead.position.set(anodePos.x, TOP_Y - BOARD_H * 0.3 + leadH / 2, anodePos.z);
  container.add(aLead);

  const cLeadH = leadH * 0.88;
  const cLead  = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, cLeadH, 6),
    M.gold(),
  );
  cLead.position.set(cathodePos.x, TOP_Y - BOARD_H * 0.3 + cLeadH / 2, cathodePos.z);
  container.add(cLead);

  // Point light when ON — illuminates nearby components on the breadboard
  if (isOn) {
    const light = new THREE.PointLight(onHex, 1.8 * brightness, PITCH * 12);
    light.position.set(cx, TOP_Y + H + PITCH * 0.5, cz);
    container.add(light);
  }

  return container;
}

export function buildLedStandalone(color = 'green'): THREE.Group {
  const root   = new THREE.Group();
  const P      = PITCH;
  const ledMat = new THREE.MeshBasicMaterial({ color: ledHex(color) });

  const domeGeo = new THREE.SphereGeometry(P * 0.75, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55);
  root.add(new THREE.Mesh(domeGeo, ledMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()));

  const rim = solidCyl(P * 0.75, P * 0.20, M.white(), 18);
  rim.position.y = -P * 0.22;
  root.add(rim);

  const bodyPart = solidCyl(P * 0.60, P * 0.90, M.dark(), 14);
  bodyPart.position.y = -P * 0.80;
  root.add(bodyPart);

  // Flat cathode mark (correctly added to root this time — no orphan)
  const flat = solidBox(0.04, P * 0.22, P * 0.22, M.dark());
  flat.position.set(P * 0.65, -P * 0.22, 0);
  root.add(flat);

  // Leads: longer = anode (left), shorter = cathode (right)
  const leadH = P * 2.4;
  const aLead = solidCyl(P * 0.07, leadH, M.gold(), 6);
  aLead.position.set(-P * 0.3, -P * 0.80 - leadH / 2 + P * 0.05, 0);
  root.add(aLead);

  const cLeadH = leadH * 0.85;
  const cLead  = solidCyl(P * 0.07, cLeadH, M.gold(), 6);
  cLead.position.set(P * 0.3, -P * 0.80 - cLeadH / 2 + P * 0.05, 0);
  root.add(cLead);

  return root;
}

// ── RESISTOR ──────────────────────────────────────────────────────────────
export function buildResistor(
  lead1: THREE.Vector3,
  lead2: THREE.Vector3,
  ohms = 330,
): THREE.Group {
  const root  = new THREE.Group();
  const midX  = (lead1.x + lead2.x) / 2;
  const midZ  = (lead1.z + lead2.z) / 2;
  const spanX = lead2.x - lead1.x;
  const spanZ = lead2.z - lead1.z;
  const span  = Math.sqrt(spanX * spanX + spanZ * spanZ);
  const angle = Math.atan2(spanZ, spanX);

  const BODY_R = PITCH * 0.40;
  const BODY_L = span * 0.58;  // realistic body proportion for through-hole resistor
  const bodyH  = PITCH * 0.22; // sit much closer to the board surface

  const bodyGrp = new THREE.Group();
  const bodyGeo = new THREE.CylinderGeometry(BODY_R, BODY_R, BODY_L, 14);
  bodyGrp.add(new THREE.Mesh(bodyGeo, M.cream()));
  bodyGrp.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  bodyGrp.rotation.z = Math.PI / 2;

  // Correct 4-band resistor colour code
  const [b1, b2, b3, b4] = resistorBands(ohms);
  const bandOffsets = [-0.30, -0.13, 0.06, 0.26].map(f => f * BODY_L);
  const bandMats    = [b1(), b2(), b3(), b4()];
  for (let i = 0; i < 4; i++) {
    const bGeo = new THREE.CylinderGeometry(BODY_R + 0.009, BODY_R + 0.009, PITCH * 0.13, 14);
    const bm   = new THREE.Mesh(bGeo, bandMats[i]);
    bm.position.y = bandOffsets[i];
    bodyGrp.add(bm);
  }

  // Ohm value label
  const ohmText  = ohms >= 1000 ? `${ohms / 1000}kΩ` : `${ohms}Ω`;
  const ohmLabel = textLabel(ohmText, BODY_R * 5, BODY_R * 1.6, { textColor: '#444', fontSize: 42 });
  if (ohmLabel) {
    ohmLabel.rotation.z = -Math.PI / 2;
    ohmLabel.position.set(0, 0, BODY_R + 0.022);
    bodyGrp.add(ohmLabel);
  }

  const bodyHolder = new THREE.Group();
  bodyHolder.add(bodyGrp);
  bodyHolder.rotation.y = -angle;
  bodyHolder.position.set(midX, TOP_Y + bodyH, midZ);
  root.add(bodyHolder);

  // Leads: bent wires from body endpoints down into holes
  // Body endpoint positions (in world space)
  const halfBodyLen = BODY_L / 2;
  const bodyEndL = new THREE.Vector3(
    midX - Math.cos(angle) * halfBodyLen,
    TOP_Y + bodyH,
    midZ - Math.sin(angle) * halfBodyLen,
  );
  const bodyEndR = new THREE.Vector3(
    midX + Math.cos(angle) * halfBodyLen,
    TOP_Y + bodyH,
    midZ + Math.sin(angle) * halfBodyLen,
  );

  const leadR    = PITCH * 0.07;
  const leadGeoV = new THREE.CylinderGeometry(leadR, leadR, bodyH + BOARD_H * 0.4, 6);
  const leadGeoH1 = (len: number) => new THREE.CylinderGeometry(leadR, leadR, len, 6);

  for (const [holePos, bodyEnd] of [[lead1, bodyEndL], [lead2, bodyEndR]] as const) {
    // Vertical part: from hole up to body height
    const vLead = new THREE.Mesh(leadGeoV, M.gold());
    vLead.position.set(holePos.x, TOP_Y - BOARD_H * 0.2 + (bodyH + BOARD_H * 0.4) / 2, holePos.z);
    root.add(vLead);

    // Horizontal part: from top of vertical lead to body endpoint
    const dx = bodyEnd.x - holePos.x;
    const dz = bodyEnd.z - holePos.z;
    const hLen = Math.sqrt(dx * dx + dz * dz);
    if (hLen > 0.001) {
      const hLead = new THREE.Mesh(leadGeoH1(hLen), M.gold());
      hLead.position.set(
        (holePos.x + bodyEnd.x) / 2,
        TOP_Y + bodyH,
        (holePos.z + bodyEnd.z) / 2,
      );
      const hDir = new THREE.Vector3(dx, 0, dz).normalize();
      hLead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hDir);
      root.add(hLead);
    }
  }

  return root;
}

export function buildResistorStandalone(ohms = 330): THREE.Group {
  const root = new THREE.Group();
  const P    = PITCH;
  const R    = P * 0.42, L = P * 3.2;

  const bodyGeo = new THREE.CylinderGeometry(R, R, L, 14);
  const bodyMesh = new THREE.Mesh(bodyGeo, M.cream());
  const bodyEdge = new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge());
  root.add(bodyMesh);
  root.add(bodyEdge);
  root.rotation.z = Math.PI / 2;

  // Correct colour bands
  const [b1, b2, b3, b4] = resistorBands(ohms);
  const bandOffsets = [-0.30, -0.13, 0.06, 0.26].map(f => f * L);
  const bandMats    = [b1(), b2(), b3(), b4()];
  for (let i = 0; i < 4; i++) {
    const bm = new THREE.Mesh(
      new THREE.CylinderGeometry(R + 0.009, R + 0.009, P * 0.13, 14),
      bandMats[i],
    );
    bm.position.y = bandOffsets[i];
    bodyMesh.add(bm);  // add to mesh, not edge geometry
  }

  // Leads
  for (const sign of [-1, 1]) {
    const lead = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.07, P * 0.07, P * 2.2, 6),
      M.gold(),
    );
    lead.position.y = sign * (L / 2 + P * 1.1);
    bodyMesh.add(lead);
  }

  // Value label
  const ohmText  = ohms >= 1000 ? `${ohms / 1000}kΩ` : `${ohms}Ω`;
  const ohmLabel = textLabel(ohmText, R * 5, R * 1.6, { textColor: '#444', fontSize: 42 });
  if (ohmLabel) {
    ohmLabel.rotation.z = -Math.PI / 2;
    ohmLabel.position.set(0, 0, R + 0.022);
    root.add(ohmLabel);
  }

  return root;
}

// ── WIRE ─────────────────────────────────────────────────────────────────
// Arced quadratic Bezier from hole to hole.
// Arc height is capped to keep wires visually close to the board surface
// (real jumper wires only rise a few mm above component tops).
export function buildWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  colorName = 'red',
): THREE.Group {
  const root     = new THREE.Group();
  const hexColor = WIRE_HEX[colorName] ?? 0xd63b2a;
  const wireMat  = new THREE.MeshBasicMaterial({ color: hexColor });

  const dist = from.distanceTo(to);
  // Nice visible arcs — wires loop above component tops like real hookup wire.
  // Short wires get a smaller arc, long wires get a generous catenary.
  const arcH = Math.min(PITCH * 3.0, dist * 0.22 + PITCH * 0.8);
  const ctrl = from.clone().lerp(to, 0.5);
  ctrl.y     = TOP_Y + arcH;

  const pts = new THREE.QuadraticBezierCurve3(from, ctrl, to).getPoints(28);
  const R   = PITCH * 0.095;

  for (let i = 0; i < pts.length - 1; i++) {
    const a   = pts[i], b = pts[i + 1];
    const dir = b.clone().sub(a);
    const len = dir.length();
    if (len < 1e-6) continue;
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(R, R, len, 5), wireMat);
    seg.position.copy(a.clone().lerp(b, 0.5));
    seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    root.add(seg);
  }

  // Ferrule caps at each end
  const capGeo = new THREE.CylinderGeometry(R * 1.55, R * 1.55, PITCH * 0.17, 8);
  for (const pt of [from, to]) {
    const cap = new THREE.Mesh(capGeo, wireMat);
    cap.position.copy(pt);
    root.add(cap);
  }

  return root;
}

export function buildWireStandalone(colorName = 'red'): THREE.Group {
  const from = new THREE.Vector3(-PITCH * 2, 0, 0);
  const to   = new THREE.Vector3( PITCH * 2, 0, 0);
  return buildWire(from, to, colorName);
}
