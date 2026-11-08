import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  TREE_IDS,
  TREE_ALL,
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: TREE_IDS,
  hot: ["core-tA"],
  focus: TREE_ALL,
  links: { "core-tA": "down" },
  tags: { a1: "✕ no uplink", a2: "✕ no uplink" },
  packets: [
    { path: ["a1", "tA"], label: "to T4", drop: true },
    { path: ["a1", "tA", "a2"], label: "to T2", color: "blue", at: 0.6 },
  ],
};

export const step: SceneProcedureStep = {
  label: "Tree: cut a branch",
  body: "Cut the uplink from Switch A to the core. T1 and T2 can still reach each other through Switch A, but nothing above it: the whole branch is cut off from the rest of the tree.\n\nIn a campus this uplink would be doubled, or the core meshed, so one cable cannot isolate a building.",
  show: [],
  schematic: figure(net, "Tree"),
  net,
  table: revealedTable(TOPO_TABLE_HEADERS, TOPO_TABLE_ROWS, 5),
};
