import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  BUS_IDS,
  BUS_PCS,
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: BUS_IDS,
  hot: ["bb2"],
  focus: BUS_PCS,
  links: { bb2: "down" },
  tags: { b1: "✕", b2: "✕", b3: "✕" },
  packets: [
    { path: ["b1", "t1"], label: "to B3", drop: true },
    {
      path: ["b2", "t2", "t3", "b3"],
      label: "reflected",
      color: "red",
      at: 0.6,
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Bus: cut the backbone",
  body: "Cut the backbone between B1's and B2's taps. Each half now has an unterminated end, so signals reflect back and collide with themselves.\n\nNo node can talk to any other, not even B2 to B3 on the same half. One fault in the backbone takes down the whole bus.",
  show: [],
  schematic: figure(net, "Bus"),
  net,
  table: revealedTable(TOPO_TABLE_HEADERS, TOPO_TABLE_ROWS, 1),
};
