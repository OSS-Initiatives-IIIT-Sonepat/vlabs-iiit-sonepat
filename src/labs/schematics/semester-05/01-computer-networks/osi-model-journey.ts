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

/** Device A and Device B, seven layers each, with the interface between them. */
export function osiHosts(hot?: OsiLayerKey): SchematicData {
  return {
    width: WIDTH,
    height: HEIGHT,
    gallery: true,
    elements: hosts(hot),
  };
}
