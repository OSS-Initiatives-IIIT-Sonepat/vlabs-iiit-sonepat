import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START  count = 3"
  },
  {
    "id": "grant",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "Bus granted?"
  },
  {
    "id": "wait",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "CPU keeps the bus"
  },
  {
    "id": "move",
    "kind": "block",
    "x": 210,
    "y": 316,
    "w": 220,
    "label": "Write, address+1, count−1"
  },
  {
    "id": "zero",
    "kind": "decision",
    "x": 210,
    "y": 424,
    "w": 150,
    "label": "count = 0?"
  },
  {
    "id": "again",
    "kind": "block",
    "x": 500,
    "y": 424,
    "w": 188,
    "label": "Transfer another"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 554,
    "w": 188,
    "label": "END  bus returned"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "grant"
  },
  {
    "id": "l1",
    "from": "grant",
    "to": "wait",
    "label": "no"
  },
  {
    "id": "l2",
    "from": "grant",
    "to": "move",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "move",
    "to": "zero"
  },
  {
    "id": "l4",
    "from": "zero",
    "to": "again",
    "label": "no"
  },
  {
    "id": "l5",
    "from": "zero",
    "to": "end",
    "label": "yes"
  }
];

export const dmaTransferStepSchematics = flow(nodes, links, [
  {
    "title": "The request",
    "notes": [
      "Count is 3 and the address is 200. The CPU grants the bus. Without the grant, nothing moves."
    ],
    "show": [
      "start",
      "grant",
      "wait"
    ],
    "highlight": "grant"
  },
  {
    "title": "One word",
    "notes": [
      "The controller writes address 200, then the address is 201 and the count is 2."
    ],
    "show": [
      "start",
      "grant",
      "wait",
      "move"
    ],
    "highlight": "move"
  },
  {
    "title": "Until zero",
    "notes": [
      "The same step writes 201 and 202. The count passes 2 and 1. While it is not zero, the transfer repeats."
    ],
    "show": [
      "start",
      "grant",
      "wait",
      "move",
      "zero",
      "again"
    ],
    "highlight": "again"
  },
  {
    "title": "Return",
    "notes": [
      "Count is 0. The controller drops the request and the CPU takes the bus back."
    ],
    "show": [
      "start",
      "grant",
      "wait",
      "move",
      "zero",
      "again",
      "end"
    ],
    "highlight": "end"
  }
]);

export const dmaTransferTheoryDiagram = dmaTransferStepSchematics[3];
