import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step11 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Take the input curve at VCE = 0.",
  body: "Remove the collector supply and short the collector to ground, so $V_{CE} = 0$. Set $V_{BB} = 4.71\\,\\mathrm{V}$. The same $40\\,\\mu\\mathrm{A}$ now needs $V_{BE} = 0.71\\,\\mathrm{V}$: the input curve has shifted to the right.",
  show: [
    "bb",
    "q1",
    "w_e_gnd",
    "rb",
    "w_b_rb",
    "psu_b",
    "am_ib",
    "vm_be",
    "w_c_short",
    "vm_ce",
  ],
  highlight: "w_c_short",
  readings: {
    psu_b: "4.71 V",
    am_ib: "40 µA",
    vm_be: "0.71 V",
    vm_ce: "0.00 V",
  },
  schematic,
};
