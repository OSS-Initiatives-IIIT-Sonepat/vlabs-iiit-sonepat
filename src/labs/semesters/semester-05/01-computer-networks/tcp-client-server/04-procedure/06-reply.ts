import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { replyHello } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

export const step: SceneProcedureStep = {
  label: "The server replies HELLO",
  body: "The server calls sendall(data.upper()). HELLO goes back in a segment with the server's sequence number 5001, and the client's TCP acknowledges it with 5006.\n\nThe client's recv() returns b'HELLO' and the program prints it. Data flows both ways on the same connection.",
  show: [],
  schematic: replyHello,
  net: {
    show: ONE_CLIENT,
    hot: ["client"],
    tags: { client: "ESTABLISHED", server: "ESTABLISHED" },
    packets: [
      { path: S_TO_C, label: "HELLO", color: "green" },
      { path: C_TO_S, label: "ACK 5006", color: "blue" },
    ],
    consoles: [
      {
        at: "client",
        title: "Terminal · client",
        lines: ["$ python3 client.py", "b'HELLO'"],
      },
    ],
  },
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 3),
};
