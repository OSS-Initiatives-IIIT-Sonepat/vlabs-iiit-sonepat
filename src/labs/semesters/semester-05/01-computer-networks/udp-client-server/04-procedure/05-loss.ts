import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  UDP_TABLE_HEADERS,
  UDP_TABLE_ROWS,
} from "@/labs/networks/udp-socket";
import { lostOne } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

export const step: SceneProcedureStep = {
  label: "A lost datagram stays lost",
  body: "Now the next datagram is lost on the way. UDP does not notice: there is no acknowledgement to miss. The server never hears of it.\n\nThe client's recvfrom() waits 2 s, the timeout the program set, and raises socket.timeout. Only because the program catches it and sends again does the message get through. Reliability is the program's job.",
  show: [],
  schematic: lostOne,
  net: {
    show: ONE_CLIENT,
    hot: ["client-sw"],
    tags: { server: "UDP :5001", client: "✕ timeout 2 s" },
    packets: [
      { path: ["client", "sw"], label: "ping 2", drop: true },
      { path: C_TO_S, label: "ping 2 (retry)", at: 2.4 },
      { path: S_TO_C, label: "PING 2", color: "green" },
    ],
  },
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 3),
};
