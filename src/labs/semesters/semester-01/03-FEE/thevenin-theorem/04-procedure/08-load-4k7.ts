import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Swap the load for 4.7 kΩ.",
  body: "Replace the 3.3 kΩ load with 4.7 kΩ. The voltmeter reads 5.40 V and the ammeter reads 1.15 mA.",
  show: [
    "bb",
    "psu",
    "r1",
    "w_v_r1",
    "r2",
    "w_r1_r2",
    "w_r2_gnd",
    "r4",
    "w_r4_gnd",
    "am_l4",
    "vm",
  ],
  highlight: "r4",
  readings: { psu: "9.00 V", vm: "5.40 V", am_l4: "1.15 mA" },
  schematic,
};
