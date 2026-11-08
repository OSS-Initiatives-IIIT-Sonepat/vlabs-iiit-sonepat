import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  UDP_TABLE_HEADERS,
  UDP_TABLE_ROWS,
} from "@/labs/networks/udp-socket";
import { headers } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

export const step: SceneProcedureStep = {
  label: "Compare the headers",
  body: "Capture one UDP datagram and one TCP segment in Wireshark and compare their headers. UDP's has four 2-byte fields: source port, destination port, length and checksum, 8 bytes in all.\n\nTCP's adds a sequence number, an acknowledgement number, flags, a window and more, 20 bytes at least. Those extra 12 bytes are what TCP needs to number, acknowledge and resend.",
  show: [],
  schematic: headers,
  net: {
    show: ONE_CLIENT,
    hot: ["client", "server"],
    tags: { server: "UDP :5001" },
    packets: [
      { path: C_TO_S, label: "UDP 8 B header" },
      { path: S_TO_C, label: "UDP 8 B header", color: "green" },
    ],
  },
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 6),
};
