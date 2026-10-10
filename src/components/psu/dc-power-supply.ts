import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";
import { benchPlacement, BENCH_SLOTS } from "@/components/shared/bench-layout";
// ── DC POWER SUPPLY ──────────────────────────────────────────────────────
export function buildDcPowerSupplyStandalone(): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const BW = P * 7.0,
    BH = P * 4.5,
    BD = P * 5.0;

  root.add(solidBox(BW, BH, BD, M.dark()));

  const panel = solidBox(BW, BH, 0.04, M.gray());
  panel.position.z = BD / 2 + 0.021;
  root.add(panel);

  root
    .add(
      new THREE.Mesh(
        new THREE.BoxGeometry(BW * 0.55, BH * 0.3, 0.018),
        M.hex(0x1a3a1a),
      ),
    )
    .position.set(-BW * 0.1, BH * 0.22, BD / 2 + 0.03);

  for (let i = 0; i < 4; i++) {
    const dg = new THREE.Mesh(
      new THREE.BoxGeometry(P * 0.22, BH * 0.2, 0.02),
      M.hex(0x22dd22),
    );
    dg.position.set(-BW * 0.22 + i * P * 0.28, BH * 0.22, BD / 2 + 0.034);
    root.add(dg);
  }

  const dialR = P * 0.78;
  for (const dx of [-BW * 0.25, BW * 0.25]) {
    const dGeo = new THREE.CylinderGeometry(dialR, dialR, 0.035, 20);
    const dial = new THREE.Mesh(dGeo, M.gray());
    dial.rotation.x = Math.PI / 2;
    dial.position.set(dx, -BH * 0.12, BD / 2 + 0.038);
    dial.add(
      new THREE.LineSegments(new THREE.EdgesGeometry(dGeo, 20), M.edge()),
    );
    root.add(dial);
    const kPtr = solidBox(P * 0.1, P * 0.1, 0.042, M.silver());
    kPtr.position.set(dx, -BH * 0.12 + dialR * 0.72, BD / 2 + 0.038);
    root.add(kPtr);
  }

  for (const [dx, col] of [
    [BW * 0.15, 0xd63b2a],
    [BW * 0.32, 0x1a1a1a],
  ] as [number, number][]) {
    const sock = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.18, P * 0.18, 0.045, 12),
      M.hex(col),
    );
    sock.rotation.x = Math.PI / 2;
    sock.position.set(dx, -BH * 0.3, BD / 2 + 0.044);
    root.add(sock);
    const hole = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.08, P * 0.08, 0.05, 8),
      M.hole(),
    );
    hole.rotation.x = Math.PI / 2;
    hole.position.set(dx, -BH * 0.3, BD / 2 + 0.044);
    root.add(hole);
  }

  const btn = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.22, P * 0.22, 0.04, 14),
    M.green(),
  );
  btn.rotation.x = Math.PI / 2;
  btn.position.set(-BW * 0.38, BH * 0.3, BD / 2 + 0.041);
  root.add(btn);

  root.rotation.x = 0.15;
  return root;
}

// ── BOARD-PLACED DC POWER SUPPLY ─────────────────────────────────────────
export function buildDcPowerSupply(
  position: "left" | "right" | number = "left",
  displayValue: string = "--",
  targets?: { vcc: THREE.Vector3; gnd: THREE.Vector3 },
): THREE.Group {
  const model = buildDcPowerSupplyStandalone();

  const P = PITCH;
  const BW = P * 7.0,
    BH = P * 4.5,
    BD = P * 5.0;
  const lcdLabel = textLabel(displayValue, BW * 0.5, BH * 0.22, {
    textColor: "#22dd22",
    fontSize: 56,
    bold: true,
  });
  if (lcdLabel) {
    lcdLabel.position.set(-BW * 0.1, BH * 0.22, BD / 2 + 0.042);
    model.add(lcdLabel);
  }

  // Slot index: a number selects a bench slot directly; "left"/"right" map to
  // the two ends of the bench row for back-compat.
  const slot =
    typeof position === "number"
      ? position
      : position === "left"
        ? 0
        : BENCH_SLOTS - 1;
  const { position: slotPos, scale } = benchPlacement(slot);

  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(scale);
  wrapper.position.copy(slotPos);

  const root = new THREE.Group();
  root.add(wrapper);

  // ── Connection wires to specific board holes ──────────────────────────
  if (targets) {
    const psuY = TOP_Y + PITCH * 0.5;
    const psuOrigin = new THREE.Vector3(slotPos.x, psuY, slotPos.z);
    root.add(instrumentWire(psuOrigin, targets.vcc, 0xd63b2a));
    const psuOrigin2 = psuOrigin.clone();
    psuOrigin2.x += 0.06;
    psuOrigin2.z += 0.05;
    root.add(instrumentWire(psuOrigin2, targets.gnd, 0x202020));
  }

  return root;
}
