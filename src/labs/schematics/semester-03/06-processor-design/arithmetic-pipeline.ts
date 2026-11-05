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
    "id": "cmp",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 220,
    "label": "Exponents 10³ and 10²"
  },
  {
    "id": "aln",
    "kind": "block",
    "x": 210,
    "y": 294,
    "w": 250,
    "label": "Y = 0.0820 × 10³"
  },
  {
    "id": "add",
    "kind": "block",
    "x": 210,
    "y": 402,
    "w": 250,
    "label": "Z = 1.0324 × 10³"
  },
  {
    "id": "norm",
    "kind": "decision",
    "x": 210,
    "y": 510,
    "w": 150,
    "label": "Fraction overflow?"
  },
  {
    "id": "keep",
    "kind": "block",
    "x": 500,
    "y": 510,
    "w": 188,
    "label": "Already normalized"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 640,
    "w": 240,
    "label": "END  0.10324 × 10⁴"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "cmp"
  },
  {
    "id": "l1",
    "from": "cmp",
    "to": "aln"
  },
  {
    "id": "l2",
    "from": "aln",
    "to": "add"
  },
  {
    "id": "l3",
    "from": "add",
    "to": "norm"
  },
  {
    "id": "l4",
    "from": "norm",
    "to": "keep",
    "label": "no"
  },
  {
    "id": "l5",
    "from": "norm",
    "to": "end",
    "label": "yes"
  }
];

export const arithmeticPipelineStepSchematics = flow(nodes, links, [
  {
    "title": "Compare",
    "notes": [
      "X = 0.9504 × 10³ and Y = 0.8200 × 10². The exponents differ by 1."
    ],
    "show": [
      "start",
      "cmp"
    ],
    "highlight": "cmp"
  },
  {
    "title": "Align",
    "notes": [
      "Y is shifted to 0.0820 × 10³ so both mantissas share exponent 3."
    ],
    "show": [
      "start",
      "cmp",
      "aln"
    ],
    "highlight": "aln"
  },
  {
    "title": "Add",
    "notes": [
      "0.9504 + 0.0820 = 1.0324, with exponent 3. The integer digit means the fraction overflowed."
    ],
    "show": [
      "start",
      "cmp",
      "aln",
      "add",
      "norm",
      "keep"
    ],
    "highlight": "add"
  },
  {
    "title": "Normalize",
    "notes": [
      "Shift the mantissa right and add 1 to the exponent: Z = 0.10324 × 10⁴."
    ],
    "show": [
      "start",
      "cmp",
      "aln",
      "add",
      "norm",
      "keep",
      "end"
    ],
    "highlight": "end"
  }
]);

export const arithmeticPipelineTheoryDiagram = arithmeticPipelineStepSchematics[3];
