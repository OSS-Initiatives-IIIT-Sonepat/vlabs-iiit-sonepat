import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  hot: ["pc-r1"],
  focus: ["pc", "r1"],
  links: { "pc-r1": "down" },
  tags: { pc: "✕ no link" },
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>ipconfig",
        "Ethernet adapter Ethernet:",
        "   Media State . . . : Media disconnected",
        "C:\\>ping 192.168.1.1",
        "PING: transmit failed. General failure.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Fault 1: the cable is out",
  body: "Pull the client's cable. The browser stops loading. Start at the bottom: ipconfig now says Media disconnected, and ping 192.168.1.1 fails with General failure.\n\nThe fault is at layer 1, before any address is involved. Plug the cable back in and ipconfig shows the address again.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 6),
};
