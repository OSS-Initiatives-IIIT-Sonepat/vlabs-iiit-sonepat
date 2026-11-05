import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, label, wire } from "../diagram";

/**
 * Darshan slides for the 4-bit arithmetic circuit.
 * D = A + Y + Cin. Bit 0 is on the left, as on the mux figure.
 * The marked case is decrement: Y = 1111, Cin = 0, so 1101 becomes 1100.
 */
const W = 1120;
const H = 580;
const xs = [80, 330, 580, 830];
const faW = 180;
const faY = 96;
const faH = 70;
const faBot = faY + faH;
const midY = faY + faH / 2;
const muxY = 220;
const muxH = 84;
const muxBot = muxY + muxH;
const notY = 358;

const bits = [0, 1, 2, 3] as const;

function rect(id: string, x: number, y: number, w: number, h: number): SchematicElement {
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

const pencil: SchematicElement[] = [
  label("pa", 360, 78, "1  1  0  1"),
  label("pb", 360, 110, "+  1  1  1  1"),
  label("ps", 360, 150, "1  1  1  0  0"),
  label("pd", 360, 188, "Discard the carry.   D = 1 1 0 0"),
  label("pf", 360, 220, "Decrement  =  A + 1111 + 0"),
];

const fas: SchematicElement[] = [
  rect("banner", 150, 46, 820, 28),
  label("bannerText", 560, 64, "D = A + Y + Cin"),
];
const muxes: SchematicElement[] = [];
const inputs: SchematicElement[] = [];

xs.forEach((x, i) => {
  const bit = bits[i];
  const dX = x + 90;
  fas.push(rect(`fa${bit}`, x, faY, faW, faH));
  fas.push(label(`faName${bit}`, x + faW / 2, midY + 4, "FA"));
  fas.push(label(`xName${bit}`, x + 44, midY - 16, `X${bit}`));
  fas.push(label(`yName${bit}`, x + 140, midY - 16, `Y${bit}`));
  fas.push(arrow(`d${bit}`, [[dX, faY], [dX, 74]]));
  fas.push(label(`dName${bit}`, dX + 16, 88, `D${bit}`));
  if (i < 3) {
    const x1 = x + faW;
    const x2 = xs[i + 1];
    fas.push(arrow(`c${bit + 1}`, [[x1, midY], [x2, midY]]));
    fas.push(label(`cName${bit + 1}`, (x1 + x2) / 2, midY - 16, `C${bit + 1}`));
  }
});

fas.push(wire("cinUp", [[30, 520], [30, midY]]));
fas.push(arrow("cin", [[30, midY], [xs[0], midY]]));
fas.push(label("cinName", 30, 532, "Cin"));
fas.push(arrow("cout", [[xs[3] + faW, midY], [xs[3] + faW + 36, midY]]));
fas.push(label("coutName", xs[3] + faW + 52, midY, "Cout"));

xs.forEach((x, i) => {
  const bit = bits[i];
  const yX = x + 140;
  muxes.push(rect(`mux${bit}`, x, muxY, faW, muxH));
  muxes.push(label(`muxName${bit}`, x + faW / 2, muxY + 28, "4 x 1"));
  muxes.push(label(`muxSel${bit}`, x + faW / 2, muxY + 48, "MUX"));
  muxes.push(label(`muxIn${bit}`, x + faW / 2, muxBot - 14, "0   1   2   3"));
  muxes.push(arrow(`y${bit}`, [[yX, muxY], [yX, faBot]]));
});

muxes.push(arrow("s1", [[46, 248], [xs[0], 248]]));
muxes.push(label("s1Name", 46, 240, "S1"));
muxes.push(arrow("s0", [[46, 286], [xs[0], 286]]));
muxes.push(label("s0Name", 46, 278, "S0"));

const in2s: number[] = [];
const in3s: number[] = [];

xs.forEach((x, i) => {
  const bit = bits[i];
  const in0 = x + 40;
  const in1 = x + 78;
  const in2 = x + 116;
  const in3 = x + 154;
  const aX = x - 18;
  in2s.push(in2);
  in3s.push(in3);
  inputs.push({ type: "not-gate", id: `not${bit}`, x: in1, y: notY, rotation: 270 });
  inputs.push(wire(`bp${bit}`, [[in1, notY + 22], [in1, 410], [in1, 520]]));
  inputs.push(dot(`bDot${bit}`, in1, 410));
  inputs.push(wire(`b${bit}`, [[in1, 410], [in0, 410], [in0, muxBot]]));
  inputs.push(label(`bName${bit}`, in1, 532, `B${bit}`));
  inputs.push(wire(`z${bit}`, [[in2, muxBot], [in2, 450]]));
  if (i > 0) inputs.push(dot(`zDot${bit}`, in2, 450));
  inputs.push(wire(`o${bit}`, [[in3, muxBot], [in3, 490]]));
  if (i > 0) inputs.push(dot(`oDot${bit}`, in3, 490));
  inputs.push(wire(`a${bit}`, [[aX, 520], [aX, 192], [x + 44, 192], [x + 44, faBot]]));
  inputs.push(label(`aName${bit}`, aX, 532, `A${bit}`));
  inputs.push(arrow(`notOut${bit}`, [[in1, notY - 26], [in1, muxBot]]));
});

inputs.push(wire("rail0", [[in2s[0], 450], [in2s[3] + 40, 450]]));
inputs.push(label("zeroName", in2s[3] + 46, 450, "0"));
inputs.push(wire("rail1", [[in3s[0], 490], [in3s[3] + 40, 490]]));
inputs.push(label("oneName", in3s[3] + 46, 490, "1"));

const ones: SchematicElement[] = xs.map((x, i) => label(`one${bits[i]}`, x + 156, 192, "1"));
ones.push(label("cin0", 48, 118, "0"));

const full = [...fas, ...muxes, ...inputs];
const byId = new Map(full.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  if (step === 0) return pencil;
  const base = step === 1 ? fas : full;
  const hi = step === 9 ? new Set(["y0", "y1", "y2", "y3", "rail1", "cin"]) : new Set<string>();
  const banner = step === 9 ? "Decremented content of A" : "D = A + Y + Cin";
  const drawn = base.map((el) => {
    if (el.id === "bannerText" && el.type === "label") return { ...el, text: banner };
    return hi.has(el.id) ? { ...el, highlight: true } : el;
  });
  return step === 9 ? [...drawn, ...ones] : drawn;
}

const titles = [
  "Decrement by adding 1111",
  "One parallel adder",
  "Y comes from a 4×1 mux",
  "Add",
  "Add with carry",
  "Subtract with borrow",
  "Subtract",
  "Transfer A",
  "Increment A",
  "Decrement A",
  "Transfer A",
];

const notes = [
  "1101 + 1111 = 11100. Drop the carry and the result is 1100.",
  "D = A + Y + Cin. Bit 0 is on the left. Cout leaves bit 3.",
  "S1 S0 picks Y: 00 is B, 01 is B', 10 is 0, 11 is 1.",
  "S1 S0 Cin = 0 0 0. Y = B. 1101 + 0011 = 1 0000.",
  "Cin = 1. 1101 + 0011 + 1 = 1 0001.",
  "Y = B' = 1100. 1101 + 1100 = 1 1001, which is A − B − 1.",
  "Cin = 1 as well. 1101 + 1100 + 1 = 1 1010, which is 10.",
  "Y = 0 and Cin = 0, so D = A = 0 1101.",
  "Y = 0 and Cin = 1, so D = A + 1 = 0 1110.",
  "Y = 1111 and Cin = 0. 1101 + 1111 = 1 1100. That is A − 1.",
  "Y = 1111 and Cin = 1. The extra 1 wraps D back to A, and Cout is 1.",
];

export const arithmeticCircuitStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i === 0 ? 720 : W,
    height: i === 0 ? 280 : H,
    elements: shown(i),
  })),
);

export const arithmeticCircuitTheoryDiagram = arithmeticCircuitStepSchematics[9];
