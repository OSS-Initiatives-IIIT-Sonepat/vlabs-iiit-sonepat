import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, label, wire } from "../diagram";

/**
 * Darshan slide "4-bit Binary Incrementer".
 * R1 = 1101 plus 1. Four half adders. The sum is 1110 and C4 is 0.
 * Bit 3 is on the left. The y input of bit 0 is the constant 1.
 */
const W = 1040;
const H = 440;
const xs = [50, 280, 510, 740];
const boxW = 160;
const boxY = 150;
const boxH = 110;
const bot = boxY + boxH;

const bits = [3, 2, 1, 0] as const;
const aBits = [1, 1, 0, 1];
const yBits = [0, 0, 1, 1];
const sBits = [1, 1, 1, 0];

function box(id: string, x: number): SchematicElement {
  return wire(id, [
    [x, boxY],
    [x + boxW, boxY],
    [x + boxW, bot],
    [x, bot],
    [x, boxY],
  ]);
}

const pencil: SchematicElement[] = [
  label("cH", 180, 70, "C"),
  label("rH", 180, 102, "R1"),
  label("pH", 180, 134, "+"),
  label("sH", 180, 174, "Sum"),
  label("cV", 280, 70, "0   0   1"),
  label("rV", 280, 102, "1   1   0   1"),
  label("pV", 360, 134, "1"),
  label("sV", 280, 174, "1   1   1   0"),
];

const circuit: SchematicElement[] = [];
const groups: string[][] = [[], [], [], []];

xs.forEach((x, i) => {
  const bit = bits[i];
  const xIn = x + 46;
  const yIn = x + 114;
  circuit.push(box(`ha${bit}`, x));
  circuit.push(label(`haName${bit}`, x + boxW / 2, boxY + 58, "HA"));
  circuit.push(label(`xLab${bit}`, xIn, boxY + 22, "x"));
  circuit.push(label(`yLab${bit}`, yIn, boxY + 22, "y"));
  circuit.push(label(`cLab${bit}`, xIn, bot - 16, "C"));
  circuit.push(label(`sLab${bit}`, yIn, bot - 16, "S"));
  groups[0].push(`ha${bit}`, `haName${bit}`, `xLab${bit}`, `yLab${bit}`, `cLab${bit}`, `sLab${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const xIn = x + 46;
  circuit.push(arrow(`aIn${bit}`, [[xIn, 96], [xIn, boxY]]));
  circuit.push(label(`aVal${bit}`, xIn, 64, String(aBits[i])));
  circuit.push(label(`aName${bit}`, xIn, 88, `A${bit}`));
  groups[1].push(`aIn${bit}`, `aVal${bit}`, `aName${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const yIn = x + 114;
  if (i === 3) {
    circuit.push(arrow("plus", [[yIn, 96], [yIn, boxY]]));
    circuit.push(label("plusVal", yIn, 88, "1"));
    groups[2].push("plus", "plusVal");
    return;
  }
  const gapX = x + boxW + (xs[i + 1] - (x + boxW)) / 2;
  const cX = xs[i + 1] + 46;
  const yTop = 108;
  circuit.push(wire(`cDown${bit}`, [[cX, bot], [cX, bot + 22]]));
  circuit.push(wire(`cAcross${bit}`, [[cX, bot + 22], [gapX, bot + 22]]));
  circuit.push(wire(`cUp${bit}`, [[gapX, bot + 22], [gapX, yTop]]));
  circuit.push(wire(`cOver${bit}`, [[gapX, yTop], [yIn, yTop]]));
  circuit.push(arrow(`yIn${bit}`, [[yIn, yTop], [yIn, boxY]]));
  circuit.push(label(`yVal${bit}`, (gapX + yIn) / 2, yTop - 16, String(yBits[i])));
  groups[2].push(`cDown${bit}`, `cAcross${bit}`, `cUp${bit}`, `cOver${bit}`, `yIn${bit}`, `yVal${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const sX = x + 114;
  circuit.push(arrow(`s${bit}`, [[sX, bot], [sX, bot + 36]]));
  circuit.push(label(`sName${bit}`, sX, bot + 48, `S${bit}`));
  circuit.push(label(`sVal${bit}`, sX, bot + 68, String(sBits[i])));
  groups[3].push(`s${bit}`, `sName${bit}`, `sVal${bit}`);
});
const c4x = xs[0] + 46;
circuit.push(arrow("c4", [[c4x, bot], [c4x, bot + 36]]));
circuit.push(label("c4name", c4x, bot + 48, "C4"));
circuit.push(label("c4val", c4x, bot + 68, "0"));
groups[3].push("c4", "c4name", "c4val");

const titles = [
  "Add one to a register",
  "Four half adders",
  "A = 1101 into x",
  "The carry chain adds the 1",
  "The sum is 1110",
  "B = 0000 and C0 = 1",
];

const notes = [
  "1101 + 1 = 1110. The carries into the higher bits are 0, 0, and 1.",
  "Each stage adds the bit to the carry from the bit on its right.",
  "A3 A2 A1 A0 = 1 1 0 1.",
  "Bit 0 adds 1 + 1. That sum is 0 and the carry into bit 1 is 1.",
  "C4 S3 S2 S1 S0 = 0 1 1 1 0.",
  "On the board, B is tied to 0000. Raising C0 adds one.",
];

const byId = new Map(circuit.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  if (step === 0) return pencil;
  const ids = groups.slice(0, step).flat();
  const hi = step === 4 ? "s3" : step === 3 ? "plus" : "";
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    return el.id === hi ? { ...el, highlight: true } : el;
  });
}

export const binaryIncrementerStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i === 0 ? 640 : W,
    height: i === 0 ? 240 : H,
    elements: shown(i),
  })),
);

export const binaryIncrementerTheoryDiagram = binaryIncrementerStepSchematics[4];
