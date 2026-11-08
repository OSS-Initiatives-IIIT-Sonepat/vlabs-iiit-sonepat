import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  C_TO_S,
  C2_TO_S,
  S_TO_C2,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

const net: NetFrame = {
  hot: ["client2", "server"],
  tags: {
    client: "ESTABLISHED",
    client2: "ESTABLISHED",
    server: "2 connections",
  },
  packets: [
    { path: C2_TO_S, label: "SYN", color: "blue" },
    { path: S_TO_C2, label: "SYN-ACK", color: "blue" },
    { path: C2_TO_S, label: "ACK", color: "blue" },
    { path: C_TO_S, label: "hello", at: 0.6 },
  ],
  consoles: [
    {
      at: "server",
      title: "Terminal · server",
      lines: [
        "$ ss -tn | grep 5000",
        "ESTAB  192.168.1.20:5000  192.168.1.10:50821",
        "ESTAB  192.168.1.20:5000  192.168.1.11:50822",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "A second client connects",
  body: "Put the server's accept() in a loop, so it serves one client after another, and run the client on Client 2 as well.\n\nClient 2 makes its own handshake from 192.168.1.11 port 50822 to the same server port 5000. netstat on the server lists two connections. Each is told apart by the four numbers: both addresses and both ports.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 6),
};
