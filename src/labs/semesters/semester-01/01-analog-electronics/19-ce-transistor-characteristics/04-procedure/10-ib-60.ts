import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Set IB = 60 µA.",
  body: "Raise $V_{BB}$ to $6.70\\,\\mathrm{V}$. Then $V_{BE} = 0.70\\,\\mathrm{V}$ and $I_B = 60\\,\\mu\\mathrm{A}$. $I_C = 6.15\\,\\mathrm{mA}$ at $V_{CE} = 5.00\\,\\mathrm{V}$.",
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
  highlight: "am_ic",
  readings: {
    psu_b: "6.70 V",
    am_ib: "60 µA",
    vm_be: "0.70 V",
    psu_c: "5.00 V",
    am_ic: "6.15 mA",
    vm_ce: "5.00 V",
  },
  schematic,
};
