import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Wire the diode cathode to the load",
  body: "Connect the cathode of D1 to the near terminal (p1) of $R_L$ with a white wire, completing the current path for the conducting half-cycle.",
  show: ["bb", "ac_src", "d1", "w_src_d1", "r1", "w_d1_r1"],
  highlight: "w_d1_r1",
  schematic,
};
