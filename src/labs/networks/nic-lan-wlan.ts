import { type NetBench } from "@/labs/networks/bench";

/**
 * Two rooms. On the left, two desktops get a wired network card and a switch.
 * On the right, two laptops join a Wi-Fi router.
 */
export const NIC_BENCH: NetBench = {
  zones: [
    { id: "wired", label: "Wired LAN", x: -5.5, z: 0.2, w: 10, d: 8 },
    { id: "wireless", label: "Wireless LAN", x: 6.5, z: 0.2, w: 10, d: 8 },
  ],
  devices: [
    { id: "pcA", kind: "pc", name: "PC A", x: -8, z: 2 },
    { id: "pcB", kind: "pc", name: "PC B", x: -3, z: 2 },
    { id: "nic", kind: "nic", x: -9.6, z: -0.2, ry: 90 },
    { id: "sw", kind: "switch", name: "Switch", x: -5.5, z: -1.8 },
    {
      id: "ap",
      kind: "ap",
      name: "Wi-Fi router",
      x: 6.5,
      z: -2,
      addresses: ["SSID VLAB-WIFI"],
    },
    { id: "lapC", kind: "laptop", name: "Laptop C", x: 3.5, z: 2.2 },
    { id: "lapD", kind: "laptop", name: "Laptop D", x: 9.5, z: 2.2 },
  ],
  links: [
    { id: "a-sw", a: "pcA", b: "sw", kind: "straight", via: [[-8, -1.8]] },
    { id: "b-sw", a: "pcB", b: "sw", kind: "straight", via: [[-3, -1.8]] },
    { id: "c-ap", a: "lapC", b: "ap", kind: "wifi" },
    { id: "d-ap", a: "lapD", b: "ap", kind: "wifi" },
  ],
};

export const NIC_DEVICES = ["pcA", "pcB", "nic", "sw", "ap", "lapC", "lapD"];
export const NIC_WIRED = ["pcA", "pcB", "sw", "a-sw", "b-sw"];
export const NIC_ALL = [...NIC_WIRED, "ap", "lapC", "lapD", "c-ap", "d-ap"];

/** The NIC pushed into the PCIe slot of PC A's tower. */
export const NIC_SEATED = { nic: { x: -7.32, z: 1.95, y: 0.12 } };

export const NIC_ADDR = {
  pcA: ["192.168.10.1/24"],
  pcB: ["192.168.10.2/24"],
};

export const WLAN_ADDR = {
  ...NIC_ADDR,
  lapC: ["192.168.20.101 (DHCP)"],
  lapD: ["192.168.20.102 (DHCP)"],
};

export const NIC_TABLE_HEADERS = [
  "Link",
  "Adapter",
  "Addresses",
  "Ping",
  "100 MB copy",
];

export const NIC_TABLE_ROWS: (string | number)[][] = [
  ["Wired LAN", "PCIe Gigabit Ethernet", "192.168.10.1 → .2", "<1 ms", "0.9 s"],
  [
    "Wireless LAN",
    "Wi-Fi 5 (802.11ac)",
    "192.168.20.101 → .102",
    "3 ms",
    "6.8 s",
  ],
];
