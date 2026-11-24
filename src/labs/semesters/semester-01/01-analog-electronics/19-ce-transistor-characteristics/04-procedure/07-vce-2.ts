import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Measure VCE = 2 V.",
  body: "Clip the second voltmeter from collector to emitter. At $V_{CE} = 2.00\\,\\mathrm{V}$ and $I_B = 40\\,\\mu\\mathrm{A}$, $I_C = 4.04\\,\\mathrm{mA}$.",
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
    "vm_ce",
  ],
  highlight: "vm_ce",
  readings: {
    psu_b: "4.69 V",
    am_ib: "40 µA",
    vm_be: "0.69 V",
    psu_c: "2.00 V",
    am_ic: "4.04 mA",
    vm_ce: "2.00 V",
  },
  schematic,
};
