import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/06-full-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Place D3 and D4 to complete the bridge",
  body: "Mount D3 and D4. Their anodes go to the ground/negative rail (black), and their cathodes feed back into the same a1/a2 tie points D1 and D2 use — this cross-connection is what makes it a full bridge, so every half-cycle finds a forward path through two diodes.",
  show: [
    "bb",
    "ac_src",
    "d1",
    "d2",
    "w_a1_d1",
    "w_a2_d2",
    "d3",
    "d4",
    "w_neg_d3",
    "w_d3_a1",
    "w_neg_d4",
    "w_d4_a2",
  ],
  highlight: "d4",
  supplyVoltage: 12,
  schematic,
};
