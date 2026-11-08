import { type NetBench } from "@/labs/networks/bench";

/**
 * Router R1 joins LAN 10 and LAN 20. An admin laptop is plugged into its
 * console port.
 */
export const RCLI_BENCH: NetBench = {
  zones: [
    {
      id: "lan10",
      label: "LAN 10 · 192.168.10.0/24",
      x: -8,
      z: 1,
      w: 8.5,
      d: 8,
    },
    {
      id: "lan20",
      label: "LAN 20 · 192.168.20.0/24",
      x: 8,
      z: 1,
      w: 8.5,
      d: 8,
    },
  ],
  devices: [
    { id: "r1", kind: "router", name: "R1", x: 0, z: -1.6 },
    { id: "admin", kind: "laptop", name: "Admin laptop", x: 0, z: 3.4 },
    { id: "sw10", kind: "switch", name: "SW 10", x: -8, z: -1.6 },
    {
      id: "pcA",
      kind: "pc",
      name: "PC A",
      x: -10.2,
      z: 2.6,
      addresses: ["192.168.10.11"],
    },
    {
      id: "pcB",
      kind: "pc",
      name: "PC B",
      x: -5.8,
      z: 2.6,
      addresses: ["192.168.10.12"],
    },
    { id: "sw20", kind: "switch", name: "SW 20", x: 8, z: -1.6 },
    {
      id: "pcC",
      kind: "pc",
      name: "PC C",
      x: 5.8,
      z: 2.6,
      addresses: ["192.168.20.11"],
    },
    {
      id: "pcD",
      kind: "pc",
      name: "PC D",
      x: 10.2,
      z: 2.6,
      addresses: ["192.168.20.12"],
    },
  ],
  links: [
    { id: "r1-sw10", a: "r1", b: "sw10", kind: "straight", label: "Gi0/0" },
    { id: "r1-sw20", a: "r1", b: "sw20", kind: "straight", label: "Gi0/1" },
    { id: "admin-r1", a: "admin", b: "r1", kind: "console", label: "Console" },
    {
      id: "pcA-sw10",
      a: "pcA",
      b: "sw10",
      kind: "straight",
      via: [
        [-10.2, 0.4],
        [-8.4, 0.4],
      ],
    },
    {
      id: "pcB-sw10",
      a: "pcB",
      b: "sw10",
      kind: "straight",
      via: [
        [-5.8, 0.4],
        [-7.6, 0.4],
      ],
    },
    {
      id: "pcC-sw20",
      a: "pcC",
      b: "sw20",
      kind: "straight",
      via: [
        [5.8, 0.4],
        [7.6, 0.4],
      ],
    },
    {
      id: "pcD-sw20",
      a: "pcD",
      b: "sw20",
      kind: "straight",
      via: [
        [10.2, 0.4],
        [8.4, 0.4],
      ],
    },
  ],
};

export const R_ADDR_G0 = { r1: ["Gi0/0 192.168.10.1"] };
export const R_ADDR = { r1: ["Gi0/0 192.168.10.1", "Gi0/1 192.168.20.1"] };

export const PORTS_DOWN = { "r1-sw10": "down", "r1-sw20": "down" } as const;
export const G1_DOWN = { "r1-sw20": "down" } as const;

export const RCLI_TABLE_HEADERS = ["Command", "Mode", "What it does"];

export const RCLI_TABLE_ROWS: (string | number)[][] = [
  ["enable", "User EXEC → privileged", "Unlocks show and configure"],
  [
    "configure terminal",
    "Privileged → global config",
    "Starts changing the router",
  ],
  ["hostname R1", "Global config", "Names the router"],
  ["enable secret", "Global config", "Hashed password for enable"],
  [
    "ip address, no shutdown",
    "Interface config",
    "Address the port and turn it on",
  ],
  ["show ip interface brief", "Privileged", "Address and state of each port"],
  ["show ip route", "Privileged", "The routing table"],
  [
    "copy running-config startup-config",
    "Privileged",
    "Saves the setup to NVRAM",
  ],
];
