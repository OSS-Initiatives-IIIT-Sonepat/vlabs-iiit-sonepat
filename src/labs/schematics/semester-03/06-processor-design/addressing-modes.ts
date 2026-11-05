import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  { id: "start", kind: "terminal", x: 250, y: 70, w: 200, label: "START" },
  {
    id: "implied",
    kind: "block",
    x: 250,
    y: 160,
    w: 280,
    label: "Implied: CMA",
  },
  {
    id: "imm",
    kind: "block",
    x: 250,
    y: 250,
    w: 280,
    label: "Immediate: MOV R1, 05H",
  },
  {
    id: "regop",
    kind: "block",
    x: 250,
    y: 340,
    w: 280,
    label: "Register: MOV AX, BX",
  },
  {
    id: "ind",
    kind: "block",
    x: 250,
    y: 430,
    w: 280,
    label: "Indirect: MOV [R1], R2",
  },
  {
    id: "direct",
    kind: "block",
    x: 250,
    y: 520,
    w: 280,
    label: "Direct: ADD 457",
  },
  {
    id: "end",
    kind: "terminal",
    x: 250,
    y: 620,
    w: 300,
    label: "END  EA = addr + register",
  },
];

const links: FlowLink[] = [
  { id: "l0", from: "start", to: "implied" },
  { id: "l1", from: "implied", to: "imm" },
  { id: "l2", from: "imm", to: "regop" },
  { id: "l3", from: "regop", to: "ind" },
  { id: "l4", from: "ind", to: "direct" },
  { id: "l5", from: "direct", to: "end" },
];

export const addressingModesStepSchematics = flow(nodes, links, [
  {
    title: "Implied and immediate",
    show: ["start", "implied", "imm"],
    highlight: "imm",
    notes: [
      "CMA names no operand; the operand is AC. MOV R1, 05H copies the constant 05H.",
    ],
  },
  {
    title: "Register",
    show: ["start", "implied", "imm", "regop"],
    highlight: "regop",
    notes: [
      "MOV AX, BX copies one CPU register into another. No memory address is used.",
    ],
  },
  {
    title: "Register indirect",
    show: ["start", "implied", "imm", "regop", "ind"],
    highlight: "ind",
    notes: [
      "MOV [R1], R2 uses the number in R1 as the memory address. Autoincrement and autodecrement add or subtract 1 after the use.",
    ],
  },
  {
    title: "Direct",
    show: ["start", "implied", "imm", "regop", "ind", "direct"],
    highlight: "direct",
    notes: [
      "ADD 457 adds the word stored at address 457. The address field is the effective address.",
    ],
  },
  {
    title: "Address plus a register",
    show: ["start", "implied", "imm", "regop", "ind", "direct", "end"],
    highlight: "end",
    notes: [
      "Relative adds the PC. Indexed adds XR. Base adds a base register. Indirect addressing reads the effective address from memory.",
    ],
  },
]);

export const addressingModesTheoryDiagram = addressingModesStepSchematics[4];
