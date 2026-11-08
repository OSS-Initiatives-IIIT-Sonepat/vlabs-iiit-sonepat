import { type NetBench } from "@/labs/networks/bench";

/**
 * Two networks joined by a router: a LAN with two PCs and a switch, and a
 * server room. PC 1 is the machine being configured.
 */
export const TCPIP_BENCH: NetBench = {
  zones: [
    { id: "lan", label: "LAN · 192.168.1.0/24", x: -5, z: 0.6, w: 10.5, d: 8 },
    {
      id: "srv",
      label: "Server room · 192.168.2.0/24",
      x: 8,
      z: 0.6,
      w: 6.5,
      d: 8,
    },
  ],
  devices: [
    { id: "pc1", kind: "pc", name: "PC 1", x: -7.6, z: 2.4 },
    {
      id: "pc2",
      kind: "pc",
      name: "PC 2",
      x: -2.4,
      z: 2.4,
      addresses: ["192.168.1.11/24"],
    },
    { id: "sw", kind: "switch", name: "Switch", x: -5, z: -1.8 },
    {
      id: "r1",
      kind: "router",
      name: "Router",
      x: 2.4,
      z: -1.8,
      addresses: ["192.168.1.1", "192.168.2.1"],
    },
    {
      id: "srv",
      kind: "server",
      name: "Server",
      x: 8,
      z: -0.4,
      addresses: ["192.168.2.10/24"],
    },
  ],
  links: [
    { id: "pc1-sw", a: "pc1", b: "sw", kind: "straight", via: [[-5.4, 2.4]] },
    { id: "pc2-sw", a: "pc2", b: "sw", kind: "straight", via: [[-4.6, 2.4]] },
    { id: "sw-r1", a: "sw", b: "r1", kind: "straight" },
    { id: "r1-srv", a: "r1", b: "srv", kind: "straight", via: [[8, -1.8]] },
  ],
};

export const NO_ADDR = { pc1: ["169.254.18.7 (APIPA)"] };
export const IP_ONLY = { pc1: ["192.168.1.10 /24"] };
export const WITH_GW = { pc1: ["192.168.1.10 /24", "gw 192.168.1.1"] };
export const WRONG_MASK = { pc1: ["192.168.1.10 /16", "gw 192.168.1.1"] };

export const TCPIP_TABLE_HEADERS = [
  "Test",
  "PC 1 settings",
  "Target",
  "Result",
];

export const TCPIP_TABLE_ROWS: (string | number)[][] = [
  [
    "Same network",
    "192.168.1.10 /24, no gateway",
    "PC 2, 192.168.1.11",
    "Reply, <1 ms",
  ],
  [
    "Other network",
    "192.168.1.10 /24, no gateway",
    "Server, 192.168.2.10",
    "General failure",
  ],
  [
    "Other network",
    "/24, gateway 192.168.1.1",
    "Server, 192.168.2.10",
    "Reply, TTL 127",
  ],
  [
    "Wrong mask",
    "192.168.1.10 /16",
    "Server, 192.168.2.10",
    "Destination host unreachable",
  ],
];
