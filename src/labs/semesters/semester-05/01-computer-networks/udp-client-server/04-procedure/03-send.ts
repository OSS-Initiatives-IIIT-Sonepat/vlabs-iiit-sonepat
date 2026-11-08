import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  UDP_TABLE_HEADERS,
  UDP_TABLE_ROWS,
} from "@/labs/networks/udp-socket";
import { sendOne } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

export const step: SceneProcedureStep = {
  label: "Client: sendto() with no handshake",
  body: 'On the client, make a UDP socket and call sendto(b"hello", ("192.168.1.20", 5001)). The datagram leaves at once. There is no SYN, no connection and no state on either side.\n\nCompare this with the three packets TCP needed before its first byte of data.',
  show: [],
  schematic: sendOne,
  net: {
    show: ONE_CLIENT,
    hot: ["client"],
    tags: { server: "UDP :5001" },
    packets: [{ path: C_TO_S, label: "hello" }],
    consoles: [
      {
        at: "client",
        title: "udp_client.py",
        lines: [
          "s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)",
          "s.settimeout(2)",
          's.sendto(b"hello", ("192.168.1.20", 5001))',
          "print(s.recvfrom(1024))",
        ],
      },
    ],
  },
  table: revealedTable(UDP_TABLE_HEADERS, UDP_TABLE_ROWS, 1),
};
