import { type NetBench } from "@/labs/networks/bench";

/**
 * A client, a second client and a server on one switch. The socket labs
 * (TCP, UDP and RPC) all run on this bench.
 */
export const SOCKET_BENCH: NetBench = {
  zones: [
    { id: "lan", label: "LAN · 192.168.1.0/24", x: 0, z: 0.6, w: 16, d: 8.5 },
  ],
  devices: [
    {
      id: "client",
      kind: "pc",
      name: "Client",
      x: -5.4,
      z: 2.4,
      addresses: ["192.168.1.10"],
    },
    {
      id: "client2",
      kind: "laptop",
      name: "Client 2",
      x: -5.4,
      z: -1.6,
      addresses: ["192.168.1.11"],
    },
    { id: "sw", kind: "switch", name: "Switch", x: 0, z: 0.4 },
    {
      id: "server",
      kind: "server",
      name: "Server",
      x: 5.4,
      z: 0.4,
      addresses: ["192.168.1.20"],
    },
  ],
  links: [
    {
      id: "client-sw",
      a: "client",
      b: "sw",
      kind: "straight",
      via: [[-0.4, 2.4]],
    },
    {
      id: "client2-sw",
      a: "client2",
      b: "sw",
      kind: "straight",
      via: [[-0.4, -1.6]],
    },
    { id: "sw-server", a: "sw", b: "server", kind: "straight" },
  ],
};

export const ONE_CLIENT = ["client", "sw", "server", "client-sw", "sw-server"];
export const C_TO_S = ["client", "sw", "server"];
export const S_TO_C = ["server", "sw", "client"];
export const C2_TO_S = ["client2", "sw", "server"];
export const S_TO_C2 = ["server", "sw", "client2"];
