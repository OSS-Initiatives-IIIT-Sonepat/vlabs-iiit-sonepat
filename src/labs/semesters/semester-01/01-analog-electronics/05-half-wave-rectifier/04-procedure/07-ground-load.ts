import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Return the load to ground",
  body: "Wire the far terminal (p2) of $R_L$ back to the GND rail with a black wire, closing the loop back to the AC source.",
  show: ["bb", "ac_src", "d1", "w_src_d1", "r1", "w_d1_r1", "w_r1_gnd"],
  highlight: "w_r1_gnd",
  schematic,
};
