import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step11 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Repeat with C = 0.22 µF.",
  body: "Put the $1\\,\\mathrm{k}\\Omega$ resistor back and change C to $0.22\\,\\mu\\mathrm{F}$. Resonance moves to $f_0 = 3.39\\,\\mathrm{kHz}$. The line current is again $2.00\\,\\mathrm{mA}$ and $Q$ rises to $4.69$.",
  show: [
    "bb",
    "r1",
    "l1",
    "w_tank_gnd",
    "c22",
    "w_c_gnd",
    "w_node_c",
    "fg",
    "am",
    "scope",
  ],
  highlight: "c22",
  readings: { fg: "3.39 kHz, 2 Vpp", am: "2.00 mA", scope: "2.00 Vpp" },
  schematic,
};
