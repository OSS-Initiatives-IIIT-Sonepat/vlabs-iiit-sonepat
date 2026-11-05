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
    "id": "pe",
    "kind": "block",
    "x": 210,
    "y": 186,
    "w": 280,
    "label": "Attached processor + local memory"
  },
  {
    "id": "mask",
    "kind": "decision",
    "x": 210,
    "y": 294,
    "w": 150,
    "label": "SIMD?"
  },
  {
    "id": "on",
    "kind": "block",
    "x": 500,
    "y": 294,
    "w": 230,
    "label": "PE1…PEn, each with Mi"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 424,
    "w": 220,
    "label": "END  attached only"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "pe"
  },
  {
    "id": "l1",
    "from": "pe",
    "to": "mask"
  },
  {
    "id": "l2",
    "from": "mask",
    "to": "on",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "mask",
    "to": "end",
    "label": "no"
  }
];

export const arrayProcessorsStepSchematics = flow(nodes, links, [
  {
    "title": "Attached processor",
    "notes": [
      "An attached array processor sits beside a general-purpose computer. It has its own local memory and a high-speed bus."
    ],
    "show": [
      "start",
      "pe"
    ],
    "highlight": "pe"
  },
  {
    "title": "SIMD array",
    "notes": [
      "SIMD: one master control, PE1 to PEn, and a local memory Mi for each."
    ],
    "show": [
      "start",
      "pe",
      "mask",
      "on",
      "end"
    ],
    "highlight": "on"
  }
]);

export const arrayProcessorsTheoryDiagram = arrayProcessorsStepSchematics[1];
