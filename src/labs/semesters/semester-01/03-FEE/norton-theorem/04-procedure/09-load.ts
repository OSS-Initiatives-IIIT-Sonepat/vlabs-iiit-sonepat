import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";

export const step: SceneProcedureStep = {
  label: "Connect the 3.3 kΩ load.",
  body: "Insert the 3.3 kΩ load with the ammeter in series, and leave the voltmeter from A to ground. The voltmeter reads 5.12 V and the ammeter reads 1.55 mA. A Norton source of 9.00 mA in parallel with 688 Ω drives this load to the same voltage.",
  show: [
    "bb",
    "psu",
    "r1",
    "w_v_r1",
    "r2",
    "w_r1_r2",
    "w_r2_gnd",
    "r_load",
    "w_load_gnd",
    "am_l",
    "vm",
  ],
  highlight: "r_load",
  readings: { psu: "9.00 V", vm: "5.12 V", am_l: "1.55 mA" },
  schematic,
};
