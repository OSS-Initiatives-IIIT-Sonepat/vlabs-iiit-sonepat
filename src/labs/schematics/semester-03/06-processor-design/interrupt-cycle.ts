import { flow } from "../diagram";

/** The basic-computer interrupt cycle, after an instruction has finished. */
const nodes = [
  { id: "done", kind: "block" as const, x: 230, y: 78, w: 220, h: 40, label: "Instruction finished" },
  { id: "flags", kind: "decision" as const, x: 230, y: 198, label: "IEN · FGI?" },
  { id: "fetch", kind: "block" as const, x: 500, y: 198, w: 170, h: 40, label: "Next fetch" },
  { id: "rset", kind: "block" as const, x: 230, y: 320, w: 200, h: 40, label: "R ← 1" },
  { id: "save", kind: "block" as const, x: 230, y: 420, w: 240, h: 40, label: "AR ← 0, TR ← PC" },
  { id: "store", kind: "block" as const, x: 230, y: 520, w: 240, h: 40, label: "M[0] ← TR, PC ← 0" },
  { id: "clear", kind: "block" as const, x: 230, y: 620, w: 250, h: 40, label: "PC ← 1, IEN ← 0, R ← 0" },
];

const links = [
  { id: "a1", from: "done", to: "flags" },
  { id: "a2", from: "flags", to: "fetch" },
  { id: "a3", from: "flags", to: "rset" },
  { id: "a4", from: "rset", to: "save" },
  { id: "a5", from: "save", to: "store" },
  { id: "a6", from: "store", to: "clear" },
];

const cycle = ["done", "flags", "rset", "save", "store", "clear"];

export const interruptCycleStepSchematics = flow(nodes, links, [
  {
    title: "The instruction has finished",
    show: ["done"],
    highlight: "done",
    notes: ["PC is 101, the address of the next instruction. IEN is 1."],
  },
  {
    title: "No interrupt is waiting",
    show: ["done", "flags", "fetch"],
    highlight: "fetch",
    notes: ["FGI is 0. The test IEN · FGI fails, so the next fetch starts as usual."],
  },
  {
    title: "The flag is set",
    show: ["done", "flags", "rset"],
    highlight: "rset",
    notes: ["FGI becomes 1. IEN is still 1, so R is set and the interrupt cycle replaces the fetch."],
  },
  {
    title: "Save the return address",
    show: ["done", "flags", "rset", "save"],
    highlight: "save",
    labels: { save: "RT0:  AR ← 0, TR ← 101" },
    notes: ["TR holds 101. AR is forced to 0, the reserved return slot."],
  },
  {
    title: "Store it at address 0",
    show: [...cycle.slice(0, 5)],
    highlight: "store",
    labels: { store: "RT1:  M[0] ← 101, PC ← 0" },
    notes: ["Memory 0 now holds the place to come back to."],
  },
  {
    title: "Enter the service program",
    show: cycle,
    highlight: "clear",
    labels: { clear: "RT2:  PC ← 1, IEN ← 0" },
    notes: ["PC becomes 1, so the next fetch is the service routine. IEN and R are cleared."],
  },
]);

export const interruptCycleTheoryDiagram = interruptCycleStepSchematics[5];
