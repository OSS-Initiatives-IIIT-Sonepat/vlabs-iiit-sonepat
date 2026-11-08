import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { UDP_TABLE_HEADERS, UDP_TABLE_ROWS } from "@/labs/networks/udp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

const net: NetFrame = {
  hot: ["sw"],
  tags: { server: "UDP :5001" },
  packets: [
    {
      path: ["client", "sw", "server"],
      label: "to 192.168.1.255",
      color: "purple",
    },
    { path: ["client", "sw", "client2"], color: "purple", at: 0.35 },
  ],
};

export const step: SceneProcedureStep = {
  label: "Send to the broadcast address",
  body: "Set the SO_BROADCAST option on the client's socket and send one datagram to 192.168.1.255, port 5001. The switch floods it to every port, so every host on the LAN receives it, and any one listening on 5001 can answer.\n\nThis is how DHCP and many discovery protocols find a server they do not yet know. A TCP connection is always between exactly two ends, so TCP cannot broadcast.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 5),
};
