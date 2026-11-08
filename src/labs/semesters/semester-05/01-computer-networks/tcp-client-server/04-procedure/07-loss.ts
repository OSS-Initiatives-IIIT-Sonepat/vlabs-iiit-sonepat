import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  TCP_TABLE_HEADERS,
  TCP_TABLE_ROWS,
} from "@/labs/networks/tcp-socket";
import { lostSegment } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

export const step: SceneProcedureStep = {
  label: "A lost segment is sent again",
  body: "Suppose the client sends bye and the segment is lost on the way. No ACK comes back. When the retransmission timer runs out, the client's TCP sends the same segment again, with the same sequence number 1006.\n\nThis time it arrives and is acknowledged with 1009. The server program receives bye once. TCP hid the loss from both programs.",
  show: [],
  schematic: lostSegment,
  net: {
    show: ONE_CLIENT,
    hot: ["client-sw"],
    tags: { client: "ESTABLISHED", server: "ESTABLISHED" },
    packets: [
      { path: ["client", "sw"], label: "bye", drop: true },
      { path: C_TO_S, label: "bye (resent)", at: 2.2 },
      { path: S_TO_C, label: "ACK 1009", color: "blue" },
    ],
  },
  table: revealedTable(TCP_TABLE_HEADERS, TCP_TABLE_ROWS, 4),
};
