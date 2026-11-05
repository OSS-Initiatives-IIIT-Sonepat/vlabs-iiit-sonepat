import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, block, frames, icBox, label, wire } from "../diagram";

/**
 * Shift slides, then the 4-bit combinational shifter.
 * Index 0 is the left bit of the written word. A = 1 1 0 1.
 * S = 0 moves bits down (shift right). S = 1 moves bits up (shift left).
 */

const SRC_Y = 140;
const DST_Y = 268;

function bits(
  prefix: string,
  x0: number,
  y: number,
  values: string[],
  hot?: number,
): SchematicElement[] {
  return values.map((value, i) =>
    block(`${prefix}${i}`, x0 + i * 52, y, 40, 36, value, hot === i),
  );
}

/** Orthogonal arrow from the bottom of one bit to the top of another. */
function shiftArrow(
  id: string,
  fromX: number,
  toX: number,
  lane: number,
): SchematicElement {
  const y = 176 + lane * 16;
  return arrow(id, [
    [fromX, SRC_Y + 18],
    [fromX, y],
    [toX, y],
    [toX, DST_Y - 18],
  ]);
}

function word(
  id: string,
  x0: number,
  title: string,
  src: string[],
  dst: string[],
  pairs: [number, number][],
  hot?: number,
): SchematicElement[] {
  return [
    label(`${id}_title`, x0 + 78, SRC_Y - 58, title),
    label(`${id}_r1`, x0 - 78, SRC_Y, "R1"),
    label(`${id}_r2`, x0 - 78, DST_Y, "R1"),
    ...bits(`${id}s`, x0, SRC_Y, src, hot),
    ...bits(`${id}d`, x0, DST_Y, dst),
    ...pairs.map(([from, to], i) =>
      shiftArrow(
        `${id}_a${i}`,
        x0 + from * 52,
        x0 + to * 52,
        from < to ? pairs.length - 1 - i : i,
      ),
    ),
  ];
}

/** The bit that leaves one end comes back at the other, outside the boxes. */
function wrap(
  id: string,
  x0: number,
  fromIndex: number,
  toIndex: number,
): SchematicElement {
  const fromX = x0 + fromIndex * 52;
  const toX = x0 + toIndex * 52;
  const left = fromX < toX;
  const start: [number, number] = left
    ? [fromX - 20, SRC_Y]
    : [fromX + 20, SRC_Y];
  const end: [number, number] = left
    ? [toX + 20, DST_Y]
    : [toX - 20, DST_Y];
  const out = left ? fromX - 48 : fromX + 48;
  const inn = left ? toX + 48 : toX - 48;
  return arrow(id, [start, [out, SRC_Y], [out, 330], [inn, 330], [inn, DST_Y], end]);
}

const logical: SchematicElement[] = [
  ...word(
    "shl",
    150,
    "shl — logical shift left",
    ["1", "1", "0", "1"],
    ["1", "0", "1", "0"],
    [
      [1, 0],
      [2, 1],
      [3, 2],
    ],
  ),
  ...word(
    "shr",
    620,
    "shr — logical shift right",
    ["1", "1", "0", "1"],
    ["0", "1", "1", "0"],
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  ),
];

const circular: SchematicElement[] = [
  ...word(
    "cil",
    150,
    "cil — circular shift left",
    ["1", "1", "0", "1"],
    ["1", "0", "1", "1"],
    [
      [1, 0],
      [2, 1],
      [3, 2],
    ],
  ),
  wrap("cil_wrap", 150, 0, 3),
  ...word(
    "cir",
    620,
    "cir — circular shift right",
    ["1", "1", "0", "1"],
    ["1", "1", "1", "0"],
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  ),
  wrap("cir_wrap", 620, 3, 0),
];

const arithmetic: SchematicElement[] = [
  ...word(
    "ashl",
    150,
    "ashl — arithmetic shift left",
    ["1", "1", "0", "1"],
    ["1", "0", "1", "0"],
    [
      [1, 0],
      [2, 1],
      [3, 2],
    ],
    0,
  ),
  ...word(
    "ashr",
    620,
    "ashr — arithmetic shift right",
    ["1", "1", "0", "1"],
    ["1", "1", "1", "0"],
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    0,
  ),
];

type MuxOpts = {
  sel: 0 | 1 | null;
  outputs: [string, string, string, string];
  ir: string;
  il: string;
};

function beside(
  id: string,
  xWire: number,
  y: number,
  text: string,
  side: "left" | "right",
): SchematicElement {
  const half = (text.length * 9 * 0.56) / 2;
  const x = side === "left" ? xWire - 6 - half : xWire + 6 + half;
  return label(id, x, y, text);
}

function muxFigure(opts: MuxOpts): SchematicElement[] {
  const tops = [52, 132, 212, 292];
  const boxX = 520;
  const boxW = 120;
  const boxH = 68;
  const in0 = (i: number) => tops[i] + 18;
  const in1 = (i: number) => tops[i] + 48;
  const outY = (i: number) => tops[i] + 34;
  const on0 = opts.sel === 0;
  const on1 = opts.sel === 1;
  const names = ["H0", "H1", "H2", "H3"];
  const els: SchematicElement[] = [
    ...tops.flatMap((y, i) => icBox(`mux${i}`, boxX, y, boxW, boxH, "MUX")),
    wire("w_s", [
      [470, tops[0]],
      [470, tops[1]],
      [470, tops[2]],
      [470, tops[3]],
    ]),
    ...tops.map((y, i) => wire(`w_s${i}`, [[470, y], [boxX, y]])),
    { type: "junction", id: "j_s1", x: 470, y: tops[1] },
    { type: "junction", id: "j_s2", x: 470, y: tops[2] },
    label("lbl_s", 470, tops[0] - 8, "S"),
    beside("lbl_ir", 150, in0(0), opts.ir, "left"),
    wire("w_ir", [[150, in0(0)], [boxX, in0(0)]], on0),
    beside("lbl_a0", 170, in0(1), "A0 = 1", "left"),
    wire("w_a0", [[170, in0(1)], [boxX, in0(1)]], on0),
    beside("lbl_a1", 190, in1(0), "A1 = 1", "left"),
    wire("w_a1", [
      [190, in1(0)],
      [190, in0(2)],
    ]),
    wire("w_a1_h0", [[190, in1(0)], [boxX, in1(0)]], on1),
    wire("w_a1_h2", [[190, in0(2)], [boxX, in0(2)]], on0),
    beside("lbl_a2", 280, in1(1), "A2 = 0", "left"),
    wire("w_a2", [
      [280, in1(1)],
      [280, in0(3)],
    ]),
    wire("w_a2_h1", [[280, in1(1)], [boxX, in1(1)]], on1),
    wire("w_a2_h3", [[280, in0(3)], [boxX, in0(3)]], on0),
    beside("lbl_a3", 330, in1(2), "A3 = 1", "left"),
    wire("w_a3", [[330, in1(2)], [boxX, in1(2)]], on1),
    beside("lbl_il", 330, in1(3), opts.il, "left"),
    wire("w_il", [[330, in1(3)], [boxX, in1(3)]], on1),
  ];
  opts.outputs.forEach((value, i) => {
    const text = opts.sel === null ? names[i] : `${names[i]} = ${value}`;
    const xEnd = 760;
    els.push(
      arrow(`w_h${i}`, [[boxX + boxW, outY(i)], [xEnd, outY(i)]], opts.sel !== null),
      beside(`lbl_h${i}`, xEnd, outY(i), text, "right"),
    );
  });
  els.push(
    label("tbl_h", 980, 120, "S    H0   H1   H2   H3"),
    label("tbl_0", 980, 148, "0   IR   A0   A1   A2"),
    label("tbl_1", 980, 176, "1   A1   A2   A3   IL"),
  );
  return els;
}

const plain = muxFigure({
  sel: null,
  outputs: ["", "", "", ""],
  ir: "IR",
  il: "IL",
});

const right0110 = muxFigure({
  sel: 0,
  outputs: ["0", "1", "1", "0"],
  ir: "IR = 0",
  il: "IL",
});

const left1010 = muxFigure({
  sel: 1,
  outputs: ["1", "0", "1", "0"],
  ir: "IR",
  il: "IL = 0",
});

const right1110 = muxFigure({
  sel: 0,
  outputs: ["1", "1", "1", "0"],
  ir: "IR = 1",
  il: "IL",
});

const left1011 = muxFigure({
  sel: 1,
  outputs: ["1", "0", "1", "1"],
  ir: "IR",
  il: "IL = 1",
});

const titles = [
  "Logical shift",
  "Circular shift",
  "Arithmetic shift",
  "Four multiplexers",
  "S = 0 shifts right",
  "Logical shift right",
  "Logical shift left",
  "Circular shift right",
  "Circular shift left",
  "Arithmetic shift right",
  "Arithmetic shift left",
];

const notes = [
  "A 0 enters the open end. 1101 shifted left is 1010. Shifted right it is 0110.",
  "The bit that shifts out comes back in. Left gives 1011. Right gives 1110.",
  "Shift left multiplies by 2. Shift right divides by 2, and the sign bit is copied.",
  "S = 0 takes the upper input of each mux and the bits move down. S = 1 moves them up.",
  "A = 1101 and IR = 0. The outputs, top to bottom, are H0 H1 H2 H3 = 0 1 1 0.",
  "IR = 0, so a 0 enters on the left. The lamps read 0 1 1 0.",
  "IL = 0, so a 0 enters on the right. The lamps read 1 0 1 0.",
  "IR is tied to A3, the bit that shifted out. IR = 1 and the lamps read 1 1 1 0.",
  "IL is tied to A0, the bit that shifted out. IL = 1 and the lamps read 1 0 1 1.",
  "IR is tied to the sign bit A0, which is 1. The lamps read 1 1 1 0.",
  "IL = 0. 1101 shifted left is 1010, which is the 4-bit product of 1101 and 2.",
];

const figures: SchematicElement[][] = [
  logical,
  circular,
  arithmetic,
  plain,
  right0110,
  right0110,
  left1010,
  right1110,
  left1011,
  right1110,
  left1010,
];

export const combinationalShifterStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i < 3 ? 980 : 1120,
    height: i < 3 ? 460 : 460,
    elements: figures[i],
  })),
);

export const combinationalShifterTheoryDiagram = combinationalShifterStepSchematics[4];
