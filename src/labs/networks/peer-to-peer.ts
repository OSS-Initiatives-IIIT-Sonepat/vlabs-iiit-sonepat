import { type NetBench } from "@/labs/networks/bench";

/**
 * Two PCs on one bench, joined three ways in turn: directly by a crossover
 * cable, through a switch, and through a router.
 */
export const P2P_BENCH: NetBench = {
  zones: [{ id: "bench", label: "Lab bench", x: 0, z: 0.4, w: 17, d: 9 }],
  devices: [
    { id: "pcA", kind: "pc", name: "PC A", x: -6, z: 0.6 },
    { id: "pcB", kind: "pc", name: "PC B", x: 6, z: 0.6 },
    { id: "sw", kind: "switch", name: "Switch", x: 0, z: -2.3 },
    { id: "r1", kind: "router", name: "Router", x: 0, z: 3.4 },
  ],
  links: [
    { id: "a-b", a: "pcA", b: "pcB", kind: "cross", label: "Crossover" },
    { id: "a-sw", a: "pcA", b: "sw", kind: "straight", via: [[-6, -2.3]] },
    { id: "sw-b", a: "sw", b: "pcB", kind: "straight", via: [[6, -2.3]] },
    {
      id: "a-r1",
      a: "pcA",
      b: "r1",
      kind: "straight",
      via: [[-6, 3.4]],
      label: "Gi0/0",
    },
    {
      id: "r1-b",
      a: "r1",
      b: "pcB",
      kind: "straight",
      via: [[6, 3.4]],
      label: "Gi0/1",
    },
  ],
};

export const TWO_PCS = ["pcA", "pcB"];
export const DIRECT = ["pcA", "pcB", "a-b"];
export const VIA_SWITCH = ["pcA", "pcB", "sw", "a-sw", "sw-b"];
export const VIA_ROUTER = ["pcA", "pcB", "r1", "a-r1", "r1-b"];

export const SAME_NET = {
  pcA: ["192.168.0.1/24"],
  pcB: ["192.168.0.2/24"],
};

export const TWO_NETS = {
  pcA: ["192.168.0.1/24", "gw 192.168.0.254"],
  pcB: ["10.0.0.2/24", "gw 10.0.0.254"],
  r1: ["192.168.0.254", "10.0.0.254"],
};

export const P2P_TABLE_HEADERS = [
  "Connection",
  "Cables",
  "PC A → PC B",
  "TTL seen",
];

export const P2P_TABLE_ROWS: (string | number)[][] = [
  ["Direct", "1 crossover", "192.168.0.1 → .2", "128"],
  ["Through a switch", "2 straight-through", "192.168.0.1 → .2", "128"],
  ["Through a router", "2 straight-through", "192.168.0.1 → 10.0.0.2", "127"],
];
