import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START  both request"
  },
  {
    "id": "pri",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "D2 higher?"
  },
  {
    "id": "d1",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "Grant D1"
  },
  {
    "id": "d2",
    "kind": "block",
    "x": 210,
    "y": 316,
    "w": 220,
    "label": "Grant D2, D1 waits"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 424,
    "w": 188,
    "label": "END"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "pri"
  },
  {
    "id": "l1",
    "from": "pri",
    "to": "d1",
    "label": "no"
  },
  {
    "id": "l2",
    "from": "pri",
    "to": "d2",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "d2",
    "to": "end"
  }
];

export const priorityInterruptStepSchematics = flow(nodes, links, [
  {
    "title": "Both devices",
    "notes": [
      "D1 and D2 request in the same cycle. D2's priority number is higher."
    ],
    "show": [
      "start",
      "pri"
    ],
    "highlight": "pri"
  },
  {
    "title": "If D2 were absent",
    "notes": [
      "The grant would stop at D1. D2 is present, so that arm is not taken."
    ],
    "show": [
      "start",
      "pri",
      "d1"
    ],
    "highlight": "d1"
  },
  {
    "title": "D2 wins",
    "notes": [
      "D2 receives the grant and is serviced. D1 holds its request until D2 finishes."
    ],
    "show": [
      "start",
      "pri",
      "d1",
      "d2",
      "end"
    ],
    "highlight": "end"
  }
]);

export const priorityInterruptTheoryDiagram = priorityInterruptStepSchematics[2];
