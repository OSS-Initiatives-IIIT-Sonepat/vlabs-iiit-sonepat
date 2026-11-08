import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { MESH_IDS, MESH_RS } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: MESH_IDS,
  hot: ["m1-m3"],
  focus: MESH_RS,
  packets: [{ path: ["m1", "m3"], label: "to M3" }],
};

export const step: SceneProcedureStep = {
  label: "Mesh: a link to every node",
  body: "In the mesh room, four routers are each cabled to all three others: 4 × 3 / 2 = 6 links. M1 sends to M3 straight over their own link.\n\nEvery pair has its own link, so there is no shared cable and no single centre.",
  show: [],
  schematic: figure(net, "Mesh"),
  net,
};
