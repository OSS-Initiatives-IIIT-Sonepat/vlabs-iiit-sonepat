import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Measure the capacitor current.",
  body: "Return to $5.03\\,\\mathrm{kHz}$ and move the branch ammeter into the capacitor lead, in place of the orange jumper. $I_C = 6.32\\,\\mathrm{mA}$ while the line current is still $2.00\\,\\mathrm{mA}$. $Q = I_C / I = 3.16$.",
  show: [
    "bb",
    "r1",
    "l1",
    "w_tank_gnd",
    "c1",
    "w_c_gnd",
    "fg",
    "am",
    "am_c",
    "scope",
  ],
  highlight: "am_c",
  readings: {
    fg: "5.03 kHz, 2 Vpp",
    am: "2.00 mA",
    am_c: "6.32 mA",
    scope: "2.00 Vpp",
  },
  schematic,
};
