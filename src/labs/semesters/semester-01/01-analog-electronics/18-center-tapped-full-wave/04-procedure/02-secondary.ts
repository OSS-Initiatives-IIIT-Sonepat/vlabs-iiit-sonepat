import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Connect the centre-tapped secondary.",
  body: "Bring the 12-0-12 V transformer beside the board. Land S1 on column 6, S2 on column 14, and the centre tap on the ground rail. Each half is 12 V rms.",
  show: ["bb", "t1", "w_s1", "w_s2", "w_ct"],
  highlight: "t1",
  schematic,
};
