import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Check IN = Voc / RN.",
  body: "Remove the short and set the supply back to 9.00 V. The voltmeter again reads 6.19 V. Divide: 6.19 V / 688 Ω = 9.00 mA, the same current the ammeter read on the short.",
  show: ["bb", "psu", "r1", "w_v_r1", "r2", "w_r1_r2", "w_r2_gnd", "vm"],
  highlight: "vm",
  readings: { psu: "9.00 V", vm: "6.19 V" },
  schematic,
};
