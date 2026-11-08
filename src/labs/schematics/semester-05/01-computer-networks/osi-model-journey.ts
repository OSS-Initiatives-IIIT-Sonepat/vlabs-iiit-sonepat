import type {
  SchematicData,
  SchematicElement,
} from "@/labs/CircuitSchematic";

/**
 * The textbook OSI figure: two hosts, two intermediate nodes, and the
 * peer protocols that run between matching layers.
 *
 * Coordinates are the centres of the layer boxes. A host carries all
 * seven layers; an intermediate node carries only the bottom three.
 */

export type OsiLayerKey =
  | "application"
  | "presentation"
  | "session"
  | "transport"
  | "network"
  | "data-link"
  | "physical";

const WIDTH = 940;
const HEIGHT = 572;
const BW = 108;
const BH = 22;

const ROWS: {
  key: OsiLayerKey;
  name: string;
  y: number;
  n: string;
  peer?: string;
  hop?: string;
}[] = [
  { key: "application", name: "Application", y: 92, n: "7", peer: "7th" },
  { key: "presentation", name: "Presentation", y: 162, n: "6", peer: "6th" },
  { key: "session", name: "Session", y: 232, n: "5", peer: "5th" },
  { key: "transport", name: "Transport", y: 302, n: "4", peer: "4th" },
  { key: "network", name: "Network", y: 372, n: "3", hop: "3rd" },
  { key: "data-link", name: "Data link", y: 442, n: "2", hop: "2nd" },
  { key: "physical", name: "Physical", y: 512, n: "1", hop: "1st" },
];

const IFACES: { y: number; text: string }[] = [
  { y: 127, text: "7-6 interface" },
  { y: 197, text: "6-5 interface" },
  { y: 267, text: "5-4 interface" },
  { y: 337, text: "4-3 interface" },
  { y: 407, text: "3-2 interface" },
  { y: 477, text: "2-1 interface" },
];

const COLS: { id: string; title: string; x: number; host: boolean }[] = [
  { id: "a", title: "Device A", x: 118, host: true },
  { id: "n1", title: "Intermediate node", x: 372, host: false },
  { id: "n2", title: "Intermediate node", x: 568, host: false },
  { id: "b", title: "Device B", x: 822, host: true },
];

function box(
  id: string,
  x: number,
  y: number,
  name: string,
  hot: boolean,
): SchematicElement {
  return {
    type: "block",
    id,
    x,
    y,
    w: BW,
    h: BH,
    label: name,
    highlight: hot,
  };
}

function hosts(hot?: OsiLayerKey): SchematicElement[] {
  const els: SchematicElement[] = [];
  for (const col of COLS) {
    if (!col.host) continue;
    els.push({
      type: "label",
      id: `title-${col.id}`,
      x: col.x,
      y: 36,
      text: col.title,
    });
    for (const row of ROWS) {
      els.push(
        box(`${col.id}-${row.key}`, col.x, row.y, row.name, hot === row.key),
      );
      els.push({
        type: "label",
        id: `num-${col.id}-${row.n}`,
        x: col.id === "a" ? 28 : 912,
        y: row.y + 3,
        text: row.n,
      });
    }
    for (const [i, iface] of IFACES.entries()) {
      els.push({
        type: "label",
        id: `if-${col.id}-${i}`,
        x: col.x,
        y: iface.y,
        text: iface.text,
      });
    }
  }
  return els;
}

function nodes(hot?: OsiLayerKey): SchematicElement[] {
  const els: SchematicElement[] = [];
  for (const col of COLS) {
    if (col.host) continue;
    els.push({
      type: "label",
      id: `title-${col.id}`,
      x: col.x,
      y: 36,
      text: col.title,
    });
    els.push({
      type: "label",
      id: `mark-${col.id}`,
      x: col.x,
      y: 58,
      text: "\u00d7",
    });
    for (const row of ROWS) {
      if (!row.hop) continue;
      els.push(
        box(`${col.id}-${row.key}`, col.x, row.y, row.name, hot === row.key),
      );
    }
  }
  return els;
}

/** Double arrow from the right side of one column to the left side of the next. */
function hop(
  id: string,
  x1: number,
  x2: number,
  y: number,
  name: string,
): SchematicElement[] {
  const mid = (x1 + x2) / 2;
  return [
    {
      type: "arrow",
      id,
      points: [
        { x: x1 + BW / 2, y },
        { x: x2 - BW / 2, y },
      ],
      double: true,
      size: 8,
    },
    { type: "label", id: `${id}-name`, x: mid, y: y - 16, text: name },
  ];
}

function hops(): SchematicElement[] {
  const els: SchematicElement[] = [];
  for (let i = 0; i < COLS.length - 1; i++) {
    const left = COLS[i];
    const right = COLS[i + 1];
    for (const row of ROWS) {
      if (!row.hop) continue;
      els.push(
        ...hop(
          `hop-${left.id}-${right.id}-${row.key}`,
          left.x,
          right.x,
          row.y,
          row.hop,
        ),
      );
    }
  }
  return els;
}

function peers(): SchematicElement[] {
  const a = COLS[0];
  const b = COLS[COLS.length - 1];
  const els: SchematicElement[] = [];
  for (const row of ROWS) {
    if (!row.peer) continue;
    const x1 = a.x + BW / 2;
    const x2 = b.x - BW / 2;
    els.push({
      type: "arrow",
      id: `peer-${row.key}`,
      points: [
        { x: x1, y: row.y },
        { x: x2, y: row.y },
      ],
      double: true,
      dashed: true,
      size: 8,
    });
    els.push({
      type: "label",
      id: `peer-${row.key}-name`,
      x: (x1 + x2) / 2,
      y: row.y - 18,
      text: `Peer-to-peer protocol (${row.peer} layer)`,
    });
  }
  return els;
}

/** The whole textbook figure. `hot` marks the layer a procedure step is about. */
export function osiFigure(hot?: OsiLayerKey): SchematicData {
  return {
    width: WIDTH,
    height: HEIGHT,
    gallery: true,
    elements: [
      ...hosts(hot),
      ...nodes(hot),
      ...hops(),
      ...peers(),
      {
        type: "label",
        id: "physical-communication",
        x: WIDTH / 2,
        y: 548,
        text: "Physical communication",
      },
    ],
  };
}

export const theoryDiagram = osiFigure();

export const osiStepSchematics: SchematicData[] = [
  theoryDiagram,
  osiFigure("application"),
  osiFigure("presentation"),
  osiFigure("session"),
  osiFigure("transport"),
  osiFigure("network"),
  osiFigure("data-link"),
  osiFigure("physical"),
];
