import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";

// ── OSCILLOSCOPE / CRO ──────────────────────────────────────────────────────
// Dual-channel benchtop laboratory oscilloscope with CRT/LCD display,
// graticule, live waveform trace, control knobs, and BNC connectors.
//
// Mounted form: placed beside the breadboard with BNC test leads.
// Standalone form: centered at origin for apparatus cards.

export function buildOscilloscopeStandalone(
  label = "OSCILLOSCOPE / CRO",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const BW = P * 11.2;
  const BH = P * 7.4;
  const BD = P * 6.5;

  // Main enclosure (instrument casing)
  const body = solidBox(BW, BH, BD, M.white());
  root.add(body);

  // Top carrying handle
  const handleW = BW * 0.55;
  const handleR = P * 0.12;
  const handleBar = solidCyl(handleR, handleW, M.gray(), 12);
  handleBar.rotation.z = Math.PI / 2;
  handleBar.position.set(0, BH / 2 + P * 0.7, 0);
  root.add(handleBar);

  for (const hSign of [-1, 1]) {
    const leg = solidCyl(handleR, P * 0.75, M.gray(), 12);
    leg.position.set(hSign * (handleW / 2), BH / 2 + P * 0.35, 0);
    root.add(leg);
  }

  // Front bezel (dark recess frame)
  const bezelW = BW * 0.94;
  const bezelH = BH * 0.88;
  const bezelD = 0.04;
  const bezel = solidBox(bezelW, bezelH, bezelD, M.dark());
  bezel.position.set(0, 0, BD / 2 + bezelD / 2);
  root.add(bezel);

  // ── Screen (left side) ──────────────────────────────────────────────────
  const screenW = bezelW * 0.48;
  const screenH = bezelH * 0.72;
  const screenX = -bezelW * 0.22;
  const screenY = bezelH * 0.04;
  const screenZ = BD / 2 + bezelD + 0.01;

  // CRT Screen background (dark green / phosphor)
  const screenGeo = new THREE.BoxGeometry(screenW, screenH, 0.02);
  const screenMat = M.hex(0x081a10);
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(screenX, screenY, screenZ);
  screen.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(screenGeo), M.edge()),
  );
  root.add(screen);

  // Graticule grid lines (8 divisions vertical, 10 divisions horizontal)
  const gridMat = new THREE.LineBasicMaterial({
    color: 0x1a4a2a,
    transparent: true,
    opacity: 0.6,
  });
  const gridPts: THREE.Vector3[] = [];

  // Horizontal division lines
  for (let r = 1; r < 8; r++) {
    const gy = -screenH / 2 + (r / 8) * screenH;
    gridPts.push(
      new THREE.Vector3(screenX - screenW / 2, screenY + gy, screenZ + 0.012),
      new THREE.Vector3(screenX + screenW / 2, screenY + gy, screenZ + 0.012),
    );
  }
  // Vertical division lines
  for (let c = 1; c < 10; c++) {
    const gx = -screenW / 2 + (c / 10) * screenW;
    gridPts.push(
      new THREE.Vector3(screenX + gx, screenY - screenH / 2, screenZ + 0.012),
      new THREE.Vector3(screenX + gx, screenY + screenH / 2, screenZ + 0.012),
    );
  }
  const gridGeo = new THREE.BufferGeometry().setFromPoints(gridPts);
  root.add(new THREE.LineSegments(gridGeo, gridMat));

  // Sine waveform trace across the screen
  const wavePts: THREE.Vector3[] = [];
  const waveSegs = 48;
  const waveAmp = screenH * 0.28;
  for (let i = 0; i <= waveSegs; i++) {
    const t = i / waveSegs;
    const wx = screenX - screenW * 0.44 + t * screenW * 0.88;
    const wy = screenY + Math.sin(t * Math.PI * 4) * waveAmp;
    wavePts.push(new THREE.Vector3(wx, wy, screenZ + 0.02));
  }
  const waveCurve = new THREE.CatmullRomCurve3(wavePts);
  const waveTube = new THREE.TubeGeometry(waveCurve, 48, 0.014, 6, false);
  const waveMesh = new THREE.Mesh(waveTube, M.hex(0x22ff55));
  root.add(waveMesh);

  // Screen header: 20MHz 50MS/s
  const screenTitle = textLabel("CH1 1.00V  CH2 1.00V  M 1.00ms", screenW * 0.9, screenH * 0.12, {
    textColor: "#33ff66",
    fontSize: 28,
  });
  if (screenTitle) {
    screenTitle.position.set(screenX, screenY + screenH * 0.42, screenZ + 0.025);
    root.add(screenTitle);
  }

  // ── Controls Section (right side) ────────────────────────────────────────
  const ctrlX = bezelW * 0.25;

  // Knob helper
  function addKnob(
    kx: number,
    ky: number,
    kr: number,
    kh: number,
    kLabel: string,
    color = 0x3a3a3a,
  ) {
    const knob = solidCyl(kr, kh, M.hex(color), 16);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(kx, ky, BD / 2 + bezelD + kh / 2);
    root.add(knob);

    // Pointer indicator line
    const ptr = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, kr * 0.7, kh + 0.01),
      M.white(),
    );
    ptr.position.set(kx, ky + kr * 0.35, BD / 2 + bezelD + kh / 2 + 0.005);
    root.add(ptr);

    // Label below knob
    const kl = textLabel(kLabel, kr * 4, P * 0.4, {
      textColor: "#e0e0e0",
      fontSize: 26,
    });
    if (kl) {
      kl.position.set(kx, ky - kr - P * 0.24, BD / 2 + bezelD + 0.01);
      root.add(kl);
    }
  }

  // TIME/DIV knob (upper right)
  addKnob(ctrlX, bezelH * 0.28, P * 0.55, P * 0.4, "TIME/DIV", 0x444455);

  // VOLTS/DIV CH1 knob (mid left)
  addKnob(ctrlX - P * 1.3, bezelH * -0.04, P * 0.45, P * 0.35, "CH 1", 0x334444);

  // VOLTS/DIV CH2 knob (mid right)
  addKnob(ctrlX + P * 1.3, bezelH * -0.04, P * 0.45, P * 0.35, "CH 2", 0x334444);

  // BNC Connectors (CH1, CH2, EXT TRIG) on lower right
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

    const l = textLabel(bLabel, P * 1.4, P * 0.35, {
      textColor: "#cccccc",
      fontSize: 26,
    });
    if (l) {
      l.position.set(bx, by - P * 0.38, BD / 2 + bezelD + 0.01);
      root.add(l);
    }
  }

  addBnc(ctrlX - P * 1.4, -bezelH * 0.32, "CH 1 (X)");
  addBnc(ctrlX, -bezelH * 0.32, "CH 2 (Y)");
  addBnc(ctrlX + P * 1.4, -bezelH * 0.32, "EXT TRIG");

  // Power switch button & power LED
  const pwrLed = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.1, P * 0.1, 0.04, 12),
    M.green(),
  );
  pwrLed.rotation.x = Math.PI / 2;
  pwrLed.position.set(-bezelW * 0.42, -bezelH * 0.38, BD / 2 + bezelD + 0.02);
  root.add(pwrLed);

  const pwrBtn = solidBox(P * 0.6, P * 0.3, P * 0.2, M.hex(0xcc2222));
  pwrBtn.position.set(-bezelW * 0.32, -bezelH * 0.38, BD / 2 + bezelD + P * 0.1);
  root.add(pwrBtn);

  // Branding text on top bezel
  const brand = textLabel(label, BW * 0.7, P * 0.5, {
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

export function buildOscilloscope(
  position: "left" | "right" = "right",
  label = "OSCILLOSCOPE / CRO",
): THREE.Group {
  const model = buildOscilloscopeStandalone(label);
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
