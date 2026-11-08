import { type NetBench } from "@/labs/networks/bench";

/**
 * One LAN: three PCs, a switch, and the gateway router to the Internet.
 * Each host's label shows its IP address, and its MAC once it is known.
 */
export const ARP_BENCH: NetBench = {
  zones: [
    {
      id: "lan",
      label: "LAN · 192.168.1.0/24",
      x: -1.5,
      z: 0.8,
      w: 15,
      d: 8.5,
    },
  ],
  devices: [
    { id: "sw", kind: "switch", name: "Switch", x: -1.5, z: -2.4 },
    {
      id: "pcA",
      kind: "pc",
      name: "PC A",
      x: -6.4,
      z: 1.6,
      addresses: ["192.168.1.10"],
    },
    {
      id: "pcB",
      kind: "pc",
      name: "PC B",
      x: -1.5,
      z: 3.4,
      addresses: ["192.168.1.11"],
    },
    {
      id: "pcC",
      kind: "pc",
      name: "PC C",
      x: 3.4,
      z: 1.6,
      addresses: ["192.168.1.12"],
    },
    {
      id: "gw",
      kind: "router",
      name: "Gateway",
      x: 4,
      z: -2.4,
      addresses: ["192.168.1.1"],
    },
    { id: "net", kind: "cloud", name: "Internet", x: 10.5, z: -2.4 },
  ],
  links: [
    { id: "pcA-sw", a: "pcA", b: "sw", kind: "straight", via: [[-1.9, 1.6]] },
    { id: "pcB-sw", a: "pcB", b: "sw", kind: "straight" },
    { id: "pcC-sw", a: "pcC", b: "sw", kind: "straight", via: [[-1.1, 1.6]] },
    { id: "sw-gw", a: "sw", b: "gw", kind: "straight" },
    { id: "gw-net", a: "gw", b: "net", kind: "fiber" },
  ],
};

export const MAC = {
  pcA: "00-1A-2B-3C-4D-10",
  pcB: "00-1A-2B-3C-4D-11",
  pcC: "00-1A-2B-3C-4D-12",
  gw: "00-1A-2B-3C-4D-01",
};

export const OWN_MAC = { pcA: ["192.168.1.10", MAC.pcA] };
export const C_KNOWN = { ...OWN_MAC, pcC: ["192.168.1.12", MAC.pcC] };
export const GW_KNOWN = { ...C_KNOWN, gw: ["192.168.1.1", MAC.gw] };

export const ARP_TABLE_HEADERS = ["Step", "Command or packet", "Result"];

export const ARP_TABLE_ROWS: (string | number)[][] = [
  ["Own MAC", "getmac, ipconfig /all", "00-1A-2B-3C-4D-10"],
  [
    "ARP request",
    "Broadcast: who has 192.168.1.12?",
    "Reaches every host on the LAN",
  ],
  ["ARP reply", "Unicast from PC C", "192.168.1.12 is at 00-1A-2B-3C-4D-12"],
  ["Remote host", "ping 8.8.8.8", "ARP asks for the gateway, 192.168.1.1"],
  ["Static entry", "netsh … add neighbors", "Type static, no request needed"],
];
