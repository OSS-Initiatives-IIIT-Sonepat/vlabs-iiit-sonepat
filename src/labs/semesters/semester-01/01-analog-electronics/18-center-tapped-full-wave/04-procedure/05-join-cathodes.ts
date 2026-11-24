import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Join the cathodes.",
  body: "Join both cathodes, column 9 and column 17, to the positive node at column 22. The load current will leave this node on both half-cycles.",
  show: [
    "bb",
    "t1",
    "w_s1",
    "w_s2",
    "w_ct",
    "d1",
    "d2",
    "w_d1_pos",
    "w_d2_pos",
  ],
  highlight: "w_d1_pos",
  schematic,
};
