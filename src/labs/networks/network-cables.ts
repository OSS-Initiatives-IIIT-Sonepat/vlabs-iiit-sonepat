import { TABLE_TOP, type NetBench } from "@/labs/networks/bench";

/**
 * The cable workbench: four sample cables, the tools, one length of Cat 6
 * with two loose ends, a cable tester, and a patch corner where finished
 * cables are used.
 */
export const CABLE_BENCH: NetBench = {
  zones: [
    {
      id: "workbench",
      label: "Cable workbench",
      x: 0,
      z: 0.3,
      w: 11.5,
      d: 7.5,
    },
    { id: "patch", label: "Patch corner", x: 14, z: 0.3, w: 11, d: 7.5 },
  ],
  devices: [
    { id: "table", kind: "table", x: 0, z: 0.3, size: [9.6, 5.8] },
    { id: "utp", kind: "utp", name: "UTP", x: -3.5, z: -1.9, y: TABLE_TOP },
    { id: "stp", kind: "stp", name: "STP", x: -3.5, z: -0.8, y: TABLE_TOP },
    {
      id: "coax",
      kind: "coax",
      name: "Coaxial",
      x: -3.5,
      z: 0.3,
      y: TABLE_TOP,
    },
    {
      id: "fiber",
      kind: "fiber",
      name: "Optical fibre",
      x: -3.5,
      z: 1.4,
      y: TABLE_TOP,
    },
    {
      id: "crimper",
      kind: "crimper",
      name: "Crimping tool",
      x: 3.5,
      z: -1.6,
      y: TABLE_TOP,
    },
    {
      id: "stripper",
      kind: "stripper",
      name: "Stripper",
      x: 3.5,
      z: -0.2,
      y: TABLE_TOP,
    },
    {
      id: "plugs",
      kind: "rj45",
      name: "RJ45 plugs",
      x: 3.5,
      z: 1.1,
      y: TABLE_TOP,
    },
    {
      id: "tester",
      kind: "tester",
      name: "Cable tester",
      x: 0,
      z: -1.5,
      y: TABLE_TOP,
    },
    {
      id: "endA",
      kind: "cable-end",
      name: "End A",
      x: -0.9,
      z: 0.7,
      y: TABLE_TOP,
      pair: "endB",
    },
    {
      id: "endB",
      kind: "cable-end",
      name: "End B",
      x: 0.9,
      z: 0.7,
      y: TABLE_TOP,
      pair: "endA",
    },
    { id: "pc1", kind: "pc", name: "PC 1", x: 10.5, z: -1.4 },
    { id: "sw", kind: "switch", name: "Switch", x: 14, z: -1.4 },
    { id: "pc2", kind: "pc", name: "PC 2", x: 17.5, z: -1.4 },
    { id: "pcA", kind: "pc", name: "PC A", x: 10.5, z: 2.2 },
    { id: "pcB", kind: "pc", name: "PC B", x: 17.5, z: 2.2 },
  ],
  links: [
    {
      id: "pc1-sw",
      a: "pc1",
      b: "sw",
      kind: "straight",
      label: "Straight-through",
    },
    { id: "sw-pc2", a: "sw", b: "pc2", kind: "straight" },
    { id: "pcA-pcB", a: "pcA", b: "pcB", kind: "cross", label: "Crossover" },
  ],
};

/** Everything on the workbench, without the patch corner. */
export const WORKBENCH = [
  "table",
  "utp",
  "stp",
  "coax",
  "fiber",
  "crimper",
  "stripper",
  "plugs",
  "tester",
  "endA",
  "endB",
];

export const PATCH_CORNER = [
  "pc1",
  "sw",
  "pc2",
  "pcA",
  "pcB",
  "pc1-sw",
  "sw-pc2",
  "pcA-pcB",
];

/** End A and End B pushed into the tester's main and remote sockets. */
export const IN_TESTER = {
  endA: { x: -1.1, z: -0.1, y: TABLE_TOP },
  endB: { x: 1.1, z: -0.1, y: TABLE_TOP },
};

export const CABLE_TABLE_HEADERS = ["Cable", "End A", "End B", "Tester", "Use"];

export const CABLE_TABLE_ROWS: (string | number)[][] = [
  ["Straight-through", "T568B", "T568B", "1-1 2-2 3-3 6-6", "PC to switch"],
  ["Crossover", "T568B", "T568A", "1-3 2-6 3-1 6-2", "PC to PC"],
];
