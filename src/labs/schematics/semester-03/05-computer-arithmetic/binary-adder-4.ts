import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, label, wire } from "../diagram";

/**
 * Darshan slide "4-bit Binary Adder".
 * A = 1101, B = 0111, C0 = 0, sum = 10100.
 * Bit 3 is on the left. Carry runs toward the higher bit.
 */
const W = 1040;
const H = 460;
const xs = [70, 300, 530, 760];
const boxY = 168;
const boxW = 150;
const boxH = 70;
const midY = boxY + boxH / 2;

const bits = [3, 2, 1, 0] as const;
const aBits = [1, 1, 0, 1];
const bBits = [0, 1, 1, 1];
const sumBits = [0, 1, 0, 0];
const carries = [1, 1, 1, 0];

function box(id: string, x: number): SchematicElement {
  return wire(id, [
    [x, boxY],
    [x + boxW, boxY],
    [x + boxW, boxY + boxH],
    [x, boxY + boxH],
    [x, boxY],
  ]);
}

const addition: SchematicElement[] = [
  label("hC", 250, 70, "C"),
  label("hA", 250, 98, "A"),
  label("hB", 250, 126, "B"),
  label("hS", 250, 162, "Sum"),
  ...["1 1 1 0", "1 1 0 1", "0 1 1 1", "1 0 1 0 0"].map((text, i) =>
    label(`col${i}`, 360, 70 + i * 28 + (i === 3 ? 8 : 0), text),
  ),
];

const circuit: SchematicElement[] = [];
const groups: string[][] = [[], [], [], []];

xs.forEach((x, i) => {
  circuit.push(box(`fa${bits[i]}`, x));
  circuit.push(label(`faName${bits[i]}`, x + boxW / 2, midY + 4, "FA"));
  groups[0].push(`fa${bits[i]}`, `faName${bits[i]}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const bX = x + 42;
  const aX = x + 108;
  circuit.push(arrow(`bIn${bit}`, [[bX, 128], [bX, boxY]]));
  circuit.push(label(`bVal${bit}`, bX, 96, String(bBits[i])));
  circuit.push(label(`bName${bit}`, bX, 120, `B${bit}`));
  circuit.push(arrow(`aIn${bit}`, [[aX, 128], [aX, boxY]]));
  circuit.push(label(`aVal${bit}`, aX, 96, String(aBits[i])));
  circuit.push(label(`aName${bit}`, aX, 120, `A${bit}`));
  groups[1].push(`bIn${bit}`, `bVal${bit}`, `bName${bit}`, `aIn${bit}`, `aVal${bit}`, `aName${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  if (i < 3) {
    const x1 = x + boxW;
    const x2 = xs[i + 1];
    const mid = (x1 + x2) / 2;
    circuit.push(arrow(`c${bit}`, [[x2, midY], [x1, midY]]));
    circuit.push(label(`cName${bit}`, mid, midY - 16, `C${bit}`));
    circuit.push(label(`cVal${bit}`, x1 + 18, midY - 14, String(carries[i])));
    groups[2].push(`c${bit}`, `cName${bit}`, `cVal${bit}`);
  } else {
    const tail = x + boxW + 36;
    circuit.push(arrow("c0", [[tail, midY], [x + boxW, midY]]));
    circuit.push(label("c0val", tail, midY - 8, "0"));
    circuit.push(label("c0name", tail, midY + 14, "C0"));
    groups[2].push("c0", "c0val", "c0name");
  }
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const sX = x + 108;
  circuit.push(arrow(`s${bit}`, [[sX, boxY + boxH], [sX, boxY + boxH + 28]]));
  circuit.push(label(`sName${bit}`, sX, boxY + boxH + 40, `S${bit}`));
  circuit.push(label(`sVal${bit}`, sX, boxY + boxH + 58, String(sumBits[i])));
  groups[3].push(`s${bit}`, `sName${bit}`, `sVal${bit}`);
});
const c4x = xs[0] - 28;
circuit.push(arrow("c4", [[xs[0], midY], [c4x, midY], [c4x, boxY + boxH + 28]], true));
circuit.push(label("c4name", c4x - 16, boxY + boxH + 8, "C4"));
circuit.push(label("c4val", c4x, boxY + boxH + 42, "1"));
groups[3].push("c4", "c4name", "c4val");

const titles = [
  "1101 + 0111",
  "Four full adders",
  "A and B into each stage",
  "Carries chained, C0 = 0",
  "The sum is 10100",
  "One full adder per bit",
];

const notes = [
  "A is 1101 and B is 0111. The sum needs a fifth bit.",
  "Bit 3 is the left stage. Bit 0 is the right stage.",
  "A3 A2 A1 A0 = 1 1 0 1. B3 B2 B1 B0 = 0 1 1 1.",
  "C0 enters the low stage. Each carry feeds the next higher stage.",
  "C4 S3 S2 S1 S0 = 1 0 1 0 0. That is 13 + 7.",
  "n bits need n full adders. A can come from R1 and B from R2.",
];

const highlight = ["hS", "fa3", "aName3", "c3", "c4", "c4"];
const byId = new Map(circuit.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  if (step === 0) return addition;
  const ids = groups.slice(0, step).flat();
  const hi = highlight[step];
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    return el.id === hi ? { ...el, highlight: true } : el;
  });
}

export const binaryAdder4StepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i === 0 ? 640 : W,
    height: i === 0 ? 240 : H,
    elements: shown(i),
  })),
);

export const binaryAdder4TheoryDiagram = binaryAdder4StepSchematics[4];
