import { type NetBench } from "@/labs/networks/bench";

/**
 * Five rooms, one topology in each: bus, star and ring at the back, mesh
 * and tree at the front.
 */
const BUS: NetBench = {
  zones: [{ id: "bus", label: "Bus", x: -11, z: -5, w: 10, d: 8 }],
  devices: [
    { id: "term1", kind: "terminator", x: -15.2, z: -6.6 },
    { id: "t1", kind: "tap", x: -13.4, z: -6.6 },
    { id: "t2", kind: "tap", x: -11, z: -6.6 },
    { id: "t3", kind: "tap", x: -8.6, z: -6.6 },
    { id: "term2", kind: "terminator", x: -6.8, z: -6.6 },
    { id: "b1", kind: "pc", name: "B1", x: -13.4, z: -3.4 },
    { id: "b2", kind: "pc", name: "B2", x: -11, z: -3.4 },
    { id: "b3", kind: "pc", name: "B3", x: -8.6, z: -3.4 },
  ],
  links: [
    { id: "bb1", a: "term1", b: "t1", kind: "coax" },
    { id: "bb2", a: "t1", b: "t2", kind: "coax" },
    { id: "bb3", a: "t2", b: "t3", kind: "coax" },
    { id: "bb4", a: "t3", b: "term2", kind: "coax" },
    { id: "b1-t1", a: "b1", b: "t1", kind: "coax" },
    { id: "b2-t2", a: "b2", b: "t2", kind: "coax" },
    { id: "b3-t3", a: "b3", b: "t3", kind: "coax" },
  ],
};

const STAR: NetBench = {
  zones: [{ id: "star", label: "Star", x: 0, z: -5, w: 10, d: 8 }],
  devices: [
    { id: "hubS", kind: "switch", name: "Switch", x: 0, z: -5.2 },
    { id: "s1", kind: "pc", name: "S1", x: -3, z: -7.4 },
    { id: "s2", kind: "pc", name: "S2", x: 3, z: -7.4 },
    { id: "s3", kind: "pc", name: "S3", x: -3, z: -2.8 },
    { id: "s4", kind: "pc", name: "S4", x: 3, z: -2.8 },
  ],
  links: [
    { id: "s1-hub", a: "s1", b: "hubS", kind: "straight", via: [[-0.5, -7.4]] },
    { id: "s2-hub", a: "s2", b: "hubS", kind: "straight", via: [[0.5, -7.4]] },
    { id: "s3-hub", a: "s3", b: "hubS", kind: "straight", via: [[-0.5, -2.8]] },
    { id: "s4-hub", a: "s4", b: "hubS", kind: "straight", via: [[0.5, -2.8]] },
  ],
};

const RING: NetBench = {
  zones: [{ id: "ring", label: "Ring", x: 11, z: -5, w: 10, d: 8 }],
  devices: [
    { id: "r1", kind: "pc", name: "R1", x: 8.4, z: -7.2 },
    { id: "r2", kind: "pc", name: "R2", x: 13.6, z: -7.2 },
    { id: "r3", kind: "pc", name: "R3", x: 13.6, z: -2.8 },
    { id: "r4", kind: "pc", name: "R4", x: 8.4, z: -2.8 },
  ],
  links: [
    { id: "r1-r2", a: "r1", b: "r2", kind: "straight" },
    { id: "r2-r3", a: "r2", b: "r3", kind: "straight" },
    { id: "r3-r4", a: "r3", b: "r4", kind: "straight" },
    { id: "r4-r1", a: "r4", b: "r1", kind: "straight" },
  ],
};

/** A full mesh of four, drawn without crossings: M4 sits inside the triangle. */
const MESH: NetBench = {
  zones: [{ id: "mesh", label: "Mesh", x: -5.5, z: 5, w: 10, d: 8 }],
  devices: [
    { id: "m1", kind: "router", name: "M1", x: -9, z: 7.6 },
    { id: "m2", kind: "router", name: "M2", x: -5.5, z: 2.6 },
    { id: "m3", kind: "router", name: "M3", x: -2, z: 7.6 },
    { id: "m4", kind: "router", name: "M4", x: -5.5, z: 5.2 },
  ],
  links: [
    { id: "m1-m2", a: "m1", b: "m2", kind: "straight", via: [[-9, 2.6]] },
    { id: "m1-m3", a: "m1", b: "m3", kind: "straight" },
    { id: "m1-m4", a: "m1", b: "m4", kind: "straight", via: [[-8.6, 5.2]] },
    { id: "m2-m3", a: "m2", b: "m3", kind: "straight", via: [[-2, 2.6]] },
    { id: "m2-m4", a: "m2", b: "m4", kind: "straight" },
    { id: "m3-m4", a: "m3", b: "m4", kind: "straight", via: [[-2.4, 5.2]] },
  ],
};

const TREE: NetBench = {
  zones: [{ id: "tree", label: "Tree", x: 5.5, z: 5, w: 10, d: 8 }],
  devices: [
    { id: "core", kind: "switch", name: "Core switch", x: 5.5, z: 2.4 },
    { id: "tA", kind: "switch", name: "Switch A", x: 3, z: 4.8 },
    { id: "tB", kind: "switch", name: "Switch B", x: 8, z: 4.8 },
    { id: "a1", kind: "laptop", name: "T1", x: 1.9, z: 7.4 },
    { id: "a2", kind: "laptop", name: "T2", x: 4.1, z: 7.4 },
    { id: "b1t", kind: "laptop", name: "T3", x: 6.9, z: 7.4 },
    { id: "b2t", kind: "laptop", name: "T4", x: 9.1, z: 7.4 },
  ],
  links: [
    { id: "core-tA", a: "core", b: "tA", kind: "straight", via: [[3, 2.4]] },
    { id: "core-tB", a: "core", b: "tB", kind: "straight", via: [[8, 2.4]] },
    {
      id: "tA-a1",
      a: "tA",
      b: "a1",
      kind: "straight",
      via: [
        [2.6, 6.2],
        [1.9, 6.2],
      ],
    },
    {
      id: "tA-a2",
      a: "tA",
      b: "a2",
      kind: "straight",
      via: [
        [3.4, 6.2],
        [4.1, 6.2],
      ],
    },
    {
      id: "tB-b1",
      a: "tB",
      b: "b1t",
      kind: "straight",
      via: [
        [7.6, 6.2],
        [6.9, 6.2],
      ],
    },
    {
      id: "tB-b2",
      a: "tB",
      b: "b2t",
      kind: "straight",
      via: [
        [8.4, 6.2],
        [9.1, 6.2],
      ],
    },
  ],
};

const ROOMS = [BUS, STAR, RING, MESH, TREE];

export const TOPO_BENCH: NetBench = {
  zones: ROOMS.flatMap((r) => r.zones ?? []),
  devices: ROOMS.flatMap((r) => r.devices),
  links: ROOMS.flatMap((r) => r.links),
};

const ids = (r: NetBench) => [
  ...r.devices.map((d) => d.id),
  ...r.links.map((l) => l.id),
];

export const BUS_IDS = ids(BUS);
export const STAR_IDS = ids(STAR);
export const RING_IDS = ids(RING);
export const MESH_IDS = ids(MESH);
export const TREE_IDS = ids(TREE);
export const BUS_PCS = ["b1", "b2", "b3"];
export const STAR_PCS = ["s1", "s2", "s3", "s4", "hubS"];
export const RING_PCS = ["r1", "r2", "r3", "r4"];
export const MESH_RS = ["m1", "m2", "m3", "m4"];
export const TREE_ALL = ["core", "tA", "tB", "a1", "a2", "b1t", "b2t"];

export const TOPO_TABLE_HEADERS = [
  "Topology",
  "Cables for n nodes",
  "When one cable fails",
  "Seen in",
];

export const TOPO_TABLE_ROWS: (string | number)[][] = [
  [
    "Bus",
    "1 backbone + n drops",
    "Backbone cut: whole bus fails",
    "Early coax Ethernet",
  ],
  ["Star", "n, to the centre", "Only that node is cut off", "Office LANs"],
  [
    "Ring",
    "n, node to node",
    "Ring broken: traffic stops",
    "Token Ring, FDDI, SONET",
  ],
  [
    "Mesh",
    "n(n − 1)/2 = 6 for 4",
    "Traffic takes another path",
    "WAN and Internet cores",
  ],
  ["Tree", "n − 1", "Branch below the cut is isolated", "Campus networks"],
];
