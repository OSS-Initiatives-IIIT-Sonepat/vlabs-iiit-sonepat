import * as THREE from "three";
import {
  DEV_BOARDS,
  DEV_PCB_H,
  DEV_PITCH,
  UNO_HEADER_H,
  UNO_MIL,
  unoAt,
} from "@/components/dev-boards/pinouts";
import {
  add,
  block,
  decal,
  mat,
  outline,
  post,
} from "@/components/dev-boards/cad";

// ── ARDUINO UNO R3 ────────────────────────────────────────────────────────
// Built centred on the origin, lying flat on the bench, from the real R3
// dimensions. Positions are given in mil on the top view (origin at the
// bottom-left corner, USB on the left, digital header along the back edge)
// and converted with unoAt(). Header pins come from DEV_BOARDS["arduino-uno"],
// so every wire lands in the socket it names.
//
// The look follows a CAD render of the board: light, evenly lit colours with
// dark outlines on every edge.

const { w, d, pins } = DEV_BOARDS["arduino-uno"];
const TOP = DEV_PCB_H / 2; // PCB top surface (local y)
const MM = UNO_MIL * 39.37; // world units per millimetre
const PITCH = DEV_PITCH;

/** Where each part sits, in board-local (x, z). Used to point at parts. */
export const UNO_PARTS = {
  usb: unoAt(89, 1550),
  powerJack: unoAt(200, 297),
  regulator: unoAt(700, 250),
  chip: unoAt(1950, 750),
  crystal: unoAt(1000, 1000),
  resetButton: unoAt(430, 1960),
  powerLed: unoAt(2380, 1480),
  pinLed: unoAt(850, 1640),
  icsp: unoAt(2550, 1050),
  capA: unoAt(760, 470),
  capB: unoAt(1020, 470),
  digitalHeader: unoAt(1720, 2000),
  powerHeader: unoAt(1610, 100),
  analogHeader: unoAt(2410, 100),
} as const;

/** Height of each part's top above the PCB, for pointers. */
export const UNO_PART_TOP: Record<keyof typeof UNO_PARTS, number> = {
  usb: 10.9 * MM,
  powerJack: 11 * MM,
  regulator: 2.3 * MM,
  chip: 7.2 * MM,
  crystal: 3.6 * MM,
  resetButton: 2.5 * MM,
  powerLed: 0.9 * MM,
  pinLed: 0.9 * MM,
  icsp: 8.5 * MM,
  capA: 7.7 * MM,
  capB: 7.7 * MM,
  digitalHeader: UNO_HEADER_H,
  powerHeader: UNO_HEADER_H,
  analogHeader: UNO_HEADER_H,
};

/** PCB top above the board's own origin. */
export const UNO_TOP_Y = TOP;

/** Where a plug enters the board, board-local: the face of each opening. Both
 *  openings face -x (the left edge). */
export const UNO_PORTS = {
  usb: {
    x: UNO_PARTS.usb.x - (16.5 * MM) / 2,
    y: TOP + (10.9 * MM) / 2,
    z: UNO_PARTS.usb.z,
  },
  jack: {
    x: UNO_PARTS.powerJack.x - (14.2 * MM) / 2,
    y: TOP + 6.3 * MM,
    z: UNO_PARTS.powerJack.z,
  },
} as const;

// Colours sampled from a CAD render of the board.
const C = {
  pcb: 0x2f74c6,
  pcbEdge: 0xd9dde2,
  header: 0x1b1b1e,
  cavity: 0x08080a,
  socket: 0x222226,
  chip: 0x202024,
  leg: 0xd2d6db,
  shell: 0xd8dce1,
  shellDark: 0x3a3c40,
  tongue: 0xc9b48e,
  jack: 0x1c1c1f,
  can: 0xe2e5e9,
  canMark: 0x2d2f33,
  base: 0x141416,
  smdBody: 0x1e1e20,
  smdEnd: 0xc7ccd2,
  ledBody: 0xf2f2ec,
};

// ── The PCB ───────────────────────────────────────────────────────────────

function pcb(root: THREE.Group) {
  // R3 outline with the chamfered back-right corner.
  const outlineMil: [number, number][] = [
    [0, 0],
    [2700, 0],
    [2700, 2000],
    [2600, 2100],
    [0, 2100],
  ];
  const shape = new THREE.Shape();
  outlineMil.forEach(([mx, my], i) => {
    // Shape (x, y) becomes world (x, -y) after the rotation below.
    const x = mx * UNO_MIL - w / 2;
    const y = my * UNO_MIL - d / 2;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: DEV_PCB_H,
    bevelEnabled: false,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -DEV_PCB_H / 2, 0);
  // Group 0 is the top and bottom faces, group 1 the edge.
  add(root, geo, [mat(C.pcb, 0.4, 0.6), mat(C.pcbEdge, 0.45)], 0, 0, 0);
}

// ── Silkscreen: one decal over the whole board, drawn in mil ───────────────

const DIGITAL_LABEL: Record<string, string> = {
  D0: "RX←0",
  D1: "TX→1",
  D2: "2",
  D3: "~3",
  D4: "4",
  D5: "~5",
  D6: "~6",
  D7: "7",
  D8: "8",
  D9: "~9",
  D10: "~10",
  D11: "~11",
  D12: "12",
  D13: "13",
  GND: "GND",
  AREF: "AREF",
};
const POWER_LABEL: Record<string, string> = {
  IOREF: "IOREF",
  RESET: "RESET",
  "3V3": "3.3V",
  "5V": "5V",
  GND2: "GND",
  GND3: "GND",
  VIN: "Vin",
};

// Areas kept free of vias: parts and headers, in mil [x0, y0, x1, y1].
const KEEP_OUT: [number, number, number, number][] = [
  [-300, 1280, 470, 1820], // USB
  [-100, 90, 520, 500], // barrel jack
  [1200, 520, 2700, 980], // chip and socket
  [760, 1880, 2700, 2100], // digital headers
  [1180, 0, 2700, 220], // power and analog headers
  [600, 300, 1180, 620], // capacitors
  [760, 880, 1240, 1120], // crystal
  [1020, 1300, 1900, 1560], // logo and UNO
  [520, 1600, 780, 1920], // ICSP2
  [2420, 900, 2700, 1200], // ICSP1
];

function silkscreen(root: THREE.Group) {
  const k = 0.75; // px per mil
  const sheet = decal(
    (ctx, W, H) => {
      const X = (mx: number) => mx * k;
      const Y = (my: number) => H - my * k;
      ctx.clearRect(0, 0, W, H);
      const white = "#f4f7fb";

      // Gold vias, scattered with a fixed seed so the board looks the same
      // every time, and kept clear of parts.
      let seed = 7;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      let placed = 0;
      for (let tries = 0; tries < 900 && placed < 95; tries++) {
        const mx = 80 + rand() * 2540;
        const my = 80 + rand() * 1940;
        if (
          KEEP_OUT.some(([a, b, c, e]) => mx > a && mx < c && my > b && my < e)
        )
          continue;
        placed++;
        ctx.fillStyle = "#d9ac44";
        ctx.beginPath();
        ctx.arc(X(mx), Y(my), 17 * k, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6d5420";
        ctx.beginPath();
        ctx.arc(X(mx), Y(my), 6 * k, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = white;
      ctx.fillStyle = white;
      ctx.lineCap = "round";
      ctx.textBaseline = "middle";

      // Arduino logo: the infinity loop with minus and plus, and the name.
      ctx.lineWidth = 34 * k;
      for (const cx of [1150, 1350]) {
        ctx.beginPath();
        ctx.arc(X(cx), Y(1440), 92 * k, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 24 * k;
      ctx.beginPath();
      ctx.moveTo(X(1105), Y(1440));
      ctx.lineTo(X(1195), Y(1440));
      ctx.moveTo(X(1305), Y(1440));
      ctx.lineTo(X(1395), Y(1440));
      ctx.moveTo(X(1350), Y(1395));
      ctx.lineTo(X(1350), Y(1485));
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.font = `800 ${92 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ARDUINO", X(1250), Y(1255));

      // "UNO" in outlined letters inside a rounded frame.
      ctx.lineWidth = 14 * k;
      const ux = X(1700);
      const uy = Y(1445);
      const uw = 380 * k;
      const uh = 180 * k;
      ctx.beginPath();
      ctx.roundRect(ux - uw / 2, uy - uh / 2, uw, uh, uh / 2);
      ctx.stroke();
      ctx.lineWidth = 9 * k;
      ctx.font = `700 ${132 * k}px Helvetica, Arial, sans-serif`;
      ctx.strokeText("UNO", ux, uy + 6 * k);

      // Header captions and pin numbers. Pin numbers read from the board
      // edge inward, rotated like the real silkscreen.
      ctx.font = `700 ${72 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("DIGITAL (PWM~)", X(2160), Y(1690));
      ctx.fillText("POWER", X(1610), Y(470));
      ctx.fillText("ANALOG IN", X(2410), Y(470));
      ctx.font = `700 ${64 * k}px Helvetica, Arial, sans-serif`;
      for (const p of pins) {
        const mx = (p.x + w / 2) / UNO_MIL;
        const my = (d / 2 - p.z) / UNO_MIL;
        const digital = DIGITAL_LABEL[p.name];
        const power = POWER_LABEL[p.name];
        const analog = /^A\d$/.test(p.name) ? p.name : undefined;
        const text = digital ?? power ?? analog;
        if (!text) continue;
        ctx.save();
        if (digital) {
          ctx.translate(X(mx), Y(my - 125));
          ctx.rotate(-Math.PI / 2);
          ctx.textAlign = "right";
        } else {
          ctx.translate(X(mx), Y(my + 125));
          ctx.rotate(-Math.PI / 2);
          ctx.textAlign = "left";
        }
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }

      // Small part markings.
      ctx.textAlign = "left";
      ctx.font = `700 ${56 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ON", X(2450), Y(1480));
      ctx.fillText("L", X(930), Y(1640));
      ctx.fillText("TX", X(930), Y(1540));
      ctx.fillText("RX", X(930), Y(1450));
      ctx.font = `700 ${44 * k}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ICSP", X(2420), Y(1250));
      ctx.fillText("RESET", X(300), Y(1880));

      // Silkscreen frames around the crystal and the regulator.
      ctx.lineWidth = 8 * k;
      ctx.strokeRect(X(760), Y(1120), 480 * k, 240 * k);
      ctx.strokeRect(X(555), Y(345), 290 * k, 180 * k);
    },
    w,
    d,
    k / UNO_MIL,
  );
  if (sheet) {
    sheet.position.set(0, TOP + 0.003, 0);
    root.add(sheet);
  }
}

// ── Headers ───────────────────────────────────────────────────────────────

/** Female header: black housing with a square funnel cavity at every pin. */
function femaleHeader(root: THREE.Group, names: string[]) {
  const ps = names.map((n) => {
    const p = pins.find((q) => q.name === n);
    if (!p) throw new Error(`Uno pin ${n} missing`);
    return p;
  });
  const x0 = Math.min(...ps.map((p) => p.x));
  const x1 = Math.max(...ps.map((p) => p.x));
  const len = x1 - x0 + PITCH;
  const z = ps[0].z;
  const depth = 2.5 * MM;
  block(root, (x0 + x1) / 2, z, TOP, len, UNO_HEADER_H, depth, C.header, 0.25);
  const top = TOP + UNO_HEADER_H;
  for (const p of ps) {
    // Funnel: a dark square opening with a darker pin hole in its centre.
    add(
      root,
      new THREE.BoxGeometry(PITCH * 0.66, 0.004, PITCH * 0.66),
      mat(C.cavity, 0.1),
      p.x,
      top + 0.002,
      z,
    );
    add(
      root,
      new THREE.BoxGeometry(PITCH * 0.3, 0.004, PITCH * 0.3),
      mat(0x000000, 0),
      p.x,
      top + 0.004,
      z,
    );
  }
}

/** Male 2 x 3 header (ICSP): black base and six tall square pins. */
function icspHeader(root: THREE.Group, cxMil: number, cyMil: number) {
  const c = unoAt(cxMil, cyMil);
  block(root, c.x, c.z, TOP, PITCH * 2, 2.5 * MM, PITCH * 3, C.header, 0.25);
  const pinH = 8.5 * MM;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      const px = c.x + (i - 0.5) * PITCH;
      const pz = c.z + (j - 1) * PITCH;
      block(root, px, pz, TOP, 0.64 * MM, pinH, 0.64 * MM, C.leg, 0.55);
    }
  }
}

// ── Connectors ────────────────────────────────────────────────────────────

/** USB-B receptacle: a hollow silver shell with a tongue inside. */
function usbB(root: THREE.Group) {
  const L = 16.5 * MM; // along x, the shell overhangs the left edge
  const Wd = 12.0 * MM; // along z
  const H = 10.9 * MM;
  const c = UNO_PARTS.usb;
  const front = c.x - L / 2;

  // Front profile (in the z-y plane) with the USB-B opening cut through it.
  const outer = new THREE.Shape();
  outer.moveTo(-Wd / 2, 0);
  outer.lineTo(Wd / 2, 0);
  outer.lineTo(Wd / 2, H);
  outer.lineTo(-Wd / 2, H);
  outer.closePath();
  const ow = 8.45 * MM;
  const oh = 7.78 * MM;
  const cut = 1.0 * MM;
  const y0 = (H - oh) / 2;
  const hole = new THREE.Path();
  hole.moveTo(-ow / 2, y0);
  hole.lineTo(ow / 2, y0);
  hole.lineTo(ow / 2, y0 + oh - cut);
  hole.lineTo(ow / 2 - cut, y0 + oh);
  hole.lineTo(-ow / 2 + cut, y0 + oh);
  hole.lineTo(-ow / 2, y0 + oh - cut);
  hole.closePath();
  outer.holes.push(hole);
  const shellGeo = new THREE.ExtrudeGeometry(outer, {
    depth: L,
    bevelEnabled: false,
  });
  // Shape x is z, shape y is height, extrusion runs along +x from the front.
  shellGeo.rotateY(Math.PI / 2);
  add(root, shellGeo, mat(C.shell, 0.5, 0.4), front, TOP, c.z);

  // Back wall of the cavity and the plastic tongue with two contacts.
  const cavityDepth = 9 * MM;
  block(
    root,
    front + cavityDepth,
    c.z,
    TOP + y0,
    0.2 * MM,
    oh,
    ow,
    C.shellDark,
    0.2,
  );
  const tongueL = 7.5 * MM;
  const tongueW = 5.2 * MM;
  const tongueH = 3.6 * MM;
  const tongueBase = TOP + y0 + oh - tongueH - 0.9 * MM;
  block(
    root,
    front + cavityDepth - tongueL / 2,
    c.z,
    tongueBase,
    tongueL,
    tongueH,
    tongueW,
    C.tongue,
    0.4,
  );
  for (const s of [-1, 1]) {
    block(
      root,
      front + cavityDepth - tongueL / 2 - 0.5 * MM,
      c.z + s * 1.25 * MM,
      tongueBase + tongueH,
      tongueL * 0.7,
      0.15 * MM,
      0.8 * MM,
      C.leg,
      0.5,
    );
  }
  // Rear chamfer: the sloped strip along the back of the shell's top.
  const chamfer = block(
    root,
    c.x + L / 2 - 1.2 * MM,
    c.z,
    TOP + H - 2.4 * MM,
    2.6 * MM,
    0.2 * MM,
    Wd,
    C.shell,
    0.5,
  );
  chamfer.rotation.z = Math.PI / 4;
}

/** DC barrel jack: black body, round opening and centre pin. */
function barrelJack(root: THREE.Group) {
  const c = UNO_PARTS.powerJack;
  const L = 14.2 * MM;
  const Wd = 9.0 * MM;
  const H = 11.0 * MM;
  const front = c.x - L / 2;
  const frontL = 3.6 * MM;

  // Front collar with the plug opening cut through it.
  const prof = new THREE.Shape();
  prof.moveTo(-Wd / 2, 0);
  prof.lineTo(Wd / 2, 0);
  prof.lineTo(Wd / 2, H);
  prof.lineTo(-Wd / 2, H);
  prof.closePath();
  const r = 3.2 * MM;
  const cy = 6.3 * MM;
  const hole = new THREE.Path();
  hole.absarc(0, cy, r, 0, Math.PI * 2, false);
  prof.holes.push(hole);
  const collar = new THREE.ExtrudeGeometry(prof, {
    depth: frontL,
    bevelEnabled: false,
    curveSegments: 24,
  });
  collar.rotateY(Math.PI / 2);
  add(root, collar, mat(C.jack, 0.3), front, TOP, c.z);
  // Rear body, slightly narrower and lower.
  block(
    root,
    front + frontL + (L - frontL) / 2,
    c.z,
    TOP,
    L - frontL,
    H * 0.9,
    Wd * 0.94,
    C.jack,
    0.3,
  );
  // Inside the opening: a dark back and the silver centre pin.
  const back = add(
    root,
    new THREE.CylinderGeometry(r, r, 0.2 * MM, 24),
    mat(0x050506, 0),
    front + frontL,
    TOP + cy,
    c.z,
  );
  back.rotation.z = Math.PI / 2;
  const pin = add(
    root,
    new THREE.CylinderGeometry(1.0 * MM, 1.0 * MM, frontL * 0.9, 16),
    mat(C.leg, 0.5),
    front + frontL * 0.55,
    TOP + cy,
    c.z,
  );
  pin.rotation.z = Math.PI / 2;
  // Metal mounting tab on the side.
  block(
    root,
    front + 2 * MM,
    c.z + Wd / 2 + 0.3 * MM,
    TOP,
    2.5 * MM,
    3.5 * MM,
    0.4 * MM,
    C.leg,
    0.5,
  );
}

// ── ICs and passives ──────────────────────────────────────────────────────

/** ATmega328P in a DIP-28 socket, with its legs and markings. */
function atmega(root: THREE.Group) {
  const c = UNO_PARTS.chip;
  const len = 1450 * UNO_MIL;
  const sockH = 3.0 * MM;
  block(root, c.x, c.z, TOP, len + 0.06, sockH, 400 * UNO_MIL, C.socket, 0.25);
  // Socket contact holes along both rows.
  for (let i = 0; i < 14; i++) {
    const px = c.x - 650 * UNO_MIL + i * 100 * UNO_MIL;
    for (const s of [-1, 1]) {
      add(
        root,
        new THREE.BoxGeometry(0.06, 0.003, 0.06),
        mat(C.cavity, 0.05),
        px,
        TOP + sockH + 0.002,
        c.z + s * 150 * UNO_MIL,
      );
    }
  }
  // Chip body, lifted on its legs above the socket.
  const bodyLen = 1400 * UNO_MIL;
  const bodyW = 290 * UNO_MIL;
  const bodyH = 3.4 * MM;
  const bodyBase = TOP + sockH + 0.6 * MM;
  block(root, c.x, c.z, bodyBase, bodyLen, bodyH, bodyW, C.chip, 0.22);
  // Legs: out of the body side, then down into the socket.
  for (let i = 0; i < 14; i++) {
    const px = c.x - 650 * UNO_MIL + i * 100 * UNO_MIL;
    for (const s of [-1, 1]) {
      const zEdge = c.z + s * (bodyW / 2);
      block(
        root,
        px,
        zEdge + s * 0.025,
        bodyBase + bodyH * 0.35,
        0.05,
        0.03,
        0.05,
        C.leg,
        0.6,
      );
      block(
        root,
        px,
        c.z + s * 150 * UNO_MIL,
        TOP + sockH,
        0.05,
        bodyBase + bodyH * 0.38 - (TOP + sockH),
        0.025,
        C.leg,
        0.6,
      );
    }
  }
  // Pin-1 notch and the printed part number.
  const top = bodyBase + bodyH;
  const notch = add(
    root,
    new THREE.CircleGeometry(0.07, 20, -Math.PI / 2, Math.PI),
    mat(0x0c0c0e, 0.1),
    c.x - bodyLen / 2,
    top + 0.002,
    c.z,
  );
  notch.rotation.x = -Math.PI / 2;
  notch.userData.noOutline = true;
  const mark = decal(
    (ctx, W, H) => {
      ctx.fillStyle = "#c9cdd3";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${H * 0.34}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ATMEGA328P-PU", W * 0.42, H * 0.36);
      ctx.font = `600 ${H * 0.26}px Helvetica, Arial, sans-serif`;
      ctx.fillText("1121", W * 0.42, H * 0.72);
      ctx.fillStyle = "#c79a3a";
      ctx.fillRect(W * 0.74, H * 0.28, W * 0.12, H * 0.42);
    },
    bodyLen * 0.8,
    bodyW * 0.8,
  );
  if (mark) {
    mark.position.set(c.x, top + 0.003, c.z);
    root.add(mark);
  }
}

/** HC-49/S crystal: a silver stadium-shaped can with its marking. */
function crystal(root: THREE.Group) {
  const c = UNO_PARTS.crystal;
  const L = 11.0 * MM;
  const Wd = 4.65 * MM;
  const H = 3.5 * MM;
  const s = new THREE.Shape();
  const r = Wd / 2;
  s.moveTo(-L / 2 + r, -r);
  s.lineTo(L / 2 - r, -r);
  s.absarc(L / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-L / 2 + r, r);
  s.absarc(-L / 2 + r, 0, r, Math.PI / 2, (3 * Math.PI) / 2, false);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: H,
    bevelEnabled: true,
    bevelSize: 0.25 * MM,
    bevelThickness: 0.25 * MM,
    bevelSegments: 2,
    curveSegments: 20,
  });
  geo.rotateX(-Math.PI / 2);
  add(root, geo, mat(C.can, 0.5, 0.35), c.x, TOP + 0.25 * MM, c.z);
  const mark = decal(
    (ctx, W, Hc) => {
      ctx.fillStyle = "#3a3d42";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Hc * 0.5}px Helvetica, Arial, sans-serif`;
      ctx.fillText("SPK16.000G", W / 2, Hc / 2);
    },
    L * 0.78,
    Wd * 0.6,
  );
  if (mark) {
    mark.position.set(c.x, TOP + H + 0.5 * MM + 0.003, c.z);
    root.add(mark);
  }
}

/** SMD electrolytic capacitor: black base, silver can, marked top. */
function electrolytic(root: THREE.Group, at: { x: number; z: number }) {
  const r = 3.15 * MM;
  const h = 7.7 * MM;
  block(root, at.x, at.z, TOP, 6.6 * MM, 1.0 * MM, 6.6 * MM, C.base, 0.2);
  post(root, at.x, at.z, TOP + 1.0 * MM, r, h - 1.0 * MM, C.can, 32);
  const sector = add(
    root,
    new THREE.CircleGeometry(r * 0.98, 24, Math.PI * 0.6, Math.PI * 0.8),
    mat(C.canMark, 0.3),
    at.x,
    TOP + h + 0.002,
    at.z,
  );
  sector.rotation.x = -Math.PI / 2;
  sector.userData.noOutline = true;
}

/** Tiny two-terminal SMD part (resistor or capacitor). */
function smd(
  root: THREE.Group,
  mx: number,
  my: number,
  along: "x" | "z",
  body: number,
) {
  const c = unoAt(mx, my);
  const L = 1.6 * MM;
  const W = 0.8 * MM;
  const H = 0.5 * MM;
  const alongX = along === "x";
  block(
    root,
    c.x,
    c.z,
    TOP,
    alongX ? L * 0.6 : W,
    H,
    alongX ? W : L * 0.6,
    body,
    0.35,
  );
  for (const s of [-1, 1]) {
    const ex = alongX ? c.x + s * L * 0.4 : c.x;
    const ez = alongX ? c.z : c.z + s * L * 0.4;
    block(
      root,
      ex,
      ez,
      TOP,
      alongX ? L * 0.2 : W,
      H,
      alongX ? W : L * 0.2,
      C.smdEnd,
      0.5,
    );
  }
}

// ── Build ─────────────────────────────────────────────────────────────────

export function buildArduinoUnoStandalone(): THREE.Group {
  const root = new THREE.Group();

  pcb(root);

  // Headers along the back and front edges, in R3 order.
  femaleHeader(root, [
    "SCL",
    "SDA",
    "AREF",
    "GND",
    "D13",
    "D12",
    "D11",
    "D10",
    "D9",
    "D8",
  ]);
  femaleHeader(root, ["D7", "D6", "D5", "D4", "D3", "D2", "D1", "D0"]);
  femaleHeader(root, [
    "NC",
    "IOREF",
    "RESET",
    "3V3",
    "5V",
    "GND2",
    "GND3",
    "VIN",
  ]);
  femaleHeader(root, ["A0", "A1", "A2", "A3", "A4", "A5"]);
  icspHeader(root, 2550, 1050); // ICSP for the ATmega328P
  icspHeader(root, 650, 1750); // ICSP for the ATmega16U2 (USB chip)

  usbB(root);
  barrelJack(root);
  atmega(root);
  crystal(root);
  electrolytic(root, UNO_PARTS.capA);
  electrolytic(root, UNO_PARTS.capB);

  // Voltage regulator (SOT-223) with its wide tab.
  const reg = UNO_PARTS.regulator;
  block(
    root,
    reg.x,
    reg.z + 0.6 * MM,
    TOP,
    6.5 * MM,
    1.8 * MM,
    3.5 * MM,
    C.smdBody,
    0.25,
  );
  block(
    root,
    reg.x,
    reg.z - 2.6 * MM,
    TOP,
    3.0 * MM,
    0.3 * MM,
    1.8 * MM,
    C.smdEnd,
    0.5,
  );

  // ATmega16U2, the USB-to-serial chip (QFN).
  const u2 = unoAt(780, 1290);
  block(root, u2.x, u2.z, TOP, 5 * MM, 0.9 * MM, 5 * MM, C.smdBody, 0.25);

  // Reset push-button: silver frame with a dark round cap.
  const rb = UNO_PARTS.resetButton;
  block(root, rb.x, rb.z, TOP, 6.0 * MM, 1.6 * MM, 3.6 * MM, C.shell, 0.45);
  post(root, rb.x, rb.z, TOP + 1.6 * MM, 1.2 * MM, 0.9 * MM, 0x2a2a2e, 20);

  // Status LEDs: white body with a tinted lens.
  const led = (mx: number, my: number, lens: number) => {
    const c = unoAt(mx, my);
    block(root, c.x, c.z, TOP, 2.0 * MM, 0.6 * MM, 1.25 * MM, C.ledBody, 0.5);
    block(
      root,
      c.x,
      c.z,
      TOP + 0.6 * MM,
      1.2 * MM,
      0.3 * MM,
      1.0 * MM,
      lens,
      0.6,
    );
  };
  led(2380, 1480, 0x58c86a); // ON
  led(850, 1640, 0xf0a73a); // L (pin 13)
  led(850, 1540, 0xf0a73a); // TX
  led(850, 1450, 0xf0a73a); // RX

  // Small resistors and capacitors around the board.
  const smdParts: [number, number, "x" | "z", number][] = [
    [1050, 1640, "z", C.smdBody],
    [1050, 1540, "z", C.smdBody],
    [1050, 1450, "z", C.smdBody],
    [2250, 1480, "z", C.smdBody],
    [600, 1180, "x", 0xb59a72],
    [600, 1100, "x", 0xb59a72],
    [960, 1150, "z", C.smdBody],
    [1150, 1050, "x", 0xb59a72],
    [2560, 1300, "x", C.smdBody],
    [2250, 1180, "x", 0xb59a72],
    [1080, 620, "x", 0xb59a72],
    [520, 700, "z", C.smdBody],
    [1180, 300, "x", C.smdBody],
    [1300, 380, "x", 0xb59a72],
  ];
  for (const [mx, my, along, body] of smdParts) smd(root, mx, my, along, body);

  // Mounting holes: a plated ring with a dark centre.
  for (const [mx, my] of [
    [550, 100],
    [600, 2000],
    [2600, 1400],
    [2600, 300],
  ] as const) {
    const h = unoAt(mx, my);
    const ring = add(
      root,
      new THREE.RingGeometry(1.6 * MM, 2.3 * MM, 28),
      mat(0xcfd4da, 0.45),
      h.x,
      TOP + 0.002,
      h.z,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.userData.noOutline = true;
    const holeDisc = add(
      root,
      new THREE.CircleGeometry(1.6 * MM, 28),
      mat(0x0b0b0d, 0),
      h.x,
      TOP + 0.003,
      h.z,
    );
    holeDisc.rotation.x = -Math.PI / 2;
    holeDisc.userData.noOutline = true;
  }

  silkscreen(root);
  outline(root);
  return root;
}
