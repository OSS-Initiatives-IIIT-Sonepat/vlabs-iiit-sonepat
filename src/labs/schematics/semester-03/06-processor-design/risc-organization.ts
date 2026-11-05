import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START"
  },
  {
    "id": "mem",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "Memory op?"
  },
  {
    "id": "ld",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "LD  R1 ← M[100]"
  },
  {
    "id": "alu",
    "kind": "block",
    "x": 210,
    "y": 316,
    "w": 220,
    "label": "ADD  R2 ← R1 + R3"
  },
  {
    "id": "st",
    "kind": "block",
    "x": 210,
    "y": 424,
    "w": 220,
    "label": "ST  M[200] ← R2"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 532,
    "w": 188,
    "label": "END"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "mem"
  },
  {
    "id": "l1",
    "from": "mem",
    "to": "ld",
    "label": "yes"
  },
  {
    "id": "l2",
    "from": "mem",
    "to": "alu",
    "label": "no"
  },
  {
    "id": "l3",
    "from": "alu",
    "to": "st"
  },
  {
    "id": "l4",
    "from": "st",
    "to": "end"
  }
];

export const riscOrganizationStepSchematics = flow(nodes, links, [
  {
    "title": "Load",
    "notes": [
      "M[100] holds 4. LD writes 4 into R1. This instruction does not add."
    ],
    "show": [
      "start",
      "mem",
      "ld"
    ],
    "highlight": "ld"
  },
  {
    "title": "Add in registers",
    "notes": [
      "ADD R2, R1, R3 computes 4 + 5 = 9 into R2. Both operands are registers."
    ],
    "show": [
      "start",
      "mem",
      "ld",
      "alu"
    ],
    "highlight": "alu"
  },
  {
    "title": "Store",
    "notes": [
      "ST writes R2 into M[200]. Memory 200 now holds 9."
    ],
    "show": [
      "start",
      "mem",
      "ld",
      "alu",
      "st",
      "end"
    ],
    "highlight": "end"
  }
]);

export const riscOrganizationTheoryDiagram = riscOrganizationStepSchematics[2];
