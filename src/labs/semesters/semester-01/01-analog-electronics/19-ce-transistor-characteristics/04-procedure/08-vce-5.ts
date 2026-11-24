import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Raise VCE to 5 V.",
  body: "Raise $V_{CC}$ to $5.00\\,\\mathrm{V}$, still at $I_B = 40\\,\\mu\\mathrm{A}$. $I_C$ rises only to $4.10\\,\\mathrm{mA}$. That small slope is the Early effect: $r_o = 3\\,\\mathrm{V} / 0.06\\,\\mathrm{mA} = 50\\,\\mathrm{k}\\Omega$.",
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
  highlight: "psu_c",
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
