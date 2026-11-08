import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  C_TO_S,
  S_TO_C,
  C2_TO_S,
  S_TO_C2,
  UDP_TABLE_HEADERS,
  UDP_TABLE_ROWS,
} from "@/labs/networks/udp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

const net: NetFrame = {
  hot: ["server"],
  tags: { server: "UDP :5001" },
  packets: [
    { path: C_TO_S, label: "from .10", at: 0.3 },
    { path: C2_TO_S, label: "from .11", at: 0.45 },
    { path: S_TO_C, label: "reply", color: "green" },
    { path: S_TO_C2, label: "reply", color: "green" },
  ],
};

export const step: SceneProcedureStep = {
  label: "Two clients, one socket",
  body: "Run the client on Client 2 as well. Both send to port 5001, and the same server socket receives both datagrams in turn.\n\nrecvfrom() gives a different address each time, and the server replies to each one. No accept() and no second socket are needed.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 4),
};
