import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DHCP_ADDR,
  PATH_WEB,
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";
import { traceFigure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

export const step: SceneProcedureStep = {
  label: "tracert www.example.com",
  body: "Run tracert www.example.com. The first probe has TTL 1: the router lowers it to 0, drops it, and returns Time Exceeded, so hop 1 is 192.168.1.1. The probe with TTL 2 dies at the ISP's router, TTL 3 at a router in the Internet's core, and TTL 4 reaches the web server.\n\ntracert prints one line per hop with three round-trip times. A line of asterisks means that hop did not answer.",
  show: [],
  schematic: traceFigure,
  net: {
    hot: ["r1", "isp", "net", "web"],
    addr: DHCP_ADDR,
    packets: [
      { path: ["pc", "r1"], label: "TTL 1", drop: true },
      { path: ["pc", "r1", "isp"], label: "TTL 2", drop: true },
      { path: ["pc", "r1", "isp", "net"], label: "TTL 3", drop: true },
      { path: PATH_WEB, label: "TTL 4" },
    ],
    consoles: [
      {
        at: "pc",
        title: "Command Prompt · Client",
        lines: [
          "C:\\>tracert www.example.com",
          "  1    <1 ms    <1 ms    <1 ms  192.168.1.1",
          "  2     4 ms     3 ms     4 ms  203.0.113.1",
          "  3    11 ms    12 ms    11 ms  198.51.100.1",
          "  4    14 ms    13 ms    14 ms  198.51.100.20",
          "Trace complete.",
        ],
      },
    ],
  },
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 4),
};
