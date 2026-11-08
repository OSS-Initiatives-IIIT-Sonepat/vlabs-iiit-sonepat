import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  WRONG_MASK,
  TCPIP_TABLE_HEADERS,
  TCPIP_TABLE_ROWS,
} from "@/labs/networks/tcpip-config";
import { maskWrong } from "@/labs/schematics/semester-05/01-computer-networks/tcpip-config";

export const step: SceneProcedureStep = {
  label: "See what a wrong mask breaks",
  body: "Change PC 1's mask to 255.255.0.0 by mistake and ping the server again. With a /16 mask the AND gives 192.168.0.0 for both PC 1 and the server, so PC 1 thinks the server is local.\n\nIt does not use the gateway. It broadcasts an ARP request for 192.168.2.10, the router does not pass the broadcast on, and no one answers. PC 1 reports that the host is unreachable, from its own address. Put the mask back to 255.255.255.0.",
  show: [],
  schematic: maskWrong,
  net: {
    hot: ["pc1"],
    addr: WRONG_MASK,
    tags: { pc1: "✕ wrong mask" },
    packets: [
      {
        path: ["pc1", "sw", "pc2"],
        label: "ARP: who has 2.10?",
        color: "purple",
      },
      { path: ["pc1", "sw", "r1"], color: "purple", at: 0.35, drop: true },
    ],
    consoles: [
      {
        at: "pc1",
        title: "Command Prompt · PC 1",
        lines: [
          "C:\\>ping 192.168.2.10",
          "Reply from 192.168.1.10: Destination host unreachable.",
          "Reply from 192.168.1.10: Destination host unreachable.",
        ],
      },
    ],
  },
  table: revealedTable(TCPIP_TABLE_HEADERS, TCPIP_TABLE_ROWS, 4),
};
