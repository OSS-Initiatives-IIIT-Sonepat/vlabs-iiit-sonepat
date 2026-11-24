import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Mark the half-power frequencies.",
  body: "The half-power currents are $\\sqrt{2} \\times 2.00 = 2.83\\,\\mathrm{mA}$. They fall at $f_1 = 4.30\\,\\mathrm{kHz}$ and $f_2 = 5.89\\,\\mathrm{kHz}$. Then $BW = 1.59\\,\\mathrm{kHz}$ and $Q = f_0 / BW = 3.16$. The meter is parked on $f_1$.",
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
  highlight: "fg",
  readings: { fg: "4.30 kHz, 2 Vpp", am: "2.83 mA", scope: "2.00 Vpp" },
  schematic,
};
