import * as THREE from "three";
import { PITCH, BOARD_H, BOARD_W, BOARD_D, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";
import { instrumentWire } from "@/components/shared/instrument-wire";

// ── LOGIC ANALYSER (16-CH 100 MHz) ──────────────────────────────────────────
// Benchtop laboratory digital logic analyser with multi-channel timing diagram
// display, channel labels, input pod header, and navigation controls.
//
// Mounted form: placed beside the breadboard.
// Standalone form: centered at origin for apparatus cards.

export function buildLogicAnalyserStandalone(
  label = "LOGIC ANALYSER",
): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const BW = P * 11.4;
  const BH = P * 7.0;
  const BD = P * 5.8;

  // Main enclosure
  const body = solidBox(BW, BH, BD, M.white());
  root.add(body);

  // Front bezel (dark recess frame)
  const bezelW = BW * 0.94;
  const bezelH = BH * 0.88;
  const bezelD = 0.04;
  const bezel = solidBox(bezelW, bezelH, bezelD, M.dark());
  bezel.position.set(0, 0, BD / 2 + bezelD / 2);
  root.add(bezel);

  // ── Display Screen (multi-channel digital timing waveforms) ──────────────
  const screenW = bezelW * 0.58;
  const screenH = bezelH * 0.74;
  const screenX = -bezelW * 0.17;
  const screenY = bezelH * 0.04;
  const screenZ = BD / 2 + bezelD + 0.01;

  const screenGeo = new THREE.BoxGeometry(screenW, screenH, 0.02);
  const screen = new THREE.Mesh(screenGeo, M.hex(0x0a1218));
  screen.position.set(screenX, screenY, screenZ);
  screen.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(screenGeo), M.edge()),
  );
  root.add(screen);

  // Screen header
  const headerL = textLabel("100 MHz  10 kpts  TRIG: PATTERN", screenW * 0.9, screenH * 0.1, {
    textColor: "#40e090",
    fontSize: 26,
  });
  if (headerL) {
    headerL.position.set(screenX, screenY + screenH * 0.43, screenZ + 0.015);
    root.add(headerL);
  }

  // 6 digital timing channels (D0 to D5)
  const nCh = 6;
  const traceColors = [0x44ff88, 0x44d8ff, 0xffd844, 0xff8844, 0xdd66ff, 0x66ffcc];
  const chH = (screenH * 0.76) / nCh;

  for (let ch = 0; ch < nCh; ch++) {
    const cy = screenY + screenH * 0.32 - ch * chH;

    // Channel label (D0, D1, ...)
    const chL = textLabel(`D${ch}`, P * 0.8, chH * 0.8, {
      textColor: "#88a8c0",
      fontSize: 24,
      bold: true,
    });
    if (chL) {
      chL.position.set(screenX - screenW * 0.44, cy, screenZ + 0.015);
      root.add(chL);
    }

    // Channel trace line (digital HIGH / LOW steps)
    const tracePts: THREE.Vector3[] = [];
    const nSteps = 12;
    const startX = screenX - screenW * 0.36;
    const endX = screenX + screenW * 0.46;
    const stepW = (endX - startX) / nSteps;
    const highY = cy + chH * 0.28;
    const lowY = cy - chH * 0.28;

    let isHigh = (ch % 2 === 0);
    tracePts.push(new THREE.Vector3(startX, isHigh ? highY : lowY, screenZ + 0.015));

    for (let s = 1; s <= nSteps; s++) {
      const sx = startX + s * stepW;
      const willToggle = (s + ch) % (ch + 2) === 0;
      if (willToggle) {
        // Vertical transition
        tracePts.push(new THREE.Vector3(sx, isHigh ? highY : lowY, screenZ + 0.015));
        isHigh = !isHigh;
        tracePts.push(new THREE.Vector3(sx, isHigh ? highY : lowY, screenZ + 0.015));
      } else {
        tracePts.push(new THREE.Vector3(sx, isHigh ? highY : lowY, screenZ + 0.015));
      }
    }

    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePts);
    const traceMat = new THREE.LineBasicMaterial({ color: traceColors[ch] });
    root.add(new THREE.Line(traceGeo, traceMat));
  }

  // Vertical time cursor line
  const cursorX = screenX + screenW * 0.12;
  const cursorGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(cursorX, screenY - screenH * 0.38, screenZ + 0.02),
    new THREE.Vector3(cursorX, screenY + screenH * 0.38, screenZ + 0.02),
  ]);
  const cursorMat = new THREE.LineBasicMaterial({ color: 0xff3344 });
  root.add(new THREE.Line(cursorGeo, cursorMat));

  // ── Input Probe Pod Header (right side) ──────────────────────────────────
  const podX = bezelW * 0.28;
  const podY = -bezelH * 0.12;

  // Boxed dual-row probe connector (16-pin)
  const podW = P * 3.2;
  const podH = P * 1.6;
  const pod = solidBox(podW, podH, P * 0.4, M.hex(0x181818));
  pod.position.set(podX, podY, BD / 2 + bezelD + P * 0.2);
  root.add(pod);

  // 16 input pins (2 rows of 8)
  const pinGeo = new THREE.CylinderGeometry(P * 0.06, P * 0.06, P * 0.3, 8);
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 8; c++) {
      const px = podX - podW * 0.38 + c * (podW * 0.11);
      const py = podY - podH * 0.22 + r * (podH * 0.44);
      const pin = new THREE.Mesh(pinGeo, M.gold());
      pin.rotation.x = Math.PI / 2;
      pin.position.set(px, py, BD / 2 + bezelD + P * 0.4);
      root.add(pin);
    }
  }

  const podLabel = textLabel("INPUT CH 0–15", podW * 0.9, P * 0.38, {
    textColor: "#c0c0c0",
    fontSize: 26,
    bold: true,
  });
  if (podLabel) {
    podLabel.position.set(podX, podY - podH / 2 - P * 0.26, BD / 2 + bezelD + 0.01);
    root.add(podLabel);
  }

  // ── Control Buttons & Rotary Encoder Knob ────────────────────────────────
  // Rotary navigation dial
  const dialR = P * 0.55;
  const dial = solidCyl(dialR, P * 0.35, M.hex(0x383842), 16);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(podX, bezelH * 0.24, BD / 2 + bezelD + P * 0.18);
  root.add(dial);

  // Buttons: RUN/STOP, SINGLE
  const runBtn = solidBox(P * 1.1, P * 0.38, P * 0.18, M.hex(0x228833));
  runBtn.position.set(podX - P * 0.7, bezelH * 0.42, BD / 2 + bezelD + P * 0.09);
  root.add(runBtn);

  const sglBtn = solidBox(P * 1.1, P * 0.38, P * 0.18, M.hex(0x2868a8));
  sglBtn.position.set(podX + P * 0.7, bezelH * 0.42, BD / 2 + bezelD + P * 0.09);
  root.add(sglBtn);

  // Instrument title banner
  const brand = textLabel(label, BW * 0.65, P * 0.45, {
    textColor: "#ffffff",
    fontSize: 32,
    bold: true,
  });
  if (brand) {
    brand.position.set(0, bezelH * 0.44, BD / 2 + bezelD + 0.015);
    root.add(brand);
  }

  return root;
}

export function buildLogicAnalyser(
  position: "left" | "right" = "right",
  label = "LOGIC ANALYSER",
): THREE.Group {
  const model = buildLogicAnalyserStandalone(label);
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
