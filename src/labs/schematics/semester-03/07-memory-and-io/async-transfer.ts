import { flow, type FlowLink, type FlowNode } from "../diagram";

const nodes: FlowNode[] = [
  {
    "id": "start",
    "kind": "terminal",
    "x": 210,
    "y": 78,
    "w": 188,
    "label": "START  0101"
  },
  {
    "id": "hand",
    "kind": "decision",
    "x": 210,
    "y": 186,
    "w": 150,
    "label": "Handshake?"
  },
  {
    "id": "strobe",
    "kind": "block",
    "x": 500,
    "y": 186,
    "w": 188,
    "label": "Strobe pulse"
  },
  {
    "id": "dav",
    "kind": "block",
    "x": 210,
    "y": 316,
    "w": 220,
    "label": "Source raises DAV"
  },
  {
    "id": "end",
    "kind": "terminal",
    "x": 210,
    "y": 424,
    "w": 188,
    "label": "END  ACK, then drop"
  }
];

const links: FlowLink[] = [
  {
    "id": "l0",
    "from": "start",
    "to": "hand"
  },
  {
    "id": "l1",
    "from": "hand",
    "to": "strobe",
    "label": "no"
  },
  {
    "id": "l2",
    "from": "hand",
    "to": "dav",
    "label": "yes"
  },
  {
    "id": "l3",
    "from": "dav",
    "to": "end"
  }
];

export const asyncTransferStepSchematics = flow(nodes, links, [
  {
    "title": "Strobe",
    "notes": [
      "The source puts 0101 on the lines and pulses the strobe. The destination samples the lines."
    ],
    "show": [
      "start",
      "hand",
      "strobe"
    ],
    "highlight": "strobe"
  },
  {
    "title": "Data valid",
    "notes": [
      "For a handshake the source raises DAV and holds 0101 until the destination responds."
    ],
    "show": [
      "start",
      "hand",
      "strobe",
      "dav"
    ],
    "highlight": "dav"
  },
  {
    "title": "Acknowledge",
    "notes": [
      "The destination raises ACK, then both wires drop. 0101 has been accepted."
    ],
    "show": [
      "start",
      "hand",
      "strobe",
      "dav",
      "end"
    ],
    "highlight": "end"
  }
]);

export const asyncTransferTheoryDiagram = asyncTransferStepSchematics[2];
