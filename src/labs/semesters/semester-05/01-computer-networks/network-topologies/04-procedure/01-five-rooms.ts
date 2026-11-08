import { type SceneProcedureStep } from "@/labs/experiments/types";
import { overview } from "@/labs/schematics/semester-05/01-computer-networks/topologies";

export const step: SceneProcedureStep = {
  label: "Five rooms, five topologies",
  body: "Each room holds one topology: bus, star and ring at the back, mesh and tree at the front. In each you will send a message across the topology, then cut one cable and see what stops working.\n\nThe corner card draws each room's links as you visit it.",
  show: [],
  schematic: overview,
  net: {
    note: {
      at: "hubS",
      title: "Same nodes, different links",
      text: "What changes from room to room is only which node is cabled to which.",
    },
  },
};
