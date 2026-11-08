import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { sendHello } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

export const step: SceneProcedureStep = {
  label: "The client sends hello",
  body: "sendall(b\"hello\") hands 5 bytes to TCP. They go in one segment with sequence number 1001. The server's TCP answers ACK 1006: it has every byte up to 1005 and expects 1006 next.\n\nThe server's recv(1024) returns the 5 bytes.",
  show: [],
  schematic: sendHello,
  net: {
    show: ONE_CLIENT,
    hot: ["server"],
    tags: { client: "ESTABLISHED", server: "ESTABLISHED" },
    packets: [
      { path: C_TO_S, label: "hello" },
      { path: S_TO_C, label: "ACK 1006", color: "blue" },
    ],
  },
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 2),
};
