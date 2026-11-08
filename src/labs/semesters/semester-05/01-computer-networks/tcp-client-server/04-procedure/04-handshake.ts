import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { handshake } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

export const step: SceneProcedureStep = {
  label: "connect(): the three-way handshake",
  body: "Run python3 client.py. connect() makes the client's TCP send SYN from port 50821 with sequence number 1000. The server's TCP answers SYN-ACK, with its own sequence number 5000 and ack 1001. The client sends ACK 5001.\n\nconnect() returns on the client and accept() returns on the server, with a new socket for this connection. Both ends are ESTABLISHED.",
  show: [],
  schematic: handshake,
  net: {
    show: ONE_CLIENT,
    hot: ["client-sw", "sw-server"],
    tags: { client: "ESTABLISHED", server: "ESTABLISHED" },
    packets: [
      { path: C_TO_S, label: "SYN", color: "blue" },
      { path: S_TO_C, label: "SYN-ACK", color: "blue" },
      { path: C_TO_S, label: "ACK", color: "blue" },
    ],
  },
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 1),
};
