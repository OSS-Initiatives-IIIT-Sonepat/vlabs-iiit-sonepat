import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 230,
    "label": "START  3×3 product"
  },
  {
    "id": "test",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "More rows?"
  },
  {
    "id": "stop",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "Matrix is done"
  },
  {
    "id": "add",
    "kind": "block",
    "x": 210,
    "y": 316,
    "w": 250,
    "label": "9 products in this row"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 424,
    "w": 230,
    "label": "END  27 operations"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "test"
  },
  {
    "id": "l1",
    "from": "test",
    "to": "stop",
    "label": "no"
  },
  {
    "id": "l2",
    "from": "test",
    "to": "add",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "add",
    "to": "end"
  }
];

export const vectorProcessingStepSchematics = flow(nodes, links, [
  {
    "title": "The test",
    "notes": [
      "A 3×3 matrix product has three rows. Each row is an inner product."
    ],
    "show": [
      "start",
      "test"
    ],
    "highlight": "test"
  },
  {
    "title": "The elements",
    "notes": [
      "One row multiplies three pairs and adds them. Three rows make 9 × 3 = 27 multiply-adds."
    ],
    "show": [
      "start",
      "test",
      "add"
    ],
    "highlight": "add"
  },
  {
    "title": "Stop",
    "notes": [
      "After the third row the 27 operations are done. Four memory modules can be interleaved."
    ],
    "show": [
      "start",
      "test",
      "stop",
      "add",
      "end"
    ],
    "highlight": "end"
  }
]);

export const vectorProcessingTheoryDiagram = vectorProcessingStepSchematics[2];
