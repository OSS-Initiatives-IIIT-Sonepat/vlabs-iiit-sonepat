import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  STAR_IDS,
  STAR_PCS,
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: STAR_IDS,
  hot: ["s2-hub"],
  focus: STAR_PCS,
  links: { "s2-hub": "down" },
  tags: { s2: "✕ cut off" },
  packets: [
    { path: ["s1", "hubS", "s4"], label: "to S4" },
    { path: ["s3", "hubS", "s1"], label: "to S1", at: 0.6 },
  ],
};

export const step: SceneProcedureStep = {
  label: "Star: pull one cable",
  body: "Pull S2's cable. S2 is cut off, but S1 still reaches S4, and S3 still reaches everyone else. A broken cable in a star affects only the node on the end of it.\n\nThe switch itself is the weak point: if it fails, every node is cut off.",
  show: [],
  schematic: figure(net, "Star"),
  net,
  table: revealedTable(TOPO_TABLE_HEADERS, TOPO_TABLE_ROWS, 2),
};
