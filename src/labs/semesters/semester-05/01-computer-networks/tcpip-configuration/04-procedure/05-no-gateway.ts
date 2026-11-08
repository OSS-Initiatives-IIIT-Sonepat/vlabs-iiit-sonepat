import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  IP_ONLY,
  TCPIP_TABLE_HEADERS,
  TCPIP_TABLE_ROWS,
} from "@/labs/networks/tcpip-config";
import { maskOther } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

export const step: SceneProcedureStep = {
  label: "Ping the server with no gateway",
  body: "Now ping the server, 192.168.2.10. The AND gives 192.168.2.0, which is not PC 1's network, so the packet must go to a router. PC 1 has no gateway, so it has nowhere to send it.\n\nWindows does not put anything on the cable. It answers at once: General failure. Note the result in the table.",
  show: [],
  schematic: maskOther,
  net: {
    hot: ["pc1", "srv"],
    addr: IP_ONLY,
    tags: { pc1: "✕ no route" },
    consoles: [
      {
        at: "pc1",
        title: "Command Prompt · PC 1",
        lines: [
          "C:\\>ping 192.168.2.10",
          "PING: transmit failed. General failure.",
          "PING: transmit failed. General failure.",
        ],
      },
    ],
  },
  table: revealedTable(TCPIP_TABLE_HEADERS, TCPIP_TABLE_ROWS, 2),
};
