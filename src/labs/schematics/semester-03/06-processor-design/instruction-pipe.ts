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
    "id": "if",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 260,
    "label": "FI  fetch instruction"
  },
  {
    "id": "id",
    "kind": "block",
    "x": 210,
    "y": 294,
    "w": 260,
    "label": "DA  decode and EA"
  },
  {
    "id": "ex",
    "kind": "block",
    "x": 210,
    "y": 402,
    "w": 260,
    "label": "FO  fetch operand"
  },
  {
    "id": "br",
    "kind": "decision",
    "x": 210,
    "y": 510,
    "w": 150,
    "label": "Branch taken?"
  },
  {
    "id": "flush",
    "kind": "block",
    "x": 500,
    "y": 510,
    "w": 188,
    "label": "Empty the pipe"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 640,
    "w": 188,
    "label": "END  EX"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "if"
  },
  {
    "id": "l1",
    "from": "if",
    "to": "id"
  },
  {
    "id": "l2",
    "from": "id",
    "to": "ex"
  },
  {
    "id": "l3",
    "from": "ex",
    "to": "br"
  },
  {
    "id": "l4",
    "from": "br",
    "to": "flush",
    "label": "yes"
  },
  {
    "id": "l5",
    "from": "br",
    "to": "end",
    "label": "no"
  }
];

export const instructionPipeStepSchematics = flow(nodes, links, [
  {
    "title": "The stages",
    "notes": [
      "FI fetches the instruction. DA decodes it. FO fetches the operand. EX executes."
    ],
    "show": [
      "start",
      "if",
      "id",
      "ex"
    ],
    "highlight": "ex"
  },
  {
    "title": "No branch",
    "notes": [
      "If this is not a branch, FO hands the operand to EX and the pipe stays full."
    ],
    "show": [
      "start",
      "if",
      "id",
      "ex",
      "br",
      "end"
    ],
    "highlight": "end"
  },
  {
    "title": "Taken branch",
    "notes": [
      "A taken branch empties the pipe and updates the PC. An interrupt leaves the pipe for interrupt handling."
    ],
    "show": [
      "start",
      "if",
      "id",
      "ex",
      "br",
      "flush",
      "end"
    ],
    "highlight": "flush"
  }
]);

export const instructionPipeTheoryDiagram = instructionPipeStepSchematics[2];
