import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { TREE_IDS, TREE_ALL } from "@/labs/networks/topologies";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

const net: NetFrame = {
  show: TREE_IDS,
  hot: ["core"],
  focus: TREE_ALL,
  packets: [
    { path: ["a1", "tA", "core", "tB", "b2t"], label: "to T4" },
    { path: ["a1", "tA", "a2"], label: "to T2", color: "blue", at: 0.3 },
  ],
};

export const step: SceneProcedureStep = {
  label: "Tree: up to the core and down",
  body: "In the tree room, the core switch is the root, Switch A and Switch B hang from it, and the laptops are the leaves. T1 sends to T4 on the other branch.\n\nThe frame climbs from T1 to Switch A, up to the core, across to Switch B, and down to T4. Traffic within a branch, T1 to T2, never needs the core.",
  show: [],
  schematic: figure(net, "Tree"),
  net,
};
