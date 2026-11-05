import { flow } from "../diagram";

/** A counted loop: add −1, store, branch while the count is not zero. */
const nodes = [
  {
    id: "lda",
    kind: "block" as const,
    x: 240,
    y: 78,
    w: 220,
    h: 40,
    label: "LDA CNT",
  },
  {
    id: "add",
    kind: "block" as const,
    x: 240,
    y: 178,
    w: 220,
    h: 40,
    label: "ADD NEG1",
  },
  {
    id: "sta",
    kind: "block" as const,
    x: 240,
    y: 278,
    w: 220,
    h: 40,
    label: "STA CNT",
  },
  { id: "zero", kind: "decision" as const, x: 240, y: 388, label: "AC = 0?" },
  {
    id: "bun",
    kind: "block" as const,
    x: 500,
    y: 388,
    w: 160,
    h: 40,
    label: "BUN LOP",
  },
  {
    id: "hlt",
    kind: "block" as const,
    x: 240,
    y: 508,
    w: 160,
    h: 40,
    label: "HLT",
  },
];

const links = [
  { id: "a1", from: "lda", to: "add" },
  { id: "a2", from: "add", to: "sta" },
  { id: "a3", from: "sta", to: "zero" },
  { id: "a4", from: "zero", to: "bun" },
  { id: "a5", from: "zero", to: "hlt" },
];

const body = ["lda", "add", "sta", "zero", "bun"];

export const programLoopStepSchematics = flow(nodes, links, [
  {
    title: "The count starts at 2",
    show: ["lda"],
    highlight: "lda",
    notes: ["CNT is 2. The loop will run the body twice."],
  },
  {
    title: "Subtract one",
    show: ["lda", "add"],
    highlight: "add",
    notes: ["NEG1 is all ones, which is −1. AC becomes CNT − 1."],
  },
  {
    title: "Write the count back",
    show: ["lda", "add", "sta"],
    highlight: "sta",
    notes: ["STA CNT saves the new count."],
  },
  {
    title: "First pass branches",
    show: body,
    highlight: "bun",
    notes: ["AC is 1, not zero. SZA does not skip, so BUN LOP returns to LDA."],
  },
  {
    title: "Second pass stops",
    show: [...body, "hlt"],
    highlight: "hlt",
    notes: ["AC is 0. SZA skips the BUN, and HLT ends the program."],
  },
]);

export const programLoopTheoryDiagram = programLoopStepSchematics[4];
