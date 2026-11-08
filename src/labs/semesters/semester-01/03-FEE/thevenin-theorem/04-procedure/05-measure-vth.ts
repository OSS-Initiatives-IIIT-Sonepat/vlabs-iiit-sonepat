import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Measure Vth.",
  body: "Clip the voltmeter from node A to ground. Leave the load off. The open-circuit voltage is Vth = 6.19 V.",
  show: ["bb", "psu", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd", "vm"],
  highlight: "vm",
  readings: { psu: "9.00 V", vm: "6.19 V" },
  schematic,
};
