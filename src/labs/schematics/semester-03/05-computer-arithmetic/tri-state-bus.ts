import { type SchematicElement } from "@/labs/CircuitSchematic";
import { frames, label, wire } from "../diagram";

/**
 * Darshan slides for the tri-state buffer and the one-bit bus
 * built from a 2×4 decoder. S1 S0 = 10 turns on the C0 buffer.
 * The other three arrows stay off the bus.
 */
const names = ["A", "B", "C", "D"] as const;
const yBuf = [70, 128, 186, 244];
const triX = 400;
const triW = 56;
const busX = 560;
const chan = [310, 322, 334, 346];
const outY = [325, 355, 385, 415];

function triangle(id: string, y: number, mark = false): SchematicElement {
  return wire(
    id,
    [
      [triX, y - 20],
      [triX + triW, y],
      [triX, y + 20],
      [triX, y - 20],
    ],
    mark,
  );
}

const symbol: SchematicElement[] = [
  wire("buf", [
    [250, 110],
    [306, 140],
    [250, 170],
    [250, 110],
  ]),
  wire("wA", [
    [150, 140],
    [250, 140],
  ]),
  label("aName", 120, 132, "Normal input A"),
  wire("wC", [
    [130, 210],
    [278, 210],
    [278, 155],
  ]),
  label("cName", 100, 202, "Control input C"),
  wire("wY", [
    [306, 140],
    [400, 140],
  ]),
  label("yOn", 430, 132, "Y = A if C = 1"),
  label("yOff", 470, 154, "High impedance if C = 0"),
];

const bus: SchematicElement[] = [];
const groups: string[][] = [[], [], [], []];

names.forEach((name, i) => {
  const y = yBuf[i];
  const mark = name === "C";
  bus.push(triangle(`tri${name}`, y, mark));
  bus.push(label(`src${name}`, 360, y - 8, `${name}0`));
  bus.push(
    wire(
      `wIn${name}`,
      [
        [360, y],
        [triX, y],
      ],
      mark,
    ),
  );
  groups[0].push(`tri${name}`, `src${name}`, `wIn${name}`);
});

names.forEach((name, i) => {
  const y = yBuf[i];
  const mark = name === "C";
  bus.push(
    wire(
      `wOut${name}`,
      [
        [triX + triW, y],
        [busX, y],
      ],
      mark,
    ),
  );
  groups[1].push(`wOut${name}`);
});
bus.push(
  wire("busV", [
    [busX, yBuf[0]],
    [busX, yBuf[3] + 16],
  ]),
);
bus.push(label("busEnd", busX, yBuf[3] + 16, "."));
bus.push(
  wire(
    "busH",
    [
      [busX, yBuf[0]],
      [700, yBuf[0]],
    ],
    true,
  ),
);
bus.push(label("busTip", 700, yBuf[0], "."));
bus.push(label("busName", 620, 48, "Bus line for bit 0"));
yBuf.forEach((y, i) => {
  bus.push({ type: "junction", id: `dot${i}`, x: busX, y });
});
groups[1].push(
  "busV",
  "busEnd",
  "busH",
  "busTip",
  "busName",
  "dot0",
  "dot1",
  "dot2",
  "dot3",
);

bus.push(
  wire("dec", [
    [70, 300],
    [200, 300],
    [200, 450],
    [70, 450],
    [70, 300],
  ]),
);
bus.push(label("decKind", 135, 360, "2×4"));
bus.push(label("decName", 135, 380, "Decoder"));
bus.push(
  wire("wS1", [
    [40, 330],
    [70, 330],
  ]),
);
bus.push(label("s1", 36, 322, "S1 = 1"));
bus.push(
  wire("wS0", [
    [40, 365],
    [70, 365],
  ]),
);
bus.push(label("s0", 36, 357, "S0 = 0"));
bus.push(
  wire("wE", [
    [48, 420],
    [70, 420],
  ]),
);
bus.push(label("en", 44, 412, "Enable E"));
["0", "1", "2", "3"].forEach((text, i) => {
  bus.push(label(`n${text}`, 186, outY[i], text));
});
groups[2].push(
  "dec",
  "decKind",
  "decName",
  "wS1",
  "s1",
  "wS0",
  "s0",
  "wE",
  "en",
  "n0",
  "n1",
  "n2",
  "n3",
);

names.forEach((name, i) => {
  const mark = name === "C";
  const y = yBuf[i] + 20;
  bus.push(
    wire(
      `wCtrl${name}`,
      [
        [200, outY[i]],
        [chan[i], outY[i]],
        [chan[i], y],
        [triX, y],
      ],
      mark,
    ),
  );
  groups[2].push(`wCtrl${name}`);
});
bus.push(label("one", 250, 392, "1"));
groups[2].push("one");

const order = [groups[0], groups[1], groups[2], groups[3], [], [], [], []];

const titles = [
  "Tri-state buffer",
  "Four buffers, one per register",
  "Outputs tied to one bus line",
  "A decoder drives the controls",
  "Enable off, the bus floats",
  "00 places A0 on the bus",
  "10 places C0 on the bus",
  "11 places D0 on the bus",
];

const notes = [
  "C = 1 copies A to Y. C = 0 leaves Y disconnected.",
  "A0 is 1, B0 is 0, C0 is 1, and D0 is 0.",
  "The four outputs meet on the bus line for bit 0.",
  "S1 S0 = 10. Output 2 is the line that turns the C0 buffer on.",
  "Enable at 0 forces every decoder output to 0, so the bus is high impedance.",
  "Enable on and 00 selects A0, which is 1. 01 would select B0, which is 0.",
  "10 selects C0. That is the marked path, and the bus lamp is on.",
  "11 selects D0, which is 0. Only one buffer may drive the line.",
];

const highlight = [
  "buf",
  "triC",
  "busH",
  "dec",
  "wE",
  "wInA",
  "wCtrlC",
  "wInD",
];

const byId = new Map(bus.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  if (step === 0) return symbol;
  const ids = order.slice(0, step).flat();
  const hi = highlight[step];
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    const marked = ("highlight" in el && el.highlight) || el.id === hi;
    return marked ? { ...el, highlight: true } : el;
  });
}

export const triStateBusStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: i === 0 ? 720 : 900,
    height: i === 0 ? 280 : 520,
    elements: shown(i),
  })),
);

export const triStateBusTheoryDiagram = triStateBusStepSchematics[6];
