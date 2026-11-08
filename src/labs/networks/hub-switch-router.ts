import { type NetBench } from "@/labs/networks/bench";

/**
 * Room 1 is three PCs on a hub. Room 2 is three PCs on a switch. A router in
 * the middle joins the two rooms, which are two different IP networks.
 */
export const HSR_BENCH: NetBench = {
  zones: [
    {
      id: "room1",
      label: "Room 1 · hub · 192.168.1.0/24",
      x: -9,
      z: 0.5,
      w: 8.5,
      d: 8,
    },
    { id: "core", label: "Rack", x: 0, z: -1.5, w: 5, d: 4 },
    {
      id: "room2",
      label: "Room 2 · switch · 192.168.2.0/24",
      x: 9,
      z: 0.5,
      w: 8.5,
      d: 8,
    },
  ],
  devices: [
    { id: "hub", kind: "hub", name: "Hub", x: -9, z: -1.6 },
    {
      id: "pc1",
      kind: "pc",
      name: "PC 1",
      x: -11.6,
      z: 2.6,
      addresses: ["192.168.1.11"],
    },
    {
      id: "pc2",
      kind: "pc",
      name: "PC 2",
      x: -9,
      z: 2.6,
      addresses: ["192.168.1.12"],
    },
    {
      id: "pc3",
      kind: "pc",
      name: "PC 3",
      x: -6.4,
      z: 2.6,
      addresses: ["192.168.1.13"],
    },
    { id: "r1", kind: "router", name: "Router", x: 0, z: -1.6 },
    { id: "sw", kind: "switch", name: "Switch", x: 9, z: -1.6 },
    {
      id: "pc4",
      kind: "pc",
      name: "PC 4",
      x: 6.4,
      z: 2.6,
      addresses: ["192.168.2.14"],
    },
    {
      id: "pc5",
      kind: "pc",
      name: "PC 5",
      x: 9,
      z: 2.6,
      addresses: ["192.168.2.15"],
    },
    {
      id: "pc6",
      kind: "pc",
      name: "PC 6",
      x: 11.6,
      z: 2.6,
      addresses: ["192.168.2.16"],
    },
  ],
  links: [
    {
      id: "pc1-hub",
      a: "pc1",
      b: "hub",
      kind: "straight",
      via: [
        [-11.6, -0.4],
        [-9.5, -0.4],
      ],
    },
    { id: "pc2-hub", a: "pc2", b: "hub", kind: "straight" },
    {
      id: "pc3-hub",
      a: "pc3",
      b: "hub",
      kind: "straight",
      via: [
        [-6.4, -0.4],
        [-8.5, -0.4],
      ],
    },
    {
      id: "pc4-sw",
      a: "pc4",
      b: "sw",
      kind: "straight",
      via: [
        [6.4, -0.4],
        [8.5, -0.4],
      ],
    },
    { id: "pc5-sw", a: "pc5", b: "sw", kind: "straight" },
    {
      id: "pc6-sw",
      a: "pc6",
      b: "sw",
      kind: "straight",
      via: [
        [11.6, -0.4],
        [9.5, -0.4],
      ],
    },
    { id: "hub-r1", a: "hub", b: "r1", kind: "straight", label: "Gi0/0" },
    { id: "r1-sw", a: "r1", b: "sw", kind: "straight", label: "Gi0/1" },
  ],
};

export const HSR_DEVICES = [
  "hub",
  "pc1",
  "pc2",
  "pc3",
  "r1",
  "sw",
  "pc4",
  "pc5",
  "pc6",
];
export const ROOM1 = [
  "hub",
  "pc1",
  "pc2",
  "pc3",
  "pc1-hub",
  "pc2-hub",
  "pc3-hub",
];
export const ROOM2 = ["sw", "pc4", "pc5", "pc6", "pc4-sw", "pc5-sw", "pc6-sw"];
export const HSR_ALL = [...ROOM1, ...ROOM2, "r1", "hub-r1", "r1-sw"];

export const ROUTER_ADDR = { r1: ["Gi0/0 192.168.1.1", "Gi0/1 192.168.2.1"] };

export const HSR_TABLE_HEADERS = [
  "Device",
  "Layer",
  "Forwards by",
  "Collision domains",
  "Broadcast domains",
];

export const HSR_TABLE_ROWS: (string | number)[][] = [
  [
    "Hub",
    "1 Physical",
    "Repeats bits out of every port",
    "1 for all ports",
    "1",
  ],
  [
    "Switch",
    "2 Data link",
    "Destination MAC, learned table",
    "1 per port",
    "1",
  ],
  [
    "Router",
    "3 Network",
    "Destination IP, routing table",
    "1 per port",
    "1 per port",
  ],
];
