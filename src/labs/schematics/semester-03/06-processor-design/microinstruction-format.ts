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
    "id": "f",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 220,
    "label": "F1 = add"
  },
  {
    "id": "cd",
    "kind": "block",
    "x": 210,
    "y": 294,
    "w": 220,
    "label": "CD = 0, no test"
  },
  {
    "id": "ad",
    "kind": "block",
    "x": 210,
    "y": 402,
    "w": 220,
    "label": "BR uses AD = 41"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 510,
    "w": 188,
    "label": "END"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "f"
  },
  {
    "id": "l1",
    "from": "f",
    "to": "cd"
  },
  {
    "id": "l2",
    "from": "cd",
    "to": "ad"
  },
  {
    "id": "l3",
    "from": "ad",
    "to": "end"
  }
];

export const microinstructionFormatStepSchematics = flow(nodes, links, [
  {
    "title": "The operation field",
    "notes": [
      "F1 names the add micro-operation. F2 and F3 name nothing this cycle."
    ],
    "show": [
      "start",
      "f"
    ],
    "highlight": "f"
  },
  {
    "title": "The condition",
    "notes": [
      "CD is 0, so no status bit is tested. The branch is unconditional."
    ],
    "show": [
      "start",
      "f",
      "cd"
    ],
    "highlight": "cd"
  },
  {
    "title": "The next address",
    "notes": [
      "BR selects the AD field and AD is 41, so the next CAR is 41."
    ],
    "show": [
      "start",
      "f",
      "cd",
      "ad",
      "end"
    ],
    "highlight": "end"
  }
]);

export const microinstructionFormatTheoryDiagram = microinstructionFormatStepSchematics[2];
