import { flow, type FlowLink, type FlowNode } from "../diagram";

/** X = (A+B)*(C+D) in three-, two-, one-, and zero-address form. */
const nodes: FlowNode[] = [
  { id: "start", kind: "terminal", x: 250, y: 78, w: 260, label: "START  X = (A+B)*(C+D)" },
  { id: "three", kind: "block", x: 250, y: 178, w: 280, label: "3  ADD, ADD, MUL" },
  { id: "two", kind: "block", x: 250, y: 278, w: 280, label: "2  MOV, ADD, MUL, MOV" },
  { id: "one", kind: "block", x: 250, y: 378, w: 280, label: "1  LOAD A … STORE X" },
  { id: "end", kind: "terminal", x: 250, y: 478, w: 260, label: "END  PUSH … POP X" },
];

const links: FlowLink[] = [
  { id: "l0", from: "start", to: "three" },
  { id: "l1", from: "three", to: "two" },
  { id: "l2", from: "two", to: "one" },
  { id: "l3", from: "one", to: "end" },
];

export const instructionFormatStepSchematics = flow(nodes, links, [
  {
    title: "Three addresses",
    show: ["start", "three"],
    highlight: "three",
    notes: ["ADD R1, A, B / ADD R2, C, D / MUL X, R1, R2."],
  },
  {
    title: "Two addresses",
    show: ["start", "three", "two"],
    highlight: "two",
    notes: ["MOV R1, A / ADD R1, B / MOV R2, C / ADD R2, D / MUL R1, R2 / MOV X, R1."],
  },
  {
    title: "One address",
    show: ["start", "three", "two", "one"],
    highlight: "one",
    notes: ["LOAD A, ADD B, STORE T, LOAD C, ADD D, MUL T, STORE X. The accumulator holds the running value."],
  },
  {
    title: "Zero addresses",
    show: ["start", "three", "two", "one", "end"],
    highlight: "end",
    notes: ["PUSH A, PUSH B, ADD, PUSH C, PUSH D, ADD, MUL, POP X."],
  },
]);

export const instructionFormatTheoryDiagram = instructionFormatStepSchematics[3];
