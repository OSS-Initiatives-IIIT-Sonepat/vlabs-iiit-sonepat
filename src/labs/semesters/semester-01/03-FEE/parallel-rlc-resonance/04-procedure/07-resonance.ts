import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Find the resonant frequency.",
  body: "Raise the frequency until the line current is a minimum. That is $f_0 = 5.03\\,\\mathrm{kHz}$, where $I = V/R = 2.00\\,\\mathrm{mA}$ peak-to-peak and the current is in phase with the voltage.",
  show: [
    "bb",
    "r1",
    "l1",
    "w_tank_gnd",
    "c1",
    "w_c_gnd",
    "w_node_c",
    "fg",
    "am",
    "scope",
  ],
  highlight: "am",
  readings: { fg: "5.03 kHz, 2 Vpp", am: "2.00 mA", scope: "2.00 Vpp" },
  schematic,
};
