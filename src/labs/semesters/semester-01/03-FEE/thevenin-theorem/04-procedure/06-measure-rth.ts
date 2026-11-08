import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Measure Rth.",
  body: "Switch the supply off and replace it with a short across the rail. Set the meter to resistance. It reads Rth = 688 Ω, which is 1 kΩ in parallel with 2.2 kΩ.",
  show: ["bb", "w_short", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd", "vm"],
  highlight: "vm",
  readings: { vm: "688 Ω" },
  schematic,
};
