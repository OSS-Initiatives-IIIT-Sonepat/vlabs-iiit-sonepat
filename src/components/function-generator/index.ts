import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";

// ── FUNCTION / SIGNAL GENERATOR (1 Hz – 1 MHz) ──────────────────────────────
// Laboratory function generator with frequency readout, waveform buttons,
// frequency / amplitude knobs, and 50Ω BNC outputs.
//
// Mounted form: placed beside the breadboard.
// Standalone form: centered at origin for apparatus cards.

export function buildFunctionGeneratorStandalone(
  label = "FUNCTION GENERATOR",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const BW = P * 10.5;
  const BH = P * 5.8;
  const BD = P * 5.4;

  // Main enclosure
  const body = solidBox(BW, BH, BD, M.white());
  root.add(body);

  // Front bezel (dark recess)
  const bezelW = BW * 0.94;
  const bezelH = BH * 0.88;
  const bezelD = 0.04;
  const bezel = solidBox(bezelW, bezelH, bezelD, M.dark());
  bezel.position.set(0, 0, BD / 2 + bezelD / 2);
  root.add(bezel);

  // ── Digital Display (upper left) ─────────────────────────────────────────
  const dispW = bezelW * 0.44;
  const dispH = bezelH * 0.38;
  const dispX = -bezelW * 0.23;
  const dispY = bezelH * 0.2;
  const dispZ = BD / 2 + bezelD + 0.01;

  const dispMesh = new THREE.Mesh(
    new THREE.BoxGeometry(dispW, dispH, 0.02),
    M.hex(0x0c2028),
  );
  dispMesh.position.set(dispX, dispY, dispZ);
  dispMesh.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(dispMesh.geometry),
      M.edge(),
    ),
  );
  root.add(dispMesh);

  // Frequency readout text
  const freqText = textLabel("1.000 kHz", dispW * 0.85, dispH * 0.45, {
    textColor: "#38e0d0",
    fontSize: 48,
    bold: true,
  });
  if (freqText) {
    freqText.position.set(dispX, dispY + dispH * 0.08, dispZ + 0.015);
    root.add(freqText);
  }

  // Waveform indicator text
  const waveText = textLabel("SINE  5.00 Vpp", dispW * 0.8, dispH * 0.28, {
    textColor: "#28a090",
    fontSize: 28,
  });
  if (waveText) {
    waveText.position.set(dispX, dispY - dispH * 0.28, dispZ + 0.015);
    root.add(waveText);
  }

  // ── Waveform Selection Buttons (below display) ───────────────────────────
  const btnY = -bezelH * 0.16;
  const waveforms = ["~ SINE", "⎍ SQR", "⋀ TRI"];
  for (let i = 0; i < 3; i++) {
    const bx = dispX - P * 1.3 + i * P * 1.3;
    const btn = solidBox(P * 1.1, P * 0.42, P * 0.2, i === 0 ? M.hex(0x286888) : M.hex(0x2c2c34));
    btn.position.set(bx, btnY, BD / 2 + bezelD + P * 0.1);
    root.add(btn);

    const bl = textLabel(waveforms[i], P * 1.0, P * 0.35, {
      textColor: i === 0 ? "#ffffff" : "#a0a0a0",
      fontSize: 24,
      bold: true,
    });
    if (bl) {
      bl.position.set(bx, btnY, BD / 2 + bezelD + P * 0.21);
      root.add(bl);
    }
  }

  // ── Control Knobs (right side) ───────────────────────────────────────────
  const ctrlX = bezelW * 0.24;

  function addKnob(
    kx: number,
    ky: number,
    kr: number,
    kh: number,
    kLabel: string,
    kColor = 0x3a3a42,
  ) {
    const knob = solidCyl(kr, kh, M.hex(kColor), 16);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(kx, ky, BD / 2 + bezelD + kh / 2);
    root.add(knob);

    const ptr = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, kr * 0.7, kh + 0.01),
      M.white(),
    );
    ptr.position.set(kx, ky + kr * 0.35, BD / 2 + bezelD + kh / 2 + 0.005);
    root.add(ptr);

    const kl = textLabel(kLabel, kr * 4, P * 0.4, {
      textColor: "#d0d0d0",
      fontSize: 26,
    });
    if (kl) {
      kl.position.set(kx, ky - kr - P * 0.22, BD / 2 + bezelD + 0.01);
      root.add(kl);
    }
  }

  // Frequency coarse & fine knobs
  addKnob(ctrlX - P * 1.2, bezelH * 0.18, P * 0.5, P * 0.35, "FREQ COARSE");
  addKnob(ctrlX + P * 1.2, bezelH * 0.18, P * 0.4, P * 0.3, "FINE");

  // Amplitude & DC offset knobs
  addKnob(ctrlX - P * 1.2, -bezelH * 0.18, P * 0.45, P * 0.35, "AMPLITUDE");
  addKnob(ctrlX + P * 1.2, -bezelH * 0.18, P * 0.4, P * 0.3, "OFFSET");

  // ── Output BNC Terminals (lower center / right) ───────────────────────────
  function addBnc(bx: number, by: number, bLabel: string) {
    const bncRing = solidCyl(P * 0.22, P * 0.35, M.silver(), 14);
    bncRing.rotation.x = Math.PI / 2;
    bncRing.position.set(bx, by, BD / 2 + bezelD + P * 0.18);
    root.add(bncRing);

    const bncHole = new THREE.Mesh(
      new THREE.CylinderGeometry(P * 0.09, P * 0.09, P * 0.38, 10),
      M.hole(),
    );
    bncHole.rotation.x = Math.PI / 2;
    bncHole.position.set(bx, by, BD / 2 + bezelD + P * 0.2);
    root.add(bncHole);

    const l = textLabel(bLabel, P * 1.5, P * 0.35, {
      textColor: "#e0e0e0",
      fontSize: 26,
      bold: true,
    });
    if (l) {
      l.position.set(bx, by - P * 0.38, BD / 2 + bezelD + 0.01);
      root.add(l);
    }
  }

  addBnc(-bezelW * 0.22, -bezelH * 0.34, "MAIN 50Ω");
  addBnc(0, -bezelH * 0.34, "SYNC / TTL");

  // Power button
  const pwrBtn = solidBox(P * 0.6, P * 0.32, P * 0.2, M.hex(0xcc2222));
  pwrBtn.position.set(-bezelW * 0.4, -bezelH * 0.34, BD / 2 + bezelD + P * 0.1);
  root.add(pwrBtn);

  // Top instrument label
  const brand = textLabel(label, BW * 0.75, P * 0.5, {
    textColor: "#ffffff",
    fontSize: 34,
    bold: true,
  });
  if (brand) {
    brand.position.set(0, bezelH * 0.44, BD / 2 + bezelD + 0.015);
    root.add(brand);
  }

  return root;
}

export function buildFunctionGenerator(
  position: "left" | "right" = "left",
  label = "FUNCTION GENERATOR",
): THREE.Group {
  const model = buildFunctionGeneratorStandalone(label);
  const wrapper = new THREE.Group();
  wrapper.add(model);
  wrapper.scale.setScalar(0.18);

  const xSign = position === "right" ? 1 : -1;
  const posX = xSign * (BOARD_W / 2 - 1.4);
  const posZ = -(BOARD_D / 2 + 0.8);
  wrapper.position.set(posX, 0, posZ);

  const root = new THREE.Group();
  root.add(wrapper);
  return root;
}
