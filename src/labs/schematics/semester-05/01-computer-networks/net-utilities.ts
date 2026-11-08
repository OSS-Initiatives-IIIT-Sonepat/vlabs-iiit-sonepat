import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { UTIL_BENCH } from "@/labs/networks/net-utilities";

import { netFigure, sequenceFigure, type SeqMessage } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(UTIL_BENCH, frame, title);

export const theoryDiagram = figure({}, "Client to the Internet");

const DORA: SeqMessage[] = [
  { from: 0, to: 1, label: "DHCPDISCOVER (broadcast)", color: "#8b5cd6" },
  { from: 1, to: 0, label: "DHCPOFFER 192.168.1.10" },
  { from: 0, to: 1, label: "DHCPREQUEST 192.168.1.10", color: "#8b5cd6" },
  { from: 1, to: 0, label: "DHCPACK, lease 24 h" },
];

export const doraFigure = sequenceFigure(
  ["Client", "Router (DHCP)"],
  DORA,
  DORA.length,
  [],
  "DHCP",
);

const TRACE: SeqMessage[] = [
  { from: 0, to: 1, label: "TTL 1" },
  { from: 1, to: 0, label: "Time exceeded", color: "#dc2626" },
  { from: 0, to: 2, label: "TTL 2" },
  { from: 2, to: 0, label: "Time exceeded", color: "#dc2626" },
  { from: 0, to: 3, label: "TTL 3" },
  { from: 3, to: 0, label: "Time exceeded", color: "#dc2626" },
  { from: 0, to: 4, label: "TTL 4" },
  { from: 4, to: 0, label: "Echo reply", color: "#22a55a" },
];

export const traceFigure = sequenceFigure(
  ["Client", "Router", "ISP", "Core", "Web"],
  TRACE,
  TRACE.length,
  [],
  "ICMP",
);
