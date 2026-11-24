import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Place diode D1.",
  body: "Insert D1 (1N4007) in row c from column 6 to column 9, anode at column 6. It conducts when S1 is positive with respect to the centre tap.",
  show: ["bb", "t1", "w_s1", "w_s2", "w_ct", "d1"],
  highlight: "d1",
  schematic,
};
