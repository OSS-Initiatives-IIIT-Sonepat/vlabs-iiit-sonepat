import { flow } from "../diagram";

/** One arithmetic and logic program, in assembly and in the stored machine word. */
const nodes = [
  { id: "lda", kind: "block" as const, x: 250, y: 78, w: 240, h: 40, label: "LDA A" },
  { id: "add", kind: "block" as const, x: 250, y: 178, w: 240, h: 40, label: "ADD B" },
  { id: "cma", kind: "block" as const, x: 250, y: 278, w: 240, h: 40, label: "CMA" },
  { id: "sta", kind: "block" as const, x: 250, y: 378, w: 240, h: 40, label: "STA C" },
];

const links = [
  { id: "a1", from: "lda", to: "add" },
  { id: "a2", from: "add", to: "cma" },
  { id: "a3", from: "cma", to: "sta" },
];

export const machineAndAssemblyStepSchematics = flow(nodes, links, [
  {
    title: "The same line, two writings",
    show: ["lda"],
    highlight: "lda",
    labels: { lda: "LDA A    =    206A" },
    notes: ["Assembly LDA A and machine word 206A are one instruction. A is at address 106."],
  },
  {
    title: "Add",
    show: ["lda", "add"],
    highlight: "add",
    labels: { add: "ADD B    =    106B" },
    notes: ["B is at 107 and holds 0011. AC becomes 0100 + 0011 = 0111."],
  },
  {
    title: "A logic operation",
    show: ["lda", "add", "cma"],
    highlight: "cma",
    labels: { cma: "CMA    =    7200" },
    notes: ["CMA has no address. 7200 flips AC from 0111 to 1000."],
  },
  {
    title: "Store the result",
    show: ["lda", "add", "cma", "sta"],
    highlight: "sta",
    labels: { sta: "STA C    =    306C" },
    notes: ["C is at 108. Memory 108 receives 1000."],
  },
]);

export const machineAndAssemblyTheoryDiagram = machineAndAssemblyStepSchematics[3];
