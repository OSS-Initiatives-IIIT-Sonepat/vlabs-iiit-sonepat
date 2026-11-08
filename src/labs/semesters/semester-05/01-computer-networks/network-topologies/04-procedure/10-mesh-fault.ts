import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  MESH_IDS,
  MESH_RS,
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: MESH_IDS,
  hot: ["m1-m4", "m3-m4"],
  focus: MESH_RS,
  links: { "m1-m3": "down" },
  packets: [{ path: ["m1", "m4", "m3"], label: "to M3" }],
};

export const step: SceneProcedureStep = {
  label: "Mesh: another way round",
  body: "Cut the link between M1 and M3. M1 still has links to M2 and M4, and each of them has a link to M3. The routing protocol finds a new path, and traffic flows M1 to M4 to M3.\n\nA full mesh survives any single link failure. The price is six links and three ports per router for only four nodes.",
  show: [],
  schematic: figure(net, "Mesh"),
  net,
  table: revealedTable(TOPO_TABLE_HEADERS, TOPO_TABLE_ROWS, 4),
};
