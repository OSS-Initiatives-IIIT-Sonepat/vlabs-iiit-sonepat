import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/06-full-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Place D1 and D2 and wire the AC lines to their anodes",
  body: "Mount D1 and D2 (shown in yellow) oriented so current can only flow from the AC lines toward the positive rail. Wire a1 to the anode of D1 (red) and a2 to the anode of D2 (blue).",
  show: ["bb", "ac_src", "d1", "d2", "w_a1_d1", "w_a2_d2"],
  highlight: "d2",
  supplyVoltage: 12,
  schematic,
};
