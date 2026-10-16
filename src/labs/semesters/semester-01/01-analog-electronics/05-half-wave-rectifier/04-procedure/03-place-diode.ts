import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Place the rectifying diode D1",
  body: "Insert diode D1 (1N4007) on the breadboard. The banded (cathode) end faces away from the incoming AC rail so that D1 conducts during the positive half-cycle.",
  show: ["bb", "ac_src", "d1"],
  highlight: "d1",
  schematic,
};
