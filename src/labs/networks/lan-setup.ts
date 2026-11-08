import { type NetBench, type NetLink } from "@/labs/networks/bench";

/**
 * One computer lab: six PCs in two columns, cabled in a star to a switch on
 * the back wall. Each cable runs along the floor to its own port.
 */
const PCS = [
  { id: "pc1", x: -6, z: -0.6 },
  { id: "pc2", x: -6, z: 2.2 },
  { id: "pc3", x: -6, z: 5 },
  { id: "pc4", x: 6, z: -0.6 },
  { id: "pc5", x: 6, z: 2.2 },
  { id: "pc6", x: 6, z: 5 },
];

const LANES = [-0.9, -0.6, -0.3, 0.9, 0.6, 0.3];

export const LAN_BENCH: NetBench = {
  zones: [
    {
      id: "lab",
      label: "Computer lab · 192.168.1.0/24",
      x: 0,
      z: 1.2,
      w: 17,
      d: 11,
    },
  ],
  devices: [
    { id: "sw", kind: "switch", name: "Switch", x: 0, z: -3.4 },
    ...PCS.map((p, i) => ({
      id: p.id,
      kind: "pc" as const,
      name: `PC ${i + 1}`,
      x: p.x,
      z: p.z,
    })),
  ],
  links: PCS.map((p, i): NetLink => ({
    id: `${p.id}-sw`,
    a: p.id,
    b: "sw",
    kind: "straight",
    via: [
      [LANES[i], p.z],
      [LANES[i], -2.9],
    ],
  })),
};

export const LAN_DEVICES = ["sw", ...PCS.map((p) => p.id)];
export const LEFT_CABLES = ["pc1-sw", "pc2-sw", "pc3-sw"];
export const RIGHT_CABLES = ["pc4-sw", "pc5-sw", "pc6-sw"];
export const LAN_ALL = [...LAN_DEVICES, ...LEFT_CABLES, ...RIGHT_CABLES];

export const LAN_ADDR = Object.fromEntries(
  PCS.map((p, i) => [p.id, [`192.168.1.${11 + i}`]]),
);

export const LAN_TABLE_HEADERS = [
  "PC",
  "IP address",
  "Switch port",
  "Ping from PC 1",
];

export const LAN_TABLE_ROWS: (string | number)[][] = [
  ["PC 1", "192.168.1.11", "Fa0/1", "—"],
  ["PC 2", "192.168.1.12", "Fa0/2", "Reply, <1 ms"],
  ["PC 3", "192.168.1.13", "Fa0/3", "Reply, <1 ms"],
  ["PC 4", "192.168.1.14", "Fa0/4", "Reply, <1 ms"],
  ["PC 5", "192.168.1.15", "Fa0/5", "Reply, <1 ms"],
  ["PC 6", "192.168.1.16", "Fa0/6", "Reply, <1 ms"],
];
