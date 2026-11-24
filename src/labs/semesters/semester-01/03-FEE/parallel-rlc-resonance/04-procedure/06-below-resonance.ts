import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Measure below resonance.",
  body: "Set the generator to $3.00\\,\\mathrm{kHz}$. The line current is $7.13\\,\\mathrm{mA}$ peak-to-peak. Below $f_0$ the tank is inductive, so the current lags the voltage.",
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
  readings: { fg: "3.00 kHz, 2 Vpp", am: "7.13 mA", scope: "2.00 Vpp" },
  schematic,
};
