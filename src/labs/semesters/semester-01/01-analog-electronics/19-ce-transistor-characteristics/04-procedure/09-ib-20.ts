import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Set IB = 20 µA.",
  body: "Lower $V_{BB}$ to $2.67\\,\\mathrm{V}$. Then $V_{BE} = 0.67\\,\\mathrm{V}$ and $I_B = 20\\,\\mu\\mathrm{A}$. At $V_{CE} = 5.00\\,\\mathrm{V}$, $I_C = 2.05\\,\\mathrm{mA}$.",
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
  highlight: "am_ib",
  readings: {
    psu_b: "2.67 V",
    am_ib: "20 µA",
    vm_be: "0.67 V",
    psu_c: "5.00 V",
    am_ic: "2.05 mA",
    vm_ce: "5.00 V",
  },
  schematic,
};
