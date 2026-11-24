import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Connect the collector supply.",
  body: "Connect $V_{CC}$ to column 8, return it to ground, and put the milliammeter from column 8 to the collector at column 13. Set $V_{CC} = 2.00\\,\\mathrm{V}$.",
  show: [
    "bb",
    "q1",
    "w_e_gnd",
    "rb",
    "w_b_rb",
    "psu_b",
    "am_ib",
    "vm_be",
    "psu_c",
    "am_ic",
  ],
  highlight: "am_ic",
  readings: {
    psu_b: "4.69 V",
    am_ib: "40 µA",
    vm_be: "0.69 V",
    psu_c: "2.00 V",
    am_ic: "4.04 mA",
  },
  schematic,
};
