import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 210,
    "label": "START  I, A, E"
  },
  {
    "id": "ld",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 260,
    "label": "Load R1, then Load R2"
  },
  {
    "id": "use",
    "kind": "decision",
    "x": 210,
    "y": 294,
    "w": 150,
    "label": "Add uses both?"
  },
  {
    "id": "go",
    "kind": "block",
    "x": 500,
    "y": 294,
    "w": 188,
    "label": "No conflict"
  },
  {
    "id": "stall",
    "kind": "block",
    "x": 210,
    "y": 424,
    "w": 220,
    "label": "Insert a NOP"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 532,
    "w": 188,
    "label": "END  delayed load"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "ld"
  },
  {
    "id": "l1",
    "from": "ld",
    "to": "use"
  },
  {
    "id": "l2",
    "from": "use",
    "to": "go",
    "label": "no"
  },
  {
    "id": "l3",
    "from": "use",
    "to": "stall",
    "label": "yes"
  },
  {
    "id": "l4",
    "from": "stall",
    "to": "end"
  }
];

export const riscPipelineStepSchematics = flow(nodes, links, [
  {
    "title": "The load",
    "notes": [
      "The three segments are I (instruction fetch), A (ALU), and E (execute). Load R1 is followed by Load R2."
    ],
    "show": [
      "start",
      "ld"
    ],
    "highlight": "ld"
  },
  {
    "title": "No dependence",
    "notes": [
      "An instruction that does not use R1 or R2 can follow the loads. The ALU segment stays busy."
    ],
    "show": [
      "start",
      "ld",
      "use",
      "go"
    ],
    "highlight": "go"
  },
  {
    "title": "The stall",
    "notes": [
      "Add R1+R2 needs both loads, so a NOP is inserted. A delayed branch fills its slot the same way."
    ],
    "show": [
      "start",
      "ld",
      "use",
      "go",
      "stall",
      "end"
    ],
    "highlight": "end"
  }
]);

export const riscPipelineTheoryDiagram = riscPipelineStepSchematics[2];
