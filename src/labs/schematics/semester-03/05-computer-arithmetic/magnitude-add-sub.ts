import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START  subtract"
  },
  {
    "id": "ops",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 220,
    "label": "A = +5    B = +7"
  },
  {
    "id": "xor",
    "kind": "decision",
    "x": 210,
    "y": 294,
    "w": 150,
    "label": "As ⊕ Bs"
  },
  {
    "id": "addm",
    "kind": "block",
    "x": 500,
    "y": 294,
    "w": 188,
    "label": "EA ← A + B"
  },
  {
    "id": "subm",
    "kind": "block",
    "x": 210,
    "y": 424,
    "w": 220,
    "label": "EA ← A + B' + 1"
  },
  {
    "id": "ebit",
    "kind": "decision",
    "x": 210,
    "y": 532,
    "w": 150,
    "label": "E = 1?"
  },
  {
    "id": "keep",
    "kind": "block",
    "x": 500,
    "y": 532,
    "w": 188,
    "label": "A ≥ B, keep As"
  },
  {
    "id": "fix",
    "kind": "block",
    "x": 210,
    "y": 662,
    "w": 220,
    "label": "A ← A' , then +1"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 770,
    "w": 188,
    "label": "END    result −2"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "ops"
  },
  {
    "id": "l1",
    "from": "ops",
    "to": "xor"
  },
  {
    "id": "l2",
    "from": "xor",
    "to": "addm",
    "label": "= 1"
  },
  {
    "id": "l3",
    "from": "xor",
    "to": "subm",
    "label": "= 0"
  },
  {
    "id": "l4",
    "from": "subm",
    "to": "ebit"
  },
  {
    "id": "l5",
    "from": "ebit",
    "to": "keep",
    "label": "= 1"
  },
  {
    "id": "l6",
    "from": "ebit",
    "to": "fix",
    "label": "= 0"
  },
  {
    "id": "l7",
    "from": "fix",
    "to": "end"
  }
];

export const magnitudeAddSubStepSchematics = flow(nodes, links, [
  {
    "title": "Load the operands",
    "notes": [
      "Subtract +5 − +7. A holds sign 0 and magnitude 0101. B holds sign 0 and magnitude 0111."
    ],
    "show": [
      "start",
      "ops"
    ],
    "highlight": "ops"
  },
  {
    "title": "Compare the signs",
    "notes": [
      "As ⊕ Bs is 0 ⊕ 0 = 0. Equal signs on a subtract mean the magnitudes are subtracted. The = 1 arm would add them."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm"
    ],
    "highlight": "xor"
  },
  {
    "title": "The other sign case",
    "notes": [
      "If the signs differed, EA ← A + B and AVF would take the carry. This pair does not take that arm."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm"
    ],
    "highlight": "addm"
  },
  {
    "title": "Subtract the magnitudes",
    "notes": [
      "B' + 1 is 1001. 0101 + 1001 = 1110, so E = 0 and AVF stays 0."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm",
      "subm"
    ],
    "highlight": "subm"
  },
  {
    "title": "Test the end carry",
    "notes": [
      "E = 0, so A was smaller than B. The = 1 arm would keep the sign because A ≥ B."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm",
      "subm",
      "ebit",
      "keep"
    ],
    "highlight": "ebit"
  },
  {
    "title": "Complement the result",
    "notes": [
      "A' of 1110 is 0001, plus 1 is 0010, and the sign flips to 1. The result is −2, and 5 − 7 = −2."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm",
      "subm",
      "ebit",
      "keep",
      "fix",
      "end"
    ],
    "highlight": "end"
  },
  {
    "title": "Addition overflow",
    "notes": [
      "For addition, equal signs use EA ← A + B. +9 + +9 is 1001 + 1001 = 10010, so E = 1 and AVF ← E."
    ],
    "show": [
      "start",
      "ops",
      "xor",
      "addm",
      "subm",
      "ebit",
      "keep",
      "fix",
      "end"
    ],
    "highlight": "addm"
  }
]);

export const magnitudeAddSubTheoryDiagram = magnitudeAddSubStepSchematics[6];
