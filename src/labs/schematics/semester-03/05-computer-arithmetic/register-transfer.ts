import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, block, frames, label, wire } from "../diagram";

/**
 * Unit 1 register slides, revealed one piece at a time:
 * the register box, R2 ← R1, then P : R2 ← R1 with the load timing.
 */
const W = 920;
const H = 780;

const bitX = [460, 496, 532, 568, 604, 640, 676, 712];
const bitNames = ["7", "6", "5", "4", "3", "2", "1", "0"];
const copyX = [120, 160, 200, 240];
const copyBits = ["1", "1", "0", "1"];

const elements: SchematicElement[] = [
  block("r1", 180, 100, 220, 46, "R1"),
  label("capR", 180, 142, "Register R"),

  block("r2", 180, 214, 240, 46, "R2"),
  label("lbl15", 42, 214, "15"),
  label("lbl0", 318, 214, "0"),
  label("capNum", 180, 256, "Numbering of bits"),

  ...bitX.map((x, i) => block(`b${i}`, x, 100, 36, 36, bitNames[i])),
  label("capBits", 586, 142, "Showing individual bits"),

  block("pch", 532, 214, 144, 46, "PC(H)"),
  block("pcl", 676, 214, 144, 46, "PC(L)"),
  label("p15", 430, 184, "15"),
  label("p8", 590, 184, "8"),
  label("p7", 620, 184, "7"),
  label("p0", 778, 184, "0"),
  label("capSplit", 604, 256, "Divided into two parts"),

  block("stmt", 180, 330, 220, 44, "R2 ← R1"),

  label("srcL", 52, 410, "R1"),
  ...copyX.map((x, i) => block(`s${i}`, x, 410, 40, 36, copyBits[i])),
  ...copyX.map((x, i) =>
    arrow(`a${i}`, [
      [x, 428],
      [x, 492],
    ]),
  ),
  label("dstL", 52, 510, "R2"),
  ...copyX.map((x, i) => block(`d${i}`, x, 510, 40, 36, copyBits[i])),

  label("ifLine", 560, 330, "If (P = 1) then (R2 ← R1)"),
  block("pstmt", 560, 390, 240, 44, "P : R2 ← R1"),

  block("ctrl", 160, 610, 170, 44, "Control circuit"),
  arrow("aP", [
    [245, 610],
    [300, 610],
  ]),
  label("pLbl", 272, 592, "P"),
  label("loadLbl", 272, 630, "Load"),
  block("hwR2", 360, 610, 120, 44, "R2"),
  wire("wN", [
    [360, 632],
    [360, 688],
  ]),
  label("nLbl", 384, 660, "n"),
  block("hwR1", 360, 710, 120, 44, "R1"),

  label("clkLbl", 530, 590, "Clock"),
  wire("clk", [
    [530, 590],
    [560, 590],
    [560, 604],
    [600, 604],
    [600, 578],
    [660, 578],
    [660, 604],
    [720, 604],
    [720, 578],
    [800, 578],
    [800, 604],
    [860, 604],
  ]),
  label("tLbl", 630, 558, "t"),
  label("t1Lbl", 760, 558, "t+1"),
  label("clkEnd", 860, 596, "."),

  label("loadName", 530, 650, "Load"),
  wire("load", [
    [530, 650],
    [560, 650],
    [560, 664],
    [690, 664],
    [690, 638],
    [800, 638],
    [800, 664],
    [860, 664],
  ]),
  label("loadEnd", 860, 656, "."),
  { type: "junction", id: "jLoad", x: 720, y: 638 },
  { type: "junction", id: "jClk", x: 720, y: 604 },
  arrow("xfer", [
    [720, 638],
    [720, 604],
  ]),
  label("xferLbl", 720, 700, "Transfer occurs here"),
];

const order = [
  ["r1", "capR"],
  ["r2", "lbl15", "lbl0", "capNum"],
  ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "capBits"],
  ["pch", "pcl", "p15", "p8", "p7", "p0", "capSplit"],
  ["stmt"],
  [
    "srcL",
    "s0",
    "s1",
    "s2",
    "s3",
    "a0",
    "a1",
    "a2",
    "a3",
    "dstL",
    "d0",
    "d1",
    "d2",
    "d3",
  ],
  ["ifLine", "pstmt"],
  ["ctrl", "aP", "pLbl", "loadLbl", "hwR2", "wN", "nLbl", "hwR1"],
  [
    "clkLbl",
    "clk",
    "tLbl",
    "t1Lbl",
    "clkEnd",
    "loadName",
    "load",
    "loadEnd",
    "jLoad",
    "jClk",
    "xfer",
    "xferLbl",
  ],
];

const titles = [
  "A register",
  "Number the bits",
  "One cell per bit",
  "Two parts of PC",
  "The transfer statement",
  "The bits are copied",
  "The control function",
  "The hardware",
  "The clock edge",
];

const notes = [
  "Registers use capital letters: MAR, PC, IR, R1.",
  "Bit 0 is on the right. Bit 15 is on the left.",
  "Each box is one bit of the register.",
  "PC(H) is bits 15–8. PC(L) is bits 7–0.",
  "R2 ← R1 means the contents of R1 replace R2.",
  "R1 holds 1 1 0 1. Those bits land in R2.",
  "The copy runs only if P = 1. Write it as P : R2 ← R1.",
  "P loads R2. The n lines carry every bit of R1.",
  "Load is 1, and the copy happens on the clock edge.",
];

const highlight = [
  "r1",
  "r2",
  "b0",
  "pch",
  "stmt",
  "s0",
  "pstmt",
  "ctrl",
  "xfer",
];

const byId = new Map(elements.map((el) => [el.id, el]));

function shown(step: number): SchematicElement[] {
  const ids = order.slice(0, step + 1).flat();
  const hi = highlight[step];
  return ids.map((id) => {
    const el = byId.get(id);
    if (!el) throw new Error(id);
    if (el.id === hi) return { ...el, highlight: true };
    return el;
  });
}

export const registerTransferStepSchematics = frames(
  titles.map((title, i) => ({
    title,
    notes: [notes[i]],
    width: W,
    height: H,
    elements: shown(i),
  })),
);

export const registerTransferTheoryDiagram = registerTransferStepSchematics[8];
