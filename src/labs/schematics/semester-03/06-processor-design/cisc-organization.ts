import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START  ADD X, Y"
  },
  {
    "id": "rx",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 220,
    "label": "Read M[X] = 4"
  },
  {
    "id": "ry",
    "kind": "block",
    "x": 210,
    "y": 294,
    "w": 220,
    "label": "Read M[Y] = 5"
  },
  {
    "id": "add",
    "kind": "block",
    "x": 210,
    "y": 402,
    "w": 220,
    "label": "4 + 5 = 9"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 510,
    "w": 188,
    "label": "END  M[X] ← 9"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "rx"
  },
  {
    "id": "l1",
    "from": "rx",
    "to": "ry"
  },
  {
    "id": "l2",
    "from": "ry",
    "to": "add"
  },
  {
    "id": "l3",
    "from": "add",
    "to": "end"
  }
];

export const ciscOrganizationStepSchematics = flow(nodes, links, [
  {
    "title": "One opcode",
    "notes": [
      "ADD X, Y is a single instruction. X and Y are both memory addresses."
    ],
    "show": [
      "start"
    ],
    "highlight": "start"
  },
  {
    "title": "Read X",
    "notes": [
      "M[X] contributes 4."
    ],
    "show": [
      "start",
      "rx"
    ],
    "highlight": "rx"
  },
  {
    "title": "Read Y",
    "notes": [
      "M[Y] contributes 5. Both operands are now in the processor."
    ],
    "show": [
      "start",
      "rx",
      "ry"
    ],
    "highlight": "ry"
  },
  {
    "title": "Add and write",
    "notes": [
      "The sum is 9. It is written back to M[X]. That took four micro-operations."
    ],
    "show": [
      "start",
      "rx",
      "ry",
      "add",
      "end"
    ],
    "highlight": "end"
  }
]);

export const ciscOrganizationTheoryDiagram = ciscOrganizationStepSchematics[3];
