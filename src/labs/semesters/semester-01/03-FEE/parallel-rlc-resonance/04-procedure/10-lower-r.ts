import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Repeat with R = 470 Ω.",
  body: "Restore the jumper to the capacitor and replace R with $470\\,\\Omega$. $f_0$ is still $5.03\\,\\mathrm{kHz}$, but the minimum current rises to $4.26\\,\\mathrm{mA}$ and $Q$ falls to $1.49$. The bandwidth widens to $3.62\\,\\mathrm{kHz}$–$7.00\\,\\mathrm{kHz}$.",
  show: [
    "bb",
    "r470",
    "l1",
    "w_tank_gnd",
    "c1",
    "w_c_gnd",
    "w_node_c",
    "fg",
    "am",
    "scope",
  ],
  highlight: "r470",
  readings: { fg: "5.03 kHz, 2 Vpp", am: "4.26 mA", scope: "2.00 Vpp" },
  schematic,
};
