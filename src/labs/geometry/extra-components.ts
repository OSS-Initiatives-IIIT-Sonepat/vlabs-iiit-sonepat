import * as THREE from 'three';
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from '../coords';
import { M } from './materials';
import { solidBox, solidCyl, textLabel } from './primitives';

// ── CAPACITOR ────────────────────────────────────────────────────────────
export function buildCapacitor(
  lead1: THREE.Vector3,
  lead2: THREE.Vector3,
  capacitance = 100,
): THREE.Group {
  const root = new THREE.Group();
  const cx = (lead1.x + lead2.x) / 2;
  const cz = (lead1.z + lead2.z) / 2;
  const R  = PITCH * 0.65, H = PITCH * 2.8;

  const bodyGeo = new THREE.CylinderGeometry(R, R, H, 18);
  const body    = new THREE.Mesh(bodyGeo, M.capblue());
  body.position.set(cx, TOP_Y + H / 2, cz);
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  root.add(body);

  // Polarity stripe
  const sg = new THREE.CylinderGeometry(R + 0.006, R + 0.006, H * 0.18, 18);
  const stripe = new THREE.Mesh(sg, M.silver());
  stripe.position.set(cx, TOP_Y + H - H * 0.09, cz);
  root.add(stripe);

  // Negative bar
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.012, H * 0.20, R * 0.28), M.dark());
  bar.position.set(cx + R * 0.65, TOP_Y + H - H * 0.09, cz);
  root.add(bar);

  // Top cap
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.015, 18), M.silver());
  cap.position.set(cx, TOP_Y + H, cz);
  root.add(cap);

  // Leads
  const leadH  = H * 0.4 + BOARD_H * 0.6;
  const leadGeo = new THREE.CylinderGeometry(PITCH * 0.07, PITCH * 0.07, leadH, 6);
  for (const lp of [lead1, lead2]) {
    const lm = new THREE.Mesh(leadGeo, M.gold());
    lm.position.set(lp.x, TOP_Y - BOARD_H * 0.3 + leadH / 2, lp.z);
    root.add(lm);
  }

  // Value label
  const valText = capacitance >= 1000 ? `${capacitance / 1000}mF` : `${capacitance}µF`;
  const valL = textLabel(valText, R * 1.5, H * 0.22, { textColor: '#d8e8ff', fontSize: 44 });
  if (valL) { valL.rotation.y = Math.PI / 2; valL.position.set(cx + R + 0.002, TOP_Y + H * 0.50, cz); root.add(valL); }
  const vL = textLabel('25V', R * 1.2, H * 0.14, { textColor: '#a0b8d0', fontSize: 32 });
  if (vL) { vL.rotation.y = Math.PI / 2; vL.position.set(cx + R + 0.002, TOP_Y + H * 0.34, cz); root.add(vL); }

  return root;
}

export function buildCapacitorStandalone(capacitance = 100): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 0.72, H = P * 3.2;

  const bodyGeo = new THREE.CylinderGeometry(R, R, H, 18);
  const body = new THREE.Mesh(bodyGeo, M.capblue());
  body.position.y = H / 2;
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  root.add(body);

  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.006, R + 0.006, H * 0.20, 18), M.silver());
  stripe.position.y = H * 0.88;
  root.add(stripe);

  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.012, H * 0.22, R * 0.28), M.dark());
  bar.position.set(R * 0.65, H * 0.88, 0);
  root.add(bar);

  root.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.016, 18), M.silver())).position.set(0, H, 0);

  for (const dx of [-P * 0.3, P * 0.3]) {
    const lead = solidCyl(P * 0.07, P * 1.6, M.gold(), 6);
    lead.position.set(dx, -P * 0.8, 0);
    root.add(lead);
  }

  const valText = capacitance >= 1000 ? `${capacitance / 1000}mF` : `${capacitance}µF`;
  const valL = textLabel(valText, R * 1.5, H * 0.22, { textColor: '#d8e8ff', fontSize: 44 });
  if (valL) { valL.rotation.y = Math.PI / 2; valL.position.set(R + 0.002, H * 0.50, 0); root.add(valL); }
  const vL = textLabel('25V', R * 1.2, H * 0.14, { textColor: '#a0b8d0', fontSize: 32 });
  if (vL) { vL.rotation.y = Math.PI / 2; vL.position.set(R + 0.002, H * 0.34, 0); root.add(vL); }

  return root;
}

// ── POTENTIOMETER ────────────────────────────────────────────────────────
export function buildPotentiometerStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 1.0, BH = P * 0.8;

  root.add(solidBox(R * 2.4, BH, R * 2.4, M.dark()));

  const shR = P * 0.20, shH = P * 1.6;
  const shaft = solidCyl(shR, shH, M.silver(), 10);
  shaft.position.y = BH / 2 + shH / 2;
  root.add(shaft);

  const knobGeo = new THREE.CylinderGeometry(shR * 2.0, shR * 2.0, P * 0.35, 16);
  const knob = new THREE.Mesh(knobGeo, M.gray());
  knob.position.y = BH / 2 + shH + P * 0.18;
  root.add(knob);

  const flat = new THREE.Mesh(new THREE.BoxGeometry(shR * 4.2, P * 0.37, P * 0.045), M.silver());
  flat.position.set(0, BH / 2 + shH + P * 0.18, shR * 1.8);
  root.add(flat);

  const pinGeo = new THREE.BoxGeometry(P * 0.15, P * 0.8, P * 0.15);
  for (const dx of [-P * 0.8, 0, P * 0.8]) {
    const pin = new THREE.Mesh(pinGeo, M.silver());
    pin.position.set(dx, -BH / 2 - P * 0.3, R * 1.4);
    root.add(pin);
  }

  return root;
}

// ── PUSH BUTTON ──────────────────────────────────────────────────────────
export function buildPushButtonStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P * 2.0, BH = P * 0.55, BD = P * 2.0;

  root.add(solidBox(BW, BH, BD, M.dark()));

  const capR = P * 0.44, capH = P * 0.36;
  const capGeo = new THREE.CylinderGeometry(capR, capR * 1.1, capH, 16);
  const cap = new THREE.Mesh(capGeo, M.gray());
  cap.position.y = BH / 2 + capH / 2;
  cap.add(new THREE.LineSegments(new THREE.EdgesGeometry(capGeo, 20), M.edge()));
  root.add(cap);

  const pinGeo = new THREE.BoxGeometry(P * 0.13, P * 0.9, P * 0.13);
  for (const [dx, dz] of [[-P*0.7,-P*0.7],[P*0.7,-P*0.7],[-P*0.7,P*0.7],[P*0.7,P*0.7]]) {
    const pin = new THREE.Mesh(pinGeo, M.silver());
    pin.position.set(dx, -BH / 2 - P * 0.35, dz);
    root.add(pin);
  }

  return root;
}

// ── SWITCH ───────────────────────────────────────────────────────────────
export function buildSwitchStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P * 3.0, BH = P * 0.55, BD = P * 1.4;

  root.add(solidBox(BW, BH, BD, M.dark()));

  const pad = solidBox(P * 0.80, P * 1.0, P * 1.0, M.silver());
  pad.position.set(-P * 0.5, BH / 2 + P * 0.5, 0);
  root.add(pad);

  const pinGeo = new THREE.BoxGeometry(P * 0.15, P * 0.9, P * 0.15);
  for (const dx of [-P * 1.0, 0, P * 1.0]) {
    const pin = new THREE.Mesh(pinGeo, M.silver());
    pin.position.set(dx, -BH / 2 - P * 0.35, 0);
    root.add(pin);
  }

  return root;
}

// ── BATTERY ──────────────────────────────────────────────────────────────
export function buildBatteryStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 1.1, H = P * 6.0;

  const bodyGeo = new THREE.CylinderGeometry(R, R, H, 20);
  const body = new THREE.Mesh(bodyGeo, M.hex(0x2a3a4a));
  body.position.y = H / 2;
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo, 20), M.edge()));
  root.add(body);

  const label = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.009, R + 0.009, H * 0.50, 20), M.silver());
  label.position.y = H * 0.50;
  root.add(label);

  const nub = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.32, R * 0.32, P * 0.28, 10), M.silver());
  nub.position.y = H + P * 0.14;
  root.add(nub);

  root.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.022, 20), M.silver()));

  const ringGeo = new THREE.TorusGeometry(R + 0.012, 0.020, 6, 20);
  const pRing = new THREE.Mesh(ringGeo, M.red());
  pRing.rotation.x = Math.PI / 2;
  pRing.position.y = H * 0.88;
  root.add(pRing);

  const nRing = new THREE.Mesh(ringGeo.clone(), M.dark());
  nRing.rotation.x = Math.PI / 2;
  nRing.position.y = H * 0.12;
  root.add(nRing);

  const aaL = textLabel('AA', R * 1.6, H * 0.18, { textColor: '#1a2a3a', fontSize: 52 });
  if (aaL) { aaL.rotation.y = Math.PI / 2; aaL.position.set(R + 0.012, H * 0.58, 0); root.add(aaL); }
  const vL = textLabel('1.5V', R * 1.4, H * 0.12, { textColor: '#3a4a5a', fontSize: 36 });
  if (vL) { vL.rotation.y = Math.PI / 2; vL.position.set(R + 0.012, H * 0.44, 0); root.add(vL); }

  return root;
}

// ── DC JACK ───────────────────────────────────────────────────────────────
export function buildDcJackStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const R = P * 0.92, BH = P * 1.1;

  const barrelGeo = new THREE.CylinderGeometry(R, R, BH, 18);
  const barrel    = new THREE.Mesh(barrelGeo, M.silver());
  barrel.rotation.z = Math.PI / 2;
  barrel.add(new THREE.LineSegments(new THREE.EdgesGeometry(barrelGeo, 20), M.edge()));
  root.add(barrel);

  const inner = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.46, R * 0.46, BH + 0.012, 14), M.dark());
  inner.rotation.z = Math.PI / 2;
  inner.position.x = BH * 0.52;
  root.add(inner);

  const base = solidBox(P * 2.2, P * 0.40, P * 2.2, M.dark());
  base.position.set(0, -R - P * 0.20, 0);
  root.add(base);

  const pinGeo = new THREE.BoxGeometry(P * 0.15, P * 0.70, P * 0.15);
  for (const dx of [-P * 0.55, P * 0.55]) {
    const pin = new THREE.Mesh(pinGeo, M.silver());
    pin.position.set(dx, -R - P * 0.60, P * 0.9);
    root.add(pin);
  }

  return root;
}

// ── IC METER ─────────────────────────────────────────────────────────────
export function buildIcMeterStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P * 4.0, BH = P * 9.0, BD = P * 1.2;

  const bodyMat = M.hex(0x2a2a2a);
  const bodyGeo = new THREE.BoxGeometry(BW, BH, BD);
  const body    = new THREE.Mesh(bodyGeo, bodyMat);
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), M.edge()));
  root.add(body);

  const grip = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.04, BH * 0.22, BD + 0.04), M.hex(0xd4a020));
  grip.position.y = BH * 0.08;
  root.add(grip);

  const lcdGeo = new THREE.BoxGeometry(BW * 0.78, BH * 0.26, 0.025);
  const lcd    = new THREE.Mesh(lcdGeo, M.hex(0xc8d8b0));
  lcd.position.set(0, BH * 0.30, BD / 2 + 0.013);
  lcd.add(new THREE.LineSegments(new THREE.EdgesGeometry(lcdGeo), M.edge()));
  root.add(lcd);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(BW * 0.78 + 0.06, BH * 0.26 + 0.06, 0.013), M.dark());
  bezel.position.set(0, BH * 0.30, BD / 2 + 0.005);
  root.add(bezel);

  for (let i = 0; i < 4; i++) {
    const dg = new THREE.Mesh(new THREE.BoxGeometry(P * 0.30, BH * 0.14, 0.030), M.hex(0x2a4a1a));
    dg.position.set(-BW * 0.28 + i * P * 0.55, BH * 0.30, BD / 2 + 0.030);
    root.add(dg);
  }

  const dialR   = P * 1.0;
  const dialGeo = new THREE.CylinderGeometry(dialR, dialR, 0.040, 24);
  const dial    = new THREE.Mesh(dialGeo, M.hex(0x444444));
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, BH * 0.04, BD / 2 + 0.025);
  dial.add(new THREE.LineSegments(new THREE.EdgesGeometry(dialGeo, 20), M.edge()));
  root.add(dial);

  const ptr = new THREE.Mesh(new THREE.BoxGeometry(0.030, dialR * 0.85, 0.050), M.red());
  ptr.position.set(0, BH * 0.04 - dialR * 0.38, BD / 2 + 0.048);
  root.add(ptr);

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.022, P * 0.18, 0.044), M.silver());
    tick.position.set(Math.sin(a) * (dialR + P * 0.22), BH * 0.04 + Math.cos(a) * (dialR + P * 0.22), BD / 2 + 0.025);
    root.add(tick);
  }

  for (const [bx, col] of [[-P*0.9, 0x444488],[P*0.9, 0x444444]] as [number,number][]) {
    const btn = new THREE.Mesh(new THREE.BoxGeometry(P*0.60, P*0.28, 0.040), M.hex(col));
    btn.position.set(bx, BH * 0.15, BD / 2 + 0.025);
    root.add(btn);
  }

  const sockGeo = new THREE.CylinderGeometry(P * 0.20, P * 0.20, 0.080, 12);
  for (const [sx, col] of [[-P*1.0, 0x1a1a1a],[0, 0xcc2200],[P*1.0, 0xcc2200]] as [number,number][]) {
    const sock = new THREE.Mesh(sockGeo, M.hex(col));
    sock.rotation.x = Math.PI / 2;
    sock.position.set(sx, -BH * 0.38, BD / 2 + 0.045);
    root.add(sock);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(P*0.09,P*0.09,0.090,8), M.hole());
    hole.rotation.x = Math.PI / 2;
    hole.position.set(sx, -BH * 0.38, BD / 2 + 0.046);
    root.add(hole);
  }

  const wireLen = BH * 0.55;
  for (const [sx, col] of [[-P*1.0, 0x1a1a1a],[0, 0xcc2200]] as [number,number][]) {
    const wireMat = M.hex(col);
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(P*0.06,P*0.06,wireLen,6), wireMat);
    wire.position.set(sx, -BH*0.38 - wireLen/2, BD/2 + 0.040);
    root.add(wire);
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(P*0.12,P*0.02,P*0.50,8), wireMat);
    tip.position.set(sx, -BH*0.38 - wireLen - P*0.25, BD/2 + 0.040);
    root.add(tip);
  }

  root.position.y = -BH * 0.04;
  return root;
}

// ── DC POWER SUPPLY ──────────────────────────────────────────────────────
export function buildDcPowerSupplyStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P*7.0, BH = P*4.5, BD = P*5.0;

  root.add(solidBox(BW, BH, BD, M.dark()));

  const panel = solidBox(BW, BH, 0.04, M.gray());
  panel.position.z = BD/2 + 0.021;
  root.add(panel);

  root.add(new THREE.Mesh(new THREE.BoxGeometry(BW*0.55, BH*0.30, 0.018), M.hex(0x1a3a1a))).position.set(-BW*0.10, BH*0.22, BD/2+0.030);

  for (let i = 0; i < 4; i++) {
    const dg = new THREE.Mesh(new THREE.BoxGeometry(P*0.22, BH*0.20, 0.020), M.hex(0x22dd22));
    dg.position.set(-BW*0.22 + i*P*0.28, BH*0.22, BD/2+0.034);
    root.add(dg);
  }

  const dialR = P*0.78;
  for (const dx of [-BW*0.25, BW*0.25]) {
    const dGeo = new THREE.CylinderGeometry(dialR, dialR, 0.035, 20);
    const dial = new THREE.Mesh(dGeo, M.gray());
    dial.rotation.x = Math.PI/2;
    dial.position.set(dx, -BH*0.12, BD/2+0.038);
    dial.add(new THREE.LineSegments(new THREE.EdgesGeometry(dGeo, 20), M.edge()));
    root.add(dial);
    const kPtr = solidBox(P*0.10, P*0.10, 0.042, M.silver());
    kPtr.position.set(dx, -BH*0.12 + dialR*0.72, BD/2+0.038);
    root.add(kPtr);
  }

  for (const [dx, col] of [[BW*0.15, 0xd63b2a],[BW*0.32, 0x1a1a1a]] as [number,number][]) {
    const sock = new THREE.Mesh(new THREE.CylinderGeometry(P*0.18,P*0.18,0.045,12), M.hex(col));
    sock.rotation.x = Math.PI/2;
    sock.position.set(dx, -BH*0.30, BD/2+0.044);
    root.add(sock);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(P*0.08,P*0.08,0.050,8), M.hole());
    hole.rotation.x = Math.PI/2;
    hole.position.set(dx, -BH*0.30, BD/2+0.044);
    root.add(hole);
  }

  const btn = new THREE.Mesh(new THREE.CylinderGeometry(P*0.22,P*0.22,0.040,14), M.green());
  btn.rotation.x = Math.PI/2;
  btn.position.set(-BW*0.38, BH*0.30, BD/2+0.041);
  root.add(btn);

  root.rotation.x = 0.15;
  return root;
}

// ── MCU TRAINER ──────────────────────────────────────────────────────────
export function buildMcuTrainerStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P*9.0, BD = P*7.0, BH = 0.10;

  root.add(solidBox(BW, BH, BD, M.pcbgreen()));

  const mcu = solidBox(P*2.4, P*0.55, P*2.4, M.ic());
  mcu.position.set(0, BH/2 + P*0.275, -P*0.5);
  root.add(mcu);

  const mcuPinGeo = new THREE.BoxGeometry(P*0.12, P*0.45, P*0.12);
  for (let i = 0; i < 8; i++) {
    const x = -P*0.98 + i*P*0.28;
    for (const zSign of [-1,1]) {
      const pin = new THREE.Mesh(mcuPinGeo, M.silver());
      pin.position.set(x, BH/2 + P*0.05, -P*0.5 + zSign*P*1.38);
      root.add(pin);
    }
  }

  const xtalH = P*0.60;
  const xtal = new THREE.Mesh(new THREE.CylinderGeometry(P*0.16,P*0.16,xtalH,10), M.silver());
  xtal.position.set(P*1.5, BH/2+xtalH/2, -P*0.5);
  root.add(xtal);

  root.add(solidBox(P*0.90, P*0.55, P*0.60, M.silver())).position.set(-BW*0.35, BH/2+P*0.275, -BD/2+P*0.25);

  const reset = new THREE.Mesh(new THREE.CylinderGeometry(P*0.18,P*0.20,P*0.28,12), M.red());
  reset.position.set(BW*0.35, BH/2+P*0.14, -BD*0.25);
  root.add(reset);

  const ledCols = [0xd63b2a, 0xdda000, 0x22a84a, 0x2563a8, 0xffffff];
  for (let i = 0; i < 5; i++) {
    const led = new THREE.Mesh(new THREE.CylinderGeometry(P*0.14,P*0.14,P*0.22,10), M.hex(ledCols[i]));
    led.position.set(-BW*0.38, BH/2+P*0.11, BD*0.15 + i*P*0.50);
    root.add(led);
  }

  const hdrGeo = new THREE.BoxGeometry(P*0.12, P*0.55, P*0.12);
  for (let r = 0; r < 10; r++) {
    for (const dx of [-P*0.18, P*0.18]) {
      const pin = new THREE.Mesh(hdrGeo, M.gold());
      pin.position.set(BW*0.40+dx, BH/2+P*0.28, -BD*0.25+r*P*0.44);
      root.add(pin);
    }
  }

  for (let i = 0; i < 3; i++) {
    const pin = new THREE.Mesh(hdrGeo, M.gold());
    pin.position.set(BW*0.40, BH/2+P*0.28, -BD*0.45-i*P*0.44);
    root.add(pin);
  }

  for (let i = 0; i < 6; i++) {
    root.add(solidBox(P*0.22, P*0.12, P*0.12, M.cream())).position.set(-BW*0.20+i*P*0.55, BH/2+P*0.06, BD*0.28);
  }

  root.rotation.x = 0.5;
  return root;
}

// ── Instrument connection wire helper ─────────────────────────────────────
// Draws a smooth TubeGeometry wire from an instrument position to a board hole.
function instrumentWire(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: number,
  arcHeight: number = PITCH * 2.5,
): THREE.Mesh {
  const wireR = PITCH * 0.11;
  const mid = from.clone().lerp(to, 0.5);
  mid.y = Math.max(from.y, to.y) + arcHeight;
  const pts = [from, mid, to];
  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.TubeGeometry(curve, 32, wireR, 6, false);
  return new THREE.Mesh(tube, new THREE.MeshBasicMaterial({ color }));
}

// ── BOARD-PLACED DC POWER SUPPLY ─────────────────────────────────────────
export function buildDcPowerSupply(
  position: 'left' | 'right' = 'left',
  displayValue: string = '--',
  targets?: { vcc: THREE.Vector3; gnd: THREE.Vector3 },
): THREE.Group {
  const model = buildDcPowerSupplyStandalone();

  const P = PITCH;
  const BW = P * 7.0, BH = P * 4.5, BD = P * 5.0;
  const lcdLabel = textLabel(displayValue, BW * 0.50, BH * 0.22, {
    textColor: '#22dd22',
    fontSize: 56,
    bold: true,
  });
  if (lcdLabel) {
    lcdLabel.position.set(-BW * 0.10, BH * 0.22, BD / 2 + 0.042);
    model.add(lcdLabel);
  }

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.22);

  // Position behind-left of the breadboard — like it's sitting at the back of the bench
  // Z is negative = behind the board (away from viewer)
  // X is offset left or right
  const xSign = position === 'left' ? -1 : 1;
  wrapper.position.set(xSign * (BOARD_W / 2 - 1.2), 0, -(BOARD_D / 2 + 0.5));

  const root = new THREE.Group();
  root.add(wrapper);

  // ── Connection wires to specific board holes ──────────────────────────
  if (targets) {
    const xSign = position === 'left' ? -1 : 1;
    const wrapperX = xSign * (BOARD_W / 2 - 1.2);
    const wrapperZ = -(BOARD_D / 2 + 0.5);
    const psuY = TOP_Y + PITCH * 0.5;
    const psuOrigin = new THREE.Vector3(wrapperX, psuY, wrapperZ);
    root.add(instrumentWire(psuOrigin, targets.vcc, 0xd63b2a));
    const psuOrigin2 = psuOrigin.clone();
    psuOrigin2.x += xSign * 0.06;
    psuOrigin2.z += 0.05;
    root.add(instrumentWire(psuOrigin2, targets.gnd, 0x202020));
  }

  return root;
}

// ── BOARD-PLACED IC METER (DIGITAL MULTIMETER) ──────────────────────────
export function buildIcMeter(
  position: 'left' | 'right' = 'right',
  displayValue: string = '--',
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  const model = buildIcMeterStandalone();

  const P = PITCH;
  const BW = P * 4.0, BH = P * 9.0, BD = P * 1.2;
  const lcdLabel = textLabel(displayValue, BW * 0.70, BH * 0.18, {
    textColor: '#2a4a1a',
    fontSize: 48,
    bold: true,
  });
  if (lcdLabel) {
    lcdLabel.position.set(0, BH * 0.30, BD / 2 + 0.040);
    model.add(lcdLabel);
  }

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.18);

  // Position behind-right of the breadboard
  const xSign = position === 'right' ? 1 : -1;
  wrapper.position.set(xSign * (BOARD_W / 2 - 1.2), 0, -(BOARD_D / 2 + 0.5));

  const root = new THREE.Group();
  root.add(wrapper);

  // ── Probe wires to specific board holes ────────────────────────────────
  if (targets) {
    const xSign = position === 'right' ? 1 : -1;
    const wrapperX = xSign * (BOARD_W / 2 - 1.2);
    const wrapperZ = -(BOARD_D / 2 + 0.5);
    const dmmY = TOP_Y + PITCH * 0.5;
    const dmmOrigin = new THREE.Vector3(wrapperX, dmmY, wrapperZ);
    root.add(instrumentWire(dmmOrigin, targets.probe1, 0xe07020));
    const dmmOrigin2 = dmmOrigin.clone();
    dmmOrigin2.x -= xSign * 0.06;
    dmmOrigin2.z += 0.05;
    root.add(instrumentWire(dmmOrigin2, targets.probe2, 0x202020));
  }

  return root;
}
