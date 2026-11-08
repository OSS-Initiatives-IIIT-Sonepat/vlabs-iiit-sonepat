import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";

export const step: SceneProcedureStep = {
  label: "Connect the 3.3 kΩ load.",
  body: "Remove the short and set the supply back to 9.00 V. Insert the 3.3 kΩ load and put the ammeter in series with it. The voltmeter, still from A to ground, reads 5.12 V. The ammeter reads 1.55 mA.",
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
