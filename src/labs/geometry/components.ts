import * as THREE from 'three';
import { PITCH, BOARD_H, TOP_Y } from '../coords';
import { M, WIRE_HEX } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── LED ───────────────────────────────────────────────────────────────────
// board(anodePos, cathodePos, color) — leads hang into exact hole positions
// standalone(color)                 — centred at origin

export function buildLed(
  anodePos: THREE.Vector3,
  cathodePos: THREE.Vector3,
  color = 'green',
): THREE.Group {
  const container = new THREE.Group();
  const cx = (anodePos.x + cathodePos.x) / 2;
  const cz = (anodePos.z + cathodePos.z) / 2;
  const H  = PITCH * 1.8;

  const ledMat = M.hex(
    color === 'red' ? 0xd63b2a : color === 'blue' ? 0x2563a8 :
    color === 'yellow' ? 0xdda000 : 0x22a84a,
  );

  // Dome
  const body = new THREE.Group();
  const domeGeo = new THREE.SphereGeometry(PITCH * 0.7, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55);
  body.add(new THREE.Mesh(domeGeo, ledMat));
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()));

  // Rim
  const rim = solidCyl(PITCH * 0.7, PITCH * 0.18, M.gray(), 18);
  rim.position.y = -PITCH * 0.2;
  body.add(rim);

  // Cylinder body
  const cyl = solidCyl(PITCH * 0.55, PITCH * 0.8, M.dark(), 14);
  cyl.position.y = -PITCH * 0.7;
  body.add(cyl);

  // Flat mark (cathode side)
  const flat = solidBox(0.04, PITCH * 0.22, PITCH * 0.22, M.dark());
  flat.position.set(PITCH * 0.65, -PITCH * 0.22, 0);
  body.add(flat);

  body.position.set(cx, TOP_Y + H, cz);
  container.add(body);

  // Leads — hang from body down into holes
  const leadH = H + BOARD_H * 0.6;
  const leadGeo = new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH, 6);
  const aLead = new THREE.Mesh(leadGeo, M.gold());
  aLead.position.set(anodePos.x, TOP_Y - BOARD_H * 0.3 + leadH / 2, anodePos.z);
  container.add(aLead);

  const cLead = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH * 0.88, 6), M.gold(),
  );
  cLead.position.set(cathodePos.x, TOP_Y - BOARD_H * 0.3 + leadH * 0.88 / 2, cathodePos.z);
  container.add(cLead);

  return container;
}

export function buildLedStandalone(color = 'green'): THREE.Group {
  const root = new THREE.Group();
  const P    = PITCH;
  const ledMat = M.hex(
    color === 'red' ? 0xd63b2a : color === 'blue' ? 0x2563a8 :
    color === 'yellow' ? 0xdda000 : 0x22a84a,
  );

  const domeGeo = new THREE.SphereGeometry(P * 0.75, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55);
  root.add(new THREE.Mesh(domeGeo, ledMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()));

  const rim = solidCyl(P * 0.75, P * 0.20, M.white(), 18);
  rim.position.y = -P * 0.22;
  root.add(rim);

  const body = solidCyl(P * 0.60, P * 0.90, M.dark(), 14);
  body.position.y = -P * 0.80;
  root.add(body);

  // Flat cathode mark
  solidBox(0.04, P * 0.22, P * 0.22, M.dark()).position.set(P * 0.65, -P * 0.22, 0);
  const flat = solidBox(0.04, P * 0.22, P * 0.22, M.dark());
  flat.position.set(P * 0.65, -P * 0.22, 0);
  root.add(flat);

  // Leads
  const leadH = P * 2.4;
  const aLead = solidCyl(P * 0.07, leadH, M.gold(), 6);
  aLead.position.set(-P * 0.3, -P * 0.80 - leadH / 2 + P * 0.05, 0);
  root.add(aLead);
  const cLead = solidCyl(P * 0.07, leadH * 0.85, M.gold(), 6);
  cLead.position.set(P * 0.3, -P * 0.80 - leadH * 0.85 / 2 + P * 0.05, 0);
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
  const BODY_L = span * 0.55;
  const bodyH  = PITCH * 0.5;

  const bodyGrp = new THREE.Group();
  const bodyGeo = new THREE.CylinderGeometry(BODY_R, BODY_R, BODY_L, 14);
  bodyGrp.add(new THREE.Mesh(bodyGeo, M.cream()));
  bodyGrp.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  bodyGrp.rotation.z = Math.PI / 2;

  const bands = ohms <= 100
    ? [M.dark(), M.dark(), M.red(), M.gold()]
    : ohms <= 1000
    ? [M.orange(), M.orange(), M.dark(), M.gold()]
    : [M.red(), M.red(), M.orange(), M.gold()];

  const bxs = [-0.30, -0.14, 0.04, 0.24].map(f => f * BODY_L);
  for (let i = 0; i < 4; i++) {
    const bGeo = new THREE.CylinderGeometry(BODY_R + 0.008, BODY_R + 0.008, PITCH * 0.13, 14);
    const bm   = new THREE.Mesh(bGeo, bands[i]);
    bm.position.y = bxs[i];
    bodyGrp.add(bm);
  }

  // Ohm label
  const ohmText  = ohms >= 1000 ? `${ohms / 1000}kΩ` : `${ohms}Ω`;
  const ohmLabel = textLabel(ohmText, BODY_R * 5, BODY_R * 1.6, { textColor: '#444', fontSize: 42 });
  if (ohmLabel) { ohmLabel.rotation.z = -Math.PI / 2; ohmLabel.position.set(0, 0, BODY_R + 0.020); bodyGrp.add(ohmLabel); }

  const bodyHolder = new THREE.Group();
  bodyHolder.add(bodyGrp);
  bodyHolder.rotation.y = -angle;
  bodyHolder.position.set(midX, TOP_Y + bodyH, midZ);
  root.add(bodyHolder);

  // Leads going down into holes
  const leadLen = bodyH + BOARD_H * 0.7;
  const leadGeo = new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadLen, 6);
  for (const lp of [lead1, lead2]) {
    const lm = new THREE.Mesh(leadGeo, M.gold());
    lm.position.set(lp.x, TOP_Y - BOARD_H * 0.3 + leadLen / 2, lp.z);
    root.add(lm);
  }

  return root;
}

export function buildResistorStandalone(ohms = 330): THREE.Group {
  const root = new THREE.Group();
  const P    = PITCH;
  const R    = P * 0.42, L = P * 3.2;

  const bodyGeo = new THREE.CylinderGeometry(R, R, L, 14);
  root.add(new THREE.Mesh(bodyGeo, M.cream()));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  root.rotation.z = Math.PI / 2;

  const bands = ohms <= 100
    ? [M.dark(), M.dark(), M.red(), M.gold()]
    : ohms <= 1000
    ? [M.orange(), M.orange(), M.dark(), M.gold()]
    : [M.red(), M.red(), M.orange(), M.gold()];

  const bxs = [-0.30, -0.14, 0.04, 0.24].map(f => f * L);
  for (let i = 0; i < 4; i++) {
    const bm = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.008, R + 0.008, P * 0.13, 14), bands[i]);
    bm.position.y = bxs[i];
    root.children[0].add(bm);
  }

  for (const sign of [-1, 1]) {
    const lead = new THREE.Mesh(new THREE.CylinderGeometry(P * 0.07, P * 0.07, P * 2.2, 6), M.gold());
    lead.position.y = sign * (L / 2 + P * 1.1);
    root.children[0].add(lead);
  }

  const ohmText  = ohms >= 1000 ? `${ohms / 1000}kΩ` : `${ohms}Ω`;
  const ohmLabel = textLabel(ohmText, R * 5, R * 1.6, { textColor: '#444', fontSize: 42 });
  if (ohmLabel) { ohmLabel.rotation.z = -Math.PI / 2; ohmLabel.position.set(0, 0, R + 0.020); root.add(ohmLabel); }

  return root;
}

// ── WIRE ─────────────────────────────────────────────────────────────────
// Arced bezier from hole-to-hole. Arc height = max(1.5P, dist*0.55).
export function buildWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  colorName = 'red',
): THREE.Group {
  const root = new THREE.Group();
  const hexColor = WIRE_HEX[colorName] ?? 0xd63b2a;
  const wireMat  = new THREE.MeshBasicMaterial({ color: hexColor });

  const dist = from.distanceTo(to);
  const arcH = Math.max(PITCH * 1.5, dist * 0.55);
  const ctrl = from.clone().lerp(to, 0.5);
  ctrl.y = TOP_Y + arcH;

  const pts = new THREE.QuadraticBezierCurve3(from, ctrl, to).getPoints(32);
  const R   = PITCH * 0.10;

  for (let i = 0; i < pts.length - 1; i++) {
    const a   = pts[i], b = pts[i + 1];
    const dir = b.clone().sub(a);
    const len = dir.length();
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(R, R, len, 5), wireMat);
    seg.position.copy(a.clone().lerp(b, 0.5));
    seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    root.add(seg);
  }

  for (const pt of [from, to]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.6, R * 1.6, PITCH * 0.18, 8), wireMat);
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
