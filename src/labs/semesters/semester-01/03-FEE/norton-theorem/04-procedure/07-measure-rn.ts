import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Measure RN.",
  body: "Remove the ammeter. Switch the supply off and replace it with a short. Set the meter to resistance, from A to ground. It reads RN = 688 Ω.",
  show: ["bb", "w_short", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd", "vm"],
  highlight: "vm",
  readings: { vm: "688 Ω" },
  schematic,
};
