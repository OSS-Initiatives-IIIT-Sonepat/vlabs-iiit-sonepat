import { flow } from "../diagram";

/**
 * BSA saves the return address, the subroutine runs, BUN returns,
 * then a skip loop waits for input.
 */
const nodes = [
  {
    id: "bsa",
    kind: "block" as const,
    x: 230,
    y: 78,
    w: 220,
    h: 40,
    label: "BSA SUB",
  },
  {
    id: "save",
    kind: "block" as const,
    x: 230,
    y: 178,
    w: 240,
    h: 40,
    label: "M[SUB] ← return",
  },
  {
    id: "body",
    kind: "block" as const,
    x: 230,
    y: 278,
    w: 200,
    h: 40,
    label: "CMA",
  },
  {
    id: "ret",
    kind: "block" as const,
    x: 230,
    y: 378,
    w: 220,
    h: 40,
    label: "BUN I SUB",
  },
  { id: "ski", kind: "decision" as const, x: 230, y: 488, label: "FGI = 1?" },
  {
    id: "wait",
    kind: "block" as const,
    x: 500,
    y: 488,
    w: 150,
    h: 40,
    label: "BUN SKI",
  },
  {
    id: "inp",
    kind: "block" as const,
    x: 230,
    y: 608,
    w: 200,
    h: 40,
    label: "INP then STA X",
  },
];

const links = [
  { id: "a1", from: "bsa", to: "save" },
  { id: "a2", from: "save", to: "body" },
  { id: "a3", from: "body", to: "ret" },
  { id: "a4", from: "ret", to: "ski" },
  { id: "a5", from: "ski", to: "wait" },
  { id: "a6", from: "ski", to: "inp" },
];

const call = ["bsa", "save", "body", "ret"];

export const subroutineAndIoStepSchematics = flow(nodes, links, [
  {
    title: "Call the subroutine",
    show: ["bsa"],
    highlight: "bsa",
    notes: ["BSA SUB is at address 100. SUB is 108."],
  },
  {
    title: "The return address is saved",
    show: ["bsa", "save"],
    highlight: "save",
    notes: [
      "M[108] ← 101, then PC ← 109. The word after the call is the return point.",
    ],
  },
  {
    title: "The subroutine body",
    show: ["bsa", "save", "body"],
    highlight: "body",
    notes: ["CMA at 109 flips the accumulator."],
  },
  {
    title: "Return",
    show: call,
    highlight: "ret",
    notes: ["BUN indirect through 108 loads PC with 101."],
  },
  {
    title: "Wait until input is ready",
    show: [...call, "ski", "wait"],
    highlight: "wait",
    notes: ["FGI is 0, so SKI does not skip. BUN SKI tries the flag again."],
  },
  {
    title: "Read and store",
    show: [...call, "ski", "wait", "inp"],
    highlight: "inp",
    notes: [
      "FGI is 1. SKI skips the branch. INP puts 0101 in AC, and STA writes it.",
    ],
  },
]);

export const subroutineAndIoTheoryDiagram = subroutineAndIoStepSchematics[5];
