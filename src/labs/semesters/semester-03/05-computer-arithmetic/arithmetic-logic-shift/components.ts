import { type ComponentInstance } from "@/labs/types";
import { chip, input, lamp, link, power, rail } from "../../_coa/breadboard";

// A is written A0 A1 A2 A3 = 1 1 0 1, so A0 is the 8's place. B = 0 0 1 1.
// S1 S0 pick Y for the adder and the logic function. S3 S2 pick F:
// 00 arithmetic, 01 logic, 10 shift right, 11 shift left.
//
// Chips sit in signal order and every constant drops to the rail beside
// its own pin, so the wires stay short instead of crossing the board.
const bits = [0, 1, 2, 3] as const;
const aLevel: ("vcc" | "gnd")[] = ["vcc", "vcc", "gnd", "vcc"];
const bLevel: ("vcc" | "gnd")[] = ["gnd", "gnd", "vcc", "vcc"];
const bpLevel: ("vcc" | "gnd")[] = ["vcc", "vcc", "gnd", "gnd"];
const shrLevel: ("vcc" | "gnd")[] = ["gnd", "vcc", "vcc", "gnd"];
const shlLevel: ("vcc" | "gnd")[] = ["vcc", "gnd", "vcc", "gnd"];
const adderA = ["a4", "a3", "a2", "a1"];
const adderB = ["b4", "b3", "b2", "b1"];
const adderS = ["s4", "s3", "s2", "s1"];
const adderAOff = [3, 6, 2, 4];
const quadA = [0, 3, 5, 2];
const quadB = [1, 4, 4, 1];
const notA = [0, 2, 4, 5];

const col = {
  ymH: 16,
  ymL: 24,
  fa: 32,
  fmH: 40,
  fmL: 48,
  lmH: 56,
  lmL: 64,
  and: 72,
  or: 79,
  xor: 86,
  inv: 93,
};

function slot(bit: number) {
  const high = bit < 2;
  const first = bit % 2 === 0;
  return {
    yChip: high ? "ymH" : "ymL",
    lChip: high ? "lmH" : "lmL",
    fChip: high ? "fmH" : "fmL",
    y: first ? "y1" : "y2",
    n: first ? "1" : "2",
  };
}

const muxInOff: Record<string, number> = {
  i0_1: 5,
  i1_1: 4,
  i2_1: 3,
  i3_1: 2,
  i0_2: 3,
  i1_2: 4,
  i2_2: 5,
  i3_2: 6,
};

function feeds(id: string, at: number, gndOff: number): ComponentInstance[] {
  return [
    {
      id: `w_vcc_${id}`,
      type: "wire",
      color: "red",
      from: { board: "bb", rail: "vcc_bot", col: at },
      to: { ic: id, pin: "VCC" },
    },
    {
      id: `w_gnd_${id}`,
      type: "wire",
      color: "black",
      from: { board: "bb", rail: "gnd_top", col: at + gndOff },
      to: { ic: id, pin: "GND" },
    },
  ];
}

function tie(
  id: string,
  ic: string,
  pin: string,
  level: "vcc" | "gnd",
  at: number,
): ComponentInstance {
  return rail(id, ic, pin, level, at);
}

const arith: ComponentInstance[] = [
  chip("fa", "adder-4bit", col.fa),
  ...feeds("fa", col.fa, 7),
  chip("ymH", "mux-4to1", col.ymH),
  chip("ymL", "mux-4to1", col.ymL),
  ...feeds("ymH", col.ymH, 7),
  ...feeds("ymL", col.ymL, 7),
  tie("w_en1_ymH", "ymH", "en1_bar", "gnd", col.ymH),
  tie("w_en2_ymH", "ymH", "en2_bar", "gnd", col.ymH + 7),
  tie("w_en1_ymL", "ymL", "en1_bar", "gnd", col.ymL),
  tie("w_en2_ymL", "ymL", "en2_bar", "gnd", col.ymL + 7),
  ...bits.map((bit) =>
    tie(`w_af${bit}`, "fa", adderA[bit], aLevel[bit], col.fa + adderAOff[bit]),
  ),
  ...bits.map((bit) => {
    const { yChip, n } = slot(bit);
    return tie(
      `w_z${bit}`,
      yChip,
      `i0_${n}`,
      "gnd",
      col[yChip] + muxInOff[`i0_${n}`],
    );
  }),
  ...bits.map((bit) => {
    const { yChip, n } = slot(bit);
    return tie(
      `w_bm${bit}`,
      yChip,
      `i1_${n}`,
      bLevel[bit],
      col[yChip] + muxInOff[`i1_${n}`],
    );
  }),
  ...bits.map((bit) => {
    const { yChip, n } = slot(bit);
    return tie(
      `w_bp${bit}`,
      yChip,
      `i2_${n}`,
      bpLevel[bit],
      col[yChip] + muxInOff[`i2_${n}`],
    );
  }),
  ...bits.map((bit) => {
    const { yChip, n } = slot(bit);
    return tie(
      `w_o${bit}`,
      yChip,
      `i3_${n}`,
      "vcc",
      col[yChip] + muxInOff[`i3_${n}`],
    );
  }),
  ...bits.map((bit) => {
    const { yChip, y } = slot(bit);
    return link(`w_y${bit}`, yChip, y, "fa", adderB[bit], "green");
  }),
  input("cin", "fa", "c0", col.fa + 6, "purple"),
];

const logic: ComponentInstance[] = [
  chip("and", "and-quad", col.and),
  chip("or", "or-quad", col.or),
  chip("xor", "xor-quad", col.xor),
  chip("inv", "not-hex", col.inv),
  ...feeds("and", col.and, 6),
  ...feeds("or", col.or, 6),
  ...feeds("xor", col.xor, 6),
  ...feeds("inv", col.inv, 6),
  chip("lmH", "mux-4to1", col.lmH),
  chip("lmL", "mux-4to1", col.lmL),
  ...feeds("lmH", col.lmH, 7),
  ...feeds("lmL", col.lmL, 7),
  tie("w_en1_lmH", "lmH", "en1_bar", "gnd", col.lmH),
  tie("w_en2_lmH", "lmH", "en2_bar", "gnd", col.lmH + 7),
  tie("w_en1_lmL", "lmL", "en1_bar", "gnd", col.lmL),
  tie("w_en2_lmL", "lmL", "en2_bar", "gnd", col.lmL + 7),
  ...bits.flatMap((bit) => {
    const n = bit + 1;
    return [
      tie(`w_aa${bit}`, "and", `${n}A`, aLevel[bit], col.and + quadA[bit]),
      tie(`w_ao${bit}`, "or", `${n}A`, aLevel[bit], col.or + quadA[bit]),
      tie(`w_ax${bit}`, "xor", `${n}A`, aLevel[bit], col.xor + quadA[bit]),
      tie(`w_an${bit}`, "inv", `${n}A`, aLevel[bit], col.inv + notA[bit]),
      tie(`w_ba${bit}`, "and", `${n}B`, bLevel[bit], col.and + quadB[bit]),
      tie(`w_bo${bit}`, "or", `${n}B`, bLevel[bit], col.or + quadB[bit]),
      tie(`w_bx${bit}`, "xor", `${n}B`, bLevel[bit], col.xor + quadB[bit]),
    ];
  }),
  ...bits.flatMap((bit) => {
    const n = `${bit + 1}Y`;
    const { lChip, n: half } = slot(bit);
    return [
      link(`w_and${bit}`, "and", n, lChip, `i0_${half}`, "green"),
      link(`w_or${bit}`, "or", n, lChip, `i1_${half}`, "orange"),
      link(`w_xor${bit}`, "xor", n, lChip, `i2_${half}`, "blue"),
      link(`w_not${bit}`, "inv", n, lChip, `i3_${half}`, "yellow"),
    ];
  }),
];

const finalStage: ComponentInstance[] = [
  chip("fmH", "mux-4to1", col.fmH),
  chip("fmL", "mux-4to1", col.fmL),
  ...feeds("fmH", col.fmH, 7),
  ...feeds("fmL", col.fmL, 7),
  tie("w_en1_fmH", "fmH", "en1_bar", "gnd", col.fmH),
  tie("w_en2_fmH", "fmH", "en2_bar", "gnd", col.fmH + 7),
  tie("w_en1_fmL", "fmL", "en1_bar", "gnd", col.fmL),
  tie("w_en2_fmL", "fmL", "en2_bar", "gnd", col.fmL + 7),
  ...bits.map((bit) => {
    const { fChip, n } = slot(bit);
    return link(`w_d${bit}`, "fa", adderS[bit], fChip, `i0_${n}`, "green");
  }),
  ...bits.map((bit) => {
    const { lChip, fChip, y, n } = slot(bit);
    return link(`w_e${bit}`, lChip, y, fChip, `i1_${n}`, "yellow");
  }),
  ...bits.map((bit) => {
    const { fChip, n } = slot(bit);
    return tie(
      `w_shr${bit}`,
      fChip,
      `i2_${n}`,
      shrLevel[bit],
      col[fChip] + muxInOff[`i2_${n}`],
    );
  }),
  ...bits.map((bit) => {
    const { fChip, n } = slot(bit);
    return tie(
      `w_shl${bit}`,
      fChip,
      `i3_${n}`,
      shlLevel[bit],
      col[fChip] + muxInOff[`i3_${n}`],
    );
  }),
  input("s3", "fmH", "s1", col.fmH + 1, "blue"),
  input("s2", "fmH", "s0", col.fmH + 1, "orange", "j"),
  input("s1", "ymH", "s1", col.ymH + 1, "yellow"),
  input("s0", "ymH", "s0", col.ymH + 1, "green", "j"),
  link("w_s3_link", "fmH", "s1", "fmL", "s1", "blue"),
  link("w_s2_link", "fmH", "s0", "fmL", "s0", "orange"),
  link("w_s1_ym", "ymH", "s1", "ymL", "s1", "yellow"),
  link("w_s1_lm", "ymL", "s1", "lmH", "s1", "yellow"),
  link("w_s1_ll", "lmH", "s1", "lmL", "s1", "yellow"),
  link("w_s0_ym", "ymH", "s0", "ymL", "s0", "green"),
  link("w_s0_lm", "ymL", "s0", "lmH", "s0", "green"),
  link("w_s0_ll", "lmH", "s0", "lmL", "s0", "green"),
];

const lamps: ComponentInstance[] = [
  ...lamp("f0", "fmH", "y1", 4, "c", "red"),
  ...lamp("f1", "fmH", "y2", 10, "c", "red"),
  ...lamp("f2", "fmL", "y1", 4, "h", "green"),
  ...lamp("f3", "fmL", "y2", 10, "h", "green"),
];

export const components: ComponentInstance[] = [
  ...power("wide-breadboard"),
  ...arith,
  ...logic,
  ...finalStage,
  ...lamps,
];

const ids = (parts: ComponentInstance[]) => parts.map((part) => part.id);
const supply = ["bb", "psu", "w_vcc_link", "w_gnd_link"];
const arithIds = ids(arith);
const logicIds = ids(logic);
const finalIds = ids(finalStage);
const lampIds = ids(lamps);
const wired = [...supply, ...arithIds, ...logicIds, ...finalIds];
const built = [...wired, ...lampIds];

export const boardShow: string[][] = [
  supply,
  [...supply, ...arithIds],
  [...supply, ...arithIds, ...logicIds],
  wired,
  ...Array.from({ length: 14 }, () => built),
];
