import { type SchematicElement } from "@/labs/CircuitSchematic";
import { frames, label, wire } from "../diagram";

/**
 * Darshan slide "Common Bus System for 4 registers".
 * S1 and S0 run across the top. Four 4×1 muxes put one register
 * on the bus. Input 3 is D, 2 is C, 1 is B, 0 is A.
 * Rectangles are closed wires so each input can land on the edge.
 */
const W = 1080;
const H = 540;

const names = ["D", "C", "B", "A"] as const;
const bits = [3, 2, 1, 0] as const;
const muxL = [96, 316, 536, 756];
const muxW = 176;
const muxT = 156;
const muxH = 92;
const muxB = muxT + muxH;
const regT = 430;
const regH = 32;
const regL = muxL.map((x) => x + 18);
const regW = 140;

const yS1 = 62;
const yS0 = 84;
const busY = [104, 120, 136, 152];

function inX(mi: number, input: number) {
  return muxL[mi] + 30 + (3 - input) * 40;
}
function bitX(ri: number, bit: number) {
  return regL[ri] + 22 + (3 - bit) * 34;
}
function box(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
): SchematicElement {
  return wire(id, [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
    [x, y],
  ]);
}
function dot(id: string, x: number, y: number): SchematicElement {
  return { type: "junction", id, x, y };
}

const elements: SchematicElement[] = [];
const groups: string[][] = [[], [], [], [], [], []];

names.forEach((name, ri) => {
  const x = regL[ri];
  elements.push(box(`box${name}`, x, regT, regW, regH));
  elements.push(label(`bits${name}`, x + regW / 2, regT + 20, "3  2  1  0"));
  elements.push(
    label(`name${name}`, x + regW / 2, regT + regH + 18, `Register ${name}`),
  );
  groups[0].push(`box${name}`, `bits${name}`, `name${name}`);
});

names.forEach((_, mi) => {
  const x = muxL[mi];
  const bit = bits[mi];
  elements.push(box(`mux${bit}`, x, muxT, muxW, muxH));
  elements.push(label(`kind${bit}`, x + muxW / 2, muxT + 28, "4×1"));
  elements.push(label(`muxName${bit}`, x + muxW / 2, muxT + 48, `MUX ${bit}`));
  elements.push(label(`pins${bit}`, x + muxW / 2, muxB - 16, "3   2   1   0"));
  groups[1].push(`mux${bit}`, `kind${bit}`, `muxName${bit}`, `pins${bit}`);
});

// Arrows name the inputs and stop, as on the slide. A few of them continue:
// D, C, and B each send one bundle up, and the marked line runs from
// input 0 of MUX 3 across to register A.
const tail = muxB + 26;
const tip = regT - 22;
const shownBits = [2, 1, 0] as const;

names.forEach((src, ri) => {
  const input = 3 - ri;
  bits.forEach((bit, mi) => {
    const x = inX(mi, input);
    const up = `up${bit}${src}`;
    elements.push({
      type: "arrow",
      id: up,
      points: [
        { x, y: tail },
        { x, y: muxB },
      ],
      highlight: src === "A",
    });
    groups[2].push(up);
    if (bit === 3) return;
    // A continuing wire leaves this arrow. Sit the name beside it, not on the stroke.
    const onWire = input === 1 || input === 2;
    elements.push(
      label(
        `lb${bit}${src}`,
        onWire ? x + 14 : x,
        onWire ? tail + 12 : muxB + 40,
        `${src}${bit}`,
      ),
    );
    groups[2].push(`lb${bit}${src}`);
  });
});

names.forEach((src, ri) => {
  shownBits.forEach((bit) => {
    const x = bitX(ri, bit);
    const id = `stub${src}${bit}`;
    const linked = src !== "A" || bit === 2;
    elements.push({
      type: "arrow",
      id,
      points: [
        { x, y: regT },
        { x, y: tip },
      ],
      highlight: src === "A",
    });
    elements.push(
      label(
        `src${src}${bit}`,
        linked ? x - 16 : x,
        linked ? tip - 16 : tip - 8,
        `${src}${bit}`,
      ),
    );
    groups[2].push(id, `src${src}${bit}`);
  });
});

// [mux index, mux input, register index, bit, jog y]
const routes: [number, number, number, number, number, string, boolean?][] = [
  [0, 3, 0, 2, 300, "wD2"],
  [0, 2, 0, 1, 322, "wD1"],
  [0, 1, 0, 0, 344, "wD0"],
  [1, 2, 1, 2, 308, "wC2"],
  [2, 2, 1, 1, 330, "wC1"],
  [3, 2, 1, 0, 356, "wC0"],
  [1, 1, 2, 2, 316, "wB2"],
  [2, 1, 2, 1, 338, "wB1"],
  [3, 1, 2, 0, 364, "wB0"],
  [0, 0, 3, 2, 386, "wA", true],
];

routes.forEach(([mi, input, ri, bit, y, id, mark]) => {
  const x0 = inX(mi, input);
  const x1 = bitX(ri, bit);
  const pts: [number, number][] = [
    [x0, tail],
    [x0, y],
    [x1, y],
    [x1, tip],
  ];
  elements.push(wire(id, pts, mark));
  groups[2].push(id);
});

elements.push(label("s1", 28, yS1, "S1"));
elements.push(label("s1v", 58, yS1, "0"));
elements.push(label("s0", 28, yS0, "S0"));
elements.push(label("s0v", 58, yS0, "0"));
elements.push(
  wire("lineS1", [
    [58, yS1],
    [1000, yS1],
  ]),
);
elements.push(
  wire("lineS0", [
    [58, yS0],
    [1000, yS0],
  ]),
);
elements.push(label("s1end", 1000, yS1, "."));
elements.push(label("s0end", 1000, yS0, "."));
groups[4].push("s1", "s1v", "s0", "s0v", "lineS1", "lineS0", "s1end", "s0end");

bits.forEach((bit, mi) => {
  const left = muxL[mi];
  const x1 = left - 22;
  const x0 = left - 10;
  const y1 = muxT + 22;
  const y0 = muxT + 40;
  elements.push(dot(`jS1${bit}`, x1, yS1));
  elements.push(dot(`jS0${bit}`, x0, yS0));
  elements.push(
    wire(`dS1${bit}`, [
      [x1, yS1],
      [x1, y1],
      [left, y1],
    ]),
  );
  elements.push(
    wire(`dS0${bit}`, [
      [x0, yS0],
      [x0, y0],
      [left, y0],
    ]),
  );
  groups[4].push(`jS1${bit}`, `jS0${bit}`, `dS1${bit}`, `dS0${bit}`);
});

bits.forEach((bit, mi) => {
  const x = muxL[mi] + muxW - 40;
  const y = busY[mi];
  elements.push(
    wire(`bus${bit}`, [
      [x, muxT],
      [x, y],
      [988, y],
    ]),
  );
  elements.push(label(`A${bit}`, x + 22, y - 9, `A${bit}`));
  elements.push(label(`tip${bit}`, 988, y, "."));
  groups[5].push(`bus${bit}`, `A${bit}`, `tip${bit}`);
});
elements.push(label("busName", 1036, 128, "4-line common bus"));
groups[5].push("busName");

const order = [
  groups[0],
  groups[1],
  [...groups[2], ...groups[3]],
  groups[4],
  groups[5],
  [],
  [],
  [],
];

const titles = [
  "Registers D, C, B, and A",
  "Four 4×1 multiplexers",
  "Each bit wired to its input",
  "S1 and S0 to every mux",
  "The 4-line common bus",
  "00 places A on the bus",
  "01 places B on the bus",
  "11 places D on the bus",
];

const notes = [
  "D, C, B, and A. Bits are numbered 3 on the left, 0 on the right.",
  "One multiplexer for each bit of the bus. 3 2 1 0 are its inputs.",
  "Most arrows stop short. The marked line is input 0, and it runs across to register A.",
  "S1 S0 = 00. Both lines are wired to all four multiplexers.",
  "A3 A2 A1 A0 are the common bus. With 00, the bus carries register A.",
  "The same bus. 00 is A, as drawn. On the board the lamps read 1 0 0 1.",
  "01 would carry B, 0 1 1 0. 10 would carry C, 1 1 0 0.",
  "11 carries D, 0 0 1 1. Eight 16-bit registers need 16 muxes of 8×1 and 3 select lines.",
];

const highlight = [
  "nameD",
  "mux3",
  "wA",
  "lineS1",
  "bus3",
  "busName",
  "busName",
  "busName",
];

const byId = new Map(elements.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  const ids = order.slice(0, step + 1).flat();
  const hi = highlight[step];
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    const marked = ("highlight" in el && el.highlight) || el.id === hi;
    return marked ? { ...el, highlight: true } : el;
  });
}

export const commonBusStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: W,
    height: H,
    elements: shown(i),
  })),
);

export const commonBusTheoryDiagram = commonBusStepSchematics[4];
