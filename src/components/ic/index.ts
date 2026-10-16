import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y, Z, COLS, colToX, hole } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";
import type { IcPin } from "@/labs/types";

function chipCode(label: string): string {
  const table: Record<string, string> = {
    XOR: "74HC86",
    AND: "74HC08",
    OR: "74HC32",
    NOT: "74HC04",
    NAND: "74HC00",
    NOR: "74HC02",
    XNOR: "74HC266",
    BUF: "74HC125",
    "D-FF": "74HC74",
    "JK-FF": "74HC76",
    "SR-LATCH": "74HC279",
    "4B-ADDER": "74HC283",
    "1:4 DEMUX": "74HC139",
    "3:8 DEC": "74HC138",
    "8:3 ENC": "74HC148",
    "8B-REG": "74HC273",
  };
  return table[label] ?? label;
}

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

  // Pin-1 notch (semicircle indent at left end)
  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.2, PITCH * 0.2, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(
    bodyX - bodyW / 2 + PITCH * 0.25,
    TOP_Y + bodyH * 0.75,
    bodyZ,
  );
  root.add(notch);

  // Pin-1 index dot (top-left, row e side)
  const dot = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.1, PITCH * 0.1, 0.012, 12),
    M.gold(),
  );
  dot.position.set(
    bodyX - bodyW / 2 + PITCH * 0.55,
    TOP_Y + bodyH + 0.005,
    bodyZ - bodyD * 0.28,
  );
  root.add(dot);

  // Pins — flat rectangular legs going down into holes
  const pinH = bodyH * 0.45 + BOARD_H * 0.5;
  const pinGeo = new THREE.BoxGeometry(PITCH * 0.17, pinH, PITCH * 0.17);
  for (const p of pinPositions) {
    const pTop = new THREE.Mesh(pinGeo, M.silver());
    pTop.position.set(p.ex, TOP_Y - pinH / 2 + bodyH * 0.1, p.ez);
    root.add(pTop);
    const pBot = new THREE.Mesh(pinGeo, M.silver());
    pBot.position.set(p.fx, TOP_Y - pinH / 2 + bodyH * 0.1, p.fz);
    root.add(pBot);
  }

  // Labels on top face
  if (label) {
    const code = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.9, bodyH * 0.52, {
      textColor: "#f8fafc",
      fontSize: 46,
      bold: true,
    });
    if (codeL) {
      codeL.rotation.x = -Math.PI / 2;
      codeL.position.set(bodyX, TOP_Y + bodyH + 0.003, bodyZ - bodyD * 0.12);
      root.add(codeL);
    }
    const typeL = textLabel(label, bodyW * 0.6, bodyH * 0.32, {
      textColor: "#38bdf8",
      fontSize: 34,
      bold: true,
    });
    if (typeL) {
      typeL.rotation.x = -Math.PI / 2;
      typeL.position.set(bodyX, TOP_Y + bodyH + 0.004, bodyZ + bodyD * 0.22);
      root.add(typeL);
    }
  }

  return root;
}

export function buildDip14(
  startCol: number,
  label = "",
  cols = COLS,
): THREE.Group {
  return buildDip(startCol, 7, label, cols);
}

export function buildDip16(
  startCol: number,
  label = "",
  cols = COLS,
): THREE.Group {
  return buildDip(startCol, 8, label, cols);
}

export function buildDip(
  startCol: number,
  pinsPerSide: number,
  label: string,
  cols: any = COLS,
): THREE.Group {
  const pinPositions = Array.from({ length: pinsPerSide }, (_, i) => ({
    ex: colToX(startCol + i, cols),
    ez: Z["e"],
    fx: colToX(startCol + i, cols),
    fz: Z["f"],
  }));

  const bodyX =
    (colToX(startCol, cols) + colToX(startCol + pinsPerSide - 1, cols)) / 2;
  const bodyZ = (Z["e"] + Z["f"]) / 2;
  const bodyW = (pinsPerSide - 1) * PITCH + PITCH * 0.65;
  const bodyD = Math.abs(Z["f"] - Z["e"]) * 0.72;
  const bodyH = PITCH * 1.25;

  return buildDipBody(bodyX, bodyZ, bodyW, bodyH, bodyD, pinPositions, label);
}

export function buildDip14Standalone(label = ""): THREE.Group {
  return buildDipStandalone(7, label);
}

export function buildDip16Standalone(label = ""): THREE.Group {
  return buildDipStandalone(8, label);
}

function buildDipStandalone(pinsPerSide: number, label: string): THREE.Group {
  const P = PITCH;
  const bodyW = (pinsPerSide - 1) * P + P * 0.65;
  const bodyH = P * 1.3;
  const bodyD = P * 2.2;

  const root = new THREE.Group();

  const body = solidBox(bodyW, bodyH, bodyD, M.ic());
  root.add(body);

  const notch = new THREE.Mesh(
    new THREE.CylinderGeometry(P * 0.22, P * 0.22, bodyD + 0.01, 12),
    M.gray(),
  );
  notch.rotation.x = Math.PI / 2;
  notch.position.set(-bodyW / 2 + P * 0.22, 0, 0);
  root.add(notch);

  const pinGeo = new THREE.BoxGeometry(P * 0.17, P * 0.72, P * 0.17);
  for (let i = 0; i < pinsPerSide; i++) {
    const x = -((pinsPerSide - 1) / 2) * P + i * P;
    for (const zSign of [-1, 1]) {
      const pin = new THREE.Mesh(pinGeo, M.silver());
      pin.position.set(
        x,
        -bodyH / 2 - P * 0.26,
        zSign * (bodyD / 2 + P * 0.12),
      );
      root.add(pin);
    }
  }

  if (label) {
    const code = chipCode(label);
    const codeL = textLabel(code, bodyW * 0.9, bodyH * 0.52, {
      textColor: "#f8fafc",
      fontSize: 46,
      bold: true,
    });
    if (codeL) {
      codeL.rotation.x = -Math.PI / 2;
      codeL.position.set(0, bodyH / 2 + 0.002, -bodyD * 0.12);
      root.add(codeL);
    }
    const typeL = textLabel(label, bodyW * 0.55, bodyH * 0.3, {
      textColor: "#38bdf8",
      fontSize: 34,
      bold: true,
    });
    if (typeL) {
      typeL.rotation.x = -Math.PI / 2;
      typeL.position.set(0, bodyH / 2 + 0.003, bodyD * 0.22);
      root.add(typeL);
    }
  }

  return root;
}

export function resolveIcPin(
  pin: IcPin["pin"],
  startCol: number,
  mountRow: string = "e",
  cols = COLS,
  icType?: string,
): THREE.Vector3 | null {
  const mr = mountRow.toLowerCase();

  // ── BJT transistors (TO-92: C at col-1, B at col, E at col+1) ──
  if (icType === "npn-bjt" || icType === "pnp-bjt") {
    const p = pin.trim().toUpperCase();
    const wireRow = mr === "e" ? "d" : mr === "c" ? "b" : mr === "h" ? "g" : "b";
    if (p === "C" || p === "COLLECTOR") return hole(startCol - 1, wireRow, cols);
    if (p === "B" || p === "BASE") return hole(startCol, wireRow, cols);
    if (p === "E" || p === "EMITTER") return hole(startCol + 1, wireRow, cols);
  }

  // ── MOSFETs (TO-220 / TO-92: G at col-1, D at col, S at col+1) ──
  if (icType === "n-mosfet" || icType === "p-mosfet") {
    const p = pin.trim().toUpperCase();
    const wireRow = mr === "e" ? "d" : mr === "c" ? "b" : mr === "h" ? "g" : "b";
    if (p === "G" || p === "GATE") return hole(startCol - 1, wireRow, cols);
    if (p === "D" || p === "DRAIN") return hole(startCol, wireRow, cols);
    if (p === "S" || p === "SOURCE") return hole(startCol + 1, wireRow, cols);
  }

  // Use adjacent hole rows (d for top bank e, g for bottom bank f) so wires plug cleanly next to IC legs
  const sideA =
    mr === "e" ? "d" : mr === "h" ? "g" : mr === "d" ? "c" : mr === "c" ? "b" : "d";
  const sideB =
    mr === "e" ? "g" : mr === "h" ? "i" : mr === "d" ? "h" : mr === "c" ? "i" : "g";

  const rawPin = pin.trim();
  const pUpper = rawPin.toUpperCase();
  const pLower = rawPin.toLowerCase();

  // ── LM741 / 8-pin op-amp ──
  if (icType === "op-amp") {
    switch (pUpper) {
      case "1":
      case "OFFSET1":
        return hole(startCol + 0, sideA, cols);
      case "2":
      case "IN-":
      case "-IN":
        return hole(startCol + 1, sideA, cols);
      case "3":
      case "IN+":
      case "+IN":
        return hole(startCol + 2, sideA, cols);
      case "4":
      case "V-":
      case "VEE":
      case "GND":
        return hole(startCol + 3, sideA, cols);
      case "5":
      case "OFFSET2":
        return hole(startCol + 3, sideB, cols);
      case "6":
      case "OUT":
        return hole(startCol + 2, sideB, cols);
      case "7":
      case "V+":
      case "VCC":
        return hole(startCol + 1, sideB, cols);
      case "8":
      case "NC":
        return hole(startCol + 0, sideB, cols);
    }
  }

  // ── D Flip-Flop 74HC74 (DIP-14) ──
  if (icType === "dff") {
    switch (pLower) {
      case "clr_bar":
      case "clr":
        return hole(startCol + 0, sideA, cols);
      case "in":
      case "d":
        return hole(startCol + 1, sideA, cols);
      case "clk":
        return hole(startCol + 2, sideA, cols);
      case "set_bar":
      case "set":
        return hole(startCol + 3, sideA, cols);
      case "out":
      case "q":
        return hole(startCol + 4, sideA, cols);
      case "q_bar":
        return hole(startCol + 5, sideA, cols);
      case "gnd":
        return hole(startCol + 6, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "clr_bar2":
        return hole(startCol + 1, sideB, cols);
      case "in2":
      case "d2":
        return hole(startCol + 2, sideB, cols);
      case "clk2":
        return hole(startCol + 3, sideB, cols);
      case "set_bar2":
        return hole(startCol + 4, sideB, cols);
      case "out2":
      case "q2":
        return hole(startCol + 5, sideB, cols);
      case "q_bar2":
        return hole(startCol + 6, sideB, cols);
    }
  }

  // ── JK Flip-Flop 74HC76 (DIP-16) ──
  if (icType === "jk-ff") {
    switch (pLower) {
      case "clk":
        return hole(startCol + 0, sideA, cols);
      case "set":
      case "set_bar":
        return hole(startCol + 1, sideA, cols);
      case "k":
        return hole(startCol + 2, sideA, cols);
      case "j":
        return hole(startCol + 3, sideA, cols);
      case "q_bar":
        return hole(startCol + 4, sideA, cols);
      case "out":
      case "q":
        return hole(startCol + 5, sideA, cols);
      case "gnd":
        return hole(startCol + 6, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "clr":
      case "clr_bar":
        return hole(startCol + 1, sideB, cols);
    }
  }

  // ── SR Latch 74HC279 (DIP-16) ──
  if (icType === "sr-latch") {
    switch (pLower) {
      case "s":
        return hole(startCol + 0, sideA, cols);
      case "r":
        return hole(startCol + 1, sideA, cols);
      case "q":
      case "out":
        return hole(startCol + 2, sideA, cols);
      case "s2":
        return hole(startCol + 3, sideA, cols);
      case "r2":
        return hole(startCol + 4, sideA, cols);
      case "q2":
        return hole(startCol + 5, sideA, cols);
      case "gnd":
        return hole(startCol + 6, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
    }
  }

  // ── 4-Bit Binary Adder 74HC283 (DIP-16) ──
  if (icType === "adder-4bit") {
    switch (pLower) {
      case "s2":
        return hole(startCol + 0, sideA, cols);
      case "b2":
        return hole(startCol + 1, sideA, cols);
      case "a2":
        return hole(startCol + 2, sideA, cols);
      case "s1":
        return hole(startCol + 3, sideA, cols);
      case "a1":
        return hole(startCol + 4, sideA, cols);
      case "b1":
        return hole(startCol + 5, sideA, cols);
      case "c0":
        return hole(startCol + 6, sideA, cols);
      case "gnd":
        return hole(startCol + 7, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "c4":
        return hole(startCol + 1, sideB, cols);
      case "s4":
        return hole(startCol + 2, sideB, cols);
      case "a4":
        return hole(startCol + 3, sideB, cols);
      case "b4":
        return hole(startCol + 4, sideB, cols);
      case "s3":
        return hole(startCol + 5, sideB, cols);
      case "a3":
        return hole(startCol + 6, sideB, cols);
      case "b3":
        return hole(startCol + 7, sideB, cols);
    }
  }

  // ── Dual 2:4 DEMUX 74HC139 (DIP-16) ──
  if (icType === "demux-1to4") {
    switch (pLower) {
      case "en_bar":
      case "1g":
        return hole(startCol + 0, sideA, cols);
      case "a":
        return hole(startCol + 1, sideA, cols);
      case "b":
        return hole(startCol + 2, sideA, cols);
      case "y0":
        return hole(startCol + 3, sideA, cols);
      case "y1":
        return hole(startCol + 4, sideA, cols);
      case "y2":
        return hole(startCol + 5, sideA, cols);
      case "y3":
        return hole(startCol + 6, sideA, cols);
      case "gnd":
        return hole(startCol + 7, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
    }
  }

  // ── 3:8 Decoder / DEMUX 74HC138 (DIP-16) ──
  if (icType === "demux-1to8" || icType === "decoder-3to8") {
    switch (pLower) {
      case "a0":
        return hole(startCol + 0, sideA, cols);
      case "a1":
        return hole(startCol + 1, sideA, cols);
      case "a2":
        return hole(startCol + 2, sideA, cols);
      case "e2":
        return hole(startCol + 3, sideA, cols);
      case "e3":
        return hole(startCol + 4, sideA, cols);
      case "e1":
        return hole(startCol + 5, sideA, cols);
      case "y7":
        return hole(startCol + 6, sideA, cols);
      case "gnd":
        return hole(startCol + 7, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "y0":
        return hole(startCol + 1, sideB, cols);
      case "y1":
        return hole(startCol + 2, sideB, cols);
      case "y2":
        return hole(startCol + 3, sideB, cols);
      case "y3":
        return hole(startCol + 4, sideB, cols);
      case "y4":
        return hole(startCol + 5, sideB, cols);
      case "y5":
        return hole(startCol + 6, sideB, cols);
      case "y6":
        return hole(startCol + 7, sideB, cols);
    }
  }

  // ── 8:3 Priority Encoder 74HC148 (DIP-16) ──
  if (icType === "encoder-8to3") {
    switch (pLower) {
      case "i4":
        return hole(startCol + 0, sideA, cols);
      case "i5":
        return hole(startCol + 1, sideA, cols);
      case "i6":
        return hole(startCol + 2, sideA, cols);
      case "i7":
        return hole(startCol + 3, sideA, cols);
      case "ei":
        return hole(startCol + 4, sideA, cols);
      case "a2":
        return hole(startCol + 5, sideA, cols);
      case "a1":
        return hole(startCol + 6, sideA, cols);
      case "gnd":
        return hole(startCol + 7, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "a0":
        return hole(startCol + 1, sideB, cols);
      case "gs":
        return hole(startCol + 2, sideB, cols);
      case "eo":
        return hole(startCol + 3, sideB, cols);
      case "i3":
        return hole(startCol + 4, sideB, cols);
      case "i2":
        return hole(startCol + 5, sideB, cols);
      case "i1":
        return hole(startCol + 6, sideB, cols);
      case "i0":
        return hole(startCol + 7, sideB, cols);
    }
  }

  // ── 4-Bit Async Counter 74HC93 (DIP-14) ──
  if (icType === "counter-4bit-async") {
    switch (pLower) {
      case "clk_b":
        return hole(startCol + 0, sideA, cols);
      case "r01":
        return hole(startCol + 1, sideA, cols);
      case "r02":
        return hole(startCol + 2, sideA, cols);
      case "gnd":
        return hole(startCol + 6, sideA, cols);
      case "clk_a":
        return hole(startCol + 0, sideB, cols);
      case "qd":
        return hole(startCol + 2, sideB, cols);
      case "qc":
        return hole(startCol + 3, sideB, cols);
      case "qb":
        return hole(startCol + 4, sideB, cols);
      case "vcc":
        return hole(startCol + 5, sideB, cols);
      case "qa":
        return hole(startCol + 6, sideB, cols);
    }
  }

  // ── 4-Bit Sync Counter 74HC161 (DIP-16) ──
  if (icType === "counter-4bit-sync") {
    switch (pLower) {
      case "clr_bar":
        return hole(startCol + 0, sideA, cols);
      case "clk":
        return hole(startCol + 1, sideA, cols);
      case "d0":
        return hole(startCol + 2, sideA, cols);
      case "d1":
        return hole(startCol + 3, sideA, cols);
      case "d2":
        return hole(startCol + 4, sideA, cols);
      case "d3":
        return hole(startCol + 5, sideA, cols);
      case "enp":
        return hole(startCol + 6, sideA, cols);
      case "gnd":
        return hole(startCol + 7, sideA, cols);
      case "vcc":
        return hole(startCol + 0, sideB, cols);
      case "q0":
        return hole(startCol + 1, sideB, cols);
      case "q1":
        return hole(startCol + 2, sideB, cols);
      case "q2":
        return hole(startCol + 3, sideB, cols);
      case "q3":
        return hole(startCol + 4, sideB, cols);
      case "rco":
        return hole(startCol + 5, sideB, cols);
      case "ent":
        return hole(startCol + 6, sideB, cols);
      case "ld_bar":
        return hole(startCol + 7, sideB, cols);
    }
  }

  // ── 8-Bit Register 74HC273 / 74HC374 (DIP-20) ──
  if (icType === "register-8bit" || icType === "register-8bit-tri") {
    if (pLower === "mr_bar" || pLower === "oe_bar") {
      return hole(startCol + 0, sideA, cols);
    }
    if (pLower.startsWith("d") && pLower.length === 2) {
      const idx = parseInt(pLower[1], 10);
      if (idx >= 0 && idx <= 7) {
        return hole(startCol + 1 + idx, sideA, cols);
      }
    }
    if (pLower === "gnd") {
      return hole(startCol + 9, sideA, cols);
    }
    if (pLower === "vcc") {
      return hole(startCol + 0, sideB, cols);
    }
    if (pLower === "clk") {
      return hole(startCol + 1, sideB, cols);
    }
    if (pLower.startsWith("q") && pLower.length === 2) {
      const idx = parseInt(pLower[1], 10);
      if (idx >= 0 && idx <= 7) {
        return hole(startCol + 2 + idx, sideB, cols);
      }
    }
  }

  const is16Pin =
    icType === "mux-4to1" ||
    icType === "mux-8to1" ||
    icType === "decoder-3to8" ||
    icType === "counter-4bit" ||
    icType === "shift-register";
  const pinsPerSide = is16Pin ? 8 : 7;

  const p =
    pUpper === "A" ? "1A" : pUpper === "B" ? "1B" : pUpper === "Y" ? "1Y" : pUpper;

  if (p === "GND") {
    return hole(startCol + (pinsPerSide - 1), sideA, cols);
  }
  if (p === "VCC") {
    return hole(startCol + 0, sideB, cols);
  }

  if (is16Pin) {
    switch (p) {
      case "1G":
        return hole(startCol + 0, sideA, cols);
      case "S1":
        return hole(startCol + 1, sideA, cols);
      case "1C3":
        return hole(startCol + 2, sideA, cols);
      case "1C2":
        return hole(startCol + 3, sideA, cols);
      case "1C1":
        return hole(startCol + 4, sideA, cols);
      case "1C0":
        return hole(startCol + 5, sideA, cols);
      case "1Y":
        return hole(startCol + 6, sideA, cols);
      case "2G":
        return hole(startCol + 1, sideB, cols);
      case "S0":
        return hole(startCol + 2, sideB, cols);
      case "2C3":
        return hole(startCol + 3, sideB, cols);
      case "2C2":
        return hole(startCol + 4, sideB, cols);
      case "2C1":
        return hole(startCol + 5, sideB, cols);
      case "2C0":
        return hole(startCol + 6, sideB, cols);
      case "2Y":
        return hole(startCol + 7, sideB, cols);
    }
  }

  if (icType === "not-gate") {
    switch (p) {
      case "1A":
        return hole(startCol + 0, sideA, cols);
      case "1Y":
      case "1B":
        return hole(startCol + 1, sideA, cols);
      case "2A":
        return hole(startCol + 2, sideA, cols);
      case "2Y":
      case "2B":
        return hole(startCol + 3, sideA, cols);
      case "3A":
        return hole(startCol + 4, sideA, cols);
      case "3Y":
      case "3B":
        return hole(startCol + 5, sideA, cols);
    }
  }

  switch (p) {
    case "1A":
      return hole(startCol + 0, sideA, cols);
    case "1B":
      return hole(startCol + 1, sideA, cols);
    case "1Y":
      return hole(startCol + 2, sideA, cols);
    case "2A":
      return hole(startCol + 3, sideA, cols);
    case "2B":
      return hole(startCol + 4, sideA, cols);
    case "2Y":
      return hole(startCol + 5, sideA, cols);
    case "4Y":
      return hole(startCol + 1, sideB, cols);
    case "4B":
      return hole(startCol + 2, sideB, cols);
    case "4A":
      return hole(startCol + 3, sideB, cols);
    case "3Y":
      return hole(startCol + 4, sideB, cols);
    case "3B":
      return hole(startCol + 5, sideB, cols);
    case "3A":
      return hole(startCol + 6, sideB, cols);
    default:
      return null;
  }
}
