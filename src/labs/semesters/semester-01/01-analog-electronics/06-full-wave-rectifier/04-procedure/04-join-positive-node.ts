import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/full-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Tie D1 and D2 cathodes into the positive output node",
  body: "D1 and D2 conduct on alternating half-cycles, but both always push current the same way into this shared node (orange). This node becomes the rectifier's positive (+) output terminal.",
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
    "w_d1_pos",
    "w_d2_pos",
  ],
  supplyVoltage: 12,
  schematic,
};
