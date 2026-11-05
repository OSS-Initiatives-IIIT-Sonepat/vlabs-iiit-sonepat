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
    "id": "ins",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "One instruction?"
  },
  {
    "id": "many",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "MIMD or MISD"
  },
  {
    "id": "data",
    "kind": "decision",
    "x": 210,
    "y": 316,
    "w": 150,
    "label": "One data stream?"
  },
  {
    "id": "simd",
    "kind": "block",
    "x": 500,
    "y": 316,
    "w": 188,
    "label": "SIMD"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 446,
    "w": 188,
    "label": "END  SISD"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "ins"
  },
  {
    "id": "l1",
    "from": "ins",
    "to": "many",
    "label": "no"
  },
  {
    "id": "l2",
    "from": "ins",
    "to": "data",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "data",
    "to": "simd",
    "label": "no"
  },
  {
    "id": "l4",
    "from": "data",
    "to": "end",
    "label": "yes"
  }
];

export const flynnTaxonomyStepSchematics = flow(nodes, links, [
  {
    "title": "One or many instructions",
    "notes": [
      "A single CPU fetches one instruction stream. An MIMD machine fetches several."
    ],
    "show": [
      "start",
      "ins",
      "many"
    ],
    "highlight": "ins"
  },
  {
    "title": "Many streams",
    "notes": [
      "Several instruction streams are MIMD when each has its own data, or MISD when they share one data stream."
    ],
    "show": [
      "start",
      "ins",
      "many"
    ],
    "highlight": "many"
  },
  {
    "title": "One instruction, many data",
    "notes": [
      "An array applies one add to many pairs at once. That is SIMD."
    ],
    "show": [
      "start",
      "ins",
      "many",
      "data",
      "simd"
    ],
    "highlight": "simd"
  },
  {
    "title": "One of each",
    "notes": [
      "One instruction stream and one data stream is SISD."
    ],
    "show": [
      "start",
      "ins",
      "many",
      "data",
      "simd",
      "end"
    ],
    "highlight": "end"
  }
]);

export const flynnTaxonomyTheoryDiagram = flynnTaxonomyStepSchematics[3];
