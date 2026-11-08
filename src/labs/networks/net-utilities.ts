import { type NetBench } from "@/labs/networks/bench";

/**
 * A client on a small LAN, its router, the ISP's router, the Internet, a
 * DNS resolver and a web server.
 */
export const UTIL_BENCH: NetBench = {
  zones: [
    {
      id: "lan",
      label: "Lab LAN · 192.168.1.0/24",
      x: -6.5,
      z: 0.8,
      w: 9,
      d: 8,
    },
  ],
  devices: [
    { id: "pc", kind: "laptop", name: "Client", x: -8.6, z: 2.6 },
    {
      id: "r1",
      kind: "router",
      name: "Router",
      x: -4.6,
      z: -0.8,
      addresses: ["192.168.1.1", "WAN 203.0.113.45"],
    },
    {
      id: "isp",
      kind: "router",
      name: "ISP router",
      x: 1.8,
      z: 3.8,
      addresses: ["203.0.113.1"],
    },
    { id: "net", kind: "cloud", name: "Internet", x: 7.4, z: 3.8 },
    {
      id: "dns",
      kind: "server",
      name: "DNS resolver",
      x: 7.4,
      z: -2.6,
      addresses: ["8.8.8.8"],
    },
    {
      id: "web",
      kind: "server",
      name: "Web server",
      x: 12.6,
      z: 0.8,
      addresses: ["www.example.com", "198.51.100.20"],
    },
  ],
  links: [
    { id: "pc-r1", a: "pc", b: "r1", kind: "straight", via: [[-8.6, -0.8]] },
    {
      id: "r1-isp",
      a: "r1",
      b: "isp",
      kind: "straight",
      via: [[1.8, -0.8]],
      label: "WAN",
    },
    { id: "isp-net", a: "isp", b: "net", kind: "fiber" },
    { id: "net-dns", a: "net", b: "dns", kind: "fiber" },
    { id: "net-web", a: "net", b: "web", kind: "fiber", via: [[12.6, 3.8]] },
  ],
};

export const LAN_ONLY = ["pc", "r1", "isp", "net", "dns", "web", "pc-r1"];
export const DHCP_ADDR = { pc: ["192.168.1.10 (DHCP)"] };
export const PATH_DNS = ["pc", "r1", "isp", "net", "dns"];
export const PATH_WEB = ["pc", "r1", "isp", "net", "web"];

export const UTIL_TABLE_HEADERS = ["Command", "What it shows", "Result here"];

export const UTIL_TABLE_ROWS: (string | number)[][] = [
  [
    "ipconfig /all",
    "Address, mask, gateway, DNS, MAC",
    "192.168.1.10 from DHCP",
  ],
  ["ping 8.8.8.8", "Reach and round-trip time", "4 replies, 14 ms, TTL 117"],
  ["nslookup", "Name to address", "www.example.com → 198.51.100.20"],
  ["tracert", "Each router on the path", "4 hops"],
  ["netstat -an", "Open connections and ports", "ESTABLISHED to :443"],
  ["Cable out", "ipconfig: Media disconnected", "Fault at layer 1"],
  ["Wrong DNS", "Ping by address works, by name fails", "Fault in DNS"],
];
