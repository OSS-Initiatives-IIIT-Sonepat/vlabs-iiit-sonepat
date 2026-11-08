import { type NetBench } from "@/labs/networks/bench";

/**
 * Three routers in a triangle. R1 reaches R3 directly over a slow serial
 * link (one hop), or through R2 over two gigabit links (two hops).
 */
export const ROUTING_BENCH: NetBench = {
  zones: [
    {
      id: "lanA",
      label: "LAN A · 192.168.1.0/24",
      x: -11,
      z: 0.8,
      w: 5.5,
      d: 7.5,
    },
    { id: "wan", label: "WAN", x: 0, z: 0.4, w: 15, d: 9 },
    {
      id: "lanB",
      label: "LAN B · 192.168.3.0/24",
      x: 11,
      z: 0.8,
      w: 5.5,
      d: 7.5,
    },
  ],
  devices: [
    {
      id: "pcA",
      kind: "pc",
      name: "PC A",
      x: -11,
      z: 2.2,
      addresses: ["192.168.1.10"],
    },
    { id: "r1", kind: "router", name: "R1", x: -5, z: 2.2 },
    { id: "r2", kind: "router", name: "R2", x: 0, z: -2.4 },
    { id: "r3", kind: "router", name: "R3", x: 5, z: 2.2 },
    {
      id: "srv",
      kind: "server",
      name: "Server B",
      x: 11,
      z: 2.2,
      addresses: ["192.168.3.10"],
    },
  ],
  links: [
    { id: "pcA-r1", a: "pcA", b: "r1", kind: "straight" },
    {
      id: "r1-r2",
      a: "r1",
      b: "r2",
      kind: "straight",
      via: [[-5, -2.4]],
      label: "1 Gbit/s · 10.0.12.0/30",
    },
    {
      id: "r2-r3",
      a: "r2",
      b: "r3",
      kind: "straight",
      via: [[5, -2.4]],
      label: "1 Gbit/s · 10.0.23.0/30",
    },
    {
      id: "r1-r3",
      a: "r1",
      b: "r3",
      kind: "serial",
      label: "1.544 Mbit/s serial · 10.0.13.0/30",
    },
    { id: "r3-srv", a: "r3", b: "srv", kind: "straight" },
  ],
};

export const VIA_SERIAL = ["pcA", "r1", "r3", "srv"];
export const VIA_R2 = ["pcA", "r1", "r2", "r3", "srv"];
export const BACK_SERIAL = ["srv", "r3", "r1", "pcA"];
export const BACK_R2 = ["srv", "r3", "r2", "r1", "pcA"];

export const ROUTING_TABLE_HEADERS = [
  "Routing",
  "Metric",
  "R1's route to 192.168.3.0",
  "Path",
];

export const ROUTING_TABLE_ROWS: (string | number)[][] = [
  ["Static", "None, set by hand", "S via 10.0.13.2", "R1 → R3 (serial)"],
  ["Static, serial down", "—", "Route gone", "None: ping fails"],
  ["RIP v2", "Hop count", "R [120/1] via 10.0.13.2", "R1 → R3 (serial)"],
  ["OSPF", "Cost from bandwidth", "O [110/3] via 10.0.12.2", "R1 → R2 → R3"],
  ["OSPF, R1–R2 down", "Cost", "O [110/65] via 10.0.13.2", "R1 → R3 (serial)"],
];
