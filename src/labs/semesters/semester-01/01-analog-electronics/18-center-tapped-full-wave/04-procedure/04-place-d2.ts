import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/18-center-tapped-full-wave";

export const step: SceneProcedureStep = {
  label: "Place diode D2.",
  body: "Insert D2 in row c from column 14 to column 17, anode at column 14. It conducts on the opposite half-cycle, when S2 is positive.",
  show: ["bb", "t1", "w_s1", "w_s2", "w_ct", "d1", "d2"],
  highlight: "d2",
  schematic,
};
