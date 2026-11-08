import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  VIA_SWITCH,
  SAME_NET,
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: [...VIA_SWITCH, "r1"],
  hot: ["sw", "a-sw", "sw-b"],
  addr: SAME_NET,
  tags: { pcA: "✓ link", pcB: "✓ link" },
};

export const step: SceneProcedureStep = {
  label: "Put a switch between them",
  body: "Unplug the crossover cable. Run a straight-through cable from each PC to the switch. A PC and a switch send on opposite pairs, so no crossover is needed.\n\nKeep the same addresses. The switch only forwards frames between its ports, so it is invisible to the PCs, and a third or fourth peer can now join.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 1),
};
