import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, icBox, label, wire } from "../diagram";

/**
 * One stage of the arithmetic logic shift unit.
 * The 4×1 mux selects Di, Ei, the shift-right input, or the shift-left input.
 */

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

function stage(hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  const x0 = 100;
  const vL = 200;
  const vM = 255;
  const vR = 310;
  const ax = 390;
  const ay = 130;
  const aw = 140;
  const ah = 88;
  const ly = 255;
  const lh = 100;
  const mx = 810;
  const my = 148;
  const mw = 120;
  const mh = 230;
  const cx = ax + aw / 2;
  const right = ax + aw;
  const s1Y = 86;
  const s0Y = 108;
  const a1 = 152;
  const a2 = 178;
  const a3 = 204;
  const l1 = 340;
  const l2 = 304;
  const biY = 328;
  const aiY = 348;
  const arith = on("boxA") || on("w_s1");
  const logic = on("boxL") || on("w_bi");
  return [
    ...icBox("boxA", ax, ay, aw, ah, "arithmetic", arith),
    label("lbl_a1", cx, ay + 28, "One stage of"),
    label("lbl_a3", cx, ay + 66, "circuit"),
    ...icBox("boxL", ax, ly, aw, lh, "logic", logic),
    label("lbl_l1", cx, ly + 28, "One stage of"),
    label("lbl_l3", cx, ly + 72, "circuit"),
    ...icBox("boxM", mx, my, mw, mh, "MUX", on("boxM")),
    label("lbl_select", mx + 78, my + 36, "Select"),
    label("lbl_4x1", mx + 78, my + 100, "4 x 1"),
    label("lbl_0", mx + 16, 185, "0"),
    label("lbl_1", mx + 16, 250, "1"),
    label("lbl_2", mx + 16, 300, "2"),
    label("lbl_3", mx + 16, 340, "3"),

    beside("lbl_s3", x0, 42, "S3", "left"),
    wire("w_s3", [[x0, 42], [880, 42], [880, my]], on("w_s3")),
    beside("lbl_s2", x0, 60, "S2", "left"),
    wire("w_s2", [[x0, 60], [840, 60], [840, my]], on("w_s2")),

    beside("lbl_s1", x0, s1Y, "S1", "left"),
    wire("w_s1", [[x0, s1Y], [vR, s1Y], [vR, l1], [ax, l1]], arith),
    wire("w_s1tap", [[vR, a1], [ax, a1]], arith),
    { type: "junction", id: "j_s1", x: vR, y: a1 },

    beside("lbl_s0", x0, s0Y, "S0", "left"),
    wire("w_s0", [[x0, s0Y], [vM, s0Y], [vM, aiY]], arith || on("w_ai")),
    wire("w_s0tap", [[vM, a2], [ax, a2]], arith),
    wire("w_s0log", [[vM, l2], [ax, l2]], logic),
    { type: "junction", id: "j_s0", x: vM, y: a2 },
    { type: "junction", id: "j_s0l", x: vM, y: l2 },
    { type: "junction", id: "j_ai", x: vM, y: aiY },

    wire("w_alo", [[ax, a3], [vL, a3], [vL, biY]], arith),
    { type: "junction", id: "j_bi", x: vL, y: biY },
    beside("lbl_bi", x0, biY, "Bi", "left"),
    wire("w_bi", [[x0, biY], [ax, biY]], logic),
    beside("lbl_ai", x0, aiY, "Ai", "left"),
    wire("w_ai", [[x0, aiY], [ax, aiY]], logic),

    beside("lbl_ci", cx, ay - 18, "Ci", "right"),
    arrow("w_ci", [[cx, ay - 18], [cx, ay]], on("boxA")),
    arrow("w_co", [[cx, ay + ah], [cx, 240]], on("boxA")),
    beside("lbl_co", cx, 240, "Ci+1", "right"),

    wire("w_di", [[right, 160], [610, 160], [610, 185], [mx, 185]], on("w_di")),
    label("lbl_di", 555, 148, "Di"),
    wire("w_ei", [[right, 310], [610, 310], [610, 250], [mx, 250]], on("w_ei")),
    label("lbl_ei", 555, 298, "Ei"),

    beside("lbl_aim", x0, 392, "Ai−1", "left"),
    wire("w_shr", [[x0, 392], [740, 392], [740, 300], [mx, 300]], on("w_shr")),
    label("lbl_shr", 620, 380, "shr"),
    beside("lbl_aip", x0, 420, "Ai+1", "left"),
    wire("w_shl", [[x0, 420], [770, 420], [770, 340], [mx, 340]], on("w_shl")),
    label("lbl_shl", 660, 408, "shl"),

    wire("w_fi", [[mx + mw, 260], [1020, 260]], on("w_fi")),
    beside("lbl_fi", 1020, 260, "Fi", "right"),
  ];
}

const titles = [
  "One arithmetic logic shift unit",
  "The arithmetic stage",
  "The logic stage",
  "The 4×1 multiplexer",
  "Transfer A",
  "Increment A",
  "Addition",
  "Add with carry",
  "Subtract with borrow",
  "Subtraction",
  "Decrement",
  "Transfer A",
  "AND",
  "OR",
  "XOR",
  "Complement A",
  "Shift right",
  "Shift left",
];

const notes = [
  "S3 S2 pick the mux input. S1 S0 and Cin pick the operation inside the stage.",
  "D = A + Y + Cin. S1 S0 sets Y to 0, B, B', or 1.",
  "The same S1 S0 picks E: AND, OR, XOR, or the complement of A.",
  "Input 0 is Di, 1 is Ei, 2 is the bit from the left, and 3 is the bit from the right.",
  "S3 S2 S1 S0 Cin = 0 0 0 0 0. Y = 0, so F = A = 1101.",
  "Cin = 1. F = A + 1 = 1110.",
  "Y = B = 0011. 1101 + 0011 = 10000. The four lamps show 0000.",
  "Cin = 1 as well. 1101 + 0011 + 1 = 10001. The lamps show 0001.",
  "Y = B' = 1100. 1101 + 1100 = 11001. The lamps show 1001.",
  "Cin = 1. 1101 + 1100 + 1 = 11010. The lamps show 1010, which is 13 − 3.",
  "Y = 1111 and Cin = 0. 1101 + 1111 = 11100. The lamps show 1100.",
  "Y = 1111 and Cin = 1. The extra 1 wraps F back to 1101.",
  "S3 S2 = 0 1 selects Ei. S1 S0 = 0 0 is AND. 1101 ∧ 0011 = 0001.",
  "S1 S0 = 0 1. 1101 ∨ 0011 = 1111.",
  "S1 S0 = 1 0. 1101 ⊕ 0011 = 1110.",
  "S1 S0 = 1 1. F = A' = 0010.",
  "S3 S2 = 1 0. A 0 enters on the left. F = 0110.",
  "S3 S2 = 1 1. A 0 enters on the right. F = 1010.",
];

function hotFor(i: number): string[] {
  if (i === 1 || (i >= 4 && i <= 11)) return ["boxA", "w_di", "w_s1", "w_s0"];
  if (i === 2 || (i >= 12 && i <= 15)) return ["boxL", "w_ei", "w_bi", "w_ai"];
  if (i === 3) return ["boxM", "w_fi", "w_s3", "w_s2"];
  if (i === 16) return ["w_shr", "w_fi"];
  if (i === 17) return ["w_shl", "w_fi"];
  return [];
}

export const arithmeticLogicShiftStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: 1080,
    height: 490,
    elements: stage(hotFor(i)),
  })),
);

export const arithmeticLogicShiftTheoryDiagram = arithmeticLogicShiftStepSchematics[0];
