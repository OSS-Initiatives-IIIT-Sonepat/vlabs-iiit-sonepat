import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";
// ── IC METER ─────────────────────────────────────────────────────────────
export function buildIcMeterStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P * 4.0,
    BH = P * 9.0,
    BD = P * 1.2;

  const bodyMat = M.hex(0x2a2a2a);
  const bodyGeo = new THREE.BoxGeometry(BW, BH, BD);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeo), M.edge()));
  root.add(body);

  const grip = new THREE.Mesh(
    new THREE.BoxGeometry(BW + 0.04, BH * 0.22, BD + 0.04),
    M.hex(0xd4a020),
  );
  grip.position.y = BH * 0.08;
  root.add(grip);

  const lcdGeo = new THREE.BoxGeometry(BW * 0.78, BH * 0.26, 0.025);
  const lcd = new THREE.Mesh(lcdGeo, M.hex(0xc8d8b0));
  lcd.position.set(0, BH * 0.3, BD / 2 + 0.013);
  lcd.add(new THREE.LineSegments(new THREE.EdgesGeometry(lcdGeo), M.edge()));
  root.add(lcd);

  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(BW * 0.78 + 0.06, BH * 0.26 + 0.06, 0.013),
    M.dark(),
  );
  bezel.position.set(0, BH * 0.3, BD / 2 + 0.005);
  root.add(bezel);

  for (let i = 0; i < 4; i++) {
    const dg = new THREE.Mesh(
      new THREE.BoxGeometry(P * 0.3, BH * 0.14, 0.03),
      M.hex(0x2a4a1a),
    );
    dg.position.set(-BW * 0.28 + i * P * 0.55, BH * 0.3, BD / 2 + 0.03);
    root.add(dg);
  }

  const dialR = P * 1.0;
  const dialGeo = new THREE.CylinderGeometry(dialR, dialR, 0.04, 24);
  const dial = new THREE.Mesh(dialGeo, M.hex(0x444444));
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, BH * 0.04, BD / 2 + 0.025);
  dial.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(dialGeo, 20), M.edge()),
  );
  root.add(dial);

  const ptr = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, dialR * 0.85, 0.05),
    M.red(),
  );
  ptr.position.set(0, BH * 0.04 - dialR * 0.38, BD / 2 + 0.048);
  root.add(ptr);

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, P * 0.18, 0.044),
      M.silver(),
    );
    tick.position.set(
      Math.sin(a) * (dialR + P * 0.22),
      BH * 0.04 + Math.cos(a) * (dialR + P * 0.22),
      BD / 2 + 0.025,
    );
    root.add(tick);
  }

  for (const [bx, col] of [
    [-P * 0.9, 0x444488],
    [P * 0.9, 0x444444],
  ] as [number, number][]) {
    const btn = new THREE.Mesh(
      new THREE.BoxGeometry(P * 0.6, P * 0.28, 0.04),
      M.hex(col),
    );
    btn.position.set(bx, BH * 0.15, BD / 2 + 0.025);
    root.add(btn);
  }

  const sockGeo = new THREE.CylinderGeometry(P * 0.2, P * 0.2, 0.08, 12);
  for (const [sx, col] of [
    [-P * 1.0, 0x1a1a1a],
    [0, 0xcc2200],
    [P * 1.0, 0xcc2200],
  ] as [number, number][]) {
    const sock = new THREE.Mesh(sockGeo, M.hex(col));
    sock.rotation.x = Math.PI / 2;
    sock.position.set(sx, -BH * 0.38, BD / 2 + 0.045);
    root.add(sock);
    const hole = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.09, P * 0.09, 0.09, 8),
      M.hole(),
    );
    hole.rotation.x = Math.PI / 2;
    hole.position.set(sx, -BH * 0.38, BD / 2 + 0.046);
    root.add(hole);
  }

  const wireLen = BH * 0.55;
  for (const [sx, col] of [
    [-P * 1.0, 0x1a1a1a],
    [0, 0xcc2200],
  ] as [number, number][]) {
    const wireMat = M.hex(col);
    const wire = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.06, P * 0.06, wireLen, 6),
      wireMat,
    );
    wire.position.set(sx, -BH * 0.38 - wireLen / 2, BD / 2 + 0.04);
    root.add(wire);
    const tip = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.12, P * 0.02, P * 0.5, 8),
      wireMat,
    );
    tip.position.set(sx, -BH * 0.38 - wireLen - P * 0.25, BD / 2 + 0.04);
    root.add(tip);
  }

  root.position.y = -BH * 0.04;
  return root;
}

export function buildIcMeter(
  position: "left" | "right" | number = "right",
  displayValue: string = "--",
  targets?: { probe1: THREE.Vector3; probe2: THREE.Vector3 },
): THREE.Group {
  const model = buildIcMeterStandalone();

  const P = PITCH;
  const BW = P * 4.0,
    BH = P * 9.0,
    BD = P * 1.2;
  const lcdLabel = textLabel(displayValue, BW * 0.7, BH * 0.18, {
    textColor: "#2a4a1a",
    fontSize: 48,
    bold: true,
  });
  if (lcdLabel) {
    lcdLabel.position.set(0, BH * 0.3, BD / 2 + 0.04);
    model.add(lcdLabel);
  }

  const slot =
    typeof position === "number"
      ? position
      : position === "right"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos, scale } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(scale);
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);

  if (targets) {
    const dmmY = TOP_Y + PITCH * 0.5;
    const dmmOrigin = new THREE.Vector3(slotPos.x, dmmY, slotPos.z);
    root.add(instrumentWire(dmmOrigin, targets.probe1, 0xe07020));
    const dmmOrigin2 = dmmOrigin.clone();
    dmmOrigin2.x -= 0.06;
    dmmOrigin2.z += 0.05;
    root.add(instrumentWire(dmmOrigin2, targets.probe2, 0x202020));
  }

  return root;
}
