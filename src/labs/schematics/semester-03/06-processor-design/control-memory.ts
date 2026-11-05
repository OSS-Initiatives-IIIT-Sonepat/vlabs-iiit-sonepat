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
    "id": "car",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 220,
    "label": "CAR = 15"
  },
  {
    "id": "mem",
    "kind": "block",
    "x": 210,
    "y": 294,
    "w": 220,
    "label": "Control memory[15]"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 402,
    "w": 188,
    "label": "END  control word"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "car"
  },
  {
    "id": "l1",
    "from": "car",
    "to": "mem"
  },
  {
    "id": "l2",
    "from": "mem",
    "to": "end"
  }
];

export const controlMemoryStepSchematics = flow(nodes, links, [
  {
    "title": "The address",
    "notes": [
      "CAR holds 15. That is an address in control memory, not in main memory."
    ],
    "show": [
      "start",
      "car"
    ],
    "highlight": "car"
  },
  {
    "title": "The read",
    "notes": [
      "Control memory outputs the microinstruction stored at 15."
    ],
    "show": [
      "start",
      "car",
      "mem"
    ],
    "highlight": "mem"
  },
  {
    "title": "The control word",
    "notes": [
      "Its fields become the micro-operations for this clock. CAR is then updated for the next word."
    ],
    "show": [
      "start",
      "car",
      "mem",
      "end"
    ],
    "highlight": "end"
  }
]);

export const controlMemoryTheoryDiagram = controlMemoryStepSchematics[2];
