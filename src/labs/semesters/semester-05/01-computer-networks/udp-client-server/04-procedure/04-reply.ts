import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  UDP_TABLE_HEADERS,
  UDP_TABLE_ROWS,
} from "@/labs/networks/udp-socket";
import { replyOne } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

export const step: SceneProcedureStep = {
  label: "Server: recvfrom() and reply",
  body: "The server's recvfrom() returns b'hello' and the sender's address, ('192.168.1.10', 50900). The server sends HELLO back to that address with sendto().\n\nThe client's recvfrom() returns the reply and the server's address. Each datagram is one complete message; a recv never returns half of one, or two run together.",
  show: [],
  schematic: replyOne,
  net: {
    show: ONE_CLIENT,
    hot: ["server"],
    tags: { server: "UDP :5001" },
    packets: [
      { path: C_TO_S, label: "hello" },
      { path: S_TO_C, label: "HELLO", color: "green" },
    ],
    consoles: [
      {
        at: "client",
        title: "Terminal · client",
        lines: [
          "$ python3 udp_client.py",
          "(b'HELLO', ('192.168.1.20', 5001))",
        ],
      },
    ],
  },
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 2),
};
