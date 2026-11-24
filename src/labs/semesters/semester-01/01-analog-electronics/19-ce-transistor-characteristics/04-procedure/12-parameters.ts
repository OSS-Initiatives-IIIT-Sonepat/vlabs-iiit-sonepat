import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step12 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Find ri, ro and beta.",
  body: "Restore $V_{CE} = 5.00\\,\\mathrm{V}$ and $I_B = 40\\,\\mu\\mathrm{A}$, where $I_C = 4.10\\,\\mathrm{mA}$. Then $\\beta = 4.10\\,\\mathrm{mA} / 40\\,\\mu\\mathrm{A} = 102.5$, $r_i = 0.02\\,\\mathrm{V} / 20\\,\\mu\\mathrm{A} = 1.0\\,\\mathrm{k}\\Omega$ and $r_o = 50\\,\\mathrm{k}\\Omega$.",
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
  highlight: "q1",
  readings: {
    psu_b: "4.69 V",
    am_ib: "40 µA",
    vm_be: "0.69 V",
    psu_c: "5.00 V",
    am_ic: "4.10 mA",
    vm_ce: "5.00 V",
  },
  schematic,
};
