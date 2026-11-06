import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, label, wire } from "../diagram";

/**
 * Darshan slide "4-bit Binary Adder-Subtractor".
 * M = 0 adds. M = 1 subtracts, because B ⊕ 1 = B' and C0 = 1.
 * Bit 3 is on the left. The example is A = 1010, B = 0011.
 */
const W = 1080;
const H = 500;
const xs = [64, 304, 544, 784];
const boxW = 168;
const boxY = 260;
const boxH = 72;
const midY = boxY + boxH / 2;
const xorY = 176;

const bits = [3, 2, 1, 0] as const;
const aBits = [1, 0, 1, 0];
const bBits = [0, 0, 1, 1];

function box(id: string, x: number): SchematicElement {
  return wire(id, [
    [x, boxY],
    [x + boxW, boxY],
    [x + boxW, boxY + boxH],
    [x, boxY + boxH],
    [x, boxY],
  ]);
}

function dot(id: string, x: number, y: number): SchematicElement {
  return { type: "junction", id, x, y };
}

const modes: SchematicElement[] = [
  label("m0", 540, 80, "M = 0    the circuit is an adder"),
  label("e0", 540, 112, "C0 = 0    and    B ⊕ 0 = B"),
  label("m1", 540, 164, "M = 1    the circuit is a subtractor"),
  label("e1", 540, 196, "C0 = 1    and    B ⊕ 1 = B'"),
];

const circuit: SchematicElement[] = [];
const groups: string[][] = [[], [], [], [], []];

xs.forEach((x, i) => {
  const bit = bits[i];
  circuit.push(box(`fa${bit}`, x));
  circuit.push(label(`faName${bit}`, x + boxW / 2, midY + 4, "FA"));
  groups[0].push(`fa${bit}`, `faName${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  const cx = x + 48;
  const bPin: [number, number] = [cx - 8, xorY - 28];
  const mPin: [number, number] = [cx + 8, xorY - 28];
  const yPin: [number, number] = [cx, xorY + 28];
  circuit.push({
    type: "xor-gate",
    id: `xor${bit}`,
    x: cx,
    y: xorY,
    rotation: 90,
  });
  circuit.push(arrow(`bIn${bit}`, [[bPin[0], 116], bPin]));
  circuit.push(label(`bVal${bit}`, bPin[0], 86, String(bBits[i])));
  circuit.push(label(`bName${bit}`, bPin[0], 108, `B${bit}`));
  circuit.push(arrow(`y${bit}`, [yPin, [cx, boxY]]));
  circuit.push(label(`bp${bit}`, cx + 22, 224, `B${bit}'`));
  circuit.push(label(`one${bit}`, mPin[0] + 18, 86, "1"));
  circuit.push(label(`zero${bit}`, mPin[0] + 18, 104, "0"));
  groups[1].push(
    `xor${bit}`,
    `bIn${bit}`,
    `bVal${bit}`,
    `bName${bit}`,
    `y${bit}`,
    `bp${bit}`,
    `one${bit}`,
    `zero${bit}`,
  );
});

const mY = xorY - 48;
const mXs = xs.map((x) => x + 56);
circuit.push(
  wire("mRail", [
    [mXs[0], mY],
    [1000, mY],
  ]),
);
circuit.push(
  wire("mDrop", [
    [1000, mY],
    [1000, midY],
  ]),
);
circuit.push(
  arrow("c0", [
    [1000, midY],
    [xs[3] + boxW, midY],
  ]),
);
circuit.push(label("mName", 1024, mY - 8, "M"));
circuit.push(label("c0name", 976, midY + 18, "C0"));
mXs.forEach((mx, i) => {
  const bit = bits[i];
  circuit.push(
    wire(`mStub${bit}`, [
      [mx, mY],
      [mx, mY + 20],
    ]),
  );
  if (i > 0) circuit.push(dot(`mDot${bit}`, mx, mY));
});
groups[2].push(
  "mRail",
  "mDrop",
  "c0",
  "mName",
  "c0name",
  ...bits.flatMap((bit, i) =>
    i === 0 ? [`mStub${bit}`] : [`mStub${bit}`, `mDot${bit}`],
  ),
);

xs.forEach((x, i) => {
  const bit = bits[i];
  const ax = x + 120;
  circuit.push(
    arrow(`aIn${bit}`, [
      [ax, 148],
      [ax, boxY],
    ]),
  );
  circuit.push(label(`aVal${bit}`, ax, 118, String(aBits[i])));
  circuit.push(label(`aName${bit}`, ax, 140, `A${bit}`));
  groups[3].push(`aIn${bit}`, `aVal${bit}`, `aName${bit}`);
});

xs.forEach((x, i) => {
  const bit = bits[i];
  if (i < 3) {
    const x1 = x + boxW;
    const x2 = xs[i + 1];
    circuit.push(
      arrow(`c${bit}`, [
        [x2, midY],
        [x1, midY],
      ]),
    );
    circuit.push(label(`cName${bit}`, (x1 + x2) / 2, midY - 16, `C${bit}`));
    groups[4].push(`c${bit}`, `cName${bit}`);
  }
  const sX = x + 120;
  circuit.push(
    arrow(`s${bit}`, [
      [sX, boxY + boxH],
      [sX, boxY + boxH + 28],
    ]),
  );
  circuit.push(label(`sName${bit}`, sX, boxY + boxH + 40, `S${bit}`));
  groups[4].push(`s${bit}`, `sName${bit}`);
});
const c4x = xs[0] - 28;
circuit.push(
  arrow("c4", [
    [xs[0], midY],
    [c4x, midY],
    [c4x, boxY + boxH + 28],
  ]),
);
circuit.push(label("c4name", c4x, boxY + boxH + 40, "C4"));
groups[4].push("c4", "c4name");

const titles = [
  "Adder when M = 0, subtractor when M = 1",
  "Four full adders",
  "XOR in front of each B",
  "M is the mode, and M is C0",
  "A bypasses the XOR",
  "M = 0 adds 1010 and 0011",
  "M = 1 subtracts 0011 from 1010",
];

const notes = [
  "C0 = 0 and B ⊕ 0 = B. C0 = 1 and B ⊕ 1 = B'.",
  "Bit 3 is the left stage. Bit 0 is the right stage.",
  "One input of the XOR is B. The other input is M.",
  "The same M wire enters every XOR and the carry into bit 0.",
  "A3 A2 A1 A0 = 1 0 1 0 goes straight into the adder.",
  "M = 0. B is unchanged. C4 S = 0 1101.",
  "M = 1. B becomes 1100 and C0 is 1. C4 S = 1 0111.",
];

const byId = new Map(circuit.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  if (step === 0) return modes;
  const ids = groups.slice(0, step).flat();
  const hi = step === 6 ? "mRail" : step === 5 ? "c0" : "";
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    return el.id === hi ? { ...el, highlight: true } : el;
  });
}

export const adderSubtractorStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i === 0 ? 720 : W,
    height: i === 0 ? 260 : H,
    elements: shown(i),
  })),
);

export const adderSubtractorTheoryDiagram = adderSubtractorStepSchematics[6];
