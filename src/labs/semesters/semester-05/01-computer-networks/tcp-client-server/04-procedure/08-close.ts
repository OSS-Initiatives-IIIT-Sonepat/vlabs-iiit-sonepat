import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { teardown } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

export const step: SceneProcedureStep = {
  label: "close(): FIN in each direction",
  body: "The client calls close(). Its TCP sends FIN; the server acknowledges it. The server calls close() too, sending its own FIN, which the client acknowledges.\n\nThe server's socket is gone. The client waits in TIME_WAIT for a short while, so a stray old segment cannot be mistaken for part of a new connection, and then the connection is CLOSED.",
  show: [],
  schematic: teardown,
  net: {
    show: ONE_CLIENT,
    tags: { client: "TIME_WAIT", server: "LISTEN :5000" },
    packets: [
      { path: C_TO_S, label: "FIN", color: "purple" },
      { path: S_TO_C, label: "ACK", color: "blue" },
      { path: S_TO_C, label: "FIN", color: "purple" },
      { path: C_TO_S, label: "ACK", color: "blue" },
    ],
  },
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 5),
};
